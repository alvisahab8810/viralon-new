
"use client"; // if you’re using the App Router

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";

export default function Leftbar({ role = "admin" }) {
  const router = useRouter();
  const isAdmin = role === "admin";

  /* ------------- handle logout (unchanged) ------------- */
  const handleLogout = async () => {
    const res = await fetch("/api/admin/logout", { method: "GET" });
    if (res.ok) router.push("/dashboard/login");
  };

  /* ------------- collapsible menu state ------------- */
  const [openMenu, setOpenMenu] = useState(null);
  const toggleMenu = (m) => setOpenMenu(openMenu === m ? null : m);

  /* ------------- MENU DEFINITION ------------- */
  //  adminOnly: true  => hide from salespersons
  const menu = [
    {
      type: "link",
      href: "/dashboard/admin",
      label: "Home",
      icon: "zmdi-home",
      adminOnly: true,
    },
    {
      type: "link",
      href: "/dashboard/blog-dashboard",
      label: "Blog Dashboard",
      icon: "zmdi-blogger",
      adminOnly: true,
    },
    {
      type: "link",
      href: "/dashboard/new-post",
      label: "New Post",
      icon: "zmdi-plus-circle",
      adminOnly: true,
    },
    {
      type: "link",
      href: "/dashboard/career-response",
      label: "Careers Response",
      icon: "zmdi-email",
      adminOnly: true,
    },
    {
      type: "link",
      href: "/dashboard/query-response",
      label: "Query Response",
      icon: "zmdi-email",
      adminOnly: false,
    },

    {
      type: "link",
      href: "/dashboard/admin/leads",
      label: "Landing Leads",
      icon: "zmdi-email",
      adminOnly: false,
    },

    {
      type: "header",
      label: (
        <>
          <i className="zmdi zmdi-shopping-cart col-red" /> Sales
        </>
      ),
    },

    {
      type: "parent",
      key: "customers",
      label: "Clients",
      icon: "zmdi-accounts col-purple",
      adminOnly: false,
      children: [
        {
          href: "/dashboard/sales/customers/new-customer",
          label: "Add New Client",
          adminOnly: true,
        },
        {
          href: "/dashboard/sales/customers/customer-list",
          label: "Clients List",
          adminOnly: true,
        },
      ],
    },
    {
      type: "parent",
      key: "quotes",
      label: "Quotes",
      icon: "zmdi-file-text col-lime",
      adminOnly: false,
      children: [
        {
          href: "/dashboard/sales/customers/new-quote",
          label: "Add New Quote",
          adminOnly: true,
        },
        {
          href: "/dashboard/sales/customers/quote-list",
          label: "Quote List",
          adminOnly: true,
        },
      ],
    },

    {
      type: "parent",
      key: "invoices",
      label: "Invoices",
      icon: "zmdi-receipt col-blue",
      adminOnly: false,
      children: [
        {
          href: "/dashboard/sales/customers/new-invoice",
          label: "Add New Invoice",
          adminOnly: true,
        },
        {
          href: "/dashboard/sales/customers/invoice-list",
          label: "Invoice List",
          adminOnly: true,
        },

        {
          href: "/dashboard/sales/customers/recurring-invoice",
          label: "Recurring Invoice",
          adminOnly: true,
        },

         {
          href: "/dashboard/sales/customers/recurring-invoice-list",
          label: "Recurring List",
          adminOnly: true,
        },
      ],
    },

     {
    type: "parent",
    key: "payroll",
    label: "Payroll",
    icon: "zmdi-balance-wallet col-deep-orange",
    adminOnly: true,
    children: [
      {
        href: "/dashboard/payroll/add-new-employee",
        label: "Add Employee",
        adminOnly: true,
      },
      {
        href: "/dashboard/payroll/employees",
        label: "Employee List",
        adminOnly: true,
      },

       {
        href: "/dashboard/payroll/leave-and-attendance",
        label: "Leave & Attendance",
        adminOnly: true,
      },

      
    ],
  },
  ];

  /* ------------- RENDER ------------- */

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
    <aside id="leftsidebar" className="sidebar">
      {/* user-info block (unchanged) */}

      <div className="menu">
        <ul className="list">
          <li>
            <div className="user-info">
              {role === "salesperson" && (
                <Link href="/dashboard/salesperson/profile">
                  <div className="image">
                    <img
                      src={profile.avatarUrl || "/asets/images/avatar.png"}
                      alt="User"
                      className="rounded-circle"
                      width={48}
                      height={48}
                    />
                  </div>

                  <div className="detail">
                    <h4>{profile.name}</h4>
                  </div>
                </Link>
              )}
            </div>
          </li>

          {role === "salesperson" && (
            <li>
              <Link
                href="/dashboard/salesperson/"
                className="waves-effect waves-block"
              >
                <i className="zmdi zmdi-home"></i>
                <span>Home</span>
              </Link>
            </li>
          )}

          {menu
            .filter((item) => !item.adminOnly || isAdmin)
            .map((item) => {
              if (item.type === "header") {
                return (
                  <li key={item.label} className="header">
                    {item.label}
                  </li>
                );
              }

              if (item.type === "link") {
                return (
                  <li key={item.href}>
                    <Link href={item.href} className="waves-effect waves-block">
                      <i className={`zmdi ${item.icon}`} />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              }

              if (item.type === "parent") {
                const expanded = openMenu === item.key;
                return (
                  <li key={item.key}>
                    <div
                      onClick={() => toggleMenu(item.key)}
                      className="menu-toggle cursor-pointer flex items-center gap-2 p-2 hover:bg-gray-100 waves-effect waves-block"
                    >
                      <i className={`zmdi ${item.icon}`} />
                      <span>{item.label}</span>
                    </div>

                    <ul
                      className={`ml-menu overflow-hidden transition-all duration-300 ease-in-out ${
                        expanded ? "max-h-40" : "max-h-0"
                      }`}
                      style={{ maxHeight: expanded ? "200px" : "0px" }}
                    >
                      {item.children
                        .filter((c) => !c.adminOnly || isAdmin)
                        .map((c) => (
                          <li key={c.href}>
                            <Link
                              href={c.href}
                              className="waves-effect waves-block"
                            >
                              {c.label}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </li>
                );
              }
            })}

          {role === "admin" && (
            <li>
              <Link
                href="/dashboard/admin/salespeople"
                className="waves-effect waves-block"
              >
                <i className="zmdi zmdi-accounts" /> Sales Team
              </Link>
            </li>
          )}



         
        </ul>
      </div>
    </aside>
  );
}
