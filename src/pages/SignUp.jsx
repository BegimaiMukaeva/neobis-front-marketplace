import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MobiMarket from "../components/MobiMarket";
import backButton from '../img/back-icon.svg';
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();

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
    const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

    setIsButtonActive(isUsernameValid && isEmailValid);
  };

  const handleNextClick = async () => {
    try {
      const response = await axios.get(
        `https://neobis-project-2.up.railway.app/api/auth/credentialsCheck?login=${username}&email=${email}`
      );

      if (response.data) {
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
        localStorage.setItem("tempUsername", username);
        localStorage.setItem("tempEmail", email);
        navigate("/password");
      }
    } catch (error) {
      console.error("Error checking credentials:", error);
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

export default SignUp;
