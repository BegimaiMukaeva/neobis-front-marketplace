import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MobiMarket from "../components/MobiMarket.jsx";
import axios from 'axios';
import jwt_decode from "jwt-decode";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isButtonActive, setIsButtonActive] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    validateForm(e.target.value, password);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validateForm(username, e.target.value);
  };

  const validateForm = (username, password) => {
    const isFormValid = username.trim() !== "" && password.trim() !== "";
    setIsButtonActive(isFormValid);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const userData = {
      login: username,
      password: password,
    };

    const response = await axios.post(
      'https://neobis-project-2.up.railway.app/api/auth/log\n',
      userData,
      {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
      }
    );
    console.log(response.data)
    if (response.status === 200) {
      const { token } = response.data;
      const decodedToken = jwt_decode(token);

      localStorage.setItem('accessToken', token);
      // localStorage.setItem('accessToken', response.data.accessToken);
      navigate("/success-sign-up");
    } else {
      console.error("Error logging in:", response.data.message);
      toast.error("Неверный логин или пароль", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeButton: false,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    toast.error("Неверный логин или пароль", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeButton: false,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  }
};

  return (
    <div className="container">
      <div className="mobi-market">
        <div>
          <MobiMarket />
        </div>
        <div className="mobi-market__login mobi-market__lock">
          <form onSubmit={handleLogin}>
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
                htmlFor="myInput"
              >
                Имя пользователя
              </label>
            </div>

            <div className="input-container">
              <input
                className={`mobi-market__input myInput ${
                  password ? "active" : ""
                }`}
                type={showPassword ? "text" : "password"}
                placeholder=" "
                value={password}
                onChange={handlePasswordChange}
              />
              <label
                className={`mobi-market__label ${
                  password ? "active" : ""
                }`}
                htmlFor="myInput"
              >
                Пароль
              </label>
              <button
                onClick={toggleShowPassword}
                className={showPassword ? "show-password" : "dont-show-pass"}
                type="button"
              >
              </button>
            </div>
            <button
              className={`mobi-market__login-btn ${
                isButtonActive ? "active-btn" : "not-active"
              }`}
              type="submit"
              disabled={!isButtonActive}
            >
              Войти
            </button>
            <Link to="/creat-new-user" className="mobi-market__sign-up-btn">
              Зарегистрироваться
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
