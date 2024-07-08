// "use client";

// import { useState, useEffect } from "react";
// import Header from "../header/page";
// import Sidebar from "../sidebar/page";
// import defaultProfile from "../../../../public/defaultprofile.png";
// import Image from "next/image";
// import axios from "axios";
// import IDCardBack from "../../../../public/IDCardBack.png";
// import IDCardFront from "../../../../public/IDCardFront.png";
// import { format } from "date-fns";
// import html2pdf from "html2pdf.js";

// const Profile = () => {
//   const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
//   const [image, setImage] = useState(null);
//   const [maritalStatus, setMaritalStatus] = useState("");
//   const [propertyStatus, setPropertyStatus] = useState("");
//   const [formData, setFormData] = useState({
//     image: null,
//     fullName: "",
//     mobile: "",
//     personalemail: "",
//     fathername: "",
//     mothername: "",
//     dob: "",
//     pancardno: "",
//     pancardphoto: null,
//     aadharcardno: "",
//     aadharcardphotoFront: null,
//     aadharcardphotoBack: null,
//     gender: "",
//     religion: "",
//     spousename: "",
//     qualification: "",
//     propertystatus: "",
//     currentaddressline: "",
//     currentcity: "",
//     currentstate: "",
//     currentpin: "",
//     permanentaddressline: "",
//     permanentcity: "",
//     permanentstate: "",
//     permanentpin: "",
//     designation: "",
//     totalworkexperience: "",
//   });
//   const [userDetails, setUserDetails] = useState(null);
//   const [isClient, setIsClient] = useState(false);

//   // Check if the code is running on the client side
//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   const defaultAvatar = defaultProfile;

//   const handleImageChange = (e) => {
//     const selectedImage = e.target.files[0];
//     if (selectedImage) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImage(reader.result);
//       };
//       reader.readAsDataURL(selectedImage);

//       setFormData({
//         ...formData,
//         image: selectedImage,
//       });
//     }
//   };

//   const handleButtonClick = () => {
//     if (isClient) {
//       document.getElementById("imageUpload").click();
//     }
//   };

//   const OpenSidebar = () => {
//     setOpenSidebarToggle(!openSidebarToggle);
//   };

//   const handleFileChange = (field, e) => {
//     setFormData({
//       ...formData,
//       [field]: e.target.files[0],
//     });
//   };

//   const handleInputChange = (field, e) => {
//     if (
//       field === "gender" ||
//       field === "religion" ||
//       field === "qualification" ||
//       field === "designation" ||
//       field === "totalworkexperience"
//     ) {
//       setFormData({
//         ...formData,
//         [field]: e.target.value,
//       });
//     } else if (field === "maritalstatus") {
//       setFormData({
//         ...formData,
//         maritalstatus: e.target.value,
//       });
//       setMaritalStatus(e.target.value);
//     } else if (field === "propertystatus") {
//       setFormData({
//         ...formData,
//         propertystatus: e.target.value,
//       });
//       setPropertyStatus(e.target.value);
//     } else {
//       setFormData({
//         ...formData,
//         [field]: e.target.value,
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     formData.maritalstatus = maritalStatus;
//     formData.propertystatus = propertyStatus;

//     const data = new FormData();

//     for (const key in formData) {
//       data.append(key, formData[key]);
//     }

//     try {
//       const response = await axios.post(
//         `https://api.addrupee.com/api/profile/${employeeEmail}`,
//         data
//       );

//       alert("Profile saved successfully!");
//       setFormData({
//         image: null,
//         fullName: "",
//         mobile: "",
//         personalemail: "",
//         fathername: "",
//         mothername: "",
//         dob: "",
//         pancardno: "",
//         pancardphoto: null,
//         aadharcardno: "",
//         aadharcardphotoFront: null,
//         aadharcardphotoBack: null,
//         gender: "",
//         religion: "",
//         spousename: "",
//         qualification: "",
//         propertystatus: "",
//         currentaddressline: "",
//         currentcity: "",
//         currentstate: "",
//         currentpin: "",
//         permanentaddressline: "",
//         permanentcity: "",
//         permanentstate: "",
//         permanentpin: "",
//         designation: "",
//         totalworkexperience: "",
//       });
//     } catch (error) {
//       console.error("Error saving profile:", error.message);
//       alert("Failed to save profile. Please try again.");
//     }
//   };

//   useEffect(() => {
//     if (isClient) {
//       const employeeEmail = localStorage.getItem("employeeEmail");
//       if (employeeEmail) {
//         const fetchUserDetails = async () => {
//           try {
//             const response = await axios.get(
//               `https://api.addrupee.com/api/employee_profile/${employeeEmail}`
//             );
//             setUserDetails(response.data);
//           } catch (error) {
//             console.error("Error fetching user details:", error.message);
//           }
//         };
//         fetchUserDetails();
//       }
//     }
//   }, [isClient]);

//   const handleDownloadPDF = () => {
//     if (isClient) {
//       const element = document.getElementById("profileContent");
//       html2pdf(element);
//     }
//   };

//   return (
//     <>
//       <div style={{ width: "100%", height: "100vh", display: "flex" }}>
//         <Sidebar
//           openSidebarToggle={openSidebarToggle}
//           OpenSidebar={OpenSidebar}
//         />
//         <section
//           style={{
//             backgroundColor: "#E7E5E5",
//             width: "100%",
//             height: "100vh",
//             overflowY: "scroll",
//           }}
//         >
//           <Header OpenSidebar={OpenSidebar} />
//           <div className="container" style={{ padding: "20px" }}>
//             <h3 style={{ fontWeight: 600 }}>Profile</h3>
//             {userDetails ? (
//               <>
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                   }}
//                   className="row"
//                 >
//                   <div className="col-12 col-md-6">
//                     <Image
//                       src={`https://api.addrupee.com/uploads/employees/${userDetails?.image}`}
//                       alt="Profile"
//                       width={350}
//                       height={350}
//                     />
//                   </div>
//                   <div className="col-12 col-md-6">
//                     <span
//                       style={{
//                         color: "#264653",
//                         fontSize: "22px",
//                         fontWeight: 500,
//                       }}
//                     >
//                       I am
//                     </span>
//                     <h2
//                       style={{
//                         color: "#264653",
//                         fontWeight: 700,
//                         fontSize: "40px",
//                       }}
//                     >
//                       {userDetails.fullName}
//                     </h2>
//                     <p>Mobile: {userDetails.mobile}</p>
//                     <p>Personal Mail ID: {userDetails.personalemail}</p>
//                     <p>Designation: {userDetails.designation}</p>
//                     <p>
//                       DOB: {format(new Date(userDetails.dob), "dd/MM/yyyy")}
//                     </p>
//                     <p>Qualification: {userDetails.qualification}</p>
//                     <p>
//                       Total Work Experience: {userDetails.totalworkexperience}
//                     </p>
//                     <button
//                       className="btn btn-dark"
//                       onClick={handleDownloadPDF}
//                     >
//                       Download ID Card
//                     </button>
//                   </div>
//                 </div>
//               </>
//             ) : null}
//             {userDetails ? (
//               <div style={{ display: "none" }}>
//                 <div
//                   id="profileContent"
//                   style={{
//                     position: "relative",
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     width: "100%",
//                     height: "100vh",
//                   }}
//                 >
//                   <div>
//                     <Image
//                       style={{ width: "280px", height: "450px" }}
//                       src={IDCardFront}
//                       alt="..."
//                     />
//                     <Image
//                       style={{
//                         width: "280px",
//                         height: "450px",
//                         marginLeft: "10px",
//                       }}
//                       src={IDCardBack}
//                       alt="..."
//                     />
//                   </div>
//                   <div
//                     style={{
//                       width: "155px",
//                       height: "155px",
//                       backgroundColor: "#3E9D7C",
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                       borderRadius: "50%",
//                       position: "absolute",
//                       top: "26%",
//                       left: "17.5%",
//                     }}
//                   >
//                     <div
//                       style={{
//                         width: "135px",
//                         height: "135px",
//                         backgroundColor: "#fff",
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         borderRadius: "50%",
//                       }}
//                     >
//                       <Image
//                         src={`https://api.addrupee.com/uploads/employees/${userDetails?.image}`}
//                         alt="Profile"
//                         width={130}
//                         height={130}
//                         style={{ borderRadius: "50%" }}
//                       />
//                     </div>
//                   </div>
//                   <div
//                     style={{
//                       position: "absolute",
//                       top: "52.5%",
//                       left: "17.5%",
//                     }}
//                   >
//                     <h3
//                       style={{
//                         color: "#036E8C",
//                         fontSize: "23px",
//                         fontWeight: 700,
//                       }}
//                     >
//                       {userDetails.fullName}
//                     </h3>
//                   </div>
//                   <div
//                     style={{
//                       position: "absolute",
//                       top: "56.5%",
//                       left: "17.5%",
//                     }}
//                   >
//                     <span
//                       style={{
//                         color: "#264653",
//                         fontSize: "15px",
//                         fontWeight: 700,
//                       }}
//                     >
//                       {userDetails.designation}
//                     </span>
//                   </div>
//                   <div
//                     style={{
//                       position: "absolute",
//                       top: "62%",
//                       left: "17.5%",
//                     }}
//                   >
//                     <span
//                       style={{
//                         color: "#264653",
//                         fontSize: "12px",
//                         fontWeight: 700,
//                       }}
//                     >
//                       Employee ID:{" "}
//                       <span style={{ marginLeft: "12px" }}>
//                         {userDetails.employeeId}
//                       </span>
//                     </span>
//                   </div>
//                   <div
//                     style={{
//                       position: "absolute",
//                       top: "65%",
//                       left: "17.5%",
//                     }}
//                   >
//                     <span
//                       style={{
//                         color: "#264653",
//                         fontSize: "12px",
//                         fontWeight: 700,
//                       }}
//                     >
//                       DOJ:{" "}
//                       <span style={{ marginLeft: "63px" }}>
//                         {format(
//                           new Date(userDetails.dateCreated),
//                           "dd/MM/yyyy"
//                         )}
//                       </span>
//                     </span>
//                   </div>
//                   <div
//                     style={{
//                       position: "absolute",
//                       top: "68%",
//                       left: "17.5%",
//                     }}
//                   >
//                     <span
//                       style={{
//                         color: "#264653",
//                         fontSize: "12px",
//                         fontWeight: 700,
//                       }}
//                     >
//                       Department: <span style={{ marginLeft: "14px" }}>IT</span>
//                     </span>
//                   </div>

//                   <div
//                     style={{ position: "absolute", top: "80.5%", left: "52%" }}
//                   >
//                     <span
//                       style={{
//                         color: "#264653",
//                         fontSize: "12px",
//                         fontWeight: 700,
//                       }}
//                     >
//                       www.addrupee.com
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <form onSubmit={handleSubmit}>
//                 <div>
//                   {image ? (
//                     <div>
//                       <Image
//                         src={image}
//                         alt="Preview"
//                         className="img-thumbnail mb-3"
//                         width={150}
//                         height={150}
//                         style={{
//                           boxShadow:
//                             "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
//                         }}
//                       />
//                     </div>
//                   ) : (
//                     <div>
//                       <Image
//                         src={defaultAvatar}
//                         alt="Default Avatar"
//                         className="img-thumbnail mb-3"
//                         width={150}
//                         height={150}
//                       />
//                     </div>
//                   )}
//                   <div className="mb-3">
//                     <label
//                       htmlFor="imageUpload"
//                       className="form-label visually-hidden"
//                     >
//                       Choose a profile image
//                     </label>
//                     <input
//                       type="file"
//                       id="imageUpload"
//                       accept="image/*"
//                       onChange={(e) => handleImageChange(e)}
//                       className="visually-hidden"
//                     />
//                     <button
//                       type="button"
//                       className="btn btn-dark"
//                       onClick={handleButtonClick}
//                     >
//                       Choose Profile
//                     </button>
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-12 col-md-6 mb-3">
//                     <label htmlFor="fullname" className="form-label">
//                       Full Name:
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="fullname"
//                       value={formData.fullName}
//                       onChange={(e) => handleInputChange("fullName", e)}
//                     />
//                   </div>
//                   <div className="col-12 col-md-6 mb-3">
//                     <label htmlFor="mobile" className="form-label">
//                       Monile No:
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="mobile"
//                       value={formData.mobile}
//                       onChange={(e) => handleInputChange("mobile", e)}
//                     />
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-12 col-md-6 mb-3">
//                     <label htmlFor="personalemail" className="form-label">
//                       Personal Email Id:
//                     </label>
//                     <input
//                       type="email"
//                       className="form-control"
//                       id="personalemail"
//                       value={formData.personalemail}
//                       onChange={(e) => handleInputChange("personalemail", e)}
//                     />
//                   </div>
//                   <div className="col-12 col-md-6 mb-3">
//                     <label htmlFor="fathername" className="form-label">
//                       Father Name:
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="fathername"
//                       value={formData.fathername}
//                       onChange={(e) => handleInputChange("fathername", e)}
//                     />
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-12 col-md-6 mb-3">
//                     <label htmlFor="mothername" className="form-label">
//                       Mother Name:
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="mothername"
//                       value={formData.mothername}
//                       onChange={(e) => handleInputChange("mothername", e)}
//                     />
//                   </div>
//                   <div className="col-12 col-md-6 mb-3">
//                     <label htmlFor="dob" className="form-label">
//                       Date of Birth:
//                     </label>
//                     <input
//                       type="date"
//                       className="form-control"
//                       id="dob"
//                       value={formData.dob}
//                       onChange={(e) => handleInputChange("dob", e)}
//                     />
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-12 col-md-6 mb-3">
//                     <label htmlFor="pancardno" className="form-label">
//                       Pan Card No:
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="pancardno"
//                       value={formData.pancardno}
//                       onChange={(e) => handleInputChange("pancardno", e)}
//                     />
//                   </div>
//                   <div className="col-12 col-md-6 mb-3">
//                     <label htmlFor="pancardphoto" className="form-label">
//                       Pan Card Photo:
//                     </label>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       className="form-control"
//                       id="pancardphoto"
//                       onChange={(e) => handleFileChange("pancardphoto", e)}
//                     />
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-12 col-md-6 mb-3">
//                     <label htmlFor="aadharcardno" className="form-label">
//                       Aadhar Card No:
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="aadharcardno"
//                       value={formData.aadharcardno}
//                       onChange={(e) => handleInputChange("aadharcardno", e)}
//                     />
//                   </div>
//                   <div className="col-12 col-md-6 mb-3">
//                     <label
//                       htmlFor="aadharcardphotoFront"
//                       className="form-label"
//                     >
//                       Aadhar Card Photo(Front):
//                     </label>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       className="form-control"
//                       id="aadharcardphotoFront"
//                       onChange={(e) =>
//                         handleFileChange("aadharcardphotoFront", e)
//                       }
//                     />
//                   </div>
//                   <div className="col-12 col-md-6 mb-3">
//                     <label htmlFor="aadharcardphotoBack" className="form-label">
//                       Aadhar Card Photo(Back):
//                     </label>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       className="form-control"
//                       id="aadharcardphotoBack"
//                       onChange={(e) =>
//                         handleFileChange("aadharcardphotoBack", e)
//                       }
//                     />
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-12 col-md-6 mb-3">
//                     <label htmlFor="gender" className="form-label">
//                       Gender:
//                     </label>
//                     <div className="d-flex justify-content-start align-items-center">
//                       <div className="form-check">
//                         <input
//                           className="form-check-input"
//                           type="radio"
//                           name="gender"
//                           id="male"
//                           value="Male"
//                           onChange={(e) => handleInputChange("gender", e)}
//                         />
//                         <label className="form-check-label" htmlFor="male">
//                           Male
//                         </label>
//                       </div>
//                       <div className="form-check mx-3">
//                         <input
//                           className="form-check-input"
//                           type="radio"
//                           name="gender"
//                           id="female"
//                           value="Female"
//                           onChange={(e) => handleInputChange("gender", e)}
//                         />
//                         <label className="form-check-label" htmlFor="female">
//                           Female
//                         </label>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="col-12 col-md-6 mb-3">
//                     <label htmlFor="religion" className="form-label">
//                       Religion:
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="religion"
//                       value={formData.religion}
//                       onChange={(e) => handleInputChange("religion", e)}
//                     />
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-12 col-md-6 mb-3">
//                     <label htmlFor="maritalstatus" className="form-label">
//                       Marital Status:
//                     </label>
//                     <select
//                       id="maritalstatus"
//                       className="form-select"
//                       value={formData.maritalstatus}
//                       onChange={(e) => setMaritalStatus(e.target.value)}
//                     >
//                       <option>Choose...</option>
//                       <option value="Married">Married</option>
//                       <option value="Unmarried">Unmarried</option>
//                     </select>
//                   </div>
//                   {maritalStatus === "Married" && (
//                     <div className="col-12 col-md-6 mb-3">
//                       <label htmlFor="spousename" className="form-label">
//                         Spouse Name:
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         id="spousename"
//                         value={formData.spousename}
//                         onChange={(e) => handleInputChange("spousename", e)}
//                       />
//                     </div>
//                   )}
//                 </div>
//                 <div className="row">
//                   <div className="col-12 col-md-6 mb-3">
//                     <label htmlFor="qualification" className="form-label">
//                       Qualification:
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="qualification"
//                       value={formData.qualification}
//                       onChange={(e) => handleInputChange("qualification", e)}
//                     />
//                   </div>
//                   <div className="col-12 col-md-6 mb-3">
//                     <label htmlFor="propertystatus" className="form-label">
//                       Property Status:
//                     </label>
//                     <select
//                       id="propertystatus"
//                       className="form-select"
//                       value={formData.propertystatus}
//                       onChange={(e) => setPropertyStatus(e.target.value)}
//                     >
//                       <option>Choose...</option>
//                       <option value="Own">Own</option>
//                       <option value="Rented">Rented</option>
//                     </select>
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-12 col-md-6 mb-3">
//                     <label htmlFor="currentaddressline" className="form-label">
//                       Current Address Line:
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="currentaddressline"
//                       value={formData.currentaddressline}
//                       onChange={(e) =>
//                         handleInputChange("currentaddressline", e)
//                       }
//                     />
//                   </div>
//                   <div className="col-12 col-md-6 mb-3">
//                     <label htmlFor="currentcity" className="form-label">
//                       Current City:
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="currentcity"
//                       value={formData.currentcity}
//                       onChange={(e) => handleInputChange("currentcity", e)}
//                     />
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-12 col-md-6 mb-3">
//                     <label htmlFor="currentstate" className="form-label">
//                       Current State:
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="currentstate"
//                       value={formData.currentstate}
//                       onChange={(e) => handleInputChange("currentstate", e)}
//                     />
//                   </div>
//                   <div className="col-12 col-md-6 mb-3">
//                     <label htmlFor="currentpin" className="form-label">
//                       Current Pin:
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="currentpin"
//                       value={formData.currentpin}
//                       onChange={(e) => handleInputChange("currentpin", e)}
//                     />
//                   </div>
//                 </div>
//                 {propertyStatus === "Rented" && (
//                   <>
//                     <div className="row">
//                       <div className="col-12 col-md-6 mb-3">
//                         <label
//                           htmlFor="permanentaddressline"
//                           className="form-label"
//                         >
//                           Permanent Address Line:
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           id="permanentaddressline"
//                           value={formData.permanentaddressline}
//                           onChange={(e) =>
//                             handleInputChange("permanentaddressline", e)
//                           }
//                         />
//                       </div>
//                       <div className="col-12 col-md-6 mb-3">
//                         <label htmlFor="permanentcity" className="form-label">
//                           Permanent City:
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           id="permanentcity"
//                           value={formData.permanentcity}
//                           onChange={(e) =>
//                             handleInputChange("permanentcity", e)
//                           }
//                         />
//                       </div>
//                     </div>
//                     <div className="row">
//                       <div className="col-12 col-md-6 mb-3">
//                         <label htmlFor="permanentstate" className="form-label">
//                           Permanent State:
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           id="permanentstate"
//                           value={formData.permanentstate}
//                           onChange={(e) =>
//                             handleInputChange("permanentstate", e)
//                           }
//                         />
//                       </div>
//                       <div className="col-12 col-md-6 mb-3">
//                         <label htmlFor="permanentpin" className="form-label">
//                           Permanent Pin:
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           id="permanentpin"
//                           value={formData.permanentpin}
//                           onChange={(e) => handleInputChange("permanentpin", e)}
//                         />
//                       </div>
//                     </div>
//                   </>
//                 )}
//                 <div className="row">
//                   <div className="col-12 col-md-6 mb-3">
//                     <label htmlFor="designation" className="form-label">
//                       Designation:
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="designation"
//                       value={formData.designation}
//                       onChange={(e) => handleInputChange("designation", e)}
//                     />
//                   </div>
//                   <div className="col-12 col-md-6 mb-3">
//                     <label htmlFor="totalworkexperience" className="form-label">
//                       Total Work Experience:
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="totalworkexperience"
//                       value={formData.totalworkexperience}
//                       onChange={(e) =>
//                         handleInputChange("totalworkexperience", e)
//                       }
//                     />
//                   </div>
//                 </div>
//                 <button className="btn btn-dark" type="submit">
//                   Save Profile
//                 </button>
//               </form>
//             )}
//           </div>
//         </section>
//       </div>
//     </>
//   );
// };

// export default Profile;

import React from "react";

const Profile = () => {
  return <div>Profile</div>;
};

export default Profile;
