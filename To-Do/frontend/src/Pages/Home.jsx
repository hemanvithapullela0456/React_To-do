import React, { useEffect } from "react";
import App from "../App.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setPreLoader } from "../Store/Reducers/Loader.js";
import { useDispatch } from "react-redux";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setPreLoader(true));
    const token = localStorage.getItem("token");
    token ? navigate("/home") : navigate("/login");
    dispatch(setPreLoader(false));
  }, []);

  return (
    <div>
      <App />
    </div>
  );
}

export default Home;
