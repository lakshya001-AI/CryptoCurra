import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Style from "../App.module.css";
import axios from "axios";

function BiasDetection() {
  const navigate = useNavigate();
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [file, setFile] = useState(null);
  const [results, setResults] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setErrorMessage(null); // Clear previous error messages
  };

  function logoutUser() {
    localStorage.removeItem("authToken");
    navigate("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setErrorMessage("Please select a file before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/bias/analyze-bias",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setResults(response.data.results);
    } catch (error) {
      console.error("Error analyzing bias:", error.message);
      setErrorMessage(error.response?.data?.error || "Failed to analyze bias.");
    }
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
                          <p
                            className={Style.userInfoDivPara1}
                          >{`${userFirstName} ${userLastName}`}</p>
                          <p className={Style.userInfoDivPara2}>{userEmailAddress}</p>
                          <button className={Style.logoutBtn} onClick={logoutUser}>
                            Logout
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

        <div style={{ color: "white" }}>
          <h1>Bias Detection</h1>
          <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Analyze</button>
          </form>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          {results && (
            <div>
              <h2>Results</h2>
              <p>Overall Accuracy: {results.overall_accuracy}</p>
              <h3>By Group</h3>
              <pre>{JSON.stringify(results.by_group, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BiasDetection;

