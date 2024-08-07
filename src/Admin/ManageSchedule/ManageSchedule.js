import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DOCTOR_API, SCHEDULE_API } from "../../apiEndpoint";
import { useAuth } from "../../Components/Login/Authen";
import TopHeader from "../../Components/Sidebar/TopHeader";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { fetchWithAuth } from "../../utils/apiUtils";

const ITEMS_PER_PAGE = 10;

export default function ManageSchedule() {
  const { user, logout } = useAuth();
  const [schedules, setSchedules] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchSchedules();
    }
  }, [user, currentPage]);

  const fetchSchedules = async () => {
    try {
      const response = await fetchWithAuth(
        `${SCHEDULE_API.MASTER}?page=${currentPage}&limit=${ITEMS_PER_PAGE}`
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        // Fetch all doctor names in parallel
        const doctorPromises = data.map(async (schedule) => {
          const doctorName = await fetchDoctorName(schedule.doctorId);
          return { ...schedule, doctorName };
        });
        const schedulesWithDoctors = await Promise.all(doctorPromises);

        // Sort schedules by startTime
        schedulesWithDoctors.sort(
          (a, b) => new Date(b.startTime) - new Date(a.startTime)
        );

        setSchedules(schedulesWithDoctors);
        setTotalPages(data.totalPages);
      } else {
        console.error("Fetched data is not an array:", data);
        setSchedules([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching schedules: ", error);
      setSchedules([]);
      setTotalPages(1);
      toast.error("Error fetching schedules");
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const fetchDoctorName = async (doctorId) => {
    try {
      const response = await fetchWithAuth(`${DOCTOR_API.MASTER}/${doctorId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      return data.data.fullName;
    } catch (error) {
      console.error("Error fetching doctor name:", error);
      return null;
    }
  };

  const indexOfLastSchedule = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstSchedule = indexOfLastSchedule - ITEMS_PER_PAGE;
  const currentSchedules = schedules.slice(
    indexOfFirstSchedule,
    indexOfLastSchedule
  );

  return (
    <div className="page-wrapper doctris-theme toggled">
      <Sidebar />
      <main className="page-content bg-light">
        <TopHeader />
        <div className="container-fluid">
          <div className="layout-specing">
            <div className="row">
              <div className="col-xl-9 col-lg-6 col-md-4">
                <h5 className="mb-0">Schedule</h5>
                <nav aria-label="breadcrumb" className="d-inline-block mt-2">
                  <ul className="breadcrumb breadcrumb-muted bg-transparent rounded mb-0 p-0">
                    <li className="breadcrumb-item">
                      <a href="index.html">Doctris</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Schedule
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

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
                          Doctor
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "150px" }}
                        >
                          Room No
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "220px" }}
                        >
                          Date
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "220px" }}
                        >
                          Time
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentSchedules.map((schedule, index) => (
                        <tr key={index}>
                          <td className="p-3">
                            {indexOfFirstSchedule + index + 1}
                          </td>
                          <td className="p-3">{schedule.doctorName}</td>
                          <td className="p-3">{schedule.roomNo}</td>
                          <td className="p-3">
                            {formatDate(schedule.startTime)}
                          </td>
                          <td className="p-3">
                            {formatTime(schedule.startTime)} -{" "}
                            {formatTime(schedule.endTime)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="row text-center">
              <div className="col-12 mt-4">
                <div className="d-md-flex align-items-center text-center justify-content-between">
                  <span className="text-muted me-3">
                    Showing {indexOfFirstSchedule + 1} -{" "}
                    {Math.min(indexOfLastSchedule, schedules.length)} out of{" "}
                    {schedules.length}
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
                    {Array.from({ length: totalPages }, (_, index) => (
                      <li
                        key={index}
                        className={`page-item ${
                          currentPage === index + 1 && "active"
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                    <li
                      className={`page-item ${
                        currentPage === totalPages && "disabled"
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
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
      <ToastContainer />
    </div>
  );
}

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const formatTime = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
};
