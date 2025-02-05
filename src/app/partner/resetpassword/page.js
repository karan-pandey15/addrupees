"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../../public/logo.png";
import "../../styles.css";

const PartnerEmployeeResetPassword = () => {
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [employeeEmail, setEmployeeEmail] = useState(null);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    setEmployeeEmail(localStorage.getItem("employeeEmail"));
  });

  const resetPasswordRequest = async () => {
    try {
      const response = await axios.post(
        `https://api.addrupee.com/api/partner_employee_reset_password_after_otp_verification/${employeeEmail}`,
        { password }
      );

      if (response.data.Status === "Success") {
        alert(response.data.Message);
        localStorage.clear();
        router.push("/partner/signin");
      }
    } catch (error) {
      alert(error.response?.data.error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    resetPasswordRequest();
  };

  return (
    <div>
      <div style={{ backgroundColor: "#E7E5E5", overflow: "hidden" }}>
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
            href={"/partner/signin"}
          >
            Go Back
          </Link>
        </div>
        <div className="conatiner">
          <div
            className="row d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <div className="col-12 col-lg-6">
              <form className="signUp_Form" onSubmit={handleSubmit}>
                <div
                  style={{
                    backgroundColor: "#036E8C",
                    borderTopRightRadius: "8px",
                    borderTopLeftRadius: "8px",
                  }}
                  className=" text-center mb-0"
                >
                  <h1 className="h4 text-white p-2 fw-normal">
                    Reset Your Password
                  </h1>
                </div>
                <div className="p-4">
                  <div>
                    <div className="form-floating">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control signup_form_control"
                        id="floatingPassword"
                        placeholder="New Password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <label htmlFor="floatingPassword">New Password</label>
                      <span
                        onClick={togglePasswordVisibility}
                        style={{
                          position: "absolute",
                          right: "15px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                        }}
                      >
                        {showPassword ? (
                          <span
                            style={{
                              backgroundColor: "#dedbd2",
                              padding: "2px 6px",
                              cursor: "pointer",
                              borderRadius: "4px",
                              color: "#2f3e46",
                              fontSize: "16px",
                              fontWeight: 500,
                            }}
                          >
                            Hide
                          </span>
                        ) : (
                          <span
                            style={{
                              backgroundColor: "#dedbd2",
                              padding: "2px 6px",
                              cursor: "pointer",
                              borderRadius: "4px",
                              color: "#2f3e46",
                              fontSize: "16px",
                              fontWeight: 500,
                            }}
                          >
                            Show
                          </span>
                        )}
                      </span>
                    </div>
                    <button
                      style={{ backgroundColor: "#036E8C" }}
                      className="btn text-white w-100 py-2 my-3 button_class"
                      type="submit"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerEmployeeResetPassword;
