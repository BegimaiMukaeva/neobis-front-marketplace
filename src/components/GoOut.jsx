import React from "react";
import { Link } from "react-router-dom";
import logOut from '../img/logout.png';

const GoOut = ({  onCancel }) => {
  return (
      <div className='modal-overlay'>
          <div className="delete-product-modal">
              <div className='delete-product'>
                <img src={logOut} alt=""/>
                <h2>Вы действительно хотите выйти с приложения?</h2>
                  <button className='delete-button'>
                      <Link to='/'>Выйти</Link>
                  </button>
                <button onClick={onCancel}>Отмена</button>
              </div>
          </div>
      </div>
  );
};

export default GoOut;
