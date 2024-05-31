import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./ViewEmployeeLoanRequests.css";

const ViewEmployeeLoanRequests = () => {
  const [search, setSearch] = useState("");
  const [loanRequests, setLoanRequests] = useState([]);
  const [error, setError] = useState(null);

  const location = useLocation();
  const userdata = location.state?.userData;

  // Define the functions
  const toggleBackgroundColor = useCallback(() => {
    // Function logic
  }, []);

  const updateEMIDropdown = useCallback(() => {
    // Function logic
  }, []);

  const fetchLoanRequests = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/allEmployeeLoanRequest"
      );
      setLoanRequests(response.data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
    }
  }, []);

  // useEffect with the dependency array including necessary functions
  useEffect(() => {
    fetchLoanRequests();
    toggleBackgroundColor();
    updateEMIDropdown();
  }, [fetchLoanRequests, toggleBackgroundColor, updateEMIDropdown]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      `http://localhost:8080/api/searchEmployeeLoanRequestByStatusOrEmpid`,
      { searchTerm: search }
    );
    setLoanRequests(response.data);
  };

  const editLoanStatus = async (loanId, status) => {
    const response = await axios.post(
      `http://localhost:8080/api/editAdminLoanStatus`,
      { loanId: loanId, loanStatus: status, adminEmail: userdata.emailid }
    );
    fetchLoanRequests();
  };

  return (
    <div className="container">
      <h1>Loan Requests</h1>

      <form className="search-form" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          name="search"
          placeholder="Search by Emp ID or Status"
          value={search}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
      </form>

      {error ? (
        <div className="error-message">Error: {error}</div>
      ) : (
        <table className="loan-table">
          <thead>
            <tr>
              <th>Emp ID</th>
              <th>Loan Amount</th>
              <th>Expected Month</th>
              <th>EMI Starts From</th>
              <th>Repayment Terms</th>
              <th>Requested By</th>
              <th>Loan Request Status</th>
              <th>Issued On</th>
              <th>Note</th>
              <th>Loan Status</th>
              <th>Approved By</th>
              <th>Rejected By</th>
              <th>Canceled By</th>
              <th>EMI</th>
            </tr>
          </thead>
          <tbody>
            {loanRequests.map((loan) => (
              <tr key={loan.id}>
                <td>{loan.empid}</td>
                <td>{loan.loanamount}</td>
                <td>{loan.expectedmonth}</td>
                <td>{loan.emistartsfrom}</td>
                <td>{loan.repaymentterms}</td>
                <td>{loan.requestedby}</td>
                <td>{loan.loanrequeststatus}</td>
                <td>{loan.issuedon}</td>
                <td>{loan.note}</td>
                <td>
                  {loan.loanstatus === "Pending" ? (
                    <>
                      <button
                        className="approve-button"
                        onClick={() => editLoanStatus(loan.id, "Approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="reject-button"
                        onClick={() => editLoanStatus(loan.id, "Rejected")}
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    loan.loanstatus
                  )}
                </td>
                <td>{loan.approvedby}</td>
                <td>{loan.rejectedby}</td>
                <td>{loan.canceledby}</td>
                <td>{loan.emi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewEmployeeLoanRequests;
