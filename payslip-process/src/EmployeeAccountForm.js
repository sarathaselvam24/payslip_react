import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./EmployeeAccountForm.css";

const EmployeeAccountForm = () => {
  const location = useLocation();
  const userData = location.state.userData;

  const [isAccountEditable, setIsAccountEditable] = useState(false);

  const [accountDetails, setAccountDetails] = useState({
    empid: "",
    empname: "",
    accountnumber: "",
    ifsccode: "",
    bankname: "",
    pannumber: "",
    uannumber: "",
  });

  const empid = userData.empid;

  useEffect(() => {
    const fetchEmployeeAccountData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/employeeAccountDetails",
          { empid },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setAccountDetails(response.data);
      } catch (error) {
        console.error("Error fetching employee account data:", error);
      }
    };

    fetchEmployeeAccountData();
  }, [empid]);

  const handleAccountDetailsChange = (e) => {
    const { name, value } = e.target;
    setAccountDetails({ ...accountDetails, [name]: value });
  };

  const handleAccountEdit = () => {
    setIsAccountEditable(true);
  };

  const handleAccountCancel = async () => {
    setIsAccountEditable(false);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/employeeAccountDetails",
        { empid },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setAccountDetails(response.data);
    } catch (error) {
      console.error("Error fetching employee account data:", error);
    }
  };

  const handleAccountDetailsSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:8080/api/saveEmployeeAccountDetails",
        accountDetails,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Account details saved:", accountDetails);
      setIsAccountEditable(false);
    } catch (error) {
      console.error("Error saving account details:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="form-wrapper">
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
              <div className="form-group">
                <label htmlFor="accountnumber">Account Number:</label>
                <input
                  type="text"
                  id="accountnumber"
                  name="accountnumber"
                  value={accountDetails.accountnumber}
                  onChange={handleAccountDetailsChange}
                  className="plain-input"
                  readOnly={!isAccountEditable}
                />
              </div>
              <div className="form-group">
                <label htmlFor="ifsccode">IFSC Code:</label>
                <input
                  type="text"
                  id="ifsccode"
                  name="ifsccode"
                  value={accountDetails.ifsccode}
                  onChange={handleAccountDetailsChange}
                  className="plain-input"
                  readOnly={!isAccountEditable}
                />
              </div>
              <div className="form-group">
                <label htmlFor="bankname">Bank Name:</label>
                <input
                  type="text"
                  id="bankname"
                  name="bankname"
                  value={accountDetails.bankname}
                  onChange={handleAccountDetailsChange}
                  className="plain-input"
                  readOnly={!isAccountEditable}
                />
              </div>
              <div className="form-group">
                <label htmlFor="pannumber">PAN Number:</label>
                <input
                  type="text"
                  id="pannumber"
                  name="pannumber"
                  value={accountDetails.pannumber}
                  onChange={handleAccountDetailsChange}
                  className="plain-input"
                  readOnly={!isAccountEditable}
                />
              </div>
              <div className="form-group">
                <label htmlFor="uannumber">UAN Number:</label>
                <input
                  type="text"
                  id="uannumber"
                  name="uannumber"
                  value={accountDetails.uannumber}
                  onChange={handleAccountDetailsChange}
                  className="plain-input"
                  readOnly={!isAccountEditable}
                />
              </div>
              {!isAccountEditable ? (
                <button type="button" onClick={handleAccountEdit}>
                  Edit
                </button>
              ) : (
                <div className="button-row">
                  <button type="submit">Save</button>
                  <button type="button" onClick={handleAccountCancel}>
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAccountForm;
