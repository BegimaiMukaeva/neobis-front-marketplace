import React, { useState} from "react";
import confirmIcon from '../img/ConfirmPhoneNumbe.png'

const ConfirmPhoneNumber = ({ onCancel }) => {
  const [verificationCode, setVerificationCode] = useState("");

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };


  return (
    <div className="modal-overlay">
      <div className='modal-number-content-wrapper'>
        <h4 className='modal-number-title'>Изменить номер телефона</h4>
        <div className='modal-number-content'>
          <form>
            <img src={confirmIcon} alt='confirmIcon' />
            <h5 className='modal-number-subtitle'>Введите код из СМС</h5>
            <input type="text"
              placeholder="0000"
              className='code-modal-input'
              maxLength="4"
              onChange={handleVerificationCodeChange}
            />
          </form>
          <button onClick={onCancel} className='confirm-close-button'>✖</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPhoneNumber;
