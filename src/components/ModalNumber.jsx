import React, { useState, useEffect } from "react";
import closeButton from "../img/close-button.svg";

const ModalNumber = ({ isOpen, onCancel }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timer, setTimer] = useState(59);

  useEffect(() => {
    if (isCodeSent) {
      startTimer();
    }
  }, [isCodeSent]);

  const startTimer = () => {
    setIsTimerActive(true);
    let countdown = 59;
    const timerInterval = setInterval(() => {
      if (countdown > 0) {
        countdown -= 1;
        setTimer(countdown);
      } else {
        setIsTimerActive(false);
        clearInterval(timerInterval);
      }
    }, 1000);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleSendCode = () => {
    setIsCodeSent(true);
  };

  const handleResendCode = () => {
    setIsCodeSent(true);
    setTimer(59);
    setIsTimerActive(true);
  };

  const handleVerifyCode = () => {
    if (verificationCode === "1234") {
      setIsCodeValid(true);
      setIsTimerActive(false);
    } else {
      setIsCodeValid(false);
    }
  };

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="delete-product-modal">
        <div className="modal-content">
          <button className="close-button" onClick={onCancel}>
            <img src={closeButton} alt=""/>
          </button>
          <h2>Изменить номер телефона</h2>
          <p>Введите номер телефона:</p>
          <input
            type="text"
            placeholder="0(000) 000 000"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
          {isCodeSent ? (
            <>
              <p>Введите код из SMS:</p>
              <input
                type="text"
                placeholder="0000"
                value={verificationCode}
                onChange={handleVerificationCodeChange}
              />
              {isCodeValid ? (
                <p className="success-message">Код подтвержден!</p>
              ) : (
                <p className="error-message">Неверный код. Попробуйте еще раз.</p>
              )}
              {isTimerActive ? (
                <p>Повторный запрос через: 00:{timer < 10 ? `0${timer}` : timer}</p>
              ) : (
                <button onClick={handleResendCode}>Отправить код еще раз</button>
              )}
            </>
          ) : (
            <p>Мы отправим вам SMS с кодом подтверждения</p>
          )}
          <button
            onClick={isCodeSent ? handleVerifyCode : handleSendCode}
            disabled={isCodeSent && (!verificationCode || verificationCode.length !== 4)}
          >
            {isCodeSent ? "Подтвердить" : "Далее"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalNumber;
