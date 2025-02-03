// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Style from "../App.module.css";

// function FinancialAdvice() {
//   const navigate = useNavigate();
//   const [showUserInfo, setShowUserInfo] = useState(false);
  
//   function logoutUser() {
//     localStorage.removeItem("authToken");
//     navigate("/");
//   }

//   let userFirstName = localStorage.getItem("userFirstName") || "John";
//   let userLastName = localStorage.getItem("userLastName") || "Doe";
//   let userEmailAddress =
//     localStorage.getItem("userEmailAddress") || "john.doe@example.com";
    
    
//     const [salary, setSalary] = useState("");
//   const [expenses, setExpenses] = useState("");
//   const [savings, setSavings] = useState("");
//   const [advice, setAdvice] = useState("");
//   const [loading, setLoading] = useState(false);

// //   const handleSubmit = async () => {
// //     setLoading(true);
// //     setAdvice(""); // Clear previous advice
// //     try {
// //       const response = await fetch("http://localhost:5000/api/financial-advice", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({ salary, expenses, savings }),
// //       });
// //       const data = await response.json();

// //       if (data.advice) {
// //         setAdvice(data.advice);
// //       } else {
// //         setAdvice("Unable to fetch advice. Please try again later.");
// //       }
// //     } catch (error) {
// //       console.error("Error fetching advice:", error);
// //       setAdvice("An error occurred. Please try again later.");
// //     }
// //     setLoading(false);
// //   };

// const handleSubmit = async () => {
//     setLoading(true);
//     setAdvice("");

//     try {
//       const response = await fetch("http://localhost:5000/api/financial-advice", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ salary, expenses, savings }),
//       });

//       if (!response.ok) { // Check for HTTP errors (e.g., 400, 500)
//         const errorData = await response.json(); // Try to get error details from the server
//         throw new Error(errorData.error || `HTTP error ${response.status}`); // Throw an error with a more informative message
//       }


//       const data = await response.json();

//       if (data.advice) {
//         setAdvice(data.advice);
//       } else {
//         setAdvice("No advice received from the server."); // More specific message
//       }
//     } catch (error) {
//       console.error("Error fetching advice:", error);
//       setAdvice("An error occurred: " + error.message); // Display the error message to the user
//     } finally {
//       setLoading(false);
//     }
//   };
 

//   return (
//     <>
//       <div className={Style.mainDiv}>
//         <div className={Style.mainPageMainDiv}>
//           <div className={Style.navBarMainPage}>
//             <div className={Style.logoNavBarMainPage}>
//               <h1>FINEX</h1>
//             </div>

//             <div className={Style.linkNavBarMainPage}>
//               <Link className={Style.linkElementNavBar} to="/mainPage">
//                 Home
//               </Link>
//               <Link className={Style.linkElementNavBar} to="/biasDetection">
//                 Bias
//               </Link>
//               <Link className={Style.linkElementNavBar} to="/loanApproval">
//                 Loans
//               </Link>
//               <Link className={Style.linkElementNavBar} to="/financialAdvice">
//                 Advice
//               </Link>
//             </div>

//             <div className={Style.ProfileBtnNavBarMainPage}>
//               <button
//                 className={Style.profileBtn}
//                 onClick={() => setShowUserInfo(!showUserInfo)}
//               >
//                 Profile
//               </button>

//               {showUserInfo && (
//                 <div className={Style.userInfoDiv}>
//                   <p className={Style.userInfoDivPara1}>
//                     {`${userFirstName} ${userLastName}`}
//                   </p>
//                   <p className={Style.userInfoDivPara2}>{userEmailAddress}</p>
//                   <button className={Style.logoutBtn} onClick={logoutUser}>
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div style={{ padding: "20px", color:"white"}}>
//       <h2>Get Personalized Financial Advice</h2>
//       <div>
//         <label>
//           Salary:{" "}
//           <input
//             type="number"
//             value={salary}
//             onChange={(e) => setSalary(e.target.value)}
//             placeholder="Enter your monthly salary"
//           />
//         </label>
//       </div>
//       <div>
//         <label>
//           Expenses:{" "}
//           <input
//             type="number"
//             value={expenses}
//             onChange={(e) => setExpenses(e.target.value)}
//             placeholder="Enter your monthly expenses"
//           />
//         </label>
//       </div>
//       <div>
//         <label>
//           Savings:{" "}
//           <input
//             type="number"
//             value={savings}
//             onChange={(e) => setSavings(e.target.value)}
//             placeholder="Enter your total savings"
//           />
//         </label>
//       </div>
//       <button onClick={handleSubmit} disabled={loading}>
//         {loading ? "Fetching Advice..." : "Get Advice"}
//       </button>
//       {advice && (
//         <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ddd" }}>
//           <h3>Advice:</h3>
//           <p>{advice}</p>
//         </div>
//       )}
//     </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default FinancialAdvice;


// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Style from "../App.module.css";

// function FinancialAdvice() {
//   const navigate = useNavigate();
//   const [showUserInfo, setShowUserInfo] = useState(false);

//   function logoutUser() {
//     localStorage.removeItem("authToken");
//     navigate("/");
//   }

//   let userFirstName = localStorage.getItem("userFirstName") || "John";
//   let userLastName = localStorage.getItem("userLastName") || "Doe";
//   let userEmailAddress = localStorage.getItem("userEmailAddress") || "john.doe@example.com";

//   const [salary, setSalary] = useState("");
//   const [expenses, setExpenses] = useState("");
//   const [savings, setSavings] = useState("");
//   const [advice, setAdvice] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async () => {
//     setLoading(true);
//     setAdvice("");

//     try {
//       const response = await fetch("http://localhost:5000/api/financial-advice", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ salary, expenses, savings }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || `HTTP error ${response.status}`);
//       }

//       const data = await response.json();

//       if (data.advice) {
//         setAdvice(data.advice);
//       } else {
//         setAdvice("No advice received from the server.");
//       }
//     } catch (error) {
//       console.error("Error fetching advice:", error);
//       setAdvice("An error occurred: " + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={Style.mainDiv}>
//       <div className={Style.mainPageMainDiv}>
//         <div className={Style.navBarMainPage}>
//           <div className={Style.logoNavBarMainPage}>
//             <h1>FINEX</h1>
//           </div>

//           <div className={Style.linkNavBarMainPage}>
//             <Link className={Style.linkElementNavBar} to="/mainPage">
//               Home
//             </Link>
//             <Link className={Style.linkElementNavBar} to="/biasDetection">
//               Bias
//             </Link>
//             <Link className={Style.linkElementNavBar} to="/loanApproval">
//               Loans
//             </Link>
//             <Link className={Style.linkElementNavBar} to="/financialAdvice">
//               Advice
//             </Link>
//           </div>

//           <div className={Style.ProfileBtnNavBarMainPage}>
//             <button
//               className={Style.profileBtn}
//               onClick={() => setShowUserInfo(!showUserInfo)}
//             >
//               Profile
//             </button>

//             {showUserInfo && (
//               <div className={Style.userInfoDiv}>
//                 <p className={Style.userInfoDivPara1}>
//                   {`${userFirstName} ${userLastName}`}
//                 </p>
//                 <p className={Style.userInfoDivPara2}>{userEmailAddress}</p>
//                 <button className={Style.logoutBtn} onClick={logoutUser}>
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         <div style={{ padding: "20px", color: "white" }}>
//           <h2>Get Personalized Financial Advice</h2>
//           <div>
//             <label>
//               Salary:{" "}
//               <input
//                 type="number"
//                 value={salary}
//                 onChange={(e) => setSalary(e.target.value)}
//                 placeholder="Enter your monthly salary"
//               />
//             </label>
//           </div>
//           <div>
//             <label>
//               Expenses:{" "}
//               <input
//                 type="number"
//                 value={expenses}
//                 onChange={(e) => setExpenses(e.target.value)}
//                 placeholder="Enter your monthly expenses"
//               />
//             </label>
//           </div>
//           <div>
//             <label>
//               Savings:{" "}
//               <input
//                 type="number"
//                 value={savings}
//                 onChange={(e) => setSavings(e.target.value)}
//                 placeholder="Enter your total savings"
//               />
//             </label>
//           </div>
//           <button onClick={handleSubmit} disabled={loading}>
//             {loading ? "Fetching Advice..." : "Get Advice"}
//           </button>

//           {advice && (
//             <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ddd" }}>
//               <h3>Advice:</h3>
//               <div>
//                 <p><strong>Concerning Aspects:</strong></p>
//                 <ul>
//                   <li><strong>High Expense-to-Income Ratio:</strong> You're spending 75% of your salary. A healthy ratio should ideally be below 50%, closer to 30-40%.</li>
//                   <li><strong>Low Emergency Fund:</strong> Having 100,000 in savings is good, but it's only 2.5 months of expenses. Aim for 3-6 months of living expenses in easily accessible savings.</li>
//                 </ul>
//                 <p><strong>Positive Aspect:</strong></p>
//                 <ul>
//                   <li><strong>Significant Income:</strong> Your annual salary provides a solid foundation for financial growth.</li>
//                 </ul>
//                 <p><strong>Financial Advice:</strong></p>
//                 <ul>
//                   <li><strong>1. Aggressive Expense Reduction:</strong> Track spending, identify areas to cut back, and reduce discretionary spending.</li>
//                   <li><strong>2. Build an Emergency Fund:</strong> Aim for 3-6 months of expenses saved up.</li>
//                   <li><strong>3. Debt Management:</strong> If you have high-interest debt, pay it off using the avalanche or snowball method.</li>
//                   <li><strong>4. Investing for the Future:</strong> Once your emergency fund is set, start investing in retirement accounts and a diversified portfolio.</li>
//                   <li><strong>5. Financial Education:</strong> Learn about personal finance to improve your literacy and make better decisions.</li>
//                   <li><strong>6. Regular Review:</strong> Track your progress, adjust your budget, and review your investment strategy periodically.</li>
//                 </ul>
//                 <p><strong>Actionable Steps:</strong></p>
//                 <ul>
//                   <li>Create a detailed budget to track income and expenses.</li>
//                   <li>Identify 3 areas to cut back immediately.</li>
//                   <li>Set a savings plan to reach your emergency fund goal within 6 months.</li>
//                 </ul>
//                 <p><strong>Next Steps:</strong> Prioritize building your financial foundation and then focus on investing and wealth-building strategies.</p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FinancialAdvice;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Style from "../App.module.css";

function FinancialAdvice() {
  const navigate = useNavigate();
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [typedText, setTypedText] = useState("");  // State to hold typed text
  const [loading, setLoading] = useState(false);

  function logoutUser() {
    localStorage.removeItem("authToken");
    navigate("/");
  }

  let userFirstName = localStorage.getItem("userFirstName") || "John";
  let userLastName = localStorage.getItem("userLastName") || "Doe";
  let userEmailAddress = localStorage.getItem("userEmailAddress") || "john.doe@example.com";

  const [salary, setSalary] = useState("");
  const [expenses, setExpenses] = useState("");
  const [savings, setSavings] = useState("");
  const [advice, setAdvice] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setTypedText(""); // Clear previous typed text

    try {
      const response = await fetch("http://localhost:5000/api/financial-advice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ salary, expenses, savings }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error ${response.status}`);
      }

      const data = await response.json();

      if (data.advice) {
        setAdvice(data.advice);
        typeWriterEffect(data.advice);  // Trigger typewriter effect when advice is received
      } else {
        setAdvice("No advice received from the server.");
      }
    } catch (error) {
      console.error("Error fetching advice:", error);
      setAdvice("An error occurred: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const typeWriterEffect = (text) => {
    let index = 0;
    const lines = text.split("\n"); // Split the response by new lines for line-by-line typing
    const timer = setInterval(() => {
      setTypedText((prev) => prev + lines[index] + "\n"); // Append each line to the typed text
      index += 1;
      if (index === lines.length) {
        clearInterval(timer); // Stop when all lines are typed
      }
    }, 100); // Adjust the speed (100 ms per character)
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

        <div style={{ padding: "20px", color: "white" }}>
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

          {typedText && (
            <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ddd" }}>
              <h3>Advice:</h3>
              <pre style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', fontSize: '16px' }}>
                {typedText} {/* Displaying the typed text */}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FinancialAdvice;


