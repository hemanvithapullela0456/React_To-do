import React, { useState, useEffect } from "react";
import openEye from "../assets/heroicons-solid--eye.png";
import closeEye from "../assets/tabler--eye-off.png";
import TodoIllustrationForSignUp from "../assets/TodoSignUp.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import global from "../Components/Global";

function SignUpForm() {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [haveError, setHaveError] = useState({
    name: false,
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [signUpBtnDisable, setSignUpBtnDisable] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const apiUrl = global.REACT_APP_API_BASE_URL;

  const passwordHandler = () => {
    setShowPassword(!showPassword);
  };

  const confirmPasswordHandler = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleFormInput = (e) => {
    const { name, value } = e.target;
    setInputValue((prevState) => ({ ...prevState, [name]: value }));
  };

  const checkErrors = () => {
    let errors = {};
    let messages = {};

    // Name validation
    if (inputValue.name.length == 0) {
      errors.name = true;
      messages.name = "Please enter name!";
    } else if (/[^a-zA-Z\s]/.test(inputValue.name)) {
      errors.name = true;
      messages.name = "Name can only have letters!";
    } else if (inputValue.name.length < 3 || inputValue.name.length > 20) {
      errors.name = true;
      messages.name = "Name should be between 3 to 20 chars only!";
    }

    // Username validation
    if (inputValue.username.length == 0) {
      errors.username = true;
      messages.username = "Please enter username!";
    } else if (/[^a-zA-Z0-9]/.test(inputValue.username)) {
      errors.username = true;
      messages.username = "Username can only have letters and numbers!";
    } else if (!isNaN(inputValue.username[0])) {
      errors.username = true;
      messages.username = "Username can't start with a number!";
    } else if (
      inputValue.username.length < 3 ||
      inputValue.username.length > 15
    ) {
      errors.username = true;
      messages.username = "Username should be between 3 to 15 chars only!";
    }

    // Email validation
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (inputValue.email.length == 0) {
      errors.email = true;
      messages.email = "Please enter email!";
    } else if (!emailRegex.test(inputValue.email)) {
      errors.email = true;
      messages.email = "Invalid email format!";
    }

    // Password validation
    const password = inputValue.password;
    if (password.length == 0) {
      errors.password = true;
      messages.password = "Please enter password!";
    } else if (!/[a-z]/.test(password)) {
      errors.password = true;
      messages.password =
        "Password must contain at least one lowercase letter!";
    } else if (!/[A-Z]/.test(password)) {
      errors.password = true;
      messages.password =
        "Password must contain at least one uppercase letter!";
    } else if (!/[0-9]/.test(password)) {
      errors.password = true;
      messages.password = "Password must contain at least one number!";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.password = true;
      messages.password =
        "Password must contain at least one special character!";
    } else if (password.length < 8 || password.length > 20) {
      errors.password = true;
      messages.password = "Password must be between 8 to 20 chars long!";
    }
    if (inputValue.confirmPassword.length == 0) {
      errors.confirmPassword = true;
      messages.confirmPassword = "Please enter confirm password!";
    }

    // Confirm password validation
    if (inputValue.password !== inputValue.confirmPassword) {
      errors.confirmPassword = true;
      messages.confirmPassword = "Passwords do not match!";
    }

    return { errors, messages };
  };

  const formValidation = (e) => {
    e.preventDefault();

    const { errors, messages } = checkErrors();

    setHaveError(errors);
    setErrorMessage(messages);

    if (Object.keys(errors).length === 0) {
      sendDataToBackend();
    } else {
      toast.error("Please fill all the required fields");
    }
  };

  const sendDataToBackend = async () => {
    await axios
      .post(apiUrl + "user/signup", {
        name: inputValue.name,
        username: inputValue.username,
        email: inputValue.email,
        password: inputValue.password,
      })
      .then((res) => {
        if (res.data.status === true) {
          toast.success(res.data.message);
          toast("Welcome onboard! please login to start managing tasks");
          navigate("/login");
        } else {
          toast.info(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.error("Error occurred during signup!");
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    token ? navigate("/home") : null;
  }, []);

  return (
    <div className="form-main-container">
      <h1 id="logo" className="logo-for-sigIn-signUp-page">
        to<span>do</span>.
      </h1>
      <img
        src={TodoIllustrationForSignUp}
        alt="TodoIllustration"
        id="main-img"
      />

      <form action="" className="SignUp-signIn-form" onSubmit={formValidation}>
        <h2>Sign Up</h2>

        <input
          type="text"
          name="name"
          value={inputValue.name}
          placeholder="Name"
          onChange={handleFormInput}
        />
        <p
          className={
            haveError.name
              ? "sigUp-form-validation-error-display-field-active"
              : "sigUp-form-validation-error-display-field"
          }
        >
          {errorMessage.name}
        </p>

        <input
          type="text"
          className=""
          name="username"
          value={inputValue.username}
          placeholder="Username"
          onChange={handleFormInput}
        />
        <p
          className={
            haveError.username
              ? "sigUp-form-validation-error-display-field-active"
              : "sigUp-form-validation-error-display-field"
          }
        >
          {errorMessage.username}
        </p>

        <input
          type="email"
          name="email"
          className=""
          value={inputValue.email}
          placeholder="Email Id"
          onChange={handleFormInput}
        />
        <p
          className={
            haveError.email
              ? "sigUp-form-validation-error-display-field-active"
              : "sigUp-form-validation-error-display-field"
          }
        >
          {errorMessage.email}
        </p>

        <div className="password-field">
          <input
            className="pf-password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={inputValue.password}
            placeholder="Password"
            onChange={handleFormInput}
          />
          <div className="pf-img">
            <img
              src={showPassword ? openEye : closeEye}
              alt="reveal password/show password icon"
              className="set-view-password"
              onClick={passwordHandler}
            />
          </div>
        </div>
        <p
          className={
            haveError.password
              ? "sigUp-form-validation-error-display-field-active"
              : "sigUp-form-validation-error-display-field"
          }
        >
          {errorMessage.password}
        </p>

        <div className="password-field">
          <input
            className="pf-password"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={inputValue.confirmPassword}
            placeholder="Confirm Password"
            onChange={handleFormInput}
          />
          <div className="pf-img">
            <img
              src={showConfirmPassword ? openEye : closeEye}
              alt="reveal password/show password icon"
              className="set-view-password"
              onClick={confirmPasswordHandler}
            />
          </div>
        </div>
        <p
          className={
            haveError.confirmPassword
              ? "sigUp-form-validation-error-display-field-active"
              : "sigUp-form-validation-error-display-field"
          }
        >
          {errorMessage.confirmPassword}
        </p>

        <div id="terms-conditions">
          <input type="checkbox" required />
          <p>
            Agree With{" "}
            <Link href="/terms-and-conditions">Terms & Conditions</Link>
          </p>
        </div>

        <input
          type="submit"
          value="Sign Up"
          disabled={signUpBtnDisable}
          className={signUpBtnDisable ? "disable-btn" : "sig-up-btn-active"}
        />

        <div id="login-section">
          <p>Already have an account? </p>
          <Link to="/login">Login Here</Link>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
