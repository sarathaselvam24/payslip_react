import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Admin.css";

const Admin = () => {
  const logout = () => {
    window.location.href = "/logout";
  };

  return (
    <div className="container">
      <h1>Employee Management System</h1>
      <div className="button-container">
        <Link className="button create" to="/createEmployeeForm">
          Create Employee
        </Link>
        <Link className="button view" to="/viewEmployees">
          View Employees
        </Link>
        <Link className="button edit" to="/editSalaryDetails">
          Edit Salary Details
        </Link>
        <Link className="button edit" to="/paySlip">
          Generate PaySlip
        </Link>
        <Link className="button create" to="/overtime">
          OverTime Entry
        </Link>
        <Link className="button view" to="/AdminLoanRequest">
          Loan
        </Link>
      </div>
      <div>
        <button onClick={logout}>
          <span id="logoutButtonText">Logout</span>{" "}
          <i className="fas fa-user"></i>
        </button>
      </div>
    </div>
  );
};

export default Admin;
