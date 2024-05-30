import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const Employee = () => {
  // const { id } = useParams();
  const location = useLocation();
  const userData = location.state.userData;
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(`/employee/profile`, { state: { userData } });
  };

  const handleAccountClick = () => {
    navigate(`/employee/account`, { state: { userData } });
  };

  const handlePayslipClick = () => {
    navigate(`/employee/payslip`, { state: { userData } });
  };

  const handleLoanClick = () => {
    navigate(`/employee/loan`, { state: { userData } });
  };

  return (
    <div>
      <h1>Employee Page</h1>
      {/* <p>Employee ID: {id}</p> */}
      <p>Name: {userData.empid}</p>
      <p>Role: {userData.role}</p>
      <p>Email: {userData.emailid}</p>
      <p>Password: {userData.password}</p>
      <div>
        <button onClick={handleProfileClick}>Profile</button>
        <button onClick={handleAccountClick}>Account</button>
        <button onClick={handlePayslipClick}>Payslip</button>
        <button onClick={handleLoanClick}>Loan</button>
      </div>
    </div>
  );
};

export default Employee;
