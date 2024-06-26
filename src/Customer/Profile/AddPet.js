import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../Components/Login/Authen";
import "react-toastify/dist/ReactToastify.css";
import { DOCTOR_API, PET_API } from "../../apiEndpoint";
import SidebarCustomer from "../../Components/Sidebar/SidebarCustomer";

export default function AddPet() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [generic, setGeneric] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    // Fetch species options if needed
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!name || !species || !age || !gender || !generic || !description) {
      toast.error("Please fill out all fields");
      return;
    }

    try {
      const petData = {
        name: name,
        species: species,
        status: true, // Assuming status is always true for new registrations
        customerId: user.customerId,
        age: parseInt(age),
        gender: gender === "true", // Convert gender to boolean
        generic: generic,
        description: description,
      };

      const response = await fetch(PET_API.MASTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(petData),
      });

      if (response.ok) {
        toast.success("Pet registered successfully!");
        setTimeout(() => navigate("/customer-pet"), 1000);
      } else {
        const errorText = await response.text();
        console.error("Error registering pet:", response.status, errorText);
        toast.error("Error registering pet: " + errorText); // Display error message from backend
      }
    } catch (error) {
      console.error("Error registering pet:", error);
      toast.error("Error registering pet: " + error.message); // Display error message
    }
  };

  return (
    <div className="page-wrapper doctris-theme toggled">
      {/* Sidebar */}
      <SidebarCustomer />

      {/* Main Content */}
      <div className="page-content bg-light" style={{ marginTop: "10px" }}>
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

            <ul className="dropdowns list-inline mb-0">
              {user ? (
                <li className="list-inline-item mb-0 ms-1">
                  <div className="dropdown dropdown-primary">
                    <a
                      type="text"
                      className=""
                      href=""
                      style={{ color: "black" }}
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Welcome, {user.fullName}
                    </a>
                    <div className="dropdown-menu dd-menu dropdown-menu-end shadow border-0 mt-3 py-3">
                      <Link
                        className="dropdown-item text-dark"
                        to="/profile-customer"
                      >
                        Profile Settings
                      </Link>
                      <div className="dropdown-divider border-top"></div>
                      <Link className="dropdown-item text-dark" to="/signin">
                        Logout
                      </Link>
                    </div>
                  </div>
                </li>
              ) : (
                <Link to="/signin" className="btn btn-primary">
                  Login
                </Link>
              )}
            </ul>
          </div>
        </div>
        <div className="layout-specing">
          <div className="row">
            <div className="col-xl-9">
              <h2>Add New Pet</h2>
              <div className="rounded shadow mt-4">
                <div className="p-4">
                  <form onSubmit={handleFormSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Pet Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Species</label>
                        <select
                          className="form-select"
                          value={species}
                          onChange={(e) => setSpecies(e.target.value)}
                        >
                          <option value="">Select Species</option>
                          <option value="dog">Dog</option>
                          <option value="cat">Cat</option>
                          <option value="bird">Bird</option>
                          <option value="parrot">Parrot</option>
                          <option value="rabbit">Rabbit</option>
                          <option value="hamster">Hamster</option>
                          <option value="another">Another</option>
                        </select>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Age</label>
                        <input
                          type="number"
                          className="form-control"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Gender</label>
                        <select
                          className="form-select"
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                        >
                          <option value="">Select Gender</option>
                          <option value="true">Male</option>
                          <option value="false">Female</option>
                        </select>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Generic</label>
                        <input
                          type="text"
                          className="form-control"
                          value={generic}
                          onChange={(e) => setGeneric(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                          className="form-control"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Add New Pet
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
    </div>
  );
}
