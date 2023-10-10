import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MobiMarket from "../components/MobiMarket";
import backButton from '../img/back-icon.svg';
import axios from 'axios';
import lockImg from '../img/lock-img.svg';
// import { setUserData } from "../redux/userSlice";
import {toast} from "react-toastify";

const ConfirmPasswordPage = () => {
  const navigate = useNavigate();
  const username = useSelector(state => state.user.username);
  const email = useSelector(state => state.user.email);
  const dispatch = useDispatch();

  const savedPassword = localStorage.getItem("tempPassword");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
    setIsButtonActive(confirmPassword === savedPassword);
    if (confirmPassword !== savedPassword && confirmPassword !== "") {
      setErrorMessage("Пароли не совпадают");
    } else {
      setErrorMessage("");
    }
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("pas:", confirmPassword);
  }, [confirmPassword, savedPassword]);

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleNextClick = async () => {
    if (confirmPassword !== savedPassword) {
      setErrorMessage("Пароли не совпадают");
    } else {
      try {
        const response = await axios.post(
          'https://neobis-project-2.up.railway.app/api/auth/register',
          {
            login: username,
            email: email,
            password: confirmPassword,
          }
        );

        if (response.status === 200) {
          localStorage.removeItem("tempPassword");
          // dispatch(setUserData({ username, email }));
          navigate("/");

          toast.success("Регистрация прошла успешно!", {
          position: "top-right",
          autoClose: 4000,
          theme: "light",
          });
        } else {
          console.error("Error creating user:", response.data.message);
        }
      } catch (error) {
        console.error("Error creating user:", error);
      }
    }
  };

  return (
    <div className="container">
      <div className="mobi-market">
        <div>
          <MobiMarket />
        </div>
        <div>
          <div className="back-button">
            <Link to="/password" className="mobi-market__back-text">
              <img src={backButton} alt="" />
              Назад
            </Link>
            <h2>Регистрация</h2>
            <button
              onClick={handleToggleShowPassword}
              className={`toggle-password-btn ${
                showPassword ? "show-password-password" : "dont-show-password"
              }`}
              type="button">
            </button>
          </div>
          <div className="mobi-market__lock">
            <img src={lockImg} alt="" />
            <h3>Повторите пароль</h3>
            <p>Минимальная длина — 8 символов. Для надежности пароль должен содержать буквы и цифры.</p>
            <div className="input-container">
              <input
                className="mobi-market__input myInput"
                type={showPassword ? "text" : "password"}
                placeholder=" "
                value={savedPassword}
                readOnly
              />
            </div>
            <div className="input-container">
              <input
                className="mobi-market__input myInput"
                type={showPassword ? "text" : "password"}
                placeholder=" "
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </div>
            <p className="error-message">{errorMessage}</p>
            <button
              className={`mobi-market__login-btn ${
                isButtonActive ? "active-btn" : "not-active"
              }`}
              onClick={handleNextClick}
              disabled={!isButtonActive}
            >
              Далее
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPasswordPage;
