import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const PayslipRequestForm = () => {
  const [joiningDate, setJoiningDate] = useState("");
  const [monthYearOptions, setMonthYearOptions] = useState([]);
  const location = useLocation();
  const userData = location.state?.userData || {};
  const [formData, setFormData] = useState({
    empid: userData.empid, // Set empid from userData
    payslip: "",
  });

  useEffect(() => {
    // Fetch joining date of the employee from API
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/employee",
          { empid: formData.empid }, // Use formData.empid to fetch employee data
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const joiningDate = response.data.joiningdate; // Assuming the API response contains the joining date
        setJoiningDate(joiningDate);
        generateMonthYearDropdown(new Date(joiningDate));
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    if (formData.empid) {
      fetchEmployeeData();
    }
  }, [formData.empid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log("name " + formData.payslip); // Log the selected value
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/employeeSalaryDetails",
        { empid: formData.empid, payslipMonAndYear: formData.payslip }, // Use formData.empid to fetch employee data
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;

      const parts = formData.payslip.split(" ");

      link.href = url;
      link.setAttribute(
        "download",
        "Payslip_" + formData.empid + "_" + parts[0] + "_" + parts[1] + ".pdf"
      );
      document.body.appendChild(link);
      link.click();
      link.remove();

      console.log("Employee salary  data response " + response.data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  const generateMonthYearDropdown = (joiningDate) => {
    const currentDate = new Date();
    const months = [];
    const diffMonths =
      (currentDate.getFullYear() - joiningDate.getFullYear()) * 12 +
      (currentDate.getMonth() - joiningDate.getMonth()) +
      1;

    for (let i = 0; i < diffMonths; i++) {
      const date = new Date(
        joiningDate.getFullYear(),
        joiningDate.getMonth() + i,
        1
      );
      const month = date.toLocaleString("default", { month: "long" });
      const year = date.getFullYear();

      months.push({
        month: month,
        year: year,
      });
    }

    setMonthYearOptions(months);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} id="payslipSelectionForm">
        <div className="form-group">
          <h5 style={{ color: "#069" }}>Select Month And Year</h5>
          <input type="hidden" id="joiningdate" value={joiningDate} readOnly />
          <input
            type="hidden"
            id="empid"
            name="empid"
            value={formData.empid}
            readOnly
          />
        </div>
        <div className="form-group">
          <select id="monthSelect" name="payslip" onChange={handleChange}>
            {monthYearOptions.map((option, index) => (
              <option key={index} value={`${option.month} ${option.year}`}>
                {`${option.month} ${option.year}`}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Generate PaySlip</button>
      </form>
    </div>
  );
};

export default PayslipRequestForm;
