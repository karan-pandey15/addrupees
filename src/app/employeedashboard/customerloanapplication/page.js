"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../sidebar/page";
import Header from "../header/page";

const CustomerLoanApplicationUpdation = () => {
  const [ApplicationId, setApplicationId] = useState("");
  const [loanApplication, setLoanApplication] = useState(null);
  const [updateEligibility, setUpdateEligibility] = useState("");
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [inProcessUpdation, setInProcessUpdation] = useState({
    status: "Pending",
    bankName: "",
    LoanObligations: "",
    SchemeOffered: "",
    CreditCardObligations: "",
  });

  const [pendingUpdation, setPendingUpdation] = useState({
    status: "",
    ApprovedAmount: "",
    TenureOfApproval: "",
    ApprovalDate: "",
    RejectedDate: "",
    RejectedCategory: "",
    RejectedDescription: "",
  });

  const [approvedDataUpdation, setApprovedDataUpdation] = useState({
    status: "",
    DisbursalBankName: "",
    DisbursedLoanAmount: "",
    InhandDisbAmount: "",
    BTDisbursedAmount: "",
    TopUp: "",
    Cibil: "",
    TenureOfDisbursal: "",
    ROI: "",
    PF: "",
    Insurance: "",
    EMI: "",
    FirstEMIDate: "",
    DisbursalDate: "",
    DSAChannelName: "",
    RejectedDate: "",
    RejectedCategory: "",
    RejectedDescription: "",
  });

  const [callerEmail, setCallerEmail] = useState(null);
  const [callerName, setCallerName] = useState(null);
  const [callerTLName, setCallerTLName] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("employeeEmail");
    const name = localStorage.getItem("employeeName");
    const tlName = localStorage.getItem("employeeTLName");

    if (email) setCallerEmail(email);
    if (name) setCallerName(name);
    if (tlName) setCallerTLName(tlName);
  }, []);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const FetchLoanApplication = async () => {
    try {
      const response = await axios.get(
        `https://api.addrupee.com/api/loanApplication/${ApplicationId}`
      );
      setLoanApplication(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const UpdateStatus = async () => {
    try {
      await axios.put(
        `https://api.addrupee.com/api/updateloanApplication/${ApplicationId}`,
        {
          status: updateEligibility,
          CallerName: callerName,
          CallerEmail: callerEmail,
          CallerTLName: callerTLName,
        },
        alert("Status updated successfully"),
        window.location.reload()
      );
    } catch (error) {
      console.error(error);
    }
  };

  const HandleInProcessLoanApplicationUpdation = (e) => {
    const { name, value } = e.target;
    setInProcessUpdation({
      ...inProcessUpdation,
      [name]: value,
    });
  };

  const InProcessLoanApplicationUpdation = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...inProcessUpdation,
    };

    try {
      await axios.put(
        `https://api.addrupee.com/api/in_process_loan_application_updation/${ApplicationId}`,
        {
          dataToSend,
        },
        alert("Loan Application Form updated successfully"),
        setInProcessUpdation({
          bankName: "",
          LoanObligations: "",
          SchemeOffered: "",
          CreditCardObligations: "",
        }),
        window.location.reload()
      );
    } catch (error) {
      console.error(error);
    }
  };

  const HandlePendingLoanApplicationUpdation = (e) => {
    const { name, value } = e.target;
    setPendingUpdation({
      ...pendingUpdation,
      [name]: value,
    });
  };

  const PendingLoanApplicationUpdation = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...pendingUpdation,
    };

    try {
      await axios.put(
        `https://api.addrupee.com/api/pending_loan_application_updation/${ApplicationId}`,
        {
          dataToSend,
        },
        alert("Loan Application Form updated successfully"),
        setPendingUpdation({
          status: "",
          ApprovedAmount: "",
          TenureOfApproval: "",
          ApprovalDate: "",
          RejectedDate: "",
          RejectedCategory: "",
          RejectedDescription: "",
        }),
        window.location.reload()
      );
    } catch (error) {
      console.error(error);
    }
  };

  const HandleApprovedLoanApplicationUpdation = (e) => {
    const { name, value } = e.target;
    setApprovedDataUpdation({
      ...approvedDataUpdation,
      [name]: value,
    });
  };

  const ApprovedLoanApplicationUpdation = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...approvedDataUpdation,
    };

    try {
      await axios.put(
        `https://api.addrupee.com/api/approved_loan_application_updation/${ApplicationId}`,
        {
          dataToSend,
        },
        alert("Loan Application Form updated successfully"),
        setApprovedDataUpdation({
          status: "",
          DisbursalBankName: "",
          DisbursedLoanAmount: "",
          InhandDisbAmount: "",
          BTDisbursedAmount: "",
          TopUp: "",
          Cibil: "",
          TenureOfDisbursal: "",
          ROI: "",
          PF: "",
          Insurance: "",
          EMI: "",
          FirstEMIDate: "",
          DisbursalDate: "",
          DSAChannelName: "",
          RejectedDate: "",
          RejectedCategory: "",
          RejectedDescription: "",
        }),
        window.location.reload()
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div style={{ width: "100%", height: "100vh", display: "flex" }}>
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
        <section
          style={{
            backgroundColor: "#E7E5E5",
            width: "100%",
            height: "100vh",
            overflowY: "scroll",
          }}
        >
          <Header OpenSidebar={OpenSidebar} />
          <div className="container" style={{ padding: "20px" }}>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "450px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Enter Application Number"
                    value={ApplicationId}
                    className="form-control"
                    onChange={(e) => setApplicationId(e.target.value)}
                  />
                  <button
                    style={{
                      backgroundColor: "#036E8C",
                      color: "white",
                      marginLeft: "5px",
                    }}
                    className="btn"
                    onClick={FetchLoanApplication}
                  >
                    Fetch
                  </button>
                </div>
              </div>

              {loanApplication && (
                <div className="py-4">
                  <h3 style={{ fontWeight: 600, color: "#264653" }}>
                    Loan Application Details
                  </h3>
                  <div className="row">
                    <div className="form-group col-12 col-lg-6 mb-2">
                      <label htmlFor="loanProduct">Applied Loan Product</label>
                      <input
                        type="text"
                        className="form-control"
                        id="loanProduct"
                        value={loanApplication.loanType}
                        readOnly
                      />
                    </div>
                    {loanApplication?.status === "In Process" ? (
                      <div className="form-group col-12 col-lg-6 mb-2">
                        <label htmlFor="appliedBank">Applied Bank</label>
                        <select
                          className="form-select"
                          id="appliedBank"
                          name="bankName"
                          value={inProcessUpdation.bankName}
                          onChange={HandleInProcessLoanApplicationUpdation}
                          aria-label="Default select example"
                          required
                        >
                          <option value="HDFC Bank">HDFC Bank</option>
                          <option value="AXIS Bank">AXIS Bank</option>
                          <option value="AXIS Finacnce">AXIS Finacnce</option>
                          <option value="AU Small Finance Bank">
                            AU Small Finance Bank
                          </option>
                          <option value="Yes Bank">Yes Bank</option>
                          <option value="IndusInd Bank">IndusInd Bank</option>
                          <option value="ICICI Bank">ICICI Bank</option>
                          <option value="Standard Chartered Bank">
                            Standard Chartered Bank
                          </option>
                          <option value="Bajaj">Bajaj</option>
                          <option value="Cholamandalam Investment and Finance Company">
                            Cholamandalam Investment and Finance Company
                          </option>
                          <option value="Incred Financial Services ">
                            Incred Financial Services
                          </option>
                          <option value="Finnable Credit Pvt Ltd">
                            Finnable Credit Pvt Ltd
                          </option>
                          <option value="Paysense Services">
                            Paysense Services
                          </option>

                          <option value="IDFC first Bank">
                            IDFC First Bank
                          </option>
                          <option value="Tata Capital Finance Services Pvt Ltd">
                            Tata Capital Finance Services Pvt Ltd
                          </option>

                          <option value="Aditya Birla">Aditya Birla</option>
                          <option value="Kotak Mahindra Bank">
                            Kotak Mahindra Bank
                          </option>

                          <option value="Standard Chartered Bank">
                            Standard Chartered Bank
                          </option>
                          <option value="Piramal Capital">
                            Piramal Capital
                          </option>
                          <option value="RBL Bank">RBL Bank</option>

                          <option value="Muthoot Finance Ltd">
                            Muthoot Finance Ltd
                          </option>
                          <option value="IndusInd Bank Limited">
                            IndusInd Bank Limited
                          </option>
                          <option value="L&T Finance Ltd">
                            L&T Finance Limited
                          </option>
                          <option value="Hero Finance Ltd">
                            Hero Finance Limited
                          </option>
                          <option value="Bajaj Finance">Bajaj Finance</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    ) : (
                      <div className="form-group col-12 col-lg-6 mb-2">
                        <label htmlFor="appliedBank">Applied Bank</label>
                        <input
                          type="text"
                          className="form-control"
                          id="appliedBank"
                          value={loanApplication.bankName}
                          readOnly
                        />
                      </div>
                    )}
                  </div>
                  <div className="row">
                    <div className="form-group col-12 col-lg-6 mb-2">
                      <label htmlFor="customerName">Customer Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="customerName"
                        value={loanApplication.customerName}
                        readOnly
                      />
                    </div>
                    <div className="form-group col-12 col-lg-6 mb-2">
                      <label htmlFor="fatherName">Father Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="fatherName"
                        value={loanApplication.fatherName}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-12 col-lg-6 mb-2">
                      <label htmlFor="motherName">Mother Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="motherName"
                        value={loanApplication.motherName}
                        readOnly
                      />
                    </div>
                    <div className="form-group col-12 col-lg-6 mb-2">
                      <label htmlFor="mobileNo">Mobile Number</label>
                      <input
                        type="text"
                        className="form-control"
                        id="mobileNo"
                        value={loanApplication.mobileNo}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-12 col-lg-6 mb-2">
                      <label htmlFor="mailId">Mail ID</label>
                      <input
                        type="text"
                        className="form-control"
                        id="mailId"
                        value={loanApplication.mailId}
                        readOnly
                      />
                    </div>
                    <div className="form-group col-12 col-lg-6 mb-2">
                      <label htmlFor="panCardNo">Pan Card Number</label>
                      <input
                        type="text"
                        className="form-control"
                        id="panCardNo"
                        value={loanApplication.panCardNo}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-12 col-lg-6 mb-2">
                      <label htmlFor="aadharCardNumber">
                        Aadhar Card Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="aadharCardNumber"
                        value={loanApplication.AadharCardNo}
                        readOnly
                      />
                    </div>
                    <div className="form-group col-12 col-lg-6 mb-2">
                      <label htmlFor="customerLocation">
                        Customer Location
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="customerLocation"
                        value={loanApplication.customerLocation}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-12 col-lg-6 mb-2">
                      <label htmlFor="companyName">Company Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="companyName"
                        value={loanApplication.companyName}
                        readOnly
                      />
                    </div>
                    <div className="form-group col-12 col-lg-6 mb-2">
                      <label htmlFor="DOB">DOB</label>
                      <input
                        type="text"
                        className="form-control"
                        id="DOB"
                        value={loanApplication.dob}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-12 col-lg-6 mb-2">
                      <label htmlFor="gender">Gender</label>
                      <input
                        type="text"
                        className="form-control"
                        id="gender"
                        value={loanApplication.gender}
                        readOnly
                      />
                    </div>
                    <div className="form-group col-12 col-lg-6 mb-2">
                      <label htmlFor="religion">Religion</label>
                      <input
                        type="text"
                        className="form-control"
                        id="religion"
                        value={loanApplication.religion}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-12 col-lg-6 mb-2">
                      <label htmlFor="appliedAmount">Applied Amount</label>
                      <input
                        type="text"
                        className="form-control"
                        id="appliedAmount"
                        value={loanApplication.appliedAmount}
                        readOnly
                      />
                    </div>
                    <div className="form-group col-12 col-lg-6 mb-2">
                      <label htmlFor="ImploymentType">Imployment Type</label>
                      <input
                        type="text"
                        className="form-control"
                        id="ImploymentType"
                        value={loanApplication.ImploymentType}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-12 col-lg-6 mb-2">
                      <label htmlFor="PerMonthSalary">Per Month Salary</label>
                      <input
                        type="text"
                        className="form-control"
                        id="PerMonthSalary"
                        value={loanApplication.PerMonthSalary}
                        readOnly
                      />
                    </div>
                  </div>
                  {loanApplication.status === "Not Eligible" && (
                    <div className="row">
                      <div className="form-group col-12 col-lg-6 mb-2">
                        <label htmlFor="Eligibility">Eligibility</label>
                        <input
                          type="text"
                          className="form-control"
                          id="Eligibility"
                          value={loanApplication.status}
                          readOnly
                        />
                      </div>
                    </div>
                  )}
                  {loanApplication.status === "In Process" && (
                    <>
                      <div className="row">
                        <div className="form-group col-12 col-lg-6 mb-2">
                          <label htmlFor="LoanObligations">
                            Loan Obligations
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="LoanObligations"
                            name="LoanObligations"
                            value={inProcessUpdation.LoanObligations}
                            onChange={HandleInProcessLoanApplicationUpdation}
                          />
                        </div>
                        <div className="form-group col-12 col-lg-6 mb-2">
                          <label htmlFor="SchemeOffered">Scheme Offered</label>
                          <select
                            id="SchemeOffered"
                            className="form-select"
                            aria-label="Default select example"
                            name="SchemeOffered"
                            value={inProcessUpdation.SchemeOffered}
                            onChange={HandleInProcessLoanApplicationUpdation}
                          >
                            <option value="" disabled selected>
                              Choose Offered Scheme...
                            </option>
                            <option value="Fresh">Fresh</option>
                            <option value="BT">BT</option>
                            <option value="Top Up">Top Up</option>
                            <option value="BT + Top Up">BT + Top Up</option>
                            <option value="Parallel">Parallel</option>
                          </select>
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-12 col-lg-6 mb-2">
                          <label htmlFor="CreditCardObligations">
                            Credit Card Obligation
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="CreditCardObligations"
                            name="CreditCardObligations"
                            value={inProcessUpdation.CreditCardObligations}
                            onChange={HandleInProcessLoanApplicationUpdation}
                          />
                        </div>
                      </div>
                      <button
                        style={{ backgroundColor: "#036E8C", color: "white" }}
                        className="btn"
                        onClick={InProcessLoanApplicationUpdation}
                      >
                        Submit
                      </button>
                    </>
                  )}
                  {loanApplication?.status === null && (
                    <>
                      <div className="row">
                        <div className="form-group col-12 col-lg-6 mb-2">
                          <label htmlFor="Eligibility">Eligibility</label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            value={updateEligibility}
                            onChange={(e) =>
                              setUpdateEligibility(e.target.value)
                            }
                          >
                            <option value="" disabled selected>
                              Choose Eligibility...
                            </option>
                            <option value="Eligible">Eligible</option>
                            <option value="Not Eligible">Not Eligible</option>
                          </select>
                        </div>
                      </div>
                      <button
                        style={{ backgroundColor: "#036E8C", color: "white" }}
                        className="btn"
                        onClick={UpdateStatus}
                      >
                        Update Eligibility
                      </button>
                    </>
                  )}
                  {loanApplication?.status === "Pending" && (
                    <>
                      <div className="row">
                        <div className="form-group col-12 col-lg-6 mb-2">
                          <label htmlFor="status">Status</label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            id="status"
                            name="status"
                            value={pendingUpdation.status}
                            onChange={HandlePendingLoanApplicationUpdation}
                          >
                            <option value="" disabled selected>
                              Choose Status...
                            </option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </div>
                        {pendingUpdation?.status === "Approved" && (
                          <div className="form-group col-12 col-lg-6 mb-2">
                            <label htmlFor="ApprovedAmount">
                              Approved Amount
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="ApprovedAmount"
                              name="ApprovedAmount"
                              value={pendingUpdation.ApprovedAmount}
                              onChange={HandlePendingLoanApplicationUpdation}
                            />
                          </div>
                        )}
                      </div>
                      {pendingUpdation?.status === "Approved" && (
                        <div className="row">
                          <div className="form-group col-12 col-lg-6 mb-2">
                            <label htmlFor="TenureOfApproval">
                              Tenure Of Approval
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="TenureOfApproval"
                              name="TenureOfApproval"
                              value={pendingUpdation.TenureOfApproval}
                              onChange={HandlePendingLoanApplicationUpdation}
                            />
                          </div>
                          <div className="form-group col-12 col-lg-6 mb-2">
                            <label htmlFor="ApprovalDate">Approval Date</label>
                            <input
                              type="date"
                              className="form-control"
                              id="ApprovalDate"
                              name="ApprovalDate"
                              value={pendingUpdation.ApprovalDate}
                              onChange={HandlePendingLoanApplicationUpdation}
                            />
                          </div>
                        </div>
                      )}
                      {pendingUpdation?.status === "Rejected" && (
                        <>
                          <div className="row">
                            <div className="form-group col-12 col-lg-6 mb-2">
                              <label htmlFor="RejectedDate">
                                Rejected Date
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                id="RejectedDate"
                                name="RejectedDate"
                                value={pendingUpdation.RejectedDate}
                                onChange={HandlePendingLoanApplicationUpdation}
                              />
                            </div>
                            <div className="form-group col-12 col-lg-6 mb-2">
                              <label htmlFor="RejectedCategory">
                                Rejected Category
                              </label>
                              <select
                                type="text"
                                className="form-control mb-2"
                                id="RejectedCategory"
                                name="RejectedCategory"
                                value={pendingUpdation.RejectedCategory}
                                onChange={HandlePendingLoanApplicationUpdation}
                              >
                                <option value="" disabled selected>
                                  Choose Rejected Category...
                                </option>
                                <option value="ROI ISSUE">ROI ISSUE</option>
                                <option value="CIBIL ISSUE">CIBIL ISSUE</option>
                                <option value="SERVICE ISSUE">
                                  SERVICE ISSUE
                                </option>
                                <option value="OVER LEVERAGE">
                                  OVER LEVERAGE
                                </option>
                                <option value="Other">Other</option>
                              </select>
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-group col-12 col-lg-6 mb-2">
                              <label htmlFor="RejectedDescription">
                                Rejected Description
                              </label>
                              <textarea
                                rows={3}
                                className="form-control"
                                id="RejectedDescription"
                                name="RejectedDescription"
                                value={pendingUpdation.RejectedDescription}
                                onChange={HandlePendingLoanApplicationUpdation}
                              ></textarea>
                            </div>
                          </div>
                        </>
                      )}
                      <button
                        style={{ backgroundColor: "#036E8C", color: "white" }}
                        className="btn"
                        onClick={PendingLoanApplicationUpdation}
                      >
                        Submit
                      </button>
                    </>
                  )}
                  {loanApplication?.status === "Approved" && (
                    <>
                      <div className="row">
                        <div className="form-group col-12 col-lg-6 mb-2">
                          <label htmlFor="status">Status</label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            id="status"
                            name="status"
                            value={approvedDataUpdation.status}
                            onChange={HandleApprovedLoanApplicationUpdation}
                          >
                            <option value="" disabled selected>
                              Choose Status...
                            </option>
                            <option value="Disbursed">Disbursed</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </div>
                        {approvedDataUpdation?.status === "Disbursed" && (
                          <div className="form-group col-12 col-lg-6 mb-2">
                            <label htmlFor="DisbursalBankName">
                              Disbursal BankName
                            </label>
                            <select
                              className="form-select"
                              id="DisbursalBankName"
                              name="DisbursalBankName"
                              value={approvedDataUpdation.DisbursalBankName}
                              onChange={HandleApprovedLoanApplicationUpdation}
                              aria-label="Default select example"
                              required
                            >
                              <option value="HDFC Bank">HDFC Bank</option>
                              <option value="AXIS Bank">AXIS Bank</option>
                              <option value="AXIS Finacnce">
                                AXIS Finacnce
                              </option>
                              <option value="AU Small Finance Bank">
                                AU Small Finance Bank
                              </option>
                              <option value="Yes Bank">Yes Bank</option>
                              <option value="IndusInd Bank">
                                IndusInd Bank
                              </option>
                              <option value="ICICI Bank">ICICI Bank</option>
                              <option value="Standard Chartered Bank">
                                Standard Chartered Bank
                              </option>
                              <option value="Bajaj">Bajaj</option>
                              <option value="Cholamandalam Investment and Finance Company">
                                Cholamandalam Investment and Finance Company
                              </option>
                              <option value="Incred Financial Services ">
                                Incred Financial Services
                              </option>
                              <option value="Finnable Credit Pvt Ltd">
                                Finnable Credit Pvt Ltd
                              </option>
                              <option value="Paysense Services">
                                Paysense Services
                              </option>

                              <option value="IDFC first Bank">
                                IDFC First Bank
                              </option>
                              <option value="Tata Capital Finance Services Pvt Ltd">
                                Tata Capital Finance Services Pvt Ltd
                              </option>

                              <option value="Aditya Birla">Aditya Birla</option>
                              <option value="Kotak Mahindra Bank">
                                Kotak Mahindra Bank
                              </option>

                              <option value="Standard Chartered Bank">
                                Standard Chartered Bank
                              </option>
                              <option value="Piramal Capital">
                                Piramal Capital
                              </option>
                              <option value="RBL Bank">RBL Bank</option>

                              <option value="Muthoot Finance Ltd">
                                Muthoot Finance Ltd
                              </option>
                              <option value="IndusInd Bank Limited">
                                IndusInd Bank Limited
                              </option>
                              <option value="L&T Finance Ltd">
                                L&T Finance Limited
                              </option>
                              <option value="Hero Finance Ltd">
                                Hero Finance Limited
                              </option>
                              <option value="Bajaj Finance">
                                Bajaj Finance
                              </option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        )}
                      </div>
                      {approvedDataUpdation?.status === "Disbursed" && (
                        <>
                          <div className="row">
                            <div className="form-group col-12 col-lg-6 mb-2">
                              <label htmlFor="DisbursedLoanAmount">
                                Disbursed Loan Amount
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="DisbursedLoanAmount"
                                name="DisbursedLoanAmount"
                                value={approvedDataUpdation.DisbursedLoanAmount}
                                onChange={HandleApprovedLoanApplicationUpdation}
                              />
                            </div>
                            <div className="form-group col-12 col-lg-6 mb-2">
                              <label htmlFor="InhandDisbAmount">
                                Inhand Disb Amount
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="InhandDisbAmount"
                                name="InhandDisbAmount"
                                value={approvedDataUpdation.InhandDisbAmount}
                                onChange={HandleApprovedLoanApplicationUpdation}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-group col-12 col-lg-6 mb-2">
                              <label htmlFor="BTDisbursedAmount">
                                BT Disbursed Amount
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="BTDisbursedAmount"
                                name="BTDisbursedAmount"
                                value={approvedDataUpdation.BTDisbursedAmount}
                                onChange={HandleApprovedLoanApplicationUpdation}
                              />
                            </div>
                            <div className="form-group col-12 col-lg-6 mb-2">
                              <label htmlFor="TopUp">Top Up</label>
                              <input
                                type="text"
                                className="form-control"
                                id="TopUp"
                                name="TopUp"
                                value={approvedDataUpdation.TopUp}
                                onChange={HandleApprovedLoanApplicationUpdation}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-group col-12 col-lg-6 mb-2">
                              <label htmlFor="Cibil">Cibil</label>
                              <input
                                type="text"
                                className="form-control"
                                id="Cibil"
                                name="Cibil"
                                value={approvedDataUpdation.Cibil}
                                onChange={HandleApprovedLoanApplicationUpdation}
                              />
                            </div>
                            <div className="form-group col-12 col-lg-6 mb-2">
                              <label htmlFor="TenureOfDisbursal">
                                Tenure Of Disbursal
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="TenureOfDisbursal"
                                name="TenureOfDisbursal"
                                value={approvedDataUpdation.TenureOfDisbursal}
                                onChange={HandleApprovedLoanApplicationUpdation}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-group col-12 col-lg-6 mb-2">
                              <label htmlFor="ROI">ROI</label>
                              <input
                                type="text"
                                className="form-control"
                                id="ROI"
                                name="ROI"
                                value={approvedDataUpdation.ROI}
                                onChange={HandleApprovedLoanApplicationUpdation}
                              />
                            </div>
                            <div className="form-group col-12 col-lg-6 mb-2">
                              <label htmlFor="PF">PF</label>
                              <input
                                type="text"
                                className="form-control"
                                id="PF"
                                name="PF"
                                value={approvedDataUpdation.PF}
                                onChange={HandleApprovedLoanApplicationUpdation}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-group col-12 col-lg-6 mb-2">
                              <label htmlFor="Insurance">Insurance</label>
                              <input
                                type="text"
                                className="form-control"
                                id="Insurance"
                                name="Insurance"
                                value={approvedDataUpdation.Insurance}
                                onChange={HandleApprovedLoanApplicationUpdation}
                              />
                            </div>
                            <div className="form-group col-12 col-lg-6 mb-2">
                              <label htmlFor="EMI">EMI</label>
                              <input
                                type="text"
                                className="form-control"
                                id="EMI"
                                name="EMI"
                                value={approvedDataUpdation.EMI}
                                onChange={HandleApprovedLoanApplicationUpdation}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-group col-12 col-lg-6 mb-2">
                              <label htmlFor="FirstEMIDate">
                                First EMI Date
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                id="FirstEMIDate"
                                name="FirstEMIDate"
                                value={approvedDataUpdation.FirstEMIDate}
                                onChange={HandleApprovedLoanApplicationUpdation}
                              />
                            </div>
                            <div className="form-group col-12 col-lg-6 mb-2">
                              <label htmlFor="DisbursalDate">
                                Disbursal Date
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                id="DisbursalDate"
                                name="DisbursalDate"
                                value={approvedDataUpdation.DisbursalDate}
                                onChange={HandleApprovedLoanApplicationUpdation}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-group col-12 col-lg-6 mb-2">
                              <label htmlFor="DSAChannelName">
                                DSA Channel Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="DSAChannelName"
                                name="DSAChannelName"
                                value={approvedDataUpdation.DSAChannelName}
                                onChange={HandleApprovedLoanApplicationUpdation}
                              />
                            </div>
                          </div>
                        </>
                      )}
                      {approvedDataUpdation?.status === "Rejected" && (
                        <>
                          <div className="row">
                            <div className="form-group col-12 col-lg-6 mb-2">
                              <label htmlFor="RejectedDate">
                                Rejected Date
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                id="RejectedDate"
                                name="RejectedDate"
                                value={approvedDataUpdation.RejectedDate}
                                onChange={HandleApprovedLoanApplicationUpdation}
                              />
                            </div>
                            <div className="form-group col-12 col-lg-6 mb-2">
                              <label htmlFor="RejectedCategory">
                                Rejected Category
                              </label>
                              <select
                                type="text"
                                className="form-control mb-2"
                                id="RejectedCategory"
                                name="RejectedCategory"
                                value={approvedDataUpdation.RejectedCategory}
                                onChange={HandleApprovedLoanApplicationUpdation}
                              >
                                <option value="" disabled selected>
                                  Choose Rejected Category...
                                </option>
                                <option value="Approved But Not Disbusred-ABND">
                                  Approved But Not Disbusred-ABND
                                </option>
                                <option value="ROI ISSUE">ROI ISSUE</option>
                                <option value="CIBIL ISSUE">CIBIL ISSUE</option>
                                <option value="SERVICE ISSUE">
                                  SERVICE ISSUE
                                </option>
                                <option value="OVER LEVERAGE">
                                  OVER LEVERAGE
                                </option>
                                <option value="Other">Other</option>
                              </select>
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-group col-12 col-lg-6 mb-2">
                              <label htmlFor="RejectedDescription">
                                Rejected Description
                              </label>
                              <textarea
                                rows={3}
                                className="form-control"
                                id="RejectedDescription"
                                name="RejectedDescription"
                                value={approvedDataUpdation.RejectedDescription}
                                onChange={HandleApprovedLoanApplicationUpdation}
                              ></textarea>
                            </div>
                          </div>
                        </>
                      )}
                      <button
                        style={{ backgroundColor: "#036E8C", color: "white" }}
                        className="btn"
                        onClick={ApprovedLoanApplicationUpdation}
                      >
                        Submit
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CustomerLoanApplicationUpdation;
