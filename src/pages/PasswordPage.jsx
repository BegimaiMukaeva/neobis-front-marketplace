import React, { useState } from "react";
import MobiMarket from "../components/MobiMarket";
import { Link, useNavigate } from "react-router-dom";
import backButton from '../img/back-icon.svg';
import lockImg from '../img/lock-img.svg';

const PasswordPage = () => {
  const [password, setPassword] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validateForm(newPassword);
  };

  const validateForm = (password) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&!*_.])[A-Za-z\d@#$%^&!*_.]{8,15}$/;

    const isFormValid = passwordPattern.test(password);
    setIsButtonActive(isFormValid);

    if (!isFormValid) {
      setErrorMessage(
        "Пароль должен содержать от 8 до 15 символов, хотя бы одну строчную букву, хотя бы одну прописную букву, хотя бы одну цифру и хотя бы один спецсимвол."
      );
    } else {
      setErrorMessage("");
    }
  };

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleNextClick = () => {
    if (!isButtonActive) {
      setErrorMessage(
        "Пароль должен содержать от 8 до 15 символов, хотя бы одну строчную букву, хотя бы одну прописную букву, хотя бы одну цифру и хотя бы один спецсимвол."
      );
      return;
    }
    navigate("/confirm-password:password");localStorage.setItem("tempPassword", password);
    navigate("/confirm-password");
  };

  return (
    <div className="container">
      <div className="mobi-market">
        <div className='mobi-market__img'>
          <MobiMarket />
        </div>
        <div>
          <div className="back-button">
            <Link to="/" className="mobi-market__back-text">
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
            <h3>Придумайте пароль</h3>
            <p>Минимальная длина — 8 символов. <br/> Для надежности пароль должен <br/> содержать буквы и цифры.</p>
            <form>
              <div className="input-container">
                <input
                  className={`mobi-market__input input-password ${
                    password ? "active" : ""
                  }`}
                  type={showPassword ? "text" : "password"}
                  placeholder=" "
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              {errorMessage && (
                <p className="error-message">{errorMessage}</p>
              )}
              <button
                className={`mobi-market__login-btn ${
                  isButtonActive ? "active-btn" : "not-active"
                }`}
                type="button"
                onClick={handleNextClick}
                disabled={!isButtonActive}
              >
                Далее
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PasswordPage;
