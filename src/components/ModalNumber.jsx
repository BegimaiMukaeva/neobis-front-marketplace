import React, { useState } from "react";
import addNumberIcon from '../img/addNumberIcon.svg';
import ConfirmPhoneNumber from "./ConfirmPhoneNumber";

const ModalNumber = ({ onCancel }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSendCode = () => {
    setIsConfirmModalOpen(true);
  };

  return (
    <div className="modal-number-overlay">
      <div className='modal-number-content-wrapper'>
        <h4 className='modal-number-title'>Изменить номер телефона</h4>
        <div className='modal-number-content'>
          <form>
            <img src={addNumberIcon} alt='numberIcon' />
            <h5 className='modal-number-subtitle'>Введите номер телефона</h5>
            <h6 className='modal-number-subsubtitle'>Мы отправим вам СМС с кодом подтверждения</h6>
            <input
              type="text"
              placeholder="0(000)000 000"
              className='number-modal-input'
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
            <button type="button" onClick={handleSendCode} className='number-modal-button'>
              Далее
            </button>
          </form>
          <button onClick={onCancel}>Отмена</button>
        </div>
      </div>
      {isConfirmModalOpen && (
        <ConfirmPhoneNumber onCancel={() => setIsConfirmModalOpen(false)} />
      )}
    </div>
  );
};

export default ModalNumber;
