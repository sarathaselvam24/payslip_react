// import Login from "./Login";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <Login />
//       </header>
//     </div>
//   );
// }

// export default App;

// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Employee from "./Employee";
import Login from "./Login";
import Admin from "./Admin";
import EmployeeLoanRequest from "./EmployeeLoanRequest";
import EmployeeProfile from "./EmployeeProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/employee/:id" element={<Employee />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/employeeLoanRequest" element={<EmployeeLoanRequest />} />
        <Route path="/employeeProfile" element={<EmployeeProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
