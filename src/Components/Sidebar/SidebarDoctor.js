import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Login/Authen";
import { useNavigate } from "react-router-dom";

export default function SidebarDoctor() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin"); // Redirect to sign-in page
  };

  console.log("userdoctor", user);
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
            <Link to="/doctor-schedule">
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
            {" "}
            <li>
              <Link to="/doctor-schedule">
                <i className="uil uil-stethoscope me-2 d-inline-block"></i>{" "}
                Manage Schedules
              </Link>
            </li>
            <li>
              <Link to="/doctor-service">
                <i className="uil uil-pathfinder me-2 d-inline-block"></i>{" "}
                Manage Services
              </Link>
            </li>
            <li>
              <Link to="/doctor-pet-medical">
                <i className="uil uil-clipboard me-2 d-inline-block"></i> Manage
                Medical Record
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
