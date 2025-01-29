import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Style from "../App.module.css";
import axios from "axios";

function LoanApproval() {
  const navigate = useNavigate();
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [formData, setFormData] = useState({
    Gender: "",
    Married: "",
    Dependents: "",
    Education: "",
    Self_Employed: "",
    ApplicantIncome: "",
    CoapplicantIncome: "",
    LoanAmount: "",
    Loan_Amount_Term: "",
    Credit_History: "",
    Property_Area: "",
  });

  const [predictionResult, setPredictionResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Convert numeric fields to numbers where necessary
    const dataToSend = {
      ...formData,
      ApplicantIncome: Number(formData.ApplicantIncome),
      CoapplicantIncome: Number(formData.CoapplicantIncome),
      LoanAmount: Number(formData.LoanAmount),
      Loan_Amount_Term: Number(formData.Loan_Amount_Term),
      Credit_History: Number(formData.Credit_History),
    };
  
    try {
      // Updated the API endpoint to match the backend route
      const response = await axios.post("http://localhost:5000/loanApproval", dataToSend);
      alert("Data sended successfully");
      console.log("Response from backend:", response.data);
  
      // Handle the response if needed
      setPredictionResult(response.data);
    } catch (error) {
      console.error("Error making prediction:", error);
      alert("An error occurred while making the request.");
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  let userFirstName = localStorage.getItem("userFirstName") || "John";
  let userLastName = localStorage.getItem("userLastName") || "Doe";
  let userEmailAddress = localStorage.getItem("userEmailAddress") || "john.doe@example.com";

  return (
    <div className={Style.mainDiv}>
      <div className={Style.mainPageMainDiv}>
        <div className={Style.navBarMainPage}>
          <div className={Style.logoNavBarMainPage}>
            <h1>FINEX</h1>
          </div>

          <div className={Style.linkNavBarMainPage}>
            <Link className={Style.linkElementNavBar} to="/mainPage">
              Home
            </Link>
            <Link className={Style.linkElementNavBar} to="/biasDetection">
              Bias
            </Link>
            <Link className={Style.linkElementNavBar} to="/loanApproval">
              Loans
            </Link>
            <Link className={Style.linkElementNavBar} to="/mainPage">
              Advice
            </Link>
          </div>

          <div className={Style.ProfileBtnNavBarMainPage}>
            <button
              className={Style.profileBtn}
              onClick={() => setShowUserInfo(!showUserInfo)}
            >
              Profile
            </button>

            {showUserInfo && (
              <div className={Style.userInfoDiv}>
                <p className={Style.userInfoDivPara1}>
                  {`${userFirstName} ${userLastName}`}
                </p>
                <p className={Style.userInfoDivPara2}>{userEmailAddress}</p>
                <button className={Style.logoutBtn} onClick={logoutUser}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Loan Approval Form */}
        <div className={Style.formContainer} style={{ color: "white" }}>
          <h2>Loan Approval Prediction</h2>
          <form onSubmit={(e)=>handleSubmit()}>
            {Object.keys(formData).map((key) => (
              <div key={key} className={Style.formGroup}>
                <label htmlFor={key}>{key.replace(/_/g, " ")}</label>
                <input
                  type="text"
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
            <button type="submit" className={Style.submitButton}>
              Predict
            </button>
          </form>
          {predictionResult && (
            <div className={Style.resultContainer}>
              <h3>Prediction Result</h3>
              <p>
                <strong>Status:</strong> {predictionResult.result}
              </p>
              <p><strong>Reason:</strong></p>
              <ul>
                {predictionResult.reason.map((reason, index) => (
                  <li key={index}>{reason[0]}: {reason[1]}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoanApproval;
