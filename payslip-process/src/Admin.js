import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./Admin.css";

const Admin = () => {
  const location = useLocation();
  const userData = location.state.userData;
  const navigate = useNavigate();
  const logout = () => {
    window.location.href = "/logout";
  };

  const handleLoanClick = async () => {
    navigate(`/AdminLoanRequest`, { state: { userData } });
  };
  const handlePayslipClick = async () => {
    navigate(`/admin/payslip`, { state: { userData } });
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
        <Link className="button edit" to="/admin/payslip">
          Generate PaySlip
        </Link>

        <button onClick={handlePayslipClick}>Generate PaySlip</button>

        <Link className="button create" to="/overtime">
          OverTime Entry
        </Link>

        <button onClick={handleLoanClick}>Loan</button>
        {userData.emailid}
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
