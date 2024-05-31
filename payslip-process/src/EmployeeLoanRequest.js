import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./EmployeeLoanRequest.css";
import axios from "axios";
import Notification from "./Notification";
import "./Notification.css";
const months = [
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
];

const populateMonths = () => {
  const select = document.getElementById("expectedmonth");
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  for (let i = currentMonth; i < 12; i++) {
    const option = document.createElement("option");
    option.text = `${months[i]} ${currentYear}`;
    select.add(option);
  }
  for (let i = 0; i < 4; i++) {
    const option = document.createElement("option");
    option.text = `${months[i]} ${currentYear + 1}`;
    select.add(option);
  }
};

const EmployeeLoanRequest = () => {
  const location = useLocation();
  const userData = location.state.userData;
  const [loanAmount, setLoanAmount] = useState("");
  const [emiStartsFrom, setEmiStartsFrom] = useState("");
  const [note, setNote] = useState("");
  const [expectedMonth, setExpectedMonth] = useState("");
  const [repaymentTerms, setRepaymentTerms] = useState("");
  const [emi, setEmi] = useState("");
  const [repaymentTermsError, setRepaymentTermsError] = useState("");
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    populateMonths();
  }, []);

  useEffect(() => {
    updateEMIDropdown();
    toggleBackgroundColor();
  }, [expectedMonth]);

  const updateEMIDropdown = () => {
    const emiStartsFromSelect = document.getElementById("emistartsfrom");
    emiStartsFromSelect.innerHTML = "";
    const selectedMonth = expectedMonth.split(" ")[0];
    const selectedYear = parseInt(expectedMonth.split(" ")[1], 10);
    const placeholderOption = document.createElement("option");
    placeholderOption.text = "Select Month";
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    emiStartsFromSelect.add(placeholderOption);

    if (selectedMonth !== "" && !isNaN(selectedYear)) {
      const startIndex = months.indexOf(selectedMonth);
      for (let i = startIndex; i <= startIndex + 1; i++) {
        const index = i % 12;
        let year = selectedYear;
        if (index === 0 && i !== startIndex) {
          year++;
        }
        const option = document.createElement("option");
        option.text = `${months[index]} ${year}`;
        emiStartsFromSelect.add(option);
      }
      emiStartsFromSelect.disabled = false;
    } else {
      emiStartsFromSelect.disabled = true;
    }
  };

  const calculateEMI = () => {
    const loanAmountValue = parseFloat(loanAmount);
    const repaymentValue = parseInt(repaymentTerms, 10);

    if (
      !isNaN(loanAmountValue) &&
      !isNaN(repaymentValue) &&
      repaymentValue > 0
    ) {
      const emiValue = loanAmountValue / repaymentValue;
      setEmi(emiValue.toFixed(2));
    } else {
      setEmi("");
    }
  };

  const validateForm = () => {
    const repaymentValue = parseInt(repaymentTerms, 10);

    if (repaymentValue < 1 || repaymentValue > 6) {
      setRepaymentTermsError("Repayment terms must be between 1 and 6.");
      setRepaymentTerms("");
    } else {
      setRepaymentTermsError("");
    }
    calculateEMI();
  };

  const toggleBackgroundColor = () => {
    const emiStartsFromSelect = document.getElementById("emistartsfrom");
    if (expectedMonth === "") {
      emiStartsFromSelect.style.backgroundColor = "#f8f9fa";
    } else {
      emiStartsFromSelect.style.backgroundColor = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Gather all the form data
    const formData = {
      empid: userData.empid,
      loanAmount,
      expectedMonth,
      emiStartsFrom,
      repaymentTerms,
      emi,
      note,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/loanrequest",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 && response.data === false) {
        console.log("if " + response.data);
        showNotification("Oops! Already Pending Loan Request Exists", "error");
      }
      if (response.status === 202 && response.data === true) {
        console.log("else 202 " + response.data);
        showNotification("Loan Request submitted successfully!", "success");
      }
      if (response.status === 400 && response.data === false) {
        console.log("else " + response.data);
        showNotification("Oh No!", "error");
      }

      console.log("Success: ", formData, "User data: ", userData.empid);
    } catch (error) {
      console.error(
        "Error: ",
        error.response ? error.response.data : error.message,
        "Form data: ",
        formData,
        "User data: ",
        userData.empid
      );
      setNotification("Failed to submit loan application.");
    }

    setTimeout(() => setNotification(""), 3000);
  };
  const handleLoanHistoryClick = () => {
    navigate(`/employee/myLoanHistory`, { state: { userData } });
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="form-container">
      <h2 className="icon">
        <i className="bi bi-cash"></i> Loan Application Form
      </h2>
      <button onClick={handleLoanHistoryClick}>Loan</button>
      <Notification message={notification?.message} type={notification?.type} />
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="loanamount">Loan Amount</label>
              <input
                type="number"
                id="loanamount"
                name="loanamount"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                onBlur={calculateEMI}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="emistartsfrom">EMI Starts From</label>
              <select
                id="emistartsfrom"
                name="emistartsfrom"
                value={emiStartsFrom}
                onChange={(e) => setEmiStartsFrom(e.target.value)}
                required
                disabled
              >
                <option value="" disabled>
                  Select Month
                </option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="note">Note</label>
              <input
                type="text"
                id="note"
                name="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="expectedmonth">Expected Month</label>
              <select
                id="expectedmonth"
                name="expectedmonth"
                value={expectedMonth}
                onChange={(e) => setExpectedMonth(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select Month
                </option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="repaymentterms">Repayment Terms (1-6)</label>
              <input
                type="number"
                id="repaymentterms"
                name="repaymentterms"
                value={repaymentTerms}
                onChange={(e) => setRepaymentTerms(e.target.value)}
                onBlur={validateForm}
                min="1"
                max="6"
                required
              />
              {repaymentTermsError && (
                <div className="error-message">{repaymentTermsError}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="emi">EMI (per month)</label>
              <input type="text" id="emi" name="emi" value={emi} readOnly />
            </div>
          </div>
        </div>
        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeLoanRequest;
