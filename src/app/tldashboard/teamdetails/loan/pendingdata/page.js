"use client";
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import * as XLSX from "xlsx";
import TlHeader from "@/app/tldashboard/tlheader/page";
import TlSidebar from "@/app/tldashboard/tlsidebar/page";

const AQMPendingData = () => {
  const [allData, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [formData, setFormData] = useState({});
  const [formType, setFormType] = useState("");

  const [searchItem, setSearchItem] = useState("");
  const [sortedData, setSortedData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 10;

  const [selectedFilter, setSelectedFilter] = useState("from1to31");
  const [selectedBankFilter, setSelectedBankFilter] = useState("all");
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const [aqmEmailID, setAqmEmailID] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("aqmEmailID");
    if (email) {
      setAqmEmailID(email);
    }
  }, []);

  const fetchAlldata = async () => {
    const Status = "Pending";
    let data = await fetch(
      `https://api.addrupee.com/api/get_aqm_pending_data/${aqmEmailID}?Status=${Status}&filter=${selectedFilter}&bankFilter=${selectedBankFilter}`,
      {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );

    let result = await data.json();
    setData(result);
  };

  const handleDelete = async (_id) => {
    try {
      const response = await fetch(
        `https://api.addrupee.com/api/deletePendingData/${_id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      const result = await response.json();

      if (response.status === 200) {
        console.log(result.message);
        fetchAlldata();
      } else {
        console.error("Error deleting data:", result.error);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleOpenModal = (data) => {
    setSelectedData(data);
    setShowModal(true);
    setFormType("");
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormTypeChange = (type) => {
    setFormType(type);
    setFormData({
      ...formData,
      Status: type === "Rejected" ? "Rejected" : "Disbursed",
    });
  };

  const handleSubmit = () => {
    if (selectedData && formType === "Approved") {
      const approvedData = {
        ...selectedData,
        ...formData,
        email: aqmEmailID,
      };

      axios
        .post(
          "https://api.addrupee.com/api/submit-approved-data",
          approvedData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            handleDelete(selectedData._id);
            handleCloseModal();
          } else {
            console.error("Error submitting data");
          }
        })
        .catch((error) => {
          console.error("Error submitting data:", error);
        });
    } else {
      console.error("Invalid data for submission");
    }
  };

  const handleRejectSubmit = () => {
    if (selectedData && formType === "Rejected") {
      const rejectedData = {
        ...selectedData,
        ...formData,
        email: aqmEmailID,
      };

      axios
        .post("https://api.addrupee.com/api/submit-rejct-data", rejectedData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            handleDelete(selectedData._id);
            handleCloseModal();
          } else {
            console.error("Error submitting data");
          }
        })
        .catch((error) => {
          console.error("Error submitting data:", error);
        });
    } else {
      console.error("Invalid data for submission");
    }
  };

  useEffect(() => {
    fetchAlldata();
  }, [aqmEmailID, selectedFilter, selectedBankFilter]);

  useEffect(() => {
    const sorted = [...allData].sort((a, b) => {
      const dateA = new Date(a.Upload_Date);
      const dateB = new Date(b.Upload_Date);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setSortedData(sorted);
  }, [allData, sortOrder]);

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  const filteredData = sortedData.filter((data) => {
    const searchString = searchItem.toLowerCase();

    const lowercaseData = {
      customerName: data.Customer_Name ? data.Customer_Name.toLowerCase() : "",
      companyName: data.Company_Name ? data.Company_Name.toLowerCase() : "",
      panCard: data.Pan_Card ? data.Pan_Card.toLowerCase() : "",
      location: data.Customer_Location
        ? data.Customer_Location.toLowerCase()
        : "",
      callerName: data.Caller_Name ? data.Caller_Name.toLowerCase() : "",
      appliedBank: data.Bank_Name ? data.Bank_Name.toLowerCase() : "",
      loginDate: data.Login_Date ? data.Login_Date.toLowerCase() : "",
      loginAmount: data.Loan_Amount_Applied
        ? data.Loan_Amount_Applied.toLowerCase()
        : "",
      uploadDate: data.Upload_Date ? data.Upload_Date.toLowerCase() : "",
    };

    return (
      lowercaseData.customerName.includes(searchString) ||
      lowercaseData.companyName.includes(searchString) ||
      lowercaseData.panCard.includes(searchString) ||
      lowercaseData.location.includes(searchString) ||
      lowercaseData.callerName.includes(searchString) ||
      lowercaseData.appliedBank.includes(searchString) ||
      lowercaseData.loginDate.includes(searchString) ||
      lowercaseData.loginAmount.includes(searchString) ||
      lowercaseData.uploadDate.includes(searchString)
    );
  });

  const startIndex = pageIndex * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Download the CSV file
  const handleDownload = (data) => {
    if (!data || !data.Upload_Date) {
      console.error("Invalid data for download. Data:", data);
      return;
    }

    const fieldsToInclude = [
      "Status",
      "Product_Loan",
      "Bank_Name",
      "Customer_Name",
      "Father_Name",
      "Mother_Name",
      "Mobile",
      "Personal_Email",
      "Pan_Card",
      "Customer_Location",
      "Company_Name",
      "Dob",
      "Login_Date",
      "Gender",
      "Religion",
      "Income_Source",
      "Marital_Status",
      "Spouse_Name",
      "Qualification",
      "Property_Status",
      "Aadhar_Card_No",
      "Current_Address_Line1",
      "Current_Address_Line2",
      "Current_City",
      "Current_Landmark",
      "Current_State",
      "Current_Pin",
      "Permanent_Address_Line1",
      "Permanent_Address_Line2",
      "Permanent_City",
      "Permanent_Landmark",
      "Permanent_State",
      "Permanent_Pin",
      "Designation",
      "Customer_Profile",
      "Current_Company_Work_Experience",
      "Total_Work_Experience",
      "Company_Vintage",
      "Company_Type",
      "Official_Mail",
      "Company_Address",
      "Company_City",
      "Company_State",
      "Company_Pin",
      "Salary_Account_BankName",
      "Current_Account_BankName",
      "Annual_Ctc",
      "Annual_Tenure",
      "Net_Salary",
      "Monthly_Income",
      "Obligations",
      "Scheme_Offered",
      "Loan_Amount_Applied",
      "Tenure_Of_Loan",
      "Credit_Card_Obligation",
      "Reference1_FullName_Relative",
      "Reference1_MobileNo",
      "Reference1_Address1",
      "Reference1_City",
      "Reference1_State",
      "Reference1_Pin",
      "Reference2_FullName_Friend",
      "Reference2_MobileNo",
      "Reference2_Address1",
      "Reference2_City",
      "Reference2_State",
      "Reference2_Pin",
      "Caller_Name",
      "TL_Name",
      "Manager_Name",
      "email",
    ];

    const cleanData = {};
    fieldsToInclude.forEach((field) => {
      const value = data[field];
      cleanData[field] =
        typeof value === "number" ? value.toLocaleString("en-US") : value;
    });

    const uploadDate = new Date(data.Upload_Date);

    const currentTime = new Date();

    const timeDifferenceInMilliseconds = currentTime - uploadDate;

    const timeDifferenceInHours =
      timeDifferenceInMilliseconds / (1000 * 60 * 60);

    if (timeDifferenceInHours <= 12) {
      const userConfirmed = window.confirm(
        "Are you sure you want to download the file?"
      );

      if (userConfirmed) {
        const worksheet = XLSX.utils.json_to_sheet([cleanData]);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");
        XLSX.writeFile(workbook, "data.xlsx");
      } else {
        alert("Download canceled.");
      }
    } else {
      alert("Download is only available within 12 hours of upload.");
    }
  };

  return (
    <>
      <div style={{ width: "100%", height: "100vh", display: "flex" }}>
        <TlSidebar
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
          <TlHeader OpenSidebar={OpenSidebar} />
          <div className="container" style={{ padding: "20px" }}>
            <div className="row">
              <div className="col-lg-4 col-md-6 col-12 mb-2">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search..."
                  value={searchItem}
                  onChange={(e) => setSearchItem(e.target.value)}
                />
              </div>
              <div className="col-lg-4 col-md-6 col-12 mb-2">
                <select
                  className="form-select"
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  value={selectedFilter}
                >
                  <option value="from1to31" selected>
                    Select Date Filter
                  </option>
                  <option value="lastday">From Last Day</option>
                  <option value="last7days">From Last 7 Days</option>
                  <option value="last30days">From Last 30 Days</option>
                  <option value="all">All Data</option>
                </select>
              </div>
              <div className="col-lg-4 col-md-6 col-12 mb-2">
                <select
                  onChange={(e) => setSelectedBankFilter(e.target.value)}
                  value={selectedBankFilter}
                  className="form-select"
                >
                  <option value="all">All Banks</option>
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
                  <option value="Paysense Services">Paysense Services</option>

                  <option value="IDFC first Bank">IDFC First Bank</option>
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
                  <option value="Piramal Capital">Piramal Capital</option>
                  <option value="RBL Bank">RBL Bank</option>

                  <option value="Muthoot Finance Ltd">
                    Muthoot Finance Ltd
                  </option>
                  <option value="IndusInd Bank Limited">
                    IndusInd Bank Limited
                  </option>
                  <option value="L&T Finance Ltd">L&T Finance Limited</option>
                  <option value="Hero Finance Ltd">Hero Finance Limited</option>
                  <option value="Bajaj Finance">Bajaj Finance</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div class="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th style={{ fontSize: "14px" }} scope="col">
                      S. No.
                    </th>
                    <th style={{ fontSize: "14px" }} scope="col">
                      Customer Name{" "}
                    </th>
                    <th style={{ fontSize: "14px" }} scope="col">
                      Company Name
                    </th>
                    <th style={{ fontSize: "14px" }} scope="col">
                      Pan No.
                    </th>
                    <th style={{ fontSize: "14px" }} scope="col">
                      Applied Bank
                    </th>
                    <th style={{ fontSize: "14px" }} scope="col">
                      Location
                    </th>
                    <th style={{ fontSize: "14px" }} scope="col">
                      AQM Name
                    </th>
                    <th style={{ fontSize: "14px" }} scope="col">
                      Login Amount
                    </th>
                    <th style={{ fontSize: "14px" }} scope="col">
                      Upload Date{" "}
                      <span style={{ cursor: "pointer" }} onClick={handleSort}>
                        {sortOrder === "asc" ? " ⬆" : " ⬇"}
                      </span>
                    </th>
                    <th style={{ fontSize: "14px" }} scope="col">
                      Status
                    </th>
                    <th style={{ fontSize: "14px" }} scope="col">
                      Download File
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((data, index) => (
                    <tr key={data.id}>
                      <td style={{ fontSize: "14px" }}>
                        {startIndex + index + 1}
                      </td>
                      <td style={{ fontSize: "14px" }}>{data.Customer_Name}</td>
                      <td style={{ fontSize: "14px" }}>{data.Company_Name}</td>
                      <td style={{ fontSize: "14px" }}>{data.Pan_Card}</td>
                      <td style={{ fontSize: "14px" }}>{data.Bank_Name}</td>
                      <td style={{ fontSize: "14px" }}>
                        {data.Customer_Location}
                      </td>
                      <td style={{ fontSize: "14px" }}>{data.Caller_Name}</td>
                      <td style={{ fontSize: "14px" }}>
                        {data.Loan_Amount_Applied}
                      </td>
                      <td style={{ fontSize: "14px" }}>
                        {new Date(data.Upload_Date).toLocaleDateString()}
                      </td>
                      <td style={{ fontSize: "14px" }}>
                        <div
                          className="btn btn-dark"
                          onClick={() => handleOpenModal(data)}
                        >
                          Pending
                        </div>
                      </td>
                      <td style={{ fontSize: "14px" }}>
                        <div
                          className="btn btn-light"
                          onClick={() => handleDownload(data)}
                        >
                          Download
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal show={showModal} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>Loan Application</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="firstDiv">
                  <p>Name: {selectedData ? selectedData.Customer_Name : ""}</p>
                  <p>
                    Company Name:{" "}
                    {selectedData ? selectedData.Company_Name : ""}
                  </p>
                  <p>Pan No: {selectedData ? selectedData.Pan_Card : ""}</p>
                  <p>
                    Applied Bank: {selectedData ? selectedData.Bank_Name : ""}
                  </p>
                  <p>
                    Customer Location:{" "}
                    {selectedData ? selectedData.Customer_Location : ""}
                  </p>
                  <p>
                    AQM Name: {selectedData ? selectedData.Caller_Name : ""}
                  </p>
                </div>

                <div className="mb-3">
                  <Button
                    variant="primary"
                    className="m-3"
                    onClick={() => handleFormTypeChange("Approved")}
                  >
                    Disbursed
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleFormTypeChange("Rejected")}
                  >
                    Rejected
                  </Button>
                </div>

                {formType === "Approved" && (
                  <div className="container">
                    <div className="row">
                      <div className="col-12 col-lg-6">
                        <label htmlFor="Status" className="form-label">
                          Status:
                        </label>
                        <input
                          type="text"
                          className="form-control mb-2"
                          name="Status"
                          value={formData.Status}
                          onChange={handleInputChange}
                          readOnly
                        />
                      </div>
                      <div className="col-12 col-lg-6">
                        <label
                          htmlFor="Disbursal_BankName"
                          className="form-label"
                        >
                          Disbursal BankName:
                        </label>
                        <select
                          className="form-select mb-2"
                          name="Disbursal_BankName"
                          onChange={handleInputChange}
                          aria-label="Multiple select example"
                          required
                        >
                          <option value="" disabled selected>
                            Choose Bank Names...
                          </option>
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
                          <option value="Incred Financial Services">
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
                          <option value="Shriram Finance Ltd">
                            Shriram Finance Ltd
                          </option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-lg-6">
                        <label htmlFor="Scheme" className="form-label">
                          Scheme:
                        </label>
                        <select
                          type="text"
                          className="form-select mb-2"
                          name="Scheme"
                          onChange={handleInputChange}
                        >
                          <option value="" disabled selected>
                            Select Scheme...
                          </option>
                          <option value="FRESH">FRESH</option>
                          <option value="BT">BT</option>
                          <option value="Top Up">Top Up</option>
                          <option value="BT + Top Up">BT + Top Up</option>
                          <option value="Parallel">Parallel</option>
                        </select>
                      </div>
                      <div className="col-12 col-lg-6">
                        <label
                          htmlFor="Loan_Application_No"
                          className="form-label"
                        >
                          Application Number:
                        </label>
                        <input
                          type="text"
                          className="form-control mb-2"
                          name="Loan_Application_No"
                          placeholder="Application Number"
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-lg-6">
                        <label htmlFor="Approved_Amount" className="form-label">
                          Approved Amount:
                        </label>
                        <input
                          type="text"
                          className="form-control mb-2"
                          name="Approved_Amount"
                          placeholder="Approved Amount"
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-12 col-lg-6">
                        <label
                          htmlFor="Disbursal_Loan_Amount"
                          className="form-label"
                        >
                          Disbursed Loan Amount:
                        </label>
                        <input
                          type="text"
                          className="form-control mb-2"
                          name="Disbursal_Loan_Amount"
                          placeholder="Disbursed Loan Amount"
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-lg-6">
                        <label
                          htmlFor="Inhand_Disb_Account"
                          className="form-label"
                        >
                          Inhand Disb Amount:
                        </label>
                        <input
                          type="text"
                          className="form-control mb-2"
                          name="Inhand_Disb_Account"
                          placeholder="Inhand Disbursed Amount"
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-12 col-lg-6">
                        <label htmlFor="Bt_Disb_Amount" className="form-label">
                          BT Disbursed Amount:
                        </label>
                        <input
                          type="text"
                          className="form-control mb-2"
                          name="Bt_Disb_Amount"
                          placeholder="BT Disbursed Amount"
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-lg-6">
                        <label htmlFor="Top_Up" className="form-label">
                          Top-Up:
                        </label>
                        <input
                          type="text"
                          className="form-control mb-2"
                          name="Top_Up"
                          placeholder="Top-Up"
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-12 col-lg-6">
                        <label htmlFor="Cibil" className="form-label">
                          CIBIL:
                        </label>
                        <input
                          type="text"
                          className="form-control mb-2"
                          name="Cibil"
                          placeholder="CIBIL"
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-lg-6">
                        <label
                          htmlFor="Tenure_Disbursal"
                          className="form-label"
                        >
                          Tenure Disbursal:
                        </label>
                        <input
                          type="text"
                          className="form-control mb-2"
                          name="Tenure_Disbursal"
                          placeholder="Tenure Disbursal"
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-12 col-lg-6">
                        <label htmlFor="Roi" className="form-label">
                          ROI:
                        </label>
                        <input
                          type="text"
                          className="form-control mb-2"
                          name="Roi"
                          placeholder="ROI"
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-lg-6">
                        <label htmlFor="pf" className="form-label">
                          PF:
                        </label>
                        <input
                          type="text"
                          className="form-control mb-2"
                          name="Pf"
                          placeholder="PF"
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-12 col-lg-6">
                        <label htmlFor="Insurance" className="form-label">
                          Insurance:
                        </label>
                        <input
                          type="text"
                          className="form-control mb-2"
                          name="Insurance"
                          placeholder="Insurance"
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-lg-6">
                        <label htmlFor="Emi" className="form-label">
                          EMI:
                        </label>
                        <input
                          type="text"
                          className="form-control mb-2"
                          name="Emi"
                          placeholder="EMI"
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-12 col-lg-6">
                        <label htmlFor="First_Emi_Date" className="form-label">
                          First EMI Date:
                        </label>
                        <input
                          type="date"
                          className="form-control mb-2"
                          name="First_Emi_Date"
                          placeholder="First EMI Date"
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12 col-lg-6">
                        <label htmlFor="Disbursal_Date" className="form-label">
                          Disbursal Date:
                        </label>
                        <input
                          type="date"
                          className="form-control mb-2"
                          name="Disbursal_Date"
                          placeholder="Disbursal Date"
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-12 col-lg-6">
                        <label
                          htmlFor="Dsa_Channel_Name"
                          className="form-label"
                        >
                          DSA Channel Name:
                        </label>
                        <input
                          type="text"
                          className="form-control mb-2"
                          name="Dsa_Channel_Name"
                          placeholder="DSA Channel Name"
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <Button variant="primary" onClick={handleSubmit}>
                      Submit
                    </Button>
                  </div>
                )}

                {formType === "Rejected" && (
                  <div className="container">
                    <div className="row">
                      <div className="col-12 col-lg-6">
                        <label htmlFor="Status" className="form-label">
                          Status:
                        </label>
                        <input
                          type="text"
                          className="form-control mb-2"
                          name="Status"
                          value={formData.Status}
                          onChange={handleInputChange}
                          readOnly
                        />
                      </div>
                      <div className="col-12 col-lg-6">
                        <label htmlFor="Rejection_Date" className="form-label">
                          Rejected Date:
                        </label>
                        <input
                          type="date"
                          className="form-control mb-2"
                          name="Rejection_Date"
                          placeholder="Rejected Date"
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="Rejection_Remark" className="form-label">
                        Rejected Category:
                      </label>

                      <select
                        type="text"
                        className="form-control mb-2"
                        name="Rejection_Remark"
                        onChange={handleInputChange}
                      >
                        <option selected disabled>
                          Select Rejected Category
                        </option>
                        <option value="Approved But Not Disbusred-ABND">
                          Approved But Not Disbusred-ABND
                        </option>
                        <option value="ROI ISSUE">ROI ISSUE</option>
                        <option value="CIBIL ISSUE">CIBIL ISSUE</option>
                        <option value="SERVICE ISSUE">SERVICE ISSUE</option>
                        <option value="OVER LEVERAGE">OVER LEVERAGE</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="Rejection_Description"
                        className="form-label"
                      >
                        Rejection Description:
                      </label>

                      <textarea
                        className="form-control mb-2"
                        name="Rejection_Description"
                        placeholder="Rejection Description"
                        rows="3"
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                    <Button variant="primary" onClick={handleRejectSubmit}>
                      Submit
                    </Button>
                  </div>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            <div style={{ textAlign: "center" }}>
              <button
                style={{
                  cursor: pageIndex === 0 ? "not-allowed" : "pointer",
                  border: "none",
                  color: pageIndex === 0 ? "black" : "white",
                  backgroundColor: pageIndex === 0 ? "lightgray" : "black",
                  borderRadius: "6px",
                  marginRight: "4px",
                }}
                onClick={() => handlePageChange(pageIndex - 1)}
                disabled={pageIndex === 0}
              >
                Prev
              </button>
              <span>
                <strong>{pageIndex + 1}</strong> of{" "}
                {Math.ceil(filteredData.length / pageSize)}
              </span>
              <button
                style={{
                  cursor:
                    endIndex >= filteredData.length ? "not-allowed" : "pointer",
                  border: "none",
                  color: endIndex >= filteredData.length ? "black" : "white",
                  backgroundColor:
                    endIndex >= filteredData.length ? "lightgray" : "black",
                  borderRadius: "6px",
                  marginLeft: "4px",
                }}
                onClick={() => handlePageChange(pageIndex + 1)}
                disabled={endIndex >= filteredData.length}
              >
                Next
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AQMPendingData;
