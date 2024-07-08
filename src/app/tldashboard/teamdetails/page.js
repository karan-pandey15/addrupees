"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TlSidebar from "../tlsidebar/page";
import TlHeader from "../tlheader/page";
import { format } from "date-fns";
import Dropdown from "react-bootstrap/Dropdown";

const Teamdetails = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [teamDetails, setTeamDetails] = useState([]);
  const [teamLeaderEmail, setTeamLeaderEmail] = useState(null);
  const [TL_Name, setTLName] = useState(null);

  const Router = useRouter();

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        const response = await fetch(
          `https://api.addrupee.com/api/getteamdetails/${TL_Name}/${teamLeaderEmail}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setTeamDetails(result.employees);
      } catch (error) {
        console.error("Error fetching team leader details:", error.message);
      }
    };

    if (TL_Name && teamLeaderEmail) {
      fetchTeamDetails();
    }
  }, [TL_Name, teamLeaderEmail]);

  useEffect(() => {
    setTeamLeaderEmail(localStorage.getItem("teamLeaderEmail"));
  }, []);

  useEffect(() => {
    setTLName(localStorage.getItem("TL_Name"));
  }, []);

  const handleTeamLeaderClick = (aqmEmailID) => {
    localStorage.setItem("aqmEmailID", aqmEmailID);
    Router.push(`/tldashboard/teamdetails/${aqmEmailID}`);
  };

  const handleStatusChange = async (aqmEmailID, isActive) => {
    try {
      const response = await fetch(
        `https://api.addrupee.com/api/is_aqm_active/${aqmEmailID}`,
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
              Total Team Members: {teamDetails.length}
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
              }}
            >
              <div key={teamDetails._id} class="table-responsive">
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
                    {teamDetails.map((aqm, index) => (
                      <tr
                        style={{
                          textAlign: "center",
                        }}
                        key={teamDetails._id}
                      >
                        <td style={{ fontSize: "14px" }}>{index + 1}</td>
                        <td style={{ fontSize: "14px" }}>{aqm.name}</td>
                        <td style={{ fontSize: "14px" }}>{aqm.email}</td>
                        <td style={{ fontSize: "14px" }}>{aqm.employeeId}</td>
                        <td style={{ fontSize: "14px" }}>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant={
                                aqm.is_active === true ? "success" : "danger"
                              }
                              id="dropdown-basic"
                              style={{ fontSize: "14px" }}
                            >
                              {aqm.is_active === true ? "Active" : "Inactive"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              {aqm.is_active === false ? (
                                <Dropdown.Item
                                  style={{ fontSize: "14px" }}
                                  onClick={() =>
                                    handleStatusChange(aqm.email, true)
                                  }
                                >
                                  Active
                                </Dropdown.Item>
                              ) : (
                                <Dropdown.Item
                                  style={{ fontSize: "14px" }}
                                  onClick={() =>
                                    handleStatusChange(aqm.email, false)
                                  }
                                >
                                  Inactive
                                </Dropdown.Item>
                              )}
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                        <td style={{ fontSize: "14px" }}>
                          {format(new Date(aqm.registrationDate), "dd/MM/yyyy")}
                        </td>
                        <td style={{ fontSize: "14px" }}>
                          <Link
                            className="btn btn-dark"
                            href={`/tldashboard/teamdetails/${aqm.email}`}
                          >
                            <div
                              onClick={() => handleTeamLeaderClick(aqm.email)}
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

export default Teamdetails;
