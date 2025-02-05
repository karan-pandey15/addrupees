"use client";
import React, { useState } from "react";
import googleLogo from "../../../../public/googleLogo.png";
import facebookLogo from "../../../../public/facebookLogo.png";
import signUp from "../../../../public/signupImg.png";
import Link from "next/link";
import logo from "../../../../public/logo.png";
import axios from "axios";
import Image from "next/image";
import "../../styles.css";
import { useRouter } from "next/navigation";

const EmployeeSignUp = () => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    TL_Name: "",
    Branch_Name: "",
  });
  const [userType, setUserType] = useState("Team Leader");
  const [secretKey, setSecretKey] = useState("");
  const [radioError, setRadioError] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRadioChange = (e) => {
    setUserType(e.target.value);
    setRadioError(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
      userType: userType,
    });
  };

  const handleSubmit = (event) => {
    if (
      (userType === "Team Leader" && secretKey !== "TlKey123") ||
      (userType === "Admin" && secretKey !== "AdminKey123") ||
      (userType === "Hr" && secretKey !== "HrKey123")
    ) {
      event.preventDefault();
      alert("Invalid Credentials");
    } else {
      event.preventDefault();
      if (!userType) {
        setRadioError(true);
        return;
      }

      axios
        .post("https://api.addrupee.com/api/emp_register", registerData)
        .then((res) => {
          if (res.status !== 200 || !res.data) {
            alert("Error while registering. Please try again.");
          } else if (res.data.Status === "Success") {
            alert(res.data.Message);
            setRegisterData({
              name: "",
              email: "",
              phone: "",
              password: "",
              TL_Name: "",
              Branch_Name: "",
            });
            setSecretKey("");
            router.push("/pages/employeeotpverification");
          } else {
            alert(res.data.Error);
          }
        })
        .catch((err) => {
          alert("Error while registering. Please try again.");
        });
    }
  };

  return (
    <div>
      <div style={{ backgroundColor: "#E7E5E5" }}>
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
          <Link href={"/"}>
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
            href={"/pages/employeesignin"}
          >
            Go Back
          </Link>
        </div>
        <div className="container">
          <div className="row d-flex align-items-center">
            <div className="col-12 col-lg-6">
              <form className="register_form">
                <div
                  style={{
                    backgroundColor: "#036E8C",
                    borderTopRightRadius: "8px",
                    borderTopLeftRadius: "8px",
                  }}
                  className=" text-center mb-0"
                >
                  <h1 className="h4 text-white p-2 fw-normal">
                    Please Sign Up
                  </h1>
                </div>
                <div className="p-4">
                  <div>
                    Register As
                    <input
                      type="radio"
                      name="userType"
                      value="Employee"
                      onChange={handleRadioChange}
                      style={{ marginLeft: "6px", cursor: "pointer" }}
                      checked={userType === "Employee"}
                    />
                    AQM
                    <input
                      type="radio"
                      name="userType"
                      value="Team Leader"
                      onChange={handleRadioChange}
                      style={{ marginLeft: "6px", cursor: "pointer" }}
                      checked={userType === "Team Leader"}
                    />
                    Team Manager
                    <input
                      type="radio"
                      name="userType"
                      value="Admin"
                      onChange={handleRadioChange}
                      style={{ marginLeft: "6px", cursor: "pointer" }}
                      checked={userType === "Admin"}
                    />
                    Admin
                    <input
                      type="radio"
                      name="userType"
                      value="Hr"
                      onChange={handleRadioChange}
                      style={{ marginLeft: "6px", cursor: "pointer" }}
                      checked={userType === "Hr"}
                    />
                    Hr
                  </div>
                  {radioError && (
                    <p style={{ color: "red" }}>Please select a user type.</p>
                  )}
                  {(userType === "Admin" && (
                    <div>
                      <div className="form-floating mt-1">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          placeholder="Secret Key"
                          onChange={(e) => setSecretKey(e.target.value)}
                          autoComplete="off"
                        />
                        <label htmlFor="floatingInput">Secret Key</label>
                      </div>
                      <div className="form-floating mt-1">
                        <input
                          type="text"
                          className="form-control signup_form_control"
                          id="floatingInput"
                          placeholder="Name"
                          name="name"
                          value={registerData.name}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="floatingInput">Name</label>
                      </div>
                      <div className="form-floating mt-1">
                        <input
                          type="tel"
                          className="form-control signup_form_control"
                          id="floatingInput"
                          name="phone"
                          value={registerData.phone}
                          placeholder="Phone No."
                          onChange={handleInputChange}
                        />
                        <label htmlFor="floatingInput">Phone No.</label>
                      </div>
                      <div className="form-floating mt-1">
                        <input
                          type="email"
                          className="form-control signup_form_control"
                          id="floatingInput"
                          name="email"
                          value={registerData.email}
                          placeholder="name@example.com"
                          onChange={handleInputChange}
                        />
                        <label htmlFor="floatingInput">Email address</label>
                      </div>
                      <div className="form-floating mt-1">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control signup_form_control"
                          id="floatingPassword"
                          name="password"
                          value={registerData.password}
                          placeholder="Password"
                          onChange={handleInputChange}
                        />
                        <label htmlFor="floatingPassword">Password</label>
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
                      <div className="form-check text-start my-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="remember-me"
                          id="flexCheckDefault"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          Agree to terms & conditions
                        </label>
                      </div>
                      <button
                        style={{ backgroundColor: "#036E8C" }}
                        className="btn text-white w-100 py-2 button_class"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Sign Up
                      </button>
                    </div>
                  )) ||
                    (userType === "Team Leader" && (
                      <div>
                        <div className="form-floating mt-1">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="Secret Key"
                            onChange={(e) => setSecretKey(e.target.value)}
                            autoComplete="off"
                          />
                          <label htmlFor="floatingInput">Secret Key</label>
                        </div>
                        <div className="form-floating mt-1">
                          <select
                            className="form-select"
                            name="name"
                            id="name"
                            onChange={handleInputChange}
                            required
                          >
                            <option selected disabled>
                              Select Name
                            </option>
                            <option value="CHAHAT SHARMA">CHAHAT SHARMA</option>
                            <option value="GAURAV TIWARI">GAURAV TIWARI</option>
                            <option value="RAJENDRA SINGH">
                              RAJENDRA SINGH
                            </option>
                            <option value="HIMANSHU GUJJAR">
                              HIMANSHU GUJJAR
                            </option>
                            <option value="FAIZAN KHAN">FAIZAN KHAN</option>
                            <option value="DEEPAK KUMAR">DEEPAK KUMAR</option>
                            <option value="BHAGWAN SINGH">BHAGWAN SINGH</option>
                            <option value="SACHIN KUMAR">SACHIN KUMAR</option>
                          </select>
                        </div>
                        <div className="form-floating mt-1">
                          <input
                            type="tel"
                            className="form-control signup_form_control"
                            id="floatingInput"
                            name="phone"
                            value={registerData.phone}
                            placeholder="Phone No."
                            onChange={handleInputChange}
                          />
                          <label htmlFor="floatingInput">Phone No.</label>
                        </div>
                        <div className="form-floating mt-1">
                          <input
                            type="email"
                            className="form-control signup_form_control"
                            id="floatingInput"
                            name="email"
                            value={registerData.email}
                            placeholder="name@example.com"
                            onChange={handleInputChange}
                          />
                          <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating mt-1">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="form-control signup_form_control"
                            id="floatingPassword"
                            name="password"
                            value={registerData.password}
                            placeholder="Password"
                            onChange={handleInputChange}
                          />
                          <label htmlFor="floatingPassword">Password</label>
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
                        <div className="form-floating mt-1">
                          <select
                            className="form-select"
                            name="Branch_Name"
                            id="Branch_Name"
                            onChange={handleInputChange}
                            required
                          >
                            <option selected disabled>
                              Select Branch Name
                            </option>
                            <option value="Addrupee Noida">
                              Addrupee Noida
                            </option>
                          </select>
                        </div>

                        <div className="form-check text-start my-3">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="remember-me"
                            id="flexCheckDefault"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                          >
                            Agree to terms & conditions
                          </label>
                        </div>
                        <button
                          style={{ backgroundColor: "#036E8C" }}
                          className="btn text-white w-100 py-2 button_class"
                          type="submit"
                          onClick={handleSubmit}
                        >
                          Sign Up
                        </button>
                      </div>
                    )) ||
                    (userType === "Employee" && (
                      <div>
                        <div className="form-floating mt-1">
                          <input
                            type="text"
                            className="form-control signup_form_control"
                            id="floatingInput"
                            placeholder="Name"
                            name="name"
                            value={registerData.name}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="floatingInput">Name</label>
                        </div>
                        <div className="form-floating mt-1">
                          <input
                            type="tel"
                            className="form-control signup_form_control"
                            id="floatingInput"
                            name="phone"
                            value={registerData.phone}
                            placeholder="Phone No."
                            onChange={handleInputChange}
                          />
                          <label htmlFor="floatingInput">Phone No.</label>
                        </div>
                        <div className="form-floating mt-1">
                          <input
                            type="email"
                            className="form-control signup_form_control"
                            id="floatingInput"
                            name="email"
                            value={registerData.email}
                            placeholder="name@example.com"
                            onChange={handleInputChange}
                          />
                          <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating mt-1">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="form-control signup_form_control"
                            id="floatingPassword"
                            name="password"
                            value={registerData.password}
                            placeholder="Password"
                            onChange={handleInputChange}
                          />
                          <label htmlFor="floatingPassword">Password</label>
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
                        <div className="form-floating mt-1">
                          <select
                            className="form-select"
                            name="TL_Name"
                            id="TL_Name"
                            onChange={handleInputChange}
                            required
                          >
                            <option selected disabled>
                              Select TL Name
                            </option>
                            <option value="CHAHAT SHARMA">CHAHAT SHARMA</option>
                            <option value="GAURAV TIWARI">GAURAV TIWARI</option>
                            <option value="RAJENDRA SINGH">
                              RAJENDRA SINGH
                            </option>
                            <option value="HIMANSHU GUJJAR">
                              HIMANSHU GUJJAR
                            </option>
                            <option value="FAIZAN KHAN">FAIZAN KHAN</option>
                            <option value="DEEPAK KUMAR">DEEPAK KUMAR</option>
                            <option value="BHAGWAN SINGH">BHAGWAN SINGH</option>
                            <option value="SACHIN KUMAR">SACHIN KUMAR</option>
                          </select>
                        </div>
                        <div className="form-floating mt-1">
                          <select
                            className="form-select"
                            name="Branch_Name"
                            id="Branch_Name"
                            onChange={handleInputChange}
                            required
                          >
                            <option selected disabled>
                              Select Branch Name
                            </option>
                            <option value="Addrupee Noida">
                              Addrupee Noida
                            </option>
                          </select>
                        </div>

                        <div className="form-check text-start my-3">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="remember-me"
                            id="flexCheckDefault"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                          >
                            Agree to terms & conditions
                          </label>
                        </div>
                        <button
                          style={{ backgroundColor: "#036E8C" }}
                          className="btn text-white w-100 py-2 button_class"
                          type="submit"
                          onClick={handleSubmit}
                        >
                          Sign Up
                        </button>
                      </div>
                    )) ||
                    (userType === "Hr" && (
                      <div>
                        <div className="form-floating mt-1">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="Secret Key"
                            onChange={(e) => setSecretKey(e.target.value)}
                            autoComplete="off"
                          />
                          <label htmlFor="floatingInput">Secret Key</label>
                        </div>
                        <div className="form-floating mt-1">
                          <input
                            type="text"
                            className="form-control signup_form_control"
                            id="floatingInput"
                            placeholder="Name"
                            name="name"
                            value={registerData.name}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="floatingInput">Name</label>
                        </div>
                        <div className="form-floating mt-1">
                          <input
                            type="tel"
                            className="form-control signup_form_control"
                            id="floatingInput"
                            name="phone"
                            value={registerData.phone}
                            placeholder="Phone No."
                            onChange={handleInputChange}
                          />
                          <label htmlFor="floatingInput">Phone No.</label>
                        </div>
                        <div className="form-floating mt-1">
                          <input
                            type="email"
                            className="form-control signup_form_control"
                            id="floatingInput"
                            name="email"
                            value={registerData.email}
                            placeholder="name@example.com"
                            onChange={handleInputChange}
                          />
                          <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating mt-1">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="form-control signup_form_control"
                            id="floatingPassword"
                            name="password"
                            value={registerData.password}
                            placeholder="Password"
                            onChange={handleInputChange}
                          />
                          <label htmlFor="floatingPassword">Password</label>
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
                        <div className="form-floating mt-1">
                          <select
                            className="form-select"
                            name="Branch_Name"
                            id="Branch_Name"
                            onChange={handleInputChange}
                            required
                          >
                            <option selected disabled>
                              Select Branch Name
                            </option>
                            <option value="Addrupee Noida">
                              Addrupee Noida
                            </option>
                          </select>
                        </div>

                        <div className="form-check text-start my-3">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="remember-me"
                            id="flexCheckDefault"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                          >
                            Agree to terms & conditions
                          </label>
                        </div>
                        <button
                          style={{ backgroundColor: "#036E8C" }}
                          className="btn text-white w-100 py-2 button_class"
                          type="submit"
                          onClick={handleSubmit}
                        >
                          Sign Up
                        </button>
                      </div>
                    ))}

                  <p className="mt-2 ">
                    Already a User?{" "}
                    <Link
                      href={"/pages/employeesignin"}
                      style={{ textDecoration: "none", fontWeight: 500 }}
                    >
                      Sign In
                    </Link>
                  </p>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    className="mt-2"
                  >
                    <span
                      style={{
                        width: "40%",
                        height: "1px",
                        color: "#036E8C",
                        border: "1px solid",
                        opacity: 0.5,
                      }}
                    ></span>
                    <span
                      style={{
                        fontSize: "19px",
                        color: "#264653",
                        fontWeight: 500,
                      }}
                    >
                      Or
                    </span>
                    <span
                      style={{
                        width: "40%",
                        height: "1px",
                        color: "#036E8C",
                        border: "1px solid",
                        opacity: 0.5,
                      }}
                    ></span>
                  </div>
                  <div className="text-center">
                    <p
                      style={{
                        fontSize: "19px",
                        fontWeight: 500,
                        color: "#264653",
                      }}
                    >
                      Sign In With
                    </p>
                    <span
                      style={{
                        padding: "13px 22px",
                        borderRadius: "5px",
                        marginRight: "25px",
                      }}
                      className="google_facebook_link"
                    >
                      <Link href={"#"}>
                        {" "}
                        <Image
                          style={{ height: "42px", width: "42px" }}
                          src={googleLogo}
                          alt="..."
                        />
                      </Link>
                    </span>
                    <span
                      style={{
                        padding: "13px 22px",
                        borderRadius: "5px",
                      }}
                      className="google_facebook_link"
                    >
                      <Link href={"#"}>
                        <Image
                          style={{ height: "36px", width: "36px" }}
                          src={facebookLogo}
                          alt="..."
                        />
                      </Link>
                    </span>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-12 col-lg-6 mb-3">
              <Image style={{ width: "100%" }} src={signUp} alt="..." />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSignUp;
