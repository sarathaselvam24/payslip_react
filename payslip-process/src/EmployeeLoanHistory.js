import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./EmployeeLoanHistory.css";

const EmployeeLoanHistory = () => {
  const [loanHistory, setLoanHistory] = useState([]);
  const [search, setSearch] = useState("");
  const location = useLocation();
  const userData = location.state.userData;

  const fetchLoanHistory = useCallback(async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/employeeloanrequest`,
        {
          empid: userData.empid,
        }
      );
      setLoanHistory(response.data);
    } catch (error) {
      console.error("Error fetching loan history:", error);
    }
  }, [userData.empid]);

  useEffect(() => {
    fetchLoanHistory();
  }, [fetchLoanHistory]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/api/searchMyLoanRequestByStatus`,
        {
          empid: userData.empid,
          searchTerm: search,
        }
      );
      setLoanHistory(response.data);
    } catch (error) {
      console.error("Error fetching loan history:", error);
    }
  };

  const editLoanStatus = async (loanId, status, emailid) => {
    try {
      await axios.post(`http://localhost:8080/api/editEmployeeLoanStatus`, {
        loanid: loanId,
        loanrequeststatus: status,
        canceledby: emailid,
      });
      fetchLoanHistory();
    } catch (error) {
      console.error("Error updating loan status:", error);
    }
  };

  return (
    <div className="loan-container">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search by Status"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {loanHistory.length > 0 && (
        <div>
          <h2>Loan Requests</h2>
          <table className="loan-table">
            <thead>
              <tr>
                <th>Loan Amount</th>
                <th>Expected Month</th>
                <th>EMI Starts From</th>
                <th>Repayment Terms</th>
                <th>Requested By</th>
                <th>Loan Request Status</th>
                <th>Issued On</th>
                <th>Loan Status</th>
                <th>Approved By</th>
                <th>Rejected By</th>
                <th>Canceled By</th>
              </tr>
            </thead>
            <tbody>
              {loanHistory.map((loanhistory) => (
                <tr key={loanhistory.id} className="loan-row">
                  <td>{loanhistory.loanamount}</td>
                  <td>{loanhistory.expectedmonth}</td>
                  <td>{loanhistory.emistartsfrom}</td>
                  <td>{loanhistory.repaymentterms}</td>
                  <td>{loanhistory.requestedby}</td>
                  <td>{loanhistory.loanrequeststatus}</td>
                  <td>{loanhistory.issuedon}</td>
                  <td>
                    {loanhistory.loanstatus === "Pending" ? (
                      <button
                        onClick={() =>
                          editLoanStatus(
                            loanhistory.id,
                            "Canceled",
                            loanhistory.emailid
                          )
                        }
                      >
                        Cancel
                      </button>
                    ) : (
                      loanhistory.loanstatus
                    )}
                  </td>
                  <td>{loanhistory.approvedby}</td>
                  <td>{loanhistory.rejectedby}</td>
                  <td>{loanhistory.canceledby}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeeLoanHistory;
