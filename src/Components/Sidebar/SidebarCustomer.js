import React from "react";
import { Link } from "react-router-dom";

export default function SidebarCustomer() {
  return (
    <div>
      {/* Sidebar */}
      <nav id="sidebar" className="sidebar-wrapper">
        <div
          className="sidebar-content"
          data-simplebar
          style={{ height: "calc(100% - 60px)" }}
        >
          <div className="sidebar-brand">
            <Link to="/">
              <img
                src="../assets/images/logo-dark.png"
                height="22"
                className="logo-light-mode"
                alt=""
              />
              <img
                src="../assets/images/logo-light.png"
                height="22"
                className="logo-dark-mode"
                alt=""
              />
              <span className="sidebar-colored">
                <img src="../assets/images/logo-light.png" height="22" alt="" />
              </span>
            </Link>
          </div>
          <ul className="sidebar-menu">
            <li>
              <Link to="/customer-appointment">
                <i className="uil uil-stethoscope me-2 d-inline-block"></i>{" "}
                Manage Bookings
              </Link>
            </li>
            <li>
              <Link to="/customer-pet">
                <i className="uil uil-user me-2 d-inline-block"></i>Manage Pets
              </Link>
            </li>
            {/* <li><Link to="/manage-pet"><i className="uil uil-wheelchair me-2 d-inline-block"></i>Manage Pet</Link></li>
                    <li><a href="manage-booking.html"><i className="uil uil-apps me-2 d-inline-block"></i>Manage Booking</a></li> */}
          </ul>
        </div>
        <ul className="sidebar-footer list-unstyled mb-0">
          <li className="list-inline-item mb-0 ms-1">
            <a href="#" className="btn btn-icon btn-pills btn-soft-primary">
              <i className="uil uil-comment"></i>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
