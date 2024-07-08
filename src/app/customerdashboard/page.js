"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import "../styles.css";
import Sidebar from "./sidebar/page";
import Header from "./header/page";
import "./inputRangeStyles.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const CustomerDashboard = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [loanApplication, setLoanApplication] = useState(null);
  const [lgShow, setLgShow] = useState(false);
  const [updateLoanApplicationFormData, setUpdateLoanApplicationFormData] =
    useState({
      status: "In Process",
      MaritalStatus: "",
      SpouseName: "",
      Qualification: "",
      PropertyStatus: "",
      CurrentAddressLine1: "",
      CurrentAddressLine2: "",
      CurrentCity: "",
      CurrentLandmark: "",
      CurrentState: "",
      CurrentPinCode: "",
      PermanentAddressLine1: "",
      PermanentAddressLine2: "",
      PermanentCity: "",
      PermanentLandmark: "",
      PermanentState: "",
      PermanentPinCode: "",
      Designation: "",
      CurrentCompanyWorkExperience: "",
      TotalWorkExperience: "",
      CompanyType: "",
      OfficialMail: "",
      CompanyAddress: "",
      CompanyCity: "",
      CompanyState: "",
      CompanyPinCode: "",
      SalaryAccountBankName: "",
      AnnualCTC: "",
      NetSalary: "",
      TenureofLoan: "",
      Reference1FullNameRelative: "",
      Reference1MobileNumber: "",
      Reference1AddressLine: "",
      Reference1City: "",
      Reference1State: "",
      Reference1PinCode: "",
      Reference2FullNameFriend: "",
      Reference2MobileNumber: "",
      Reference2AddressLine: "",
      Reference2City: "",
      Reference2State: "",
      Reference2PinCode: "",
    });
  const [customerEmailID, setCustomerEmailID] = useState(null);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const paragraphText =
    "AddRupee, your trusted partner for financial solutions! We understand that your financial needs vary, so we offer two convenient options for you. Whether you're looking for a loan to meet your immediate requirements or seeking to manage your expenses with a credit card, we've got you covered. Click 'Apply for Loan' to access our range of tailored loan options or 'Apply for Credit Card' to explore our diverse credit card offerings. We're here to make your financial journey smooth and stress-free. Choose the path that suits you best, and let's take the first step toward your financial goals.";

  const [showFullText, setShowFullText] = useState(false);
  const maxLength = 200;
  const truncatedText = showFullText
    ? paragraphText
    : paragraphText.slice(0, maxLength);

  useEffect(() => {
    setCustomerEmailID(localStorage.getItem("customerEmailID"));
  });

  const fetchLoanApplication = async () => {
    try {
      const response = await axios.get(
        `https://api.addrupee.com/api/get_loan_data_for_customer/${customerEmailID}`
      );

      setLoanApplication(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoanApplicationUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateLoanApplicationFormData({
      ...updateLoanApplicationFormData,
      [name]: value,
    });
  };

  const UpdateloanApplicationForm = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...updateLoanApplicationFormData,
    };

    try {
      await axios.put(
        `https://api.addrupee.com/api/update_loan_data_for_customer/${customerEmailID}`,
        {
          dataToSend,
        },
        alert("Loan Application Form updated successfully"),
        setUpdateLoanApplicationFormData({
          MaritalStatus: "",
          SpouseName: "",
          Qualification: "",
          PropertyStatus: "",
          CurrentAddressLine1: "",
          CurrentAddressLine2: "",
          CurrentCity: "",
          CurrentLandmark: "",
          CurrentState: "",
          CurrentPinCode: "",
          PermanentAddressLine1: "",
          PermanentAddressLine2: "",
          PermanentCity: "",
          PermanentLandmark: "",
          PermanentState: "",
          PermanentPinCode: "",
          Designation: "",
          CurrentCompanyWorkExperience: "",
          TotalWorkExperience: "",
          CompanyType: "",
          OfficialMail: "",
          CompanyAddress: "",
          CompanyCity: "",
          CompanyState: "",
          CompanyPinCode: "",
          SalaryAccountBankName: "",
          AnnualCTC: "",
          NetSalary: "",
          TenureofLoan: "",
          Reference1FullNameRelative: "",
          Reference1MobileNumber: "",
          Reference1AddressLine: "",
          Reference1City: "",
          Reference1State: "",
          Reference1PinCode: "",
          Reference2FullNameFriend: "",
          Reference2MobileNumber: "",
          Reference2AddressLine: "",
          Reference2City: "",
          Reference2State: "",
          Reference2PinCode: "",
        }),
        window.location.reload()
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLoanApplication();
    UpdateloanApplicationForm();
  }, [customerEmailID]);

  return (
    <>
      <div style={{ width: "100%", height: "100vh", display: "flex" }}>
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
        <div
          style={{
            backgroundColor: "#E7E5E5",
            overflowY: "scroll",
            width: "100%",
            height: "100vh",
          }}
        >
          <Header OpenSidebar={OpenSidebar} />
          <style jsx>{`
            .read-more-link {
              color: blue;
              cursor: pointer;
              margin-left: 5px;
            }

            .read-more-link:hover {
              text-decoration: underline;
            }
          `}</style>
          {loanApplication?.mailId === customerEmailID &&
          loanApplication?.ApplicationId !== null ? (
            <section style={{ padding: "20px" }}>
              <div className="container text-center">
                <h2 style={{ fontWeight: 700, color: "#264653" }}>
                  Thanks for Applying!
                </h2>
              </div>
              <div className="text-center mt-4">
                <label
                  style={{
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "#264653",
                  }}
                  className="form-label"
                  htmlFor="Track_Status"
                >
                  Track Status
                </label>
                <input
                  type="range"
                  id="Track_Status"
                  className={`track_status_slider ${loanApplication?.status}`}
                  value={
                    loanApplication?.status === null
                      ? 0
                      : loanApplication?.status === "Eligible"
                      ? 25
                      : loanApplication?.status === "Not Eligible"
                      ? 25
                      : loanApplication?.status === "In Process" ||
                        loanApplication?.status === "Pending"
                      ? 50
                      : loanApplication?.status === "Approved"
                      ? 75
                      : loanApplication?.status === "Rejected"
                      ? 100
                      : loanApplication?.status === "Disbursed"
                      ? 100
                      : 100
                  }
                  data-status={loanApplication?.status}
                  readOnly
                />
              </div>
              <div className="text-center mt-4">
                {loanApplication?.status === null && (
                  <p style={{ fontSize: "21px", fontWeight: 600 }}>
                    Your application is being processed. We'll get back to you
                    soon.
                  </p>
                )}
                {loanApplication?.status === "Not Eligible" && (
                  <p
                    style={{
                      color: "#264653",
                      fontSize: "21px",
                      fontWeight: 600,
                    }}
                    className="text-danger"
                  >
                    Sorry, you are not eligible.
                  </p>
                )}
                {loanApplication?.status === "Eligible" && (
                  <>
                    <p
                      style={{
                        color: "#264653",
                        fontSize: "21px",
                        fontWeight: 600,
                      }}
                    >
                      You are eligible. Please complete your loan application
                      form.
                    </p>
                    <Button
                      style={{ backgroundColor: "#036E8C", border: "none" }}
                      onClick={() => setLgShow(true)}
                    >
                      Complete
                    </Button>
                  </>
                )}
                {["In Process", "Pending"].includes(
                  loanApplication?.status
                ) && (
                  <p
                    style={{
                      color: "#264653",
                      fontSize: "21px",
                      fontWeight: 600,
                    }}
                  >
                    Your application is being processed. We'll get back to you
                    soon.
                  </p>
                )}
                {loanApplication?.status === "Approved" && (
                  <p
                    style={{
                      color: "#264653",
                      fontSize: "21px",
                      fontWeight: 600,
                    }}
                  >
                    Your loan application is Approved. We'll get back to you
                    soon.
                  </p>
                )}
                {loanApplication?.status === "Disbursed" && (
                  <p
                    style={{
                      color: "#264653",
                      fontSize: "21px",
                      fontWeight: 600,
                    }}
                  >
                    Congrats, Your loan amount is Disbursed
                  </p>
                )}
                {loanApplication?.status === "Rejected" && (
                  <p
                    style={{
                      color: "#264653",
                      fontSize: "21px",
                      fontWeight: 600,
                    }}
                  >
                    Sorry to inform you that your application is Rejected.
                  </p>
                )}
              </div>
            </section>
          ) : (
            <section style={{ padding: "20px" }}>
              <div className="container d-flex justify-content-center align-items-center flex-column ">
                <h2 style={{ fontWeight: 700, color: "#264653" }}>
                  Apply Online For{" "}
                  <span style={{ color: "#036E8C" }}>Loan</span> &{" "}
                  <span style={{ color: "#3F9E7E" }}>Credit Card</span>
                </h2>
                <h5
                  className="mt-3"
                  style={{ fontWeight: 600, color: "#264653" }}
                >
                  Unlock Your Financial Potential with Wish Credit Card & Loans
                  - Where Dreams Meet Reality
                </h5>
                <hr />

                <div className="pt-3">
                  <Link href={"/customerdashboard/loanapply"}>
                    <button
                      className="cust_apply_box"
                      style={{
                        backgroundColor: "#036E8C",
                        border: "none",
                        color: "#ffffff",
                        margin: "20px",
                        padding: "40px 60px",
                        borderRadius: "8px",
                        fontSize: "24px",
                        fontWeight: 600,
                      }}
                    >
                      Apply for <br /> Loan
                    </button>
                  </Link>
                  <Link href={"/customerdashboard/cardapply"}>
                    <button
                      className="cust_apply_box"
                      style={{
                        backgroundColor: "#3F9E7E",
                        border: "none",
                        color: "#ffffff",
                        padding: "40px 60px",
                        borderRadius: "8px",
                        fontSize: "24px",
                        fontWeight: 600,
                      }}
                    >
                      Apply for <br /> Credit Card
                    </button>
                  </Link>
                </div>

                <p className="mt-2" style={{ fontSize: "18px" }}>
                  {truncatedText}
                  {!showFullText && paragraphText.length > maxLength && (
                    <span
                      className="read-more-link"
                      onClick={() => setShowFullText(true)}
                    >
                      Read More
                    </span>
                  )}
                </p>

                <div className="row mb-3">
                  <div
                    className="col-12 col-lg-12 col-md-12"
                    style={{ paddingTop: "50px" }}
                  >
                    <p style={{ fontSize: "18px" }}>
                      In the digital age, AddRupee redefines the loan and credit
                      card application process. Our online services eliminate
                      in-person visits, offering personalized credit options
                      based on credit history and preferences. Transparent
                      information empowers users to make informed choices, with
                      a streamlined application process for swift approvals. The
                      platform simplifies comparisons of lenders and card
                      issuers for the best deals. Online security is a top
                      priority. AddRupee and trusted platforms simplify finance,
                      granting control and adaptability for borrowing and
                      spending needs. In summary, AddRupee represents the shift
                      towards hassle-free, secure, and adaptable financial
                      solutions in the modern era.{" "}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}
          <Modal
            size="lg"
            show={lgShow}
            onHide={() => setLgShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                Complete Form Details
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="container">
                <div className="row">
                  <div className="form-group col-12 col-lg-6 mb-2">
                    <label htmlFor="maritalStatus">Marital Status</label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      name="MaritalStatus"
                      value={updateLoanApplicationFormData.MaritalStatus}
                      onChange={handleLoanApplicationUpdateChange}
                    >
                      <option value="" disabled selected>
                        Choose Marital Status...
                      </option>
                      <option value="Married">Married</option>
                      <option value="Unmarried">Unmarried</option>
                    </select>
                  </div>
                  {updateLoanApplicationFormData.MaritalStatus ===
                    "Married" && (
                    <div className="form-group col-12 col-lg-6 mb-2">
                      <label htmlFor="SpouseName">Spouse Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="SpouseName"
                        name="SpouseName"
                        value={updateLoanApplicationFormData.SpouseName}
                        onChange={handleLoanApplicationUpdateChange}
                      />
                    </div>
                  )}
                </div>
                <div className="row">
                  <div className="form-group col-12 col-lg-6 mb-2">
                    <label htmlFor="Qualification">Qualification</label>
                    <input
                      type="text"
                      className="form-control"
                      id="Qualification"
                      name="Qualification"
                      value={updateLoanApplicationFormData.Qualification}
                      onChange={handleLoanApplicationUpdateChange}
                    />
                  </div>
                  <div className="form-group col-12 col-lg-6 mb-2">
                    <label htmlFor="PropertyStatus">Property Status</label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      name="PropertyStatus"
                      value={updateLoanApplicationFormData.PropertyStatus}
                      onChange={handleLoanApplicationUpdateChange}
                    >
                      <option value="" disabled selected>
                        Choose Property Status...
                      </option>
                      <option value="Own">Own</option>
                      <option value="Rented">Rented</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-12 col-lg-6 mb-2">
                    <label htmlFor="CurrentAddressLine1">
                      Current Address Line 1
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="CurrentAddressLine1"
                      name="CurrentAddressLine1"
                      value={updateLoanApplicationFormData.CurrentAddressLine1}
                      onChange={handleLoanApplicationUpdateChange}
                    />
                  </div>
                  <div className="form-group col-12 col-lg-6 mb-2">
                    <label htmlFor="CurrentAddressLine2">
                      Current Address Line 2
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="CurrentAddressLine2"
                      name="CurrentAddressLine2"
                      value={updateLoanApplicationFormData.CurrentAddressLine2}
                      onChange={handleLoanApplicationUpdateChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-12 col-lg-6 mb-2">
                    <label htmlFor="CurrentCity">Current City</label>
                    <input
                      type="text"
                      className="form-control"
                      id="CurrentCity"
                      name="CurrentCity"
                      value={updateLoanApplicationFormData.CurrentCity}
                      onChange={handleLoanApplicationUpdateChange}
                    />
                  </div>
                  <div className="form-group col-12 col-lg-6 mb-2">
                    <label htmlFor="CurrentLandmark">Current Landmark</label>
                    <input
                      type="text"
                      className="form-control"
                      id="CurrentLandmark"
                      name="CurrentLandmark"
                      value={updateLoanApplicationFormData.CurrentLandmark}
                      onChange={handleLoanApplicationUpdateChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-12 col-lg-6 mb-2">
                    <label htmlFor="CurrentState">Current State</label>
                    <select
                      className="form-select"
                      id="CurrentState"
                      name="CurrentState"
                      value={updateLoanApplicationFormData.CurrentState}
                      onChange={handleLoanApplicationUpdateChange}
                    >
                      <option value="" disabled selected>
                        Choose Your Current State
                      </option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Arunachal Pradesh">
                        Arunachal Pradesh
                      </option>
                      <option value="Assam">Assam</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Chhattisgarh">Chhattisgarh</option>
                      <option value="Goa">Goa</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Himachal Pradesh">Himachal Pradesh</option>
                      <option value="Jharkhand">Jharkhand</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Manipur">Manipur</option>
                      <option value="Meghalaya">Meghalaya</option>
                      <option value="Mizoram">Mizoram</option>
                      <option value="Nagaland">Nagaland</option>
                      <option value="Odisha">Odisha</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Sikkim">Sikkim</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Tripura">Tripura</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Uttarakhand">Uttarakhand</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Andaman and Nicobar Islands">
                        Andaman and Nicobar Islands
                      </option>
                      <option value="Chandigarh">Chandigarh</option>
                      <option value="Dadra and Nagar Haveli and Daman and Diu">
                        Dadra and Nagar Haveli and Daman and Diu
                      </option>
                      <option value="Lakshadweep">Lakshadweep</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Puducherry">Puducherry</option>
                    </select>
                  </div>
                  <div className="form-group col-12 col-lg-6 mb-2">
                    <label htmlFor="CurrentPinCode">Current Pin Code</label>
                    <input
                      type="text"
                      className="form-control"
                      id="CurrentPinCode"
                      name="CurrentPinCode"
                      value={updateLoanApplicationFormData.CurrentPinCode}
                      onChange={handleLoanApplicationUpdateChange}
                    />
                  </div>
                </div>
                {updateLoanApplicationFormData.PropertyStatus === "Rented" && (
                  <>
                    <div className="row">
                      <div className="form-group col-12 col-lg-6 mb-2">
                        <label htmlFor="PermanentAddressLine1">
                          Permanent Address Line 1
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="PermanentAddressLine1"
                          name="PermanentAddressLine1"
                          value={
                            updateLoanApplicationFormData.PermanentAddressLine1
                          }
                          onChange={handleLoanApplicationUpdateChange}
                        />
                      </div>
                      <div className="form-group col-12 col-lg-6 mb-2">
                        <label htmlFor="PermanentAddressLine2">
                          Permanent Address Line 2
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="PermanentAddressLine2"
                          name="PermanentAddressLine2"
                          value={
                            updateLoanApplicationFormData.PermanentAddressLine2
                          }
                          onChange={handleLoanApplicationUpdateChange}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-12 col-lg-6 mb-2">
                        <label htmlFor="PermanentCity">Permanent City</label>
                        <input
                          type="text"
                          className="form-control"
                          id="PermanentCity"
                          name="PermanentCity"
                          value={updateLoanApplicationFormData.PermanentCity}
                          onChange={handleLoanApplicationUpdateChange}
                        />
                      </div>
                      <div className="form-group col-12 col-lg-6 mb-2">
                        <label htmlFor="PermanentLandmark">
                          Permanent Landmark
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="PermanentLandmark"
                          name="PermanentLandmark"
                          value={
                            updateLoanApplicationFormData.PermanentLandmark
                          }
                          onChange={handleLoanApplicationUpdateChange}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-12 col-lg-6 mb-2">
                        <label htmlFor="PermanentState">Permanent State</label>
                        <select
                          className="form-select"
                          id="PermanentState"
                          name="PermanentState"
                          value={updateLoanApplicationFormData.PermanentState}
                          onChange={handleLoanApplicationUpdateChange}
                        >
                          <option value="" disabled selected>
                            Choose Your Permanent State
                          </option>
                          <option value="Andhra Pradesh">Andhra Pradesh</option>
                          <option value="Arunachal Pradesh">
                            Arunachal Pradesh
                          </option>
                          <option value="Assam">Assam</option>
                          <option value="Bihar">Bihar</option>
                          <option value="Chhattisgarh">Chhattisgarh</option>
                          <option value="Goa">Goa</option>
                          <option value="Gujarat">Gujarat</option>
                          <option value="Haryana">Haryana</option>
                          <option value="Himachal Pradesh">
                            Himachal Pradesh
                          </option>
                          <option value="Jharkhand">Jharkhand</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Kerala">Kerala</option>
                          <option value="Madhya Pradesh">Madhya Pradesh</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Manipur">Manipur</option>
                          <option value="Meghalaya">Meghalaya</option>
                          <option value="Mizoram">Mizoram</option>
                          <option value="Nagaland">Nagaland</option>
                          <option value="Odisha">Odisha</option>
                          <option value="Punjab">Punjab</option>
                          <option value="Rajasthan">Rajasthan</option>
                          <option value="Sikkim">Sikkim</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          <option value="Telangana">Telangana</option>
                          <option value="Tripura">Tripura</option>
                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                          <option value="Uttarakhand">Uttarakhand</option>
                          <option value="West Bengal">West Bengal</option>
                          <option value="Andaman and Nicobar Islands">
                            Andaman and Nicobar Islands
                          </option>
                          <option value="Chandigarh">Chandigarh</option>
                          <option value="Dadra and Nagar Haveli and Daman and Diu">
                            Dadra and Nagar Haveli and Daman and Diu
                          </option>
                          <option value="Lakshadweep">Lakshadweep</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Puducherry">Puducherry</option>
                        </select>
                      </div>
                      <div className="form-group col-12 col-lg-6 mb-2">
                        <label htmlFor="PermanentPinCode">
                          Permanent Pin Code
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="PermanentPinCode"
                          name="PermanentPinCode"
                          value={updateLoanApplicationFormData.PermanentPinCode}
                          onChange={handleLoanApplicationUpdateChange}
                        />
                      </div>
                    </div>
                  </>
                )}
                <div className="row">
                  <div className="form-group col-12 col-lg-6 mb-2">
                    <label htmlFor="Designation">Designation</label>
                    <input
                      type="text"
                      className="form-control"
                      id="Designation"
                      name="Designation"
                      value={updateLoanApplicationFormData.Designation}
                      onChange={handleLoanApplicationUpdateChange}
                    />
                  </div>
                  <div className="form-group col-12 col-lg-6 mb-2">
                    <label htmlFor="CurrentCompanyWorkExperience">
                      Current Company Work Experience
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="CurrentCompanyWorkExperience"
                      name="CurrentCompanyWorkExperience"
                      value={
                        updateLoanApplicationFormData.CurrentCompanyWorkExperience
                      }
                      onChange={handleLoanApplicationUpdateChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-12 col-lg-6 mb-2">
                    <label htmlFor="TotalWorkExperience">
                      Total Work Experience
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="TotalWorkExperience"
                      name="TotalWorkExperience"
                      value={updateLoanApplicationFormData.TotalWorkExperience}
                      onChange={handleLoanApplicationUpdateChange}
                    />
                  </div>
                  <div className="form-group col-12 col-lg-6 mb-2">
                    <label htmlFor="CompanyType">Company Type</label>
                    <input
                      type="text"
                      className="form-control"
                      id="CompanyType"
                      name="CompanyType"
                      value={updateLoanApplicationFormData.CompanyType}
                      onChange={handleLoanApplicationUpdateChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-12 col-lg-6 mb-2">
                    <label htmlFor="OfficialMail">Official Mail</label>
                    <input
                      type="text"
                      className="form-control"
                      id="OfficialMail"
                      name="OfficialMail"
                      value={updateLoanApplicationFormData.OfficialMail}
                      onChange={handleLoanApplicationUpdateChange}
                    />
                  </div>
                  <div className="form-group col-12 col-lg-6 mb-2">
                    <label htmlFor="CompanyAddress">Company Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="CompanyAddress"
                      name="CompanyAddress"
                      value={updateLoanApplicationFormData.CompanyAddress}
                      onChange={handleLoanApplicationUpdateChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-12 col-lg-6 mb-2">
                    <label htmlFor="CompanyCity">Company City</label>
                    <input
                      type="text"
                      className="form-control"
                      id="CompanyCity"
                      name="CompanyCity"
                      value={updateLoanApplicationFormData.CompanyCity}
                      onChange={handleLoanApplicationUpdateChange}
                    />
                  </div>
                  <div className="form-group col-12 col-lg-6 mb-2">
                    <label htmlFor="CompanyState">Company State</label>
                    <select
                      className="form-select"
                      id="CompanyState"
                      name="CompanyState"
                      value={updateLoanApplicationFormData.CompanyState}
                      onChange={handleLoanApplicationUpdateChange}
                    >
                      <option value="" disabled selected>
                        Choose Your Company State
                      </option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Arunachal Pradesh">
                        Arunachal Pradesh
                      </option>
                      <option value="Assam">Assam</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Chhattisgarh">Chhattisgarh</option>
                      <option value="Goa">Goa</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Himachal Pradesh">Himachal Pradesh</option>
                      <option value="Jharkhand">Jharkhand</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Manipur">Manipur</option>
                      <option value="Meghalaya">Meghalaya</option>
                      <option value="Mizoram">Mizoram</option>
                      <option value="Nagaland">Nagaland</option>
                      <option value="Odisha">Odisha</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Sikkim">Sikkim</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Tripura">Tripura</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Uttarakhand">Uttarakhand</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Andaman and Nicobar Islands">
                        Andaman and Nicobar Islands
                      </option>
                      <option value="Chandigarh">Chandigarh</option>
                      <option value="Dadra and Nagar Haveli and Daman and Diu">
                        Dadra and Nagar Haveli and Daman and Diu
                      </option>
                      <option value="Lakshadweep">Lakshadweep</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Puducherry">Puducherry</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-12 col-lg-6 mb-2">
                    <label htmlFor="CompanyPinCode">Company Pin Code</label>
                    <input
                      type="text"
                      className="form-control"
                      id="CompanyPinCode"
                      name="CompanyPinCode"
                      value={updateLoanApplicationFormData.CompanyPinCode}
                      onChange={handleLoanApplicationUpdateChange}
                    />
                  </div>
                  <div className="form-group col-12 col-lg-6 mb-2">
                    <label htmlFor="SalaryAccountBankName">
                      Salary Account Bank Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="SalaryAccountBankName"
                      name="SalaryAccountBankName"
                      value={
                        updateLoanApplicationFormData.SalaryAccountBankName
                      }
                      onChange={handleLoanApplicationUpdateChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-12 col-lg-6 mb-2">
                    <label htmlFor="AnnualCTC">Annual CTC</label>
                    <input
                      type="text"
                      className="form-control"
                      id="AnnualCTC"
                      name="AnnualCTC"
                      value={updateLoanApplicationFormData.AnnualCTC}
                      onChange={handleLoanApplicationUpdateChange}
                    />
                  </div>
                  <div className="form-group col-12 col-lg-6 mb-2">
                    <label htmlFor="NetSalary">Net Salary</label>
                    <input
                      type="text"
                      className="form-control"
                      id="NetSalary"
                      name="NetSalary"
                      value={updateLoanApplicationFormData.NetSalary}
                      onChange={handleLoanApplicationUpdateChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-12 col-lg-6 mb-2">
                    <label htmlFor="TenureofLoan">Tenure of Loan</label>
                    <input
                      type="text"
                      className="form-control"
                      id="TenureofLoan"
                      name="TenureofLoan"
                      value={updateLoanApplicationFormData.TenureofLoan}
                      onChange={handleLoanApplicationUpdateChange}
                    />
                  </div>
                  <div className="form-group col-12 col-lg-6 mb-2">
                    <label htmlFor="Reference1FullNameRelative">
                      Reference 1 Full Name (Relative)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="Reference1FullNameRelative"
                      name="Reference1FullNameRelative"
                      value={
                        updateLoanApplicationFormData.Reference1FullNameRelative
                      }
                      onChange={handleLoanApplicationUpdateChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-12 col-lg-6 mb-2">
                    <label htmlFor="Reference1MobileNumber">
                      Reference 1 Mobile Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="Reference1MobileNumber"
                      name="Reference1MobileNumber"
                      value={
                        updateLoanApplicationFormData.Reference1MobileNumber
                      }
                      onChange={handleLoanApplicationUpdateChange}
                    />
                  </div>
                  <div className="form-group col-12 col-lg-6 mb-2">
                    <label htmlFor="Reference1AddressLine">
                      Reference 1 Address Line
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="Reference1AddressLine"
                      name="Reference1AddressLine"
                      value={
                        updateLoanApplicationFormData.Reference1AddressLine
                      }
                      onChange={handleLoanApplicationUpdateChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-12 col-lg-6 mb-2">
                    <label htmlFor="Reference1City">Reference 1 City</label>
                    <input
                      type="text"
                      className="form-control"
                      id="Reference1City"
                      name="Reference1City"
                      value={updateLoanApplicationFormData.Reference1City}
                      onChange={handleLoanApplicationUpdateChange}
                    />
                  </div>
                  <div className="form-group col-12 col-lg-6 mb-2">
                    <label htmlFor="Reference1State">Reference 1 State</label>
                    <select
                      className="form-select"
                      id="Reference1State"
                      name="Reference1State"
                      value={updateLoanApplicationFormData.Reference1State}
                      onChange={handleLoanApplicationUpdateChange}
                    >
                      <option value="" disabled selected>
                        Choose Your Reference 1 State
                      </option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Arunachal Pradesh">
                        Arunachal Pradesh
                      </option>
                      <option value="Assam">Assam</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Chhattisgarh">Chhattisgarh</option>
                      <option value="Goa">Goa</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Himachal Pradesh">Himachal Pradesh</option>
                      <option value="Jharkhand">Jharkhand</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Manipur">Manipur</option>
                      <option value="Meghalaya">Meghalaya</option>
                      <option value="Mizoram">Mizoram</option>
                      <option value="Nagaland">Nagaland</option>
                      <option value="Odisha">Odisha</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Sikkim">Sikkim</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Tripura">Tripura</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Uttarakhand">Uttarakhand</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Andaman and Nicobar Islands">
                        Andaman and Nicobar Islands
                      </option>
                      <option value="Chandigarh">Chandigarh</option>
                      <option value="Dadra and Nagar Haveli and Daman and Diu">
                        Dadra and Nagar Haveli and Daman and Diu
                      </option>
                      <option value="Lakshadweep">Lakshadweep</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Puducherry">Puducherry</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-12 col-lg-6 mb-2">
                    <label htmlFor="Reference1PinCode">
                      Reference 1 Pin Code
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="Reference1PinCode"
                      name="Reference1PinCode"
                      value={updateLoanApplicationFormData.Reference1PinCode}
                      onChange={handleLoanApplicationUpdateChange}
                    />
                  </div>
                  <div className="form-group col-12 col-lg-6 mb-2">
                    <label htmlFor="Reference2FullNameFriend">
                      Reference 2 Full Name (Friend)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="Reference2FullNameFriend"
                      name="Reference2FullNameFriend"
                      value={
                        updateLoanApplicationFormData.Reference2FullNameFriend
                      }
                      onChange={handleLoanApplicationUpdateChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-12 col-lg-6 mb-2">
                    <label htmlFor="Reference2MobileNumber">
                      Reference 2 Mobile Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="Reference2MobileNumber"
                      name="Reference2MobileNumber"
                      value={
                        updateLoanApplicationFormData.Reference2MobileNumber
                      }
                      onChange={handleLoanApplicationUpdateChange}
                    />
                  </div>
                  <div className="form-group col-12 col-lg-6 mb-2">
                    <label htmlFor="Reference2AddressLine">
                      Reference 2 Address Line
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="Reference2AddressLine"
                      name="Reference2AddressLine"
                      value={
                        updateLoanApplicationFormData.Reference2AddressLine
                      }
                      onChange={handleLoanApplicationUpdateChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-12 col-lg-6 mb-2">
                    <label htmlFor="Reference2City">Reference 2 City</label>
                    <input
                      type="text"
                      className="form-control"
                      id="Reference2City"
                      name="Reference2City"
                      value={updateLoanApplicationFormData.Reference2City}
                      onChange={handleLoanApplicationUpdateChange}
                    />
                  </div>
                  <div className="form-group col-12 col-lg-6 mb-2">
                    <label htmlFor="Reference2State">Reference 2 State</label>
                    <select
                      className="form-select"
                      id="Reference2State"
                      name="Reference2State"
                      value={updateLoanApplicationFormData.Reference2State}
                      onChange={handleLoanApplicationUpdateChange}
                    >
                      <option value="" disabled selected>
                        Choose Your Reference 2 State
                      </option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Arunachal Pradesh">
                        Arunachal Pradesh
                      </option>
                      <option value="Assam">Assam</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Chhattisgarh">Chhattisgarh</option>
                      <option value="Goa">Goa</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Himachal Pradesh">Himachal Pradesh</option>
                      <option value="Jharkhand">Jharkhand</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Manipur">Manipur</option>
                      <option value="Meghalaya">Meghalaya</option>
                      <option value="Mizoram">Mizoram</option>
                      <option value="Nagaland">Nagaland</option>
                      <option value="Odisha">Odisha</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Sikkim">Sikkim</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Tripura">Tripura</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Uttarakhand">Uttarakhand</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Andaman and Nicobar Islands">
                        Andaman and Nicobar Islands
                      </option>
                      <option value="Chandigarh">Chandigarh</option>
                      <option value="Dadra and Nagar Haveli and Daman and Diu">
                        Dadra and Nagar Haveli and Daman and Diu
                      </option>
                      <option value="Lakshadweep">Lakshadweep</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Puducherry">Puducherry</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-12 col-lg-6 mb-2">
                    <label htmlFor="Reference2PinCode">
                      Reference 2 Pin Code
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="Reference2PinCode"
                      name="Reference2PinCode"
                      value={updateLoanApplicationFormData.Reference2PinCode}
                      onChange={handleLoanApplicationUpdateChange}
                    />
                  </div>
                </div>
                <button
                  style={{ backgroundColor: "#036E8C", color: "white" }}
                  className="btn"
                  onClick={UpdateloanApplicationForm}
                >
                  Submit
                </button>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default CustomerDashboard;
