import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const RANGE_OPTIONS = [
  { label: "This Fiscal Year", value: "currentFY" },
  { label: "Previous Fiscal Year", value: "lastFY" },
  { label: "Last 12 Months", value: "last12Months" },
];

// Shared card look, matching the tourwatchout-style bk-* design system already
// used for the sidebar/backend.css (see components/Leftbar.js).
const C = {
  box: {
    background: "#fff",
    border: "1px solid #f1f5f9",
    borderRadius: 14,
    padding: "20px 22px",
    boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
  },
  title: { fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 4 },
  subtitle: { fontSize: 12.5, color: "#6b7280", marginBottom: 16 },
};

function inr(n) {
  return `₹${Number(n || 0).toLocaleString("en-IN")}`;
}

function SCard({ label, value, sub, accent }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e4e9f2",
        borderTop: `3px solid ${accent}`,
        borderRadius: 12,
        padding: "16px 18px",
        boxShadow: "0 1px 4px rgba(0,0,0,.05)",
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 800,
          color: "#6b7a99",
          textTransform: "uppercase",
          letterSpacing: ".06em",
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 24, fontWeight: 800, color: accent, lineHeight: 1.2, marginBottom: 4 }}>
        {value}
      </div>
      {sub && <div style={{ fontSize: 12, color: "#94a3b8" }}>{sub}</div>}
    </div>
  );
}

function ReceivableRow({ label, value, color }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 0",
        borderBottom: "1px solid #f1f5f9",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0 }} />
        <span style={{ fontSize: 13, color: "#374151" }}>{label}</span>
      </div>
      <span style={{ fontSize: 14, fontWeight: 700, color }}>{inr(value)}</span>
    </div>
  );
}

export default function DashboardSummary() {
  const [invoiceData, setInvoiceData] = useState([]);

  useEffect(() => {
    const fetchInvoiceSummary = async () => {
      const res = await fetch("/api/dashboard/invoice-summary");
      const data = await res.json();
      if (data.success) {
        setInvoiceData(data.data);
      }
    };

    fetchInvoiceSummary();
  }, []);

  const [quotationData, setQuotationData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/dashboard/quotation-summary");
        const result = await res.json();
        if (result.success) {
          setQuotationData(result.data);
        }
      } catch (error) {
        console.error("Error fetching quotation summary:", error);
      }
    };

    fetchData();
  }, []);

  const [clientData, setClientData] = useState([]);

  useEffect(() => {
    fetch("/api/dashboard/client-onboarding-summary")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setClientData(json.data);
        }
      });
  }, []);

  const [leadData, setLeadData] = useState([]);

  useEffect(() => {
    fetch("/api/dashboard/leads-summary")
      .then((res) => res.json())
      .then((json) => json.success && setLeadData(json.data))
      .catch((err) => console.error("Lead chart fetch error", err));
  }, []);

  const [range, setRange] = useState("currentFY");
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    setSummary(null);
    fetch(`/api/dashboard/summary?range=${range}`)
      .then((res) => res.json())
      .then((json) => json.success && setSummary(json.data))
      .catch((err) => console.error("Dashboard fetch error", err));
  }, [range]);

  if (!summary) {
    return (
      <div style={{ ...C.box, textAlign: "center", padding: "60px 0", color: "#94a3b8", fontSize: 13 }}>
        Loading dashboard…
      </div>
    );
  }

  // ✅ These depend on `summary`, so define them only after the check
  const pieData = [
    { name: "Income", value: summary.incomeExpense.totalIncome },
    { name: "Expense", value: summary.incomeExpense.totalExpense },
  ];
  const COLORS = ["#22c55e", "#ef4444"];

  const cashData = summary.cashFlow.monthly.map((m) => ({
    month: m.month,
    Incoming: m.incoming,
    Outgoing: m.outgoing,
  }));

  const ieData = summary.incomeExpense.monthly.map((m) => ({
    month: m.month,
    Income: m.income,
    Expense: m.expense,
  }));

  const formatMonthTick = (tick) => {
    const [y, m] = tick.split("-");
    return new Date(y, Number(m) - 1).toLocaleString("default", {
      month: "short",
      year: "2-digit",
    });
  };

  const netProfit = summary.incomeExpense.totalIncome - summary.incomeExpense.totalExpense;

  return (
    <div className="case-flow-main">
      {/* ====== KPI Summary Cards ====== */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 14,
          marginBottom: 20,
        }}
      >
        <SCard
          label="Total Receivables"
          value={inr(summary.receivables.total)}
          sub={`${inr(summary.receivables.overdue)} overdue`}
          accent="#dc2626"
        />
        <SCard
          label="Total Income"
          value={inr(summary.incomeExpense.totalIncome)}
          sub={`${inr(summary.incomeExpense.totalExpense)} expenses`}
          accent="#2563eb"
        />
        <SCard
          label="Cash Flow (Closing)"
          value={inr(summary.cashFlow.closing)}
          sub={`Opening ${inr(summary.cashFlow.opening)}`}
          accent="#7c3aed"
        />
        <SCard
          label={netProfit >= 0 ? "Net Profit" : "Net Loss"}
          value={inr(Math.abs(netProfit))}
          sub="Income − Expense"
          accent={netProfit >= 0 ? "#16a34a" : "#dc2626"}
        />
      </div>

      {/* ====== Monthly Activity Charts ====== */}
      {(invoiceData.length > 0 || quotationData.length > 0 || clientData.length > 0) && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
            marginBottom: 16,
          }}
        >
          {invoiceData.length > 0 && (
            <div style={C.box}>
              <div style={C.title}>Invoices Generated</div>
              <div style={C.subtitle}>Monthly count</div>
              <ResponsiveContainer width="100%" height={230}>
                <BarChart data={invoiceData} margin={{ top: 0, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="invoices" fill="#ff6f61" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {quotationData.length > 0 && (
            <div style={C.box}>
              <div style={C.title}>Quotations Created</div>
              <div style={C.subtitle}>Monthly count</div>
              <ResponsiveContainer width="100%" height={230}>
                <BarChart data={quotationData} margin={{ top: 0, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {clientData.length > 0 && (
            <div style={C.box}>
              <div style={C.title}>Client Onboarding</div>
              <div style={C.subtitle}>Monthly count</div>
              <ResponsiveContainer width="100%" height={230}>
                <BarChart data={clientData} margin={{ top: 0, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      )}

      {/* ====== Receivables Breakdown + Income vs Expense ====== */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <div style={C.box}>
          <div style={C.title}>Receivables Breakdown</div>
          <div style={C.subtitle}>Unpaid invoices</div>
          <ReceivableRow label="Total Unpaid" value={summary.receivables.total} color="#111827" />
          <ReceivableRow label="Current" value={summary.receivables.current} color="#16a34a" />
          <ReceivableRow label="Overdue" value={summary.receivables.overdue} color="#dc2626" />
        </div>

        <div style={C.box}>
          <div style={C.title}>Income vs Expense</div>
          <div style={C.subtitle}>Overall split</div>
          <ResponsiveContainer width="100%" height={230}>
            <PieChart>
              <Tooltip formatter={(value) => inr(value)} />
              <Legend iconSize={10} wrapperStyle={{ fontSize: 12 }} />
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={3}
                isAnimationActive={false}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ====== Leads + Cash Flow ====== */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <div style={C.box}>
          <div style={C.title}>Leads Over Last 6 Months</div>
          <div style={C.subtitle}>New leads captured</div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={leadData} margin={{ top: 0, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="Leads" fill="#38bdf8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={C.box}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 4,
            }}
          >
            <div style={C.title}>Cash Flow</div>
            <select
              className="bk-period-select"
              value={range}
              onChange={(e) => setRange(e.target.value)}
            >
              {RANGE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div style={C.subtitle}>
            Opening {inr(summary.cashFlow.opening)} · Closing {inr(summary.cashFlow.closing)}
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={cashData} margin={{ top: 0, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tickFormatter={formatMonthTick} tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend iconSize={10} wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="Incoming" fill="#4ade80" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Outgoing" fill="#f87171" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ====== Income vs Expense (Monthly) ====== */}
      <div style={C.box}>
        <div style={C.title}>Income vs Expense (Monthly)</div>
        <div style={C.subtitle}>
          Total Income {inr(summary.incomeExpense.totalIncome)} · Total Expenses{" "}
          {inr(summary.incomeExpense.totalExpense)}
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={ieData} margin={{ top: 0, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tickFormatter={formatMonthTick} tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Legend iconSize={10} wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="Income" fill="#60a5fa" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Expense" fill="#facc15" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
