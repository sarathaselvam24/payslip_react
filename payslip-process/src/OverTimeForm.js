import React, { useState } from "react";
import "./OverTimeForm.css";
import axios from "axios";
import Notification from "./Notification";

const OverTimeForm = () => {
  const [empId, setEmpId] = useState("");
  const [month, setMonth] = useState("January");
  const [year, setYear] = useState("2024");
  const [overtime, setOvertime] = useState("");
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { empId, month, year, overtime };
    console.log(formData);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/createEmployeeOvertime",
        { empId: empId, month: month, year: year, overtime: overtime }
      );
      console.log("Overtime created " + response.data);
      if (response.status === 201) {
        setEmpId("");
        setMonth("");
        setYear("");
        setOvertime("");
        showNotification("Overtime Successfully", "success");
      }
      if (response.status === 200) {
        setEmpId("");
        setMonth("");
        setYear("");
        setOvertime("");
        showNotification("Updated Overtime Added Successfully", "success");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
    }
  };
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };
  const logout = () => {
    window.location.href = "/logout";
  };

  return (
    <div className="form-container">
      <div className="form-content">
        <Notification
          message={notification?.message}
          type={notification?.type}
        />
        <h1>Over Time Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="empid">Employee ID</label>
            <input
              type="text"
              id="empid"
              name="empid"
              value={empId}
              onChange={(e) => setEmpId(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="month">Month</label>
            <select
              id="month"
              name="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              required
            >
              {[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ].map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="year">Year</label>
            <select
              id="year"
              name="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            >
              {Array.from({ length: 11 }, (_, i) => 2020 + i).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="overtime">OverTime In Hours</label>
            <input
              type="text"
              id="overtime"
              name="overtime"
              value={overtime}
              onChange={(e) => setOvertime(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
        <div className="logout-btn">
          <button onClick={logout} className="logout-button">
            <span>Logout</span> <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverTimeForm;
