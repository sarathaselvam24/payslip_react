import React, { useState } from "react";
import axios from "axios";
import Notification from "./Notification";
const GeneratePayslipForm = () => {
  const [year, setYear] = useState("");
  const [payableDays, setPayableDays] = useState("");
  const [month, setMonth] = useState("");
  const [paiddays, setPaiddays] = useState("");
  const [notification, setNotification] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/generatePayslip",
        {
          year: year,
          payabledays: payableDays,
          month: month,
          paiddays: paiddays,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setYear("");
        setPayableDays("");
        setMonth("");
        setPaiddays("");
        showNotification("Payslip Generated successfully", "success");
      }
      if (response.status === 200) {
        showNotification("No Payslip Generated!", "error");
      }
      console.log("Generate PAyslip " + response.data);
    } catch (error) {
      showNotification(
        "An error occurred while creating the employee",
        "error"
      );
      console.error("Error:", error.message);
    }
  };
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="container">
      <Notification message={notification?.message} type={notification?.type} />
      <h1>Generate Payslip</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="year">Year:</label>
          <select
            id="year"
            name="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          >
            <option value="">Select Year</option>
            {Array.from({ length: 11 }, (_, i) => 2020 + i).map(
              (yearOption) => (
                <option key={yearOption} value={yearOption}>
                  {yearOption}
                </option>
              )
            )}
          </select>
        </div>

        <div>
          <label htmlFor="month"> Month:</label>
          <select
            id="month"
            name="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            required
          >
            <option value="">Select Month</option>
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
        <div>
          <label htmlFor="payabledays">Payable Days:</label>
          <input
            type="text"
            id="payabledays"
            name="payabledays"
            value={payableDays}
            onChange={(e) => setPayableDays(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="paiddays">Paid Days:</label>
          <input
            type="text"
            id="paiddays"
            name="paiddays"
            value={paiddays}
            onChange={(e) => setPaiddays(e.target.value)}
            required
          />
        </div>
        <button type="submit">Generate Payslip</button>
      </form>
      <div className="logout-btn">
        <button onClick={() => (window.location.href = "/logout")}>
          Logout <i className="fas fa-user"></i>
        </button>
      </div>
    </div>
  );
};

export default GeneratePayslipForm;
