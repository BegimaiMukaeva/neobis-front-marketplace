import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserEmail, setUserUsername } from "../redux/userSlice";
import MobiMarket from "../components/MobiMarket";
import backButton from '../img/back-icon.svg';

const SignUp = () => {
  const dispatch = useDispatch();
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


  const handleNextClick = () => {
    dispatch(setUserEmail(email));
    dispatch(setUserUsername(username));
    navigate("/password");
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
