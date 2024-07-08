"use client";
import { useState } from "react";
import "../../styles.css";
import Sidebar from "../sidebar/page";
import Header from "../header/page";
import Link from "next/link";

const ImportentLinks = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch("https://api.addrupee.com/download");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "sample.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading CSV:", error.message);
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
            <h2 style={{ fontWeight: 700, color: "#264653" }}>
              Importent Links
            </h2>
            <div
              style={{ display: "flex", flexDirection: "column" }}
              className="row py-5"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  boxShadow:
                    "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                }}
                className="col-md-6 p-2 my-2"
              >
                <h5 style={{ fontWeight: 600, color: "#264653" }}>
                  Detail Sheet
                </h5>
                <button
                  style={{ backgroundColor: "#036E8C", color: "#fff" }}
                  className="btn"
                  onClick={handleDownload}
                >
                  Download
                </button>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  boxShadow:
                    "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                }}
                className="col-md-6 p-2 my-2"
              >
                <h5 style={{ fontWeight: 600, color: "#264653" }}>
                  Id Card Template
                </h5>
                <Link
                  style={{ backgroundColor: "#036E8C", color: "#fff" }}
                  className="btn"
                  href="#"
                >
                  Link
                </Link>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  boxShadow:
                    "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                }}
                className="col-md-6 p-2 my-2"
              >
                <h5 style={{ fontWeight: 600, color: "#264653" }}>
                  Inquiry Form
                </h5>
                <Link
                  style={{ backgroundColor: "#036E8C", color: "#fff" }}
                  className="btn"
                  href="https://addrupee.com/inquiry-form"
                >
                  Link
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ImportentLinks;
