import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import backButton from '../img/back-icon.svg';
import MobiMarket from "../components/MobiMarket";
import lockImg from '../img/lock-img.svg';
import axios from 'axios';

const ConfirmPasswordPage = () => {
  const savedPassword = localStorage.getItem("tempPassword"); // Извлекаем пароль из localStorage
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsButtonActive(confirmPassword === savedPassword);
    if (confirmPassword !== savedPassword && confirmPassword !== "") {
      setErrorMessage("Пароли не совпадают");
    } else {
      setErrorMessage("");
    }
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
        const username = localStorage.getItem("tempUsername");
        const email = localStorage.getItem("tempEmail");

        const response = await axios.post(
          'http://neobis-project-2-production.up.railway.app/api/auth/register',
          {
            login: username,
            email: email,
            password: confirmPassword,
          }
        );

        if (response.status === 200) {
          localStorage.removeItem("tempUsername");
          localStorage.removeItem("tempEmail");
          localStorage.removeItem("tempPassword"); // Не забудьте удалить пароль после использования
          navigate("/success-sign-up");
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
              type="button"
            >
            </button>
          </div>
          <div className="mobi-market__lock">
            <img src={lockImg} alt=""/>
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
