import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Authen";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  AUTH_API,
  CUSTOMER_API,
  DOCTOR_API,
  STAFF_API,
} from "../../apiEndpoint";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch(AUTH_API.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, remember }),
      });
      console.log("Response status:", response.status);

      const responseData = await response.text();
      console.log("Response data:", responseData);

      if (response.ok) {
        const token = responseData;
        localStorage.setItem("authToken", token);

        const decodedToken = jwtDecode(token);
        console.log("Decoded Token:", decodedToken);
        setUser(decodedToken);

        let userDetails;

        if (decodedToken.Role === "Staff") {
          userDetails = await fetch(STAFF_API.GET_DETAILS(decodedToken.UserId),
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ).then((res) => {
            if (!res.ok) throw new Error("Failed to fetch staff details");
            return res.json();
          });
        } else if (decodedToken.Role === "Customer") {
          userDetails = await fetch(CUSTOMER_API.GET_DETAILS(decodedToken.UserId),
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ).then((res) => res.json());
        } else {
          userDetails = await fetch(DOCTOR_API.GET_DETAILS(decodedToken.UserId),
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ).then((res) => res.json());
        }

        console.log("User details:", userDetails);
        setUser(userDetails);

        console.log("Role", decodedToken.Role === "Staff");
        if (decodedToken.Role === "Staff") {
          navigate("/manage-appointment");
        } else {
          navigate("/");
        }
      } else if (response.status === 401) {
        setError("Invalid email or password");
      } else {
        setError(responseData || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="back-to-home rounded d-none d-sm-block">
        <Link to="/" className="btn btn-icon btn-primary">
          <i data-feather="home" className="icons"></i>
        </Link>
      </div>

      <section
        className="bg-home d-flex bg-light align-items-center"
        style={{
          background: "url('../assets/images/bg/bg-lines-one.png') center",
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-8">
              <img
                src="../assets/images/logo-dark.png"
                height="22"
                className="mx-auto d-block"
                alt=""
              />
              <div className="card login-page shadow mt-4 rounded border-0">
                <div className="card-body">
                  <h4 className="text-center">Sign In</h4>
                  <form onSubmit={handleSubmit} className="login-form mt-4">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="mb-3">
                          <label
                            className="form-label"
                            style={{ textAlign: "start", display: "block" }}
                          >
                            Your Email <span className="text-danger">*</span>
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="mb-3">
                          <label
                            className="form-label"
                            style={{ textAlign: "start", display: "block" }}
                          >
                            Password <span className="text-danger">*</span>
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="d-flex justify-content-between">
                          <div className="mb-3">
                            <div className="form-check">
                              <input
                                className="form-check-input align-middle"
                                type="checkbox"
                                value={remember}
                                id="remember-check"
                                onChange={(e) => setRemember(e.target.checked)}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="remember-check"
                              >
                                Remember me
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      {error && (
                        <div className="col-lg-12">
                          <div className="alert alert-danger" role="alert">
                            {error}
                          </div>
                        </div>
                      )}

                      <div className="col-lg-12 mb-0">
                        <div className="d-grid">
                          <button
                            className="btn btn-primary"
                            type="submit"
                            disabled={loading}
                          >
                            {loading ? "Signing in..." : "Sign in"}
                          </button>
                        </div>
                      </div>

                      <div className="col-12 text-center">
                        <p className="mb-0 mt-3">
                          <small className="text-dark me-2">
                            Don't have an account ?
                          </small>
                          <Link to="/signup" className="text-dark fw-bold">
                            Sign Up
                          </Link>
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
