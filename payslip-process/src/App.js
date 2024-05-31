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
import CreateEmployeeForm from "./CreateEmployeeForm";
import EmployeeLoanRequest from "./EmployeeLoanRequest";
import EmployeeProfileForm from "./EmployeeProfileForm";
import EmployeeAccountForm from "./EmployeeAccountForm";
import EmployeePayslipForm from "./EmployeePayslipForm";
import EmployeeLoanHistory from "./EmployeeLoanHistory";
import ViewEmployeeLoanRequests from "./ViewEmployeeLoanRequest";
import UserNotFound from "./UserNotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/userNotFound" element={<UserNotFound />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/createEmployeeForm" element={<CreateEmployeeForm />} />
        <Route path="/employee/Loan" element={<EmployeeLoanRequest />} />
        <Route path="/employee/profile" element={<EmployeeProfileForm />} />
        <Route path="/employee/account" element={<EmployeeAccountForm />} />
        <Route path="/employee/payslip" element={<EmployeePayslipForm />} />
        <Route
          path="/employee/myLoanHistory"
          element={<EmployeeLoanHistory />}
        />
        <Route
          path="/AdminLoanRequest"
          element={<ViewEmployeeLoanRequests />}
        />
      </Routes>
    </Router>
  );
}

export default App;
