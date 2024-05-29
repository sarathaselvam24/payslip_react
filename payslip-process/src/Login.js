import React, { useState, useEffect } from "react";
import "./Login.css";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import backgroundImage from "./images/file.png";
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("User info state:", userInfo);
  }, [userInfo]);

  const handleGoogleSuccess = (response) => {
    console.log("Google login successful:", response);
    const decoded = jwtDecode(response.credential);
    console.log("Decoded user info:", decoded);
    console.log("Decoded email user info:", decoded.email);
    setUserInfo(decoded);

    const fetchUserData = async (email) => {
      try {
        const response = await axios.post(
          "http://localhost:8080/getEmployeeRoll",
          { email }
        );
        if (response.status === 200) {
          return response.data;
        } else {
          console.error("Request failed:", response.statusText);
          return null;
        }
      } catch (error) {
        console.error("Error:", error.message);
        return null;
      }
    };

    fetchUserData(decoded.email).then((userData) => {
      if (userData) {
        console.log("User data:", userData);
        if (userData.role === "admin") {
          console.log("Email:", userData.role);
          console.log("Picture:", userData.emailid);
          console.log("empid :", userData.empid);
          navigate(`/admin`, { state: { userData } });
        }
        if (userData.role === "employee") {
          console.log("Email:", userData.role);
          console.log("Picture:", userData.emailid);
          // navigate(`/employee/${userData.empid}`, { state: { userData } });
          navigate(`/employeeProfile`, { state: { userData } });
        }
      } else {
        console.log("User not found or request failed.");
      }
    });
  };

  const handleGoogleFailure = (response) => {
    console.log("Google login failed:", response);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("Form login with:", { email, password });
  };

  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleFormSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <div className="or-divider">
          <h3>Or</h3>
        </div>
        <GoogleLogin
          clientId="543359936724-efq9l8q8r6409hs41vkh0jjncfq2k7jg.apps.googleusercontent.com"
          onSuccess={handleGoogleSuccess}
          onFailure={handleGoogleFailure}
          cookiePolicy={"single_host_origin"}
          scope="profile email"
          className="google-login-button"
        />
        {userInfo && (
          <div className="user-info">
            <h3>User Info</h3>
            <p>Name: {userInfo.name}</p>
            <p>Email: {userInfo.email}</p>
            {userInfo.picture && (
              <div>
                <img
                  src={userInfo.picture}
                  alt="Profile"
                  className="profile-pic"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
