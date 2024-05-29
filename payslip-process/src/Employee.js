import React from "react";
import { useParams, useLocation } from "react-router-dom";

const Employee = () => {
  const { id } = useParams();
  const location = useLocation();
  const userData = location.state.userData;

  return (
    <div>
      <h1>Employee Page</h1>
      <p>Employee ID: {id}</p>
      <p>Name: {userData.empid}</p>
      <p>role: {userData.role}</p>
      <p>Email: {userData.emailid}</p>
      <p>password: {userData.password}</p>
    </div>
  );
};

export default Employee;
