"use client"; // for Next.js App Router

import Link from "next/link";
import { useState } from "react";

import { useRouter } from "next/navigation";
export default function Leftbar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/logout", {
        method: "GET",
      });

      if (res.ok) {
        // Redirect to login page
        router.push("/dashboard/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };

  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };
  return (
    <>
      <aside id="leftsidebar" className="sidebar">
        {/* <!-- Menu --> */}
        <div className="menu">
          <ul className="list">
            <li>
              <div className="user-info">
                <div className="image">
                  <a href="#" className=" waves-effect waves-block">
                    <img src="/asets/images/profile_av.jpg" alt="User" />
                  </a>
                </div>
                <div className="detail">
                  <h4>Riyaz Alvi</h4>
                  <small></small>
                </div>
                <a
                  href="#"
                  title="Events"
                  className=" waves-effect waves-block"
                >
                  <i className="zmdi zmdi-calendar"></i>
                </a>
                <a href="#" title="Inbox" className=" waves-effect waves-block">
                  <i className="zmdi zmdi-email"></i>
                </a>
                <a
                  href="#"
                  title="Contact List"
                  className=" waves-effect waves-block"
                >
                  <i className="zmdi zmdi-account-box-phone"></i>
                </a>
                <a
                  href="#"
                  title="Chat App"
                  className=" waves-effect waves-block"
                >
                  <i className="zmdi zmdi-comments"></i>
                </a>
                <a
                  onClick={handleLogout}
                  data-close="true"
                  title="Logout"
                  className="waves-effect waves-block"
                >
                  <i className="zmdi zmdi-power"></i>
                </a>
              </div>
            </li>
            <li className="header">MAIN NAVIGATION</li>
            <li>
              <Link
                href="/dashboard/admin"
                className=" waves-effect waves-block"
              >
                <i className="zmdi zmdi-home"></i>
                <span>Home</span>{" "}
              </Link>{" "}
            </li>
            <li>
              <Link
                href="/dashboard/blog-dashboard"
                className=" waves-effect waves-block"
              >
                <i className="zmdi zmdi-blogger"></i>
                <span>Blog Dashboard</span>{" "}
              </Link>{" "}
            </li>
            <li className="active open">
              <Link
                href="/dashboard/new-post"
                className="toggled waves-effect waves-block"
              >
                <i className="zmdi zmdi-plus-circle"></i>
                <span>New Post</span>{" "}
              </Link>{" "}
            </li>

            <li>
              <Link
                href="/dashboard/career-response"
                className="toggled waves-effect waves-block"
              >
                <i className="zmdi zmdi-email"></i>
                <span>Careers Response</span>{" "}
              </Link>{" "}
            </li>

            <li>
              <Link
                href="/dashboard/query-response"
                className="toggled waves-effect waves-block"
              >
                <i className="zmdi zmdi-email"></i>
                <span>Query Response</span>{" "}
              </Link>{" "}
            </li>
            {/* <li>
              <a href="#" className=" waves-effect waves-block">
                <i className="zmdi zmdi-sort-amount-desc"></i>
                <span>Blog List</span>{" "}
              </a>{" "}
            </li> */}

            <li className="header">Sales</li>
            <li>
              <div
                onClick={() => toggleMenu("customers")}
                className="menu-toggle cursor-pointer flex items-center gap-2 p-2 hover:bg-gray-100 waves-effect waves-block"
              >
                <i className="zmdi zmdi-label col-red"></i>
                <span>Customers</span>
              </div>

              <ul
                className={`ml-menu transition-all duration-300 ease-in-out overflow-hidden ${
                  openMenu === "customers" ? "max-h-40" : "max-h-0"
                }`}
                style={{
                  transition: "max-height 0.3s ease",
                  maxHeight: openMenu === "customers" ? "200px" : "0px",
                }}
              >
                <li>
                  <Link
                    href="/dashboard/sales/customers/new-customer"
                    className="waves-effect waves-block"
                  >
                    Add New Customer
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/customer-list"
                    className="waves-effect waves-block"
                  >
                    Customer List
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <a href="#" className="menu-toggle waves-effect waves-block">
                <i className="zmdi zmdi-label col-amber"></i>
                <span>Technology</span>{" "}
              </a>
              <ul className="ml-menu">
                <li>
                  <a href="#" className=" waves-effect waves-block">
                    UI UX Design
                  </a>{" "}
                </li>
                <li>
                  <a href="#" className=" waves-effect waves-block">
                    Android
                  </a>{" "}
                </li>
                <li>
                  <a href="#" className=" waves-effect waves-block">
                    iOS
                  </a>{" "}
                </li>
                <li>
                  <a href="#" className=" waves-effect waves-block">
                    Wordpress
                  </a>{" "}
                </li>
              </ul>
            </li>
            <li>
              <a href="#" className="waves-effect waves-block">
                <i className="zmdi zmdi-label col-purple"></i>
                <span>Lifestyle</span>
              </a>
            </li>
            <li>
              <a href="#" className="waves-effect waves-block">
                <i className="zmdi zmdi-label col-lime"></i>
                <span>Sports</span>
              </a>
            </li>
          </ul>
        </div>
        {/* <!-- #Menu -->  */}
      </aside>
    </>
  );
}
