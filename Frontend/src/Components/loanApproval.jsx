import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Style from "../App.module.css";
import axios from "axios";

function LoanApproval() {
  let userFirstName = localStorage.getItem("userFirstName") || "John";
  let userLastName = localStorage.getItem("userLastName") || "Doe";
  let userEmailAddress = localStorage.getItem("userEmailAddress") || "john.doe@example.com";

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
      // Send request to backend for prediction
      const response = await axios.post("http://localhost:5000/loanApproval", dataToSend);
      alert("Data sent successfully!");
      console.log("Response from backend:", response.data);

      // Update the prediction result state with the response data
      setPredictionResult(response.data);
    } catch (error) {
      console.error("Error making prediction:", error);
      alert("An error occurred while making the request.");
    }
  };

  const savePredictionResult = async () => {
    try {
      // Send the result to the backend to save it in the database
      const saveResponse = await axios.post("http://localhost:5000/savePrediction", {
        predictionResult: predictionResult,
        userEmailAddress: userEmailAddress,  // Make sure to pass userEmailAddress
      });
      
      alert("Prediction saved successfully!");
      console.log("Saved prediction:", saveResponse.data);
    } catch (error) {
      console.error("Error saving prediction:", error);
      alert("An error occurred while saving the result.");
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

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
          <form onSubmit={handleSubmit}>
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

          {/* Prediction Result */}
          {predictionResult && (
            <div className={Style.resultContainer}>
              <h3>Prediction Result</h3>
              <p>
                <strong>Status:</strong> {predictionResult.result}
              </p>
              <p>
                <strong>Approved Probability:</strong> {predictionResult.probabilities.Approved}
              </p>
              <p>
                <strong>Rejected Probability:</strong> {predictionResult.probabilities.Rejected}
              </p>
              <p><strong>Reasons:</strong></p>
              <ul>
                {predictionResult.reasons.map((reason, index) => (
                  <li key={index}>{reason[0]}: {reason[1]}</li>
                ))}
              </ul>
              <p><strong>LIME Explanation:</strong></p>
              <ul>
                {predictionResult.lime_explanation.map((explanation, index) => (
                  <li key={index}>{explanation[0]}: {explanation[1].toFixed(4)}</li>
                ))}
              </ul>

              {/* Save Button */}
              <button onClick={savePredictionResult} className={Style.saveButton}>
                Save Prediction
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoanApproval;

