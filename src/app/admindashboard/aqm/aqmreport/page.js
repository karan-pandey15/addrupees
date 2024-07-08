"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Sidebar from "../../sidebar/page";
import Header from "../../header/page";
import { format } from "date-fns";
import Dropdown from "react-bootstrap/Dropdown";

const AQMReports = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [aqm, setAqm] = useState([]);

  const router = useRouter();

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const fetchAQM = async () => {
    try {
      const response = await fetch(
        "https://api.addrupee.com/api/getaqmdetails"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setAqm(result.employees);
    } catch (error) {
      console.error("Error fetching team leader details:", error.message);
    }
  };

  const handleAQMClick = (aqmEmailID) => {
    localStorage.setItem("aqmEmailID", aqmEmailID);
    router.push(`/admindashboard/aqm/aqmreport/${aqmEmailID}`);
  };

  useEffect(() => {
    fetchAQM();
  }, []);

  const handleStatusChange = async (aqmEmailID, isActive) => {
    try {
      const response = await fetch(
        `https://api.addrupee.com/api/is_employee_active/${aqmEmailID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isActive }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      window.location.reload();
    } catch (error) {
      console.error("Error occurred while updating the AQM status: ", error);
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
            <h3
              style={{
                fontSize: "30px",
                fontWeight: 700,
                color: "#264653",
                textAlign: "center",
              }}
            >
              Team Details
            </h3>
            <p style={{ fontWeight: 600, fontSize: "18px", color: "#264653" }}>
              Total Number of AQM: {aqm.length}
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
              }}
            >
              <div key={aqm._id} class="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr style={{ textAlign: "center" }}>
                      <th style={{ fontSize: "14px" }} scope="col">
                        S. No.
                      </th>
                      <th style={{ fontSize: "14px" }} scope="col">
                        AQM Name
                      </th>
                      <th style={{ fontSize: "14px" }} scope="col">
                        Email ID
                      </th>
                      <th style={{ fontSize: "14px" }} scope="col">
                        TL Name
                      </th>
                      <th style={{ fontSize: "14px" }} scope="col">
                        Employee ID
                      </th>
                      <th style={{ fontSize: "14px" }} scope="col">
                        Status
                      </th>
                      <th style={{ fontSize: "14px" }} scope="col">
                        Registration Date
                      </th>
                      <th style={{ fontSize: "14px" }} scope="col">
                        Dashboard
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {aqm.map((employee, index) => (
                      <tr
                        style={{
                          textAlign: "center",
                        }}
                        key={aqm._id}
                      >
                        <td style={{ fontSize: "14px" }}>{index + 1}</td>
                        <td style={{ fontSize: "14px" }}>{employee.name}</td>
                        <td style={{ fontSize: "14px" }}>{employee.email}</td>
                        <td style={{ fontSize: "14px" }}>{employee.TL_Name}</td>
                        <td style={{ fontSize: "14px" }}>
                          {employee.employeeId}
                        </td>
                        <td style={{ fontSize: "14px" }}>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant={
                                employee.is_active === true
                                  ? "success"
                                  : "danger"
                              }
                              id="dropdown-basic"
                              style={{ fontSize: "14px" }}
                            >
                              {employee.is_active === true
                                ? "Active"
                                : "Inactive"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              {employee.is_active === false ? (
                                <Dropdown.Item
                                  style={{ fontSize: "14px" }}
                                  onClick={() =>
                                    handleStatusChange(employee.email, true)
                                  }
                                >
                                  Active
                                </Dropdown.Item>
                              ) : (
                                <Dropdown.Item
                                  style={{ fontSize: "14px" }}
                                  onClick={() =>
                                    handleStatusChange(employee.email, false)
                                  }
                                >
                                  Inactive
                                </Dropdown.Item>
                              )}
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                        <td style={{ fontSize: "14px" }}>
                          {format(
                            new Date(employee.registrationDate),
                            "dd/MM/yyyy"
                          )}
                        </td>
                        <td style={{ fontSize: "14px" }}>
                          <Link
                            className="btn btn-dark"
                            href={`/admindashboard/aqm/aqmreport/${employee.email}`}
                          >
                            <div
                              onClick={() => handleAQMClick(employee.email)}
                              style={{ fontSize: "14px" }}
                            >
                              Go to Dashboard
                            </div>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AQMReports;
