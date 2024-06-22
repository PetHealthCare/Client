import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CUSTOMER_API, PET_API, BOOKING_API } from "../../apiEndpoint";
import { useAuth } from "../../Components/Login/Authen";

export default function ManageAppointment() {
  const { user, logout } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [customers, setCustomers] = useState([]);
  const [pets, setPets] = useState([]);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/signin"); // Redirect to sign-in page
  };

  useEffect(() => {
    if (user) {
      fetchAppointments();
    }
  }, [user]);

  const fetchAppointments = async () => {
    try {
      const response = await fetch(BOOKING_API.MASTER);
      const data = await response.json();
      if (Array.isArray(data)) {
        const appointmentsWithData = await Promise.all(
          data.map(async (appointment) => {
            try {
              const customerResponse = await fetchCustomer(
                appointment.customerId
              );
              const petResponse = await fetchPet(appointment.petId);

              return {
                ...appointment,
                customerName: customerResponse.fullName,
                customerPhoneNumber: customerResponse.phoneNumber,
                petName: petResponse.data.name,
              };
            } catch (error) {
              console.error("Error fetching details for appointment:", error);
              return appointment; // Return original appointment object on error
            }
          })
        );
        setAppointments(appointmentsWithData);
      } else {
        console.error("Fetched data is not an array:", data);
        setAppointments([]);
      }
    } catch (error) {
      console.error("Error fetching appointments: ", error);
      setAppointments([]);
      toast.error("Error fetching appointments");
    }
  };

  const fetchPet = async (petId) => {
    try {
      const response = await fetch(PET_API.SINGLE(petId));
      if (!response.ok) {
        throw new Error(`Failed to fetch pet with ID ${petId}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching pets:", error);
      toast.error("Error fetching pets");
      throw error;
    }
  };

  const fetchCustomer = async (customerId) => {
    try {
      const response = await fetch(CUSTOMER_API.SINGLE(customerId));
      if (!response.ok) {
        throw new Error(`Failed to fetch customer with ID ${customerId}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching customers:", error);
      toast.error("Error fetching customers");
      throw error;
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastAppointment = currentPage * itemsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - itemsPerPage;
  const currentAppointments = appointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );

  const totalItems = appointments.length;

  return (
    <div className="page-wrapper doctris-theme toggled">
      {/* Sidebar */}
      <nav id="sidebar" className="sidebar-wrapper">
        <div
          className="sidebar-content"
          data-simplebar
          style={{ height: "calc(100% - 60px)" }}
        >
          <div className="sidebar-brand">
            <a href="index.html">
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
            </a>
          </div>
          <ul className="sidebar-menu">
            <li>
              <a href="index.html">
                <i className="uil uil-dashboard me-2 d-inline-block"></i>
                Dashboard
              </a>
            </li>
            <li>
              <Link to="/manage-appointment">
                <i className="uil uil-stethoscope me-2 d-inline-block"></i>
                Manage Appointment
              </Link>
            </li>
            <li>
              <Link to="/manage-doctor">
                <i className="uil uil-user me-2 d-inline-block"></i>Manage
                Doctor
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
      <main className="page-content bg-light">
        <div className="top-header">
          <div className="header-bar d-flex justify-content-between border-bottom">
            <div className="d-flex align-items-center">
              <a href="#" className="logo-icon">
                <img
                  src="../assets/images/logo-icon.png"
                  height="30"
                  className="small"
                  alt=""
                />
                <span className="big">
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
                </span>
              </a>
              <a
                id="close-sidebar"
                className="btn btn-icon btn-pills btn-soft-primary ms-2"
                href="#"
              >
                <i className="uil uil-bars"></i>
              </a>
              <div className="search-bar p-0 d-none d-lg-block ms-2">
                <div id="search" className="menu-search mb-0">
                  <form
                    role="search"
                    method="get"
                    id="searchform"
                    className="searchform"
                  >
                    <div>
                      <input
                        type="text"
                        className="form-control border rounded-pill"
                        name="s"
                        id="s"
                        placeholder="Search Keywords..."
                      />
                      <input type="submit" id="searchsubmit" value="Search" />
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <ul className="list-unstyled mb-0">
              <li className="list-inline-item mb-0 ms-1">
                <div className="dropdown dropdown-primary">
                  <button
                    type="button"
                    className="btn btn-pills btn-soft-primary dropdown-toggle p-0"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img
                      src="../assets/images/client/05.jpg"
                      className="avatar avatar-ex-small rounded-circle"
                      alt=""
                    />
                  </button>
                  <div
                    className="dropdown-menu dd-menu dropdown-menu-end shadow border-0 mt-3 py-3"
                    style={{ minWidth: "200px" }}
                  >
                    <a
                      className="dropdown-item text-dark"
                      href="dr-profile.html"
                    >
                      <span className="mb-0 d-inline-block me-1">
                        <i className="uil uil-setting align-middle h6"></i>
                      </span>{" "}
                      Profile Settings
                    </a>
                    <div className="dropdown-divider border-top"></div>
                    <button
                      className="dropdown-item text-dark"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="container-fluid">
          <div className="layout-specing">
            <div className="row">
              <div className="col-xl-9 col-lg-6 col-md-4">
                <h5 className="mb-0">Appointment</h5>
                <nav aria-label="breadcrumb" className="d-inline-block mt-2">
                  <ul className="breadcrumb breadcrumb-muted bg-transparent rounded mb-0 p-0">
                    <li className="breadcrumb-item">
                      <a href="index.html">Doctris</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Appointment
                    </li>
                  </ul>
                </nav>
              </div>
              {/* <!--end col--> */}

              <div className="col-xl-3 col-lg-6 col-md-8 mt-4 mt-md-0">
                <div className="justify-content-md-end">
                  <form>
                    <div className="row justify-content-between align-items-center">
                      <div className="col-sm-12 col-md-5">
                        <div className="mb-0 position-relative"></div>
                      </div>
                      {/* <!--end col--> */}
                      <div className="col-sm-12 col-md-7 mt-4 mt-sm-0">
                        <div className="d-grid">
                          <a
                            href="#"
                            className="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#appointmentform"
                          >
                            Appointment
                          </a>
                        </div>
                      </div>
                      {/* <!--end col--> */}
                    </div>
                    {/* <!--end row--> */}
                  </form>
                  {/* <!--end form--> */}
                </div>
              </div>
              {/* <!--end col--> */}
            </div>
            {/* <!--end row--> */}

            <div className="row">
              <div className="col-12 mt-4">
                <div className="table-responsive bg-white shadow rounded">
                  <table className="table mb-0 table-center">
                    <thead>
                      <tr>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "50px" }}
                        >
                          #
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "180px" }}
                        >
                          Customer
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "150px" }}
                        >
                          Phone
                        </th>
                        <th className="border-bottom p-3">PetName</th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "150px" }}
                        >
                          Date
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "220px" }}
                        >
                          Note
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "150px" }}
                        ></th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentAppointments.map((appointment, index) => (
                        <tr key={index}>
                          <td className="p-3">
                            {indexOfFirstAppointment + index + 1}
                          </td>
                          <td className="p-3">{appointment.customerName}</td>
                          <td className="p-3">
                            {appointment.customerPhoneNumber}
                          </td>
                          <td className="p-3">{appointment.petName}</td>
                          <td className="p-3">{appointment.bookingDate}</td>
                          <td className="p-3">{appointment.note}</td>
                          <td className="text-end p-3">
                            <a
                              href="#"
                              className="btn btn-icon btn-pills btn-soft-success"
                              data-bs-toggle="modal"
                              data-bs-target="#acceptappointment"
                            >
                              <i className="uil uil-check-circle"></i>
                            </a>
                            <a
                              href="#"
                              className="btn btn-icon btn-pills btn-soft-danger"
                              data-bs-toggle="modal"
                              data-bs-target="#cancelappointment"
                            >
                              <i className="uil uil-times-circle"></i>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* <!--end row--> */}

            <div className="row text-center">
              {/* <!-- PAGINATION START --> */}
              <div className="col-12 mt-4">
                <div className="d-md-flex align-items-center text-center justify-content-between">
                  <span className="text-muted me-3">
                    Showing {indexOfFirstAppointment + 1} -{" "}
                    {Math.min(indexOfLastAppointment, totalItems)} out of{" "}
                    {totalItems}
                  </span>
                  <ul className="pagination justify-content-center mb-0 mt-3 mt-sm-0">
                    <li
                      className={`page-item ${currentPage === 1 && "disabled"}`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Prev
                      </button>
                    </li>
                    {[
                      ...Array(Math.ceil(totalItems / itemsPerPage)).keys(),
                    ].map((page) => (
                      <li
                        className={`page-item ${
                          currentPage === page + 1 ? "active" : ""
                        }`}
                        key={page}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(page + 1)}
                        >
                          {page + 1}
                        </button>
                      </li>
                    ))}
                    <li
                      className={`page-item ${
                        currentPage === Math.ceil(totalItems / itemsPerPage) &&
                        "disabled"
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={
                          currentPage === Math.ceil(totalItems / itemsPerPage)
                        }
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              {/* <!--end col--> */}
              {/* <!-- PAGINATION END --> */}
            </div>
            {/* <!--end row--> */}
          </div>
        </div>
        {/* <!--end container--> */}
      </main>
      {/* <!--End page-content" --> */}
      {/* Footer Start */}
      <footer className="bg-footer-color shadow py-3">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col">
              <div className="text-sm-start text-center">
                <p className="mb-0 text-muted">
                  {new Date().getFullYear()} © Doctris.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* Footer End */}
      <ToastContainer />
    </div>
  );
}
