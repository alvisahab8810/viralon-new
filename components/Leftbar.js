"use client"; // if you’re using the App Router

import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import { useSession } from "next-auth/react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";

import {
  MdHome,
  MdWorkOutline,
  MdMailOutline,
  MdPeopleAlt,
  MdGroup,
  MdRequestQuote,
  MdReceiptLong,
  MdAutorenew,
  MdSupervisorAccount,
  MdLogout,
} from "react-icons/md";

export default function Leftbar({ role = "admin" }) {
  const router = useRouter();
  const pathname = usePathname();
  const isAdmin = role === "admin";
  const isActive = (href) => {
    if (pathname === href) return true;
    if (href === "/dashboard/admin") return false; // don't swallow /dashboard/admin/leads, /admin/salespeople, etc.
    return !!pathname?.startsWith(href + "/");
  };

  /* ------------- logout (same confirm-dialog flow Dashnav used) ------------- */
  const handleLogout = () => {
    confirmAlert({
      title: "Confirm Logout",
      message: "Are you sure you want to logout?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const res = await fetch("/api/admin/logout", { method: "GET" });
              if (res.ok) {
                localStorage.removeItem("token");
                toast.success("Logged out successfully.");
                window.location.href = "/dashboard/login";
              } else {
                toast.error("Logout failed.");
              }
            } catch (error) {
              toast.error("An error occurred during logout.");
              console.error("Logout error:", error);
            }
          },
        },
        {
          label: "No",
          onClick: () => toast.info("Logout cancelled."),
        },
      ],
    });
  };

  /* ------------- MENU DEFINITION (tourwatchout-style: flat links, no nested dropdowns) ------------- */
  //  adminOnly: true  => hide from salespersons
  const NAV = [
    { href: "/dashboard/admin", label: "Home", Icon: MdHome, adminOnly: true },
    { href: "/dashboard/career-response", label: "Careers", Icon: MdWorkOutline, adminOnly: true },
    { href: "/dashboard/query-response", label: "Leads", Icon: MdMailOutline, adminOnly: false },
    { href: "/dashboard/admin/leads", label: "Landing Leads", Icon: MdPeopleAlt, adminOnly: false },
  ];

  const SALES = [
    { href: "/dashboard/sales/customers/customer-list", label: "Clients", Icon: MdGroup, adminOnly: true },
    { href: "/dashboard/sales/customers/quote-list", label: "Quotes", Icon: MdRequestQuote, adminOnly: true },
    { href: "/dashboard/sales/customers/invoice-list", label: "Invoices", Icon: MdReceiptLong, adminOnly: true },
    { href: "/dashboard/sales/customers/recurring-invoice-list", label: "Recurring Invoices", Icon: MdAutorenew, adminOnly: true },
    { href: "/dashboard/admin/salespeople", label: "Sales Team", Icon: MdSupervisorAccount, adminOnly: true },
  ];

  const visibleNav   = NAV.filter((i) => !i.adminOnly || isAdmin);
  const visibleSales = SALES.filter((i) => !i.adminOnly || isAdmin);

  /* ------------- salesperson profile (unchanged) ------------- */
  const { data: session } = useSession();

  const [profile, setProfile] = useState({
    name: "",
    avatarUrl: "/asets/images/avatar.png",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch("/api/user/me");
      if (res.ok) {
        const data = await res.json();
        setProfile({
          name: data.name || "Salesperson",
          avatarUrl: data.avatarUrl || "/asets/images/avatar.png",
        });
      }
    };

    if (role === "salesperson") {
      fetchProfile();
    }
  }, [role]);

  return (
    <>
      {/* Rendered once per mounted page via next/head merging — brings the
          tourwatchout backend design system to every /dashboard/* page. */}
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
          key="inter-font"
        />
        <link rel="stylesheet" href="/assets/css/backend.css" key="backend-css" />
        <style key="bk-legacy-compat">{`
          /* Compatibility shim: the old admin theme's ".content" rule assumed a
             60px-tall fixed topbar + 250px sidebar. Dashnav's topbar is gone now
             (logo + logout moved into the sidebar, tourwatchout-style), so the
             new bk-sidebar spans the full viewport height and .content only
             needs the left offset. */
          .content.home { margin: 0 0 15px 250px !important; }
          @media (max-width: 768px) {
            .content.home { margin-left: 0 !important; }
          }
        `}</style>
      </Head>

      <aside className="bk-sidebar" style={{ width: 250 }}>
        <div className="bk-sidebar-logo">
          <Link href="/dashboard/admin">
            <img src="/asets/images/logo.png" alt="Viralon" />
          </Link>
          {role === "salesperson" && (
            <Link href="/dashboard/salesperson/profile">
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
                <img
                  src={profile.avatarUrl || "/asets/images/avatar.png"}
                  alt="User"
                  width={32}
                  height={32}
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                />
                <span style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{profile.name}</span>
              </div>
            </Link>
          )}
        </div>

        <nav className="bk-sidebar-nav">
          {role === "salesperson" && (
            <Link href="/dashboard/salesperson/" className="bk-nav-item">
              <MdHome size={18} /> Home
            </Link>
          )}

          {visibleNav.map(({ href, label, Icon }) => (
            <Link key={href} href={href} className={`bk-nav-item ${isActive(href) ? "active" : ""}`}>
              <Icon size={18} /> {label}
            </Link>
          ))}

          {visibleSales.length > 0 && <div className="bk-nav-section">Sales</div>}

          {visibleSales.map(({ href, label, Icon }) => (
            <Link key={href} href={href} className={`bk-nav-item ${isActive(href) ? "active" : ""}`}>
              <Icon size={18} /> {label}
            </Link>
          ))}
        </nav>

        <div className="bk-sidebar-bottom">
          <div className="bk-nav-item danger" onClick={handleLogout}>
            <MdLogout size={18} /> Logout
          </div>
        </div>
      </aside>
    </>
  );
}
