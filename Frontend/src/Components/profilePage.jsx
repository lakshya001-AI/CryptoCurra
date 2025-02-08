import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Style from "../App.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSignOutAlt,
  faInfoCircle,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";

function ProfilePage() {
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

  return <>
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
                      <Link
                                     className={Style.profileBtn}
                                     to="/profilePage"
                                   >
                                     Profile
                                   </Link>
        
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


    </div>


  </div>
  </>;
}

export default ProfilePage;
