import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Style from "../App.module.css";

function FinancialAdvice() {
  const navigate = useNavigate();
  const [showUserInfo, setShowUserInfo] = useState(false);
  
  function logoutUser() {
    localStorage.removeItem("authToken");
    navigate("/");
  }

  let userFirstName = localStorage.getItem("userFirstName") || "John";
  let userLastName = localStorage.getItem("userLastName") || "Doe";
  let userEmailAddress =
    localStorage.getItem("userEmailAddress") || "john.doe@example.com";
    
    
    const [salary, setSalary] = useState("");
  const [expenses, setExpenses] = useState("");
  const [savings, setSavings] = useState("");
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);

//   const handleSubmit = async () => {
//     setLoading(true);
//     setAdvice(""); // Clear previous advice
//     try {
//       const response = await fetch("http://localhost:5000/api/financial-advice", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ salary, expenses, savings }),
//       });
//       const data = await response.json();

//       if (data.advice) {
//         setAdvice(data.advice);
//       } else {
//         setAdvice("Unable to fetch advice. Please try again later.");
//       }
//     } catch (error) {
//       console.error("Error fetching advice:", error);
//       setAdvice("An error occurred. Please try again later.");
//     }
//     setLoading(false);
//   };

const handleSubmit = async () => {
    setLoading(true);
    setAdvice("");

    try {
      const response = await fetch("http://localhost:5000/api/financial-advice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ salary, expenses, savings }),
      });

      if (!response.ok) { // Check for HTTP errors (e.g., 400, 500)
        const errorData = await response.json(); // Try to get error details from the server
        throw new Error(errorData.error || `HTTP error ${response.status}`); // Throw an error with a more informative message
      }


      const data = await response.json();

      if (data.advice) {
        setAdvice(data.advice);
      } else {
        setAdvice("No advice received from the server."); // More specific message
      }
    } catch (error) {
      console.error("Error fetching advice:", error);
      setAdvice("An error occurred: " + error.message); // Display the error message to the user
    } finally {
      setLoading(false);
    }
  };
 

  return (
    <>
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

          <div style={{ padding: "20px", color:"white"}}>
      <h2>Get Personalized Financial Advice</h2>
      <div>
        <label>
          Salary:{" "}
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="Enter your monthly salary"
          />
        </label>
      </div>
      <div>
        <label>
          Expenses:{" "}
          <input
            type="number"
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
            placeholder="Enter your monthly expenses"
          />
        </label>
      </div>
      <div>
        <label>
          Savings:{" "}
          <input
            type="number"
            value={savings}
            onChange={(e) => setSavings(e.target.value)}
            placeholder="Enter your total savings"
          />
        </label>
      </div>
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Fetching Advice..." : "Get Advice"}
      </button>
      {advice && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ddd" }}>
          <h3>Advice:</h3>
          <p>{advice}</p>
        </div>
      )}
    </div>
        </div>
      </div>
    </>
  );
}

export default FinancialAdvice;
