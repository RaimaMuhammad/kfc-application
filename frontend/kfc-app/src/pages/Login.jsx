import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function loginUser(event) {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Please check your email or password");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      alert("Login successful");
      navigate("/");
    } catch (error) {
      console.error("Login request failed:", error);
      alert("Could not connect. Make sure the backend is running.");
    }
  }

  return (
    <section className="loginSection">
      <div id="loginSvgdiv">
        <div className="loginSvgdiv2">
          <svg
            id="loginsvgStrip"
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

      <div className="loginmainbox">
        <h1 id="loginTitle">LOG IN TO KFC</h1>

        <div className="loginFormdiv">
          <form onSubmit={loginUser} id="loginForm">
            <div className="input-data">
              <input
                type="email"
                name="email"
                id="login-email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <label htmlFor="login-email">Email</label>
            </div>

            <div className="input-data">
              <input
                type="password"
                name="password"
                id="login-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <label htmlFor="login-password">Password</label>
            </div>

            <div className="loginterms">
              <p className="logintermtext">
                By logging into the application or proceeding as a guest, you
                agree to our{" "}
                <span className="logintermlink">Privacy Policy</span> and{" "}
                <span className="logintermlink">Terms of Use</span>.
              </p>
            </div>

            <div className="loginBtndiv">
              <input type="submit" value="Log In" />
            </div>

            <div className="redirecttosignup">
              <p className="redirectsignuptext">
                Don&apos;t have an account?{" "}
                <Link to="/signup">
                  <span className="redirectsignuplink">Join Now</span>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
