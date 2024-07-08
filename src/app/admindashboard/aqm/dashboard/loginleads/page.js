"use client";
import React, { useState } from "react";
import Sidebar from "@/app/admindashboard/sidebar/page";
import Header from "@/app/admindashboard/header/page";

const AQMLoginLeadsData = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
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
            <h3>AQM Login Leads Data</h3>
          </div>
        </section>
      </div>
    </>
  );
};

export default AQMLoginLeadsData;
