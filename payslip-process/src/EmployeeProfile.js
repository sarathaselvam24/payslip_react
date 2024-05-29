import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const EmployeeProfileForm = () => {
  const location = useLocation();
  const userData = location.state.userData;
  const [employee, setEmployee] = useState({
    empid: "",
    email: "",
    name: "",
    phonenumber: "",
    address: "",
    joiningdate: "",
    designation: "",
    location: "",
    companyname: "",
    dateofbirth: "",
  });

  const [accountDetails, setAccountDetails] = useState({
    empid: "",
    empname: "",
    accountnumber: "",
    ifsccode: "",
    bankname: "",
    pannumber: "",
    uannumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleAccountDetailsChange = (e) => {
    const { name, value } = e.target;
    setAccountDetails({ ...accountDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation logic here

    // Example: Check if name is empty
    if (!employee.name.trim()) {
      alert("Name is required");
      return;
    }

    // Submit logic
    console.log("Primary Details Form submitted:", employee);
  };

  const handleAccountDetailsSubmit = (e) => {
    e.preventDefault();
    // Validation logic for account details form

    // Submit logic
    console.log("Account Details Form submitted:", accountDetails);
  };

  return (
    <div className="form-container">
      {/* Primary Details Form */}
      <form onSubmit={handleSubmit}>
        <h2 style={{ color: "#069" }}>Primary Details</h2>
        <div className="form-group">
          <label htmlFor="empid">Employee ID:</label>
          <input
            type="text"
            id="empid"
            name="empid"
            value={userData.empid}
            onChange={handleInputChange}
            className="plain-input"
            readOnly
          />
        </div>
        {/* Other input fields... */}
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.emailid}
            onChange={handleInputChange}
            className="plain-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.password}
            onChange={handleInputChange}
            className="plain-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.role}
            onChange={handleInputChange}
            className="plain-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={employee.name}
            onChange={handleInputChange}
            className="plain-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={employee.name}
            onChange={handleInputChange}
            className="plain-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={employee.name}
            onChange={handleInputChange}
            className="plain-input"
          />
        </div>
        {/* Other input fields... */}
        <button type="submit">Save</button>
      </form>

      {/* Account Details Form */}
      <form onSubmit={handleAccountDetailsSubmit}>
        <h2 style={{ color: "#069" }}>Account Details</h2>
        <div className="form-group">
          <label htmlFor="empid">Employee ID:</label>
          <input
            type="text"
            id="empid"
            name="empid"
            value={accountDetails.empid}
            onChange={handleAccountDetailsChange}
            className="plain-input"
            readOnly
          />
        </div>
        {/* Other account details input fields... */}
        <div className="form-group">
          <label htmlFor="accountnumber">Account Number:</label>
          <input
            type="text"
            id="accountnumber"
            name="accountnumber"
            value={accountDetails.accountnumber}
            onChange={handleAccountDetailsChange}
            className="plain-input"
          />
        </div>
        {/* Other account details input fields... */}
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EmployeeProfileForm;
