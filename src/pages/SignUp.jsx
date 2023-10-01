import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MobiMarket from "../components/MobiMarket";
import backButton from '../img/back-icon.svg';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { resetUserExists, setUserExists } from '../redux/actions';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userExists = useSelector(state => state.signup.userExists);

  const [username, setUsername] = useState(localStorage.getItem("tempUsername") || "");
  const [email, setEmail] = useState(localStorage.getItem("tempEmail") || "");
  const [isButtonActive, setIsButtonActive] = useState(false);

  useEffect(() => {
    validateForm(username, email);
  }, [username, email]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const validateForm = (username, email) => {
    const isUsernameValid = /^[a-zA-Z]+$/.test(username);
    const isEmailValid = /^[a-zA-Z]+@[a-zA-Z]+\.[A-Za-z]+$/.test(email);

    setIsButtonActive(isUsernameValid && isEmailValid);
  };

  const handleNextClick = async () => {
    try {
      const userData = {
        username: username,
        email: email,
      };

      const response = await axios.post(
        'http://207.154.198.7:8000/auth/register',
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        dispatch(resetUserExists()); // Сбрасываем флаг о существующем пользователе
        localStorage.setItem("tempUsername", username);
        localStorage.setItem("tempEmail", email);
        navigate("/password");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const { username, email } = error.response.data;
        if (
          (username && username.includes("user с таким username уже существует.")) ||
          (email && email.includes("user с таким email уже существует."))
        ) {
          dispatch(setUserExists(true));
          toast.error("Данный пользователь уже зарегистрирован", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeButton: false,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
        } else {
          dispatch(setUserExists(false));
          console.error("Error registering user:", error);
        }
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
            <Link to="/" className='mobi-market__back-text'>
              <img src={backButton} alt=""/>
              Назад
            </Link>
            <h2>Регистрация</h2>
          </div>
          <div className="mobi-market__lock locked-style">
            <div className="input-container">
              <input
                className={`mobi-market__input myInput ${
                  username ? "active" : ""
                }`}
                type="text"
                placeholder=" "
                value={username}
                onChange={handleUsernameChange}
              />
              <label
                className={`mobi-market__label ${
                  username ? "active" : ""
                }`}
                htmlFor="usernameInput"
              >
                Имя пользователя
              </label>
            </div>
            <div className="input-container">
              <input
                className={`mobi-market__input myInput ${
                  email ? "active" : ""
                }`}
                type="text"
                placeholder=" "
                value={email}
                onChange={handleEmailChange}
              />
              <label
                className={`mobi-market__label ${
                  email ? "active" : ""
                }`}
                htmlFor="emailInput"
              >
                Почта
              </label>
            </div>
            <button
              className={`mobi-market__login-btn ${
                  isButtonActive ? "active-btn" : "not-active"
              }`}
              onClick={handleNextClick}
              disabled={!isButtonActive || userExists}
            >
              Далее
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
