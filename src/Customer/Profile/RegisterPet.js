import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../Components/Login/Authen";
import Footer from "../../Components/Footer/Footer";
import { PET_API } from "../../apiEndpoint";
import { fetchWithAuth } from "../../utils/apiUtils";
// import { PET_API } from "../../apiEndpoint";

export default function RegisterPet() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [speciesOptions, setSpeciesOptions] = useState([]);
  const [dob, setDOB] = useState("");
  const [gender, setGender] = useState("");
  const [generic, setGeneric] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/signin"); // Redirect to login if user is not authenticated
    } else {
      fetchSpeciesOptions();
    }
  }, [user, navigate]);

  const fetchSpeciesOptions = async () => {
    // Replace this with your API call if species options are fetched from an API
    const options = [
      { value: "dog", label: "Dog" },
      { value: "cat", label: "Cat" },
      { value: "bird", label: "Bird" },
      { value: "parrot", label: "Parrot" },
      { value: "rabbit", label: "Rabbit" },
      { value: "hamster", label: "Hamster" },
      { value: "another", label: "Another" },
      // Add more species options as needed
    ];
    setSpeciesOptions(options);
  };

  const handlePetRegistration = async (e) => {
    console.log("Form submitted");
    e.preventDefault();

    if (!name || !species || !dob || !gender || !generic || !description) {
      toast.error("Please fill out all fields");
      return;
    }

    try {
      const petData = {
        name: name,
        species: species,
        customerId: user.customerId,
        dob: new Date(dob).toISOString(), // Convert date to string
        gender: gender === "true", // Convert gender to boolean
        generic: generic,
        description: description,
      };
      console.log("Pet data", petData);

      const response = await fetchWithAuth(PET_API.MASTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(petData),
      });

      if (response.ok) {
        toast.success("Pet registered successfully!");
        setTimeout(() => navigate("/booking"), 1000);
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
    <div>
      <ToastContainer />
      <header id="topnav" className="defaultscroll sticky">
        <div className="container">
          <div>
            <Link className="logo" to="/" style={{ marginRight: "130px" }}>
              <img
                src="../assets/images/logo-light.png"
                className="l-dark"
                height="22"
                alt=""
              />
              <img
                src="../assets/images/logo-dark.png"
                className="l-light"
                height="22"
                alt=""
              />
            </Link>
          </div>
          <ul className="dropdowns list-inline mb-0">
            {user ? (
              <li className="list-inline-item mb-0 ms-1">
                <div className="dropdown dropdown-primary">
                  <button
                    type="button"
                    className="btn"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Welcome, {user.fullName}
                  </button>
                  <div className="dropdown-menu dd-menu dropdown-menu-end shadow border-0 mt-3 py-3">
                    <Link className="dropdown-item text-dark" to="/dashboard">
                      Dashboard
                    </Link>
                    <Link
                      className="dropdown-item text-dark"
                      to="/profile-settings"
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
          <div id="navigation">
            <ul className="navigation-menu nav-left nav-black">
              <li className="has-submenu parent-parent-menu-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/service">Services</Link>
              </li>
              <li className="has-submenu parent-parent-menu-item">
                <Link to="/booking">Book Appointment</Link>
              </li>
              <li className="has-submenu parent-parent-menu-item">
                <Link to="/blog">Blog</Link>
              </li>
              <li className="has-submenu parent-parent-menu-item">
                <Link to="/about">About</Link>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <section className="bg-half-170 d-table w-100 bg-light">
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-12">
              <div className="section-title text-center">
                <h3 className="sub-title mb-4">Register a Pet</h3>
                <p className="para-desc mx-auto text-muted">
                  Register your pet to access our services.
                </p>
                <nav aria-label="breadcrumb" className="d-inline-block mt-3">
                  <ul className="breadcrumb bg-transparent mb-0 py-1">
                    <li className="breadcrumb-item">
                      <Link to="/">PetHealthCare</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Register Pet
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="position-relative">
        <div className="shape overflow-hidden text-color-white">
          <svg
            viewBox="0 0 2880 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card border-0 shadow rounded overflow-hidden">
                <div className="tab-content p-4" id="pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="pills-clinic"
                    role="tabpanel"
                    aria-labelledby="clinic-booking"
                  >
                    <form onSubmit={handlePetRegistration}>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="pet-name">
                              Pet Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="pet-name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="pet-age">
                              Year of birth
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              id="pet-age"
                              value={dob}
                              onChange={(e) => setDOB(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="pet-species">
                              Species
                            </label>
                            <select
                              className="form-select form-control"
                              id="pet-species"
                              value={species}
                              onChange={(e) => setSpecies(e.target.value)}
                              required
                            >
                              <option value="" disabled>
                                Select Species
                              </option>
                              {speciesOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="pet-gender">
                              Gender
                            </label>
                            <select
                              className="form-select"
                              id="pet-gender"
                              value={gender}
                              onChange={(e) => setGender(e.target.value)}
                              required
                            >
                              <option value="">Select Gender</option>
                              <option value="false">Male</option>
                              <option value="true">Female</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="pet-generic">
                              Generic
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="pet-generic"
                              value={generic}
                              onChange={(e) => setGeneric(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label
                              className="form-label"
                              htmlFor="pet-description"
                            >
                              Description
                            </label>
                            <textarea
                              className="form-control"
                              id="pet-description"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              rows="3"
                              required
                            ></textarea>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div
                            className="d-grid"
                            style={{ justifyContent: "end" }}
                          >
                            <button type="submit" className="btn btn-primary">
                              Register Pet
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
