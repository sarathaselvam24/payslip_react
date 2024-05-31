import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./CreateEmployeeForm.css";
import axios from "axios";
import Notification from "./Notification"; // Import the Notification component

const CreateEmployeeForm = () => {
  const [formData, setFormData] = useState({
    empid: "",
    name: "",
    email: "",
    phonenumber: "",
    address: "",
    joiningdate: "",
    designation: "",
    location: "",
    companyname: "",
    dateofbirth: "",
    accountnumber: "",
    ifsccode: "",
    bankname: "",
    pannumber: "",
    uannumber: "",
    ctc: "",
    shift: "general",
  });

  const [notification, setNotification] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/createEmployee",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        setFormData({
          empid: "",
          name: "",
          email: "",
          phonenumber: "",
          address: "",
          joiningdate: "",
          designation: "",
          location: "",
          companyname: "",
          dateofbirth: "",
          accountnumber: "",
          ifsccode: "",
          bankname: "",
          pannumber: "",
          uannumber: "",
          ctc: "",
          shift: "general",
        });
        showNotification("Employee created successfully", "success");
      } else if (response.status === 200) {
        showNotification(
          "Failed to create employee! Employee already exists",
          "error"
        );
      }
    } catch (error) {
      showNotification(
        "An error occurred while creating the employee",
        "error"
      );
      console.error("Error:", error.message);
    }
  };

  const handleLogout = () => {
    window.location.href = "/logout";
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
      <form onSubmit={handleSubmit}>
        <h2>Basic Employee Details</h2>
        <div className="row">
          <div className="form-group col-md-4">
            <label htmlFor="empid">Employee ID :</label>
            <input
              type="text"
              id="empid"
              name="empid"
              className="form-control"
              value={formData.empid}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="name">Name :</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="phonenumber">Phone Number :</label>
            <input
              type="tel"
              id="phonenumber"
              name="phonenumber"
              className="form-control"
              value={formData.phonenumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="address">Address :</label>
            <textarea
              id="address"
              name="address"
              className="form-control"
              value={formData.address}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="joiningdate">Joining Date :</label>
            <input
              type="date"
              id="joiningdate"
              name="joiningdate"
              className="form-control"
              value={formData.joiningdate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="designation">Designation :</label>
            <input
              type="text"
              id="designation"
              name="designation"
              className="form-control"
              value={formData.designation}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="location">Location :</label>
            <input
              type="text"
              id="location"
              name="location"
              className="form-control"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="companyname">Company Name :</label>
            <input
              type="text"
              id="companyname"
              name="companyname"
              className="form-control"
              value={formData.companyname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="dateofbirth">Date of Birth :</label>
            <input
              type="date"
              id="dateofbirth"
              name="dateofbirth"
              className="form-control"
              value={formData.dateofbirth}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <h2>Employee Account Details</h2>
        <div className="row">
          <div className="form-group col-md-6">
            <label htmlFor="accountnumber">Bank Account Number :</label>
            <input
              type="text"
              id="accountnumber"
              name="accountnumber"
              className="form-control"
              value={formData.accountnumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="ifsccode">IFSC Code :</label>
            <input
              type="text"
              id="ifsccode"
              name="ifsccode"
              className="form-control"
              value={formData.ifsccode}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="bankname">Bank Name :</label>
            <input
              type="text"
              id="bankname"
              name="bankname"
              className="form-control"
              value={formData.bankname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="pannumber">PAN Number :</label>
            <input
              type="text"
              id="pannumber"
              name="pannumber"
              className="form-control"
              value={formData.pannumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="uannumber">UAN Number :</label>
            <input
              type="text"
              id="uannumber"
              name="uannumber"
              className="form-control"
              value={formData.uannumber}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <h2>Employee Salary Details</h2>
        <div className="row">
          <div className="form-group col-md-6">
            <label htmlFor="ctc">CTC (Cost To Company):</label>
            <input
              type="number"
              id="ctc"
              name="ctc"
              className="form-control"
              value={formData.ctc}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="shift">Select Shift:</label>
            <select
              id="shift"
              name="shift"
              className="form-control"
              value={formData.shift}
              onChange={handleChange}
            >
              <option value="general">General</option>
              <option value="night">Night</option>
            </select>
          </div>
        </div>

        <input type="submit" value="Submit" className="btn btn-success mt-4" />
      </form>

      <div className="text-center">
        <button onClick={handleLogout} className="btn btn-danger mt-4">
          <span id="logoutButtonText">Logout</span>{" "}
          <i className="fas fa-user"></i>
        </button>
      </div>
    </div>
  );
};

export default CreateEmployeeForm;
