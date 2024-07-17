import React from "react";
import LogoutIcon from "../assets/majesticons--logout.png";
import ProfileIcon from "../assets/iconamoon--profile-fill.png";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../Store/Reducers/UserSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
function AccountCenterDropDown() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profileHandler = () => {
    // toast.info("Profile Section is under development");
    navigate("/profile");
  };

  const logoutHandler = () => {
    localStorage.clear();
    dispatch(setUserInfo({}));
    navigate("/login");
    toast.info("You have been logged out");
  };

  return (
    <div id="parent-of-container">
      <div id="ACDD-main-container">
        <section id="profile" onClick={profileHandler}>
          <p>Profile</p>
          <img src={ProfileIcon} alt="profile-icon" />
        </section>

        <section id="logout" onClick={logoutHandler}>
          <p>Logout</p>
          <img src={LogoutIcon} alt="logout-icon" />
        </section>
      </div>
    </div>
  );
}

export default AccountCenterDropDown;
