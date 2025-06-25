"use client"; // for Next.js App Router

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify"; // assuming you're using toast too
import React from "react";
import Link from "next/link";

import { useRouter } from "next/navigation";

export default function Dashnav() {
const router = useRouter();

  // const handleLogout = async () => {
  //   try {
  //     const res = await fetch("/api/admin/logout", {
  //       method: "GET",
  //     });

  //     if (res.ok) {
  //       // Redirect to login page
  //       router.push("/dashboard/login");
  //     } else {
  //       console.error("Logout failed");
  //     }
  //   } catch (error) {
  //     console.error("An error occurred during logout:", error);
  //   }
  // };


  const handleLogout = () => {
  confirmAlert({
    title: "Confirm Logout",
    message: "Are you sure you want to logout?",
    buttons: [
      {
        label: "Yes",
        onClick: async () => {
          try {
            const res = await fetch("/api/admin/logout", {
              method: "GET",
            });

            if (res.ok) {
              localStorage.removeItem("token"); // Optional: remove token
              toast.success("Logged out successfully.");
              window.location.href = "/dashboard/login";
            } else {
              toast.error("Logout failed.");
              console.error("Logout failed");
            }
          } catch (error) {
            toast.error("An error occurred during logout.");
            console.error("Logout error:", error);
          }
        },
      },
      {
        label: "No",
        onClick: () => {
          toast.info("Logout cancelled.");
        },
      },
    ],
  });
};


  return (
    <div className="main-nav dash-nav">
      <nav className="navbar">
        <div className="col-12">
          <div className="navbar-header">
            <Link href="#" className="bars"></Link>
            <Link className="navbar-brand" href="/dashboard/admin">
              <img src="/asets/images/logo.png" width="100" alt="Viralon" />
              {/* <span className="m-l-10">Compass</span> */}
            </Link>
          </div>
          <ul className="nav navbar-nav navbar-left"></ul>
          <ul className="nav navbar-nav navbar-right">
            {/* <li className="dropdown">
              <a
                href="#"
                className="dropdown-toggle"
                data-toggle="dropdown"
                role="button"
              >
                <i className="zmdi zmdi-notifications"></i>
                <div className="notify">
                  <span className="heartbit"></span>
                  <span className="point"></span>
                </div>
              </a>
              <ul className="dropdown-menu dropdown-menu-right slideDown">
                <li className="header">NOTIFICATIONS</li>
                <li className="body">
                  <ul className="menu list-unstyled">
                    <li>
                      <a href="#">
                        <div className="icon-circle bg-blue">
                          <i className="zmdi zmdi-account"></i>
                        </div>
                        <div className="menu-info">
                          <h4>8 New Members joined</h4>
                          <p>
                            <i className="zmdi zmdi-time"></i> 14 mins ago
                          </p>
                        </div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="footer">
                  <a href="#">View All Notifications</a>
                </li>
              </ul>
            </li> */}
            <li>
              <a
                href="#"
                className="fullscreen hidden-sm-down"
                data-provide="fullscreen"
                data-close="true"
              >
                <i className="zmdi zmdi-fullscreen"></i>
              </a>
            </li>
            {/* <li className="log-out-btn">
              <button onClick={handleLogout}  className="mega-menu" data-close="true">
                <i className="zmdi zmdi-power"></i>
              </button>
            </li> */}

            <li className="log-out-btn">
  <button
    onClick={handleLogout}
    className="mega-menu"
    data-close="true"
    title="Logout"
  >
    <i className="zmdi zmdi-power"></i>
  </button>
</li>

            <li>
              <a href="#" className="js-right-sidebar" data-close="true" data-bs-toggle="offcanvas"
               data-bs-target="#invoiceSettings">
                <i className="zmdi zmdi-settings zmdi-hc-spin"></i>
              </a>

   

            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
