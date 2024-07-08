"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Sidebar from "../../sidebar/page";
import Header from "../../header/page";
import { format } from "date-fns";
import Dropdown from "react-bootstrap/Dropdown";

const TeamLeaderReports = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [teamLeaders, setTeamLeaders] = useState([]);
  const [teamSize, setTeamSize] = useState([]);

  const Router = useRouter();

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const fetchTeamLeaders = async () => {
    try {
      const response = await fetch(
        "https://api.addrupee.com/api/getteamleaderdetails"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setTeamLeaders(result.employees);
    } catch (error) {
      console.error("Error fetching team leader details:", error.message);
    }
  };

  const fetchAQMBasedOnTeamLeader = async (teamLeaderName) => {
    try {
      const response = await fetch(
        `https://api.addrupee.com/api/aqm_based_on_team_leader/${teamLeaderName}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setTeamSize(result.employees);
    } catch (error) {
      console.error("Error fetching team leader details:", error.message);
    }
  };

  const handleTeamLeaderClick = (tlName) => {
    localStorage.setItem("TL_Name", tlName);
    Router.push(`/admindashboard/teamleader/teamleaderreports/${tlName}`);
  };

  useEffect(() => {
    fetchTeamLeaders();
  }, []);

  useEffect(() => {
    teamLeaders.forEach((tl) => {
      fetchAQMBasedOnTeamLeader(tl.name);
    });
  }, [teamLeaders]);

  const handleStatusChange = async (teamLeaderName, isActive) => {
    try {
      const response = await fetch(
        `https://api.addrupee.com/api/is_teamleader_active/${teamLeaderName}`,
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
              Total Team Leaders: {teamLeaders.length}
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
              }}
            >
              <div key={teamLeaders._id} class="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr style={{ textAlign: "center" }}>
                      <th style={{ fontSize: "14px" }} scope="col">
                        S. No.
                      </th>
                      <th style={{ fontSize: "14px" }} scope="col">
                        TL Name
                      </th>
                      <th style={{ fontSize: "14px" }} scope="col">
                        Email ID
                      </th>
                      <th style={{ fontSize: "14px" }} scope="col">
                        Employee ID
                      </th>
                      <th style={{ fontSize: "14px" }} scope="col">
                        Team Size
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
                    {teamLeaders.map((tl, index) => (
                      <tr
                        style={{
                          textAlign: "center",
                        }}
                        key={teamLeaders._id}
                      >
                        <td style={{ fontSize: "14px" }}>{index + 1}</td>
                        <td style={{ fontSize: "14px" }}>{tl.name}</td>
                        <td style={{ fontSize: "14px" }}>{tl.email}</td>
                        <td style={{ fontSize: "14px" }}>{tl.employeeId}</td>
                        <td style={{ fontSize: "14px" }}>{teamSize.length}</td>
                        <td style={{ fontSize: "14px" }}>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant={
                                tl.is_active === true ? "success" : "danger"
                              }
                              id="dropdown-basic"
                              style={{ fontSize: "14px" }}
                            >
                              {tl.is_active === true ? "Active" : "Inactive"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              {tl.is_active === false ? (
                                <Dropdown.Item
                                  style={{ fontSize: "14px" }}
                                  onClick={() =>
                                    handleStatusChange(tl.name, true)
                                  }
                                >
                                  Active
                                </Dropdown.Item>
                              ) : (
                                <Dropdown.Item
                                  style={{ fontSize: "14px" }}
                                  onClick={() =>
                                    handleStatusChange(tl.name, false)
                                  }
                                >
                                  Inactive
                                </Dropdown.Item>
                              )}
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                        <td style={{ fontSize: "14px" }}>
                          {format(new Date(tl.registrationDate), "dd/MM/yyyy")}
                        </td>
                        <td style={{ fontSize: "14px" }}>
                          <Link
                            className="btn btn-dark"
                            href={`/admindashboard/teamleader/teamleaderreports/${tl.name}`}
                          >
                            <div
                              onClick={() => handleTeamLeaderClick(tl.name)}
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

export default TeamLeaderReports;
