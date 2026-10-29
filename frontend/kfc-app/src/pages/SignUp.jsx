import React, { useState } from "react";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function registerUser(event) {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstname, lastname, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Could not create account");
        return;
      }

      alert("Account created successfully");
      navigate("/login");
    } catch (error) {
      console.error("Signup request failed:", error);
      alert("Could not connect. Make sure the backend is running.");
    }
  }

  return (
    <section className="signupsection">
      <div id="singupsvgdiv">
        <div className="signupsvgdiv2">
          <svg
            id="signupsvgStrip"
            viewBox="0 0 42 20"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path className="strip-1" d="M0 0h8v20H0z"></path>
            <path className="strip-2" d="M16 0h8v20h-8z"></path>
            <path className="strip-3" d="M32 0h8v20h-8z"></path>
          </svg>
        </div>
      </div>

      <div className="signupmainbox">
        <h1 id="signupTitle">CREATE AN ACCOUNT</h1>

        <div className="signupformdiv">
          <form onSubmit={registerUser} className="signupform">
            <div className="input-data">
              <input
                type="text"
                name="firstname"
                value={firstname}
                onChange={(event) => setFirstname(event.target.value)}
                required
              />
              <label>First Name*</label>
            </div>

            <div className="input-data">
              <input
                type="text"
                name="lastname"
                value={lastname}
                onChange={(event) => setLastname(event.target.value)}
                required
              />
              <label>Last Name*</label>
            </div>

            <div className="input-data">
              <input
                type="email"
                name="email"
                id="signup-email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <label htmlFor="signup-email">Email*</label>
            </div>

            <div className="input-data">
              <input
                type="password"
                name="password"
                id="signup-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <label htmlFor="signup-password">Password*</label>
            </div>

            <div className="checkifrequired">
              <div className="checkBoxflex">
                <div className="checkBoxDiv">
                  <input type="checkbox" name="terms" id="checkboxtick" />
                </div>
                <div className="checkBoxText">
                  <p>
                    By selecting the box, you agree to our{" "}
                    <span className="cLink">Privacy Policy</span> and{" "}
                    <span className="cLink">Terms of Use.</span>
                  </p>
                </div>
              </div>

              <div className="checkBoxflex">
                <div className="checkBoxDiv">
                  <input
                    type="checkbox"
                    name="promotions"
                    id="checkboxtick2"
                  />
                </div>
                <div className="checkBoxText">
                  <p>Sign up for Email updates and Promotions</p>
                </div>
              </div>
            </div>

            <div className="signupBtndiv">
              <input type="submit" value="Create Account" />
            </div>

            <div className="redirecttologin">
              <p className="redirectlogintext">
                Already a member?{" "}
                <Link to="/login">
                  <span className="redirectloginlink">Log In</span>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;