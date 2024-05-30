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
import EmployeeProfileForm from "./EmployeeProfileForm";
import EmployeeAccountForm from "./EmployeeAccountForm";
import EmployeePayslipForm from "./EmployeePayslipForm";
import UserNotFound from "./UserNotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/userNotFound" element={<UserNotFound />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/employeeLoanRequest" element={<EmployeeLoanRequest />} />
        <Route path="/employee/profile" element={<EmployeeProfileForm />} />
        <Route path="/employee/account" element={<EmployeeAccountForm />} />
        <Route path="/employee/payslip" element={<EmployeePayslipForm />} />
      </Routes>
    </Router>
  );
}

export default App;
