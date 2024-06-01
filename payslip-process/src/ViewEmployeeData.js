import React, { useState, useEffect } from 'react';
import axios from "axios";
import './App.css'; // Import your CSS file\
import "./ViewEmployeeData.css";

const ViewEmployeeData = () => {
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState(null);
  
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/viewEmployees');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        setError(error);
        console.error('Error fetching employee data:', error);
      }
    };
  
    useEffect(() => {
      fetchEmployeeData();
    }, []); // Empty dependency array ensures this runs only once after the initial render
  
  const logout = () => {
    window.location.href = '/logout';
  };

  return (
    <div className="container">
      <h1>Employee Details</h1>
      {employees.length === 0 ? (
        <div className="message">
          <p>No employee data found</p>
        </div>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.empid}>
                  <td>{employee.empid}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phonenumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div>
        <button onClick={logout}>
          <span id="logoutButtonText">Logout</span> <i className="fas fa-user"></i>
        </button>
      </div>
    </div>
  );
};

export default ViewEmployeeData;
