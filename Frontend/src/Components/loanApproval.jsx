import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Style from "../App.module.css";
import axios from "axios";

function LoanApproval() {
  let userFirstName = localStorage.getItem("userFirstName") || "John";
  let userLastName = localStorage.getItem("userLastName") || "Doe";
  let userEmailAddress =
    localStorage.getItem("userEmailAddress") || "john.doe@example.com";

  const navigate = useNavigate();
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showLoanFormPopup, setShowLoanFormPopup] = useState(false);
  const [showPredictionPopup, setShowPredictionPopup] = useState(false);
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

    const dataToSend = {
      ...formData,
      ApplicantIncome: Number(formData.ApplicantIncome),
      CoapplicantIncome: Number(formData.CoapplicantIncome),
      LoanAmount: Number(formData.LoanAmount),
      Loan_Amount_Term: Number(formData.Loan_Amount_Term),
      Credit_History: Number(formData.Credit_History),
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/loanApproval",
        dataToSend
      );
      alert("Data sent successfully!");
      setPredictionResult(response.data);
      setShowLoanFormPopup(false);
      setShowPredictionPopup(true);
    } catch (error) {
      console.error("Error making prediction:", error);
      alert("An error occurred while making the request.");
    }
  };

  const savePredictionResult = async () => {
    try {
      const saveResponse = await axios.post(
        "http://localhost:5000/savePrediction",
        {
          predictionResult: predictionResult,
          userEmailAddress: userEmailAddress,
        }
      );
      alert("Prediction saved successfully!");
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
            <Link className={Style.linkElementNavBar} to="/financialAdvice">
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

        <div className={Style.loanApprovalMainDiv}>
          <div className={Style.loanApprovalMainDivInnerDiv}>
            <h1 className={Style.loanApprovalHeading}>
              Know Your Loan Approval <span className={Style.gradientText}>Instantly.</span>
            </h1>
            <p className={Style.loanApprovalPara}>
              Secure, Accurate, and Reliable
            </p>

            <div className={Style.loanApprovalStepsDiv}>
              <div className={Style.loanApprovalStep}>
                <div className={Style.stepNumberAndHeadingDiv}>
                  <p className={Style.stepNumberPara}>1</p>
                  <p className={Style.loanStepHeading}>Provide Your Information</p>
                </div>
                <p className={Style.loanStepExplanationPara}>
                  Fill in the required details, such as income, credit history, and other essential information to get started.
                </p>
              </div>
              <div className={Style.loanApprovalStep}>
                <div className={Style.stepNumberAndHeadingDiv}>
                  <p className={Style.stepNumberPara}>2</p>
                  <p className={Style.loanStepHeading}>Smart Data Analysis</p>
                </div>
                <p className={Style.loanStepExplanationPara}>
                  Our advanced system processes your data using cutting-edge AI and machine learning models to ensure accuracy and fairness.
                </p>
              </div>
              <div className={Style.loanApprovalStep}>
                <div className={Style.stepNumberAndHeadingDiv}>
                  <p className={Style.stepNumberPara}>3</p>
                  <p className={Style.loanStepHeading}>Instant Loan Prediction</p>
                </div>
                <p className={Style.loanStepExplanationPara}>
                  Receive your loan approval status in seconds, along with a clear explanation of the results with parameters.
                </p>
              </div>
            </div>

            <div className={Style.getPredictionBtnDiv}>
              <button
                onClick={() => setShowLoanFormPopup(true)}
                className={Style.checkEligibilityBtn}
              >
                Check Loan Eligibility
              </button>
            </div>
          </div>
        </div>
      </div>

      {showLoanFormPopup && (
        <div className={Style.overlayPopup}>
          <div className={Style.popupContent}>
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
              <button
                type="button"
                className={Style.closeButton}
                onClick={() => setShowLoanFormPopup(false)}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}

      {showPredictionPopup && (
        <div className={Style.overlayPopup}>
          <div className={Style.popupContent}>
            <h3>Prediction Result</h3>
            {predictionResult && (
              <div>
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
                <button onClick={savePredictionResult} className={Style.saveButton}>
                  Save Prediction
                </button>
                <button
                  type="button"
                  className={Style.closeButton}
                  onClick={() => setShowPredictionPopup(false)}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default LoanApproval;


