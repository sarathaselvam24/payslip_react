import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./EmployeeProfileForm.css";

const EmployeeProfileForm = () => {
  const location = useLocation();
  const userData = location.state?.userData || {};

  const [isPrimaryEditable, setIsPrimaryEditable] = useState(false);

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
  const empid = userData.empid;

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/employee",
          { empid },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setEmployee(response.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    if (empid) {
      fetchEmployeeData();
    }
  }, [empid]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handlePrimaryEdit = () => {
    setIsPrimaryEditable(true);
  };

  const handlePrimaryCancel = async () => {
    setIsPrimaryEditable(false);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/employee",
        { empid },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setEmployee(response.data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  const handlePrimarySubmit = async (e) => {
    e.preventDefault();
    if (!employee.name.trim()) {
      alert("Name is required");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/saveEmployee", employee, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Employee data saved:", employee);
      setIsPrimaryEditable(false);
    } catch (error) {
      console.error("Error saving employee data:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <form onSubmit={handlePrimarySubmit}>
            <h2>Employee Profile Form</h2>
            {/* <div className="form-group">
            <label htmlFor="empid">Employee ID:</label>
            <input
              type="text"
              id="empid"
              name="empid"
              value={employee.empid}
              onChange={handleInputChange}
              className="plain-input"
              readOnly
            />
          </div> */}
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                value={employee.email}
                onChange={handleInputChange}
                className="plain-input"
                readOnly={!isPrimaryEditable}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={employee.name}
                  onChange={handleInputChange}
                  className="plain-input"
                  readOnly={!isPrimaryEditable}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phonenumber">Phone Number:</label>
                <input
                  type="text"
                  id="phonenumber"
                  name="phonenumber"
                  value={employee.phonenumber}
                  onChange={handleInputChange}
                  className="plain-input"
                  readOnly={!isPrimaryEditable}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="address">Address:</label>
                <textarea
                  id="address"
                  name="address"
                  value={employee.address}
                  onChange={handleInputChange}
                  className="plain-textarea"
                  readOnly={!isPrimaryEditable}
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="joiningdate">Joining Date:</label>
                <input
                  type="text"
                  id="joiningdate"
                  name="joiningdate"
                  value={employee.joiningdate}
                  onChange={handleInputChange}
                  className="plain-input"
                  readOnly={!isPrimaryEditable}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="designation">Designation:</label>
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  value={employee.designation}
                  onChange={handleInputChange}
                  className="plain-input"
                  readOnly={!isPrimaryEditable}
                />
              </div>
              <div className="form-group">
                <label htmlFor="location">Location:</label>
                <textarea
                  id="location"
                  name="location"
                  value={employee.location}
                  onChange={handleInputChange}
                  className="plain-textarea"
                  readOnly={!isPrimaryEditable}
                ></textarea>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="companyname">Company Name:</label>
                <input
                  type="text"
                  id="companyname"
                  name="companyname"
                  value={employee.companyname}
                  onChange={handleInputChange}
                  className="plain-input"
                  readOnly={!isPrimaryEditable}
                />
              </div>
              <div className="form-group">
                <label htmlFor="dateofbirth">Date of Birth:</label>
                <input
                  type="date"
                  id="dateofbirth"
                  name="dateofbirth"
                  value={employee.dateofbirth}
                  onChange={handleInputChange}
                  className="plain-input"
                  readOnly={!isPrimaryEditable}
                />
              </div>
            </div>

            {!isPrimaryEditable ? (
              <button type="button" onClick={handlePrimaryEdit}>
                Edit
              </button>
            ) : (
              <div className="button-row">
                <button type="submit">Save</button>
                <button type="button" onClick={handlePrimaryCancel}>
                  Cancel
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfileForm;
