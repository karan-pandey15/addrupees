"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../../public/logo.png";
import "../../styles.css";

const EmployeeForgotPasswordOTPVerification = () => {
  const [otp, setOTP] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("");
  const router = useRouter();

  // Function to handle OTP verification
  const handleOTPVerification = () => {
    axios
      .post(
        "https://api.addrupee.com/api/employee-forgot-password-otp-verification",
        { code: otp }
      )
      .then((response) => {
        if (
          response.data.VerificationStatus === "Verified" ||
          response.data.VerificationStatus === "AlreadyVerified"
        ) {
          setVerificationStatus("OTP verified successfully.");
          alert("OTP verified successfully.");
          router.push("/pages/employeeresetpassword");
        } else {
          alert(response.data.Error);
          setVerificationStatus(response.data.Error);
        }
      })
      .catch((error) => {
        alert(error.response.data.Error);
        setVerificationStatus(error.response.data.Error);
      });
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: "#E7E5E5",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "4px 0",
            boxShadow:
              "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
          }}
          className="px-lg-5 px-md-4 px-2 "
        >
          <Link href="/">
            <Image
              style={{ height: "60px", width: "150px" }}
              src={logo}
              alt="AddRupee"
            />
          </Link>
          <Link
            style={{
              border: "2px solid #036E8C",
              color: "#036E8C",
              fontWeight: 600,
            }}
            className="btn"
            href={"/pages/employeeforgotpassword"}
          >
            Go Back
          </Link>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "100vh",
          }}
          className="container"
        >
          <h1 style={{ fontWeight: 700, color: "#264653" }}>
            OTP Verification
          </h1>
          <p>Please enter the OTP sent to your email</p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              className="form-control mx-2"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
            />
            <button
              style={{ backgroundColor: "#036E8C", color: "#fff" }}
              className="btn"
              onClick={handleOTPVerification}
            >
              Verify
            </button>
          </div>
          {/* {verificationStatus && (
            <p className="text-danger">{verificationStatus}</p>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default EmployeeForgotPasswordOTPVerification;
