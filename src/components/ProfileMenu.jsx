import React, { useState } from "react";
import { Link } from "react-router-dom";
import autoProfileImage from "../img/human-profeli-min.svg";
import likePage from "../img/like-menu.svg";
import myProduct from "../img/my-product.svg";
import outLock from "../img/outLock.svg";
import directionRight from "../img/direction-right.svg";
import GoOut from "../components/GoOut";
import { useSelector } from "react-redux";

const ProfileMenu = ({ isChoosingProfileImage, chosenImage }) => {
  const {username, email } = useSelector(state => state.user);

  const [isGoOutModalOpen, setIsGoOutModalOpen] = useState(false);

  const handleGoOutCancel = () => {
    setIsGoOutModalOpen(false);
  };

  const handleLogoutClick = () => {
    setIsGoOutModalOpen(true);
  };

  return (
    <div className="profile-menu">
      <div className="profile-info">
        <div className="profile-info__img">
          <Link to="/success-sign-up">
            <img
              src={isChoosingProfileImage ? autoProfileImage : chosenImage}
              alt="Profile"
              className="profile-image"
            />
          </Link>
        </div>
        <div className="profile-info__text">
          <div>
            <Link to="/success-sign-up">Имя пользователя: {username}</Link>
          </div>
          <div>
            <Link to="/success-sign-up">Почта: {email}</Link>
          </div>
        </div>
      </div>
      <div className="profile-menu-options">
        <div className="profile-menu-options__menu">
          <div>
            <img
              className="profile-menu-options__menu-img"
              src={likePage}
              alt=""
            />
            <Link to="/favorites" className="profile-menu-options__like">
              Понравившиеся
            </Link>
          </div>
          <Link to="/favorites">
            <img
              className="profile-menu-options__menu-direction-right"
              src={directionRight}
              alt=""
            />
          </Link>
        </div>
        <div className="profile-menu-options__menu">
          <div>
            <img
              className="profile-menu-options__menu-img"
              src={myProduct}
              alt=""
            />
            <Link to="/my-products">Мои товары</Link>
          </div>
          <Link to="/my-products">
            <img
              className="profile-menu-options__menu-direction-right"
              src={directionRight}
              alt=""
            />
          </Link>
        </div>
        <div className="profile-menu-options__menu">
          <div className="profile-menu-options__menu_button">
            <img src={outLock} alt="" />
            <button onClick={handleLogoutClick}>Выйти</button>
          </div>
        </div>
      </div>
      {isGoOutModalOpen && (
        <GoOut onCancel={handleGoOutCancel} />
      )}
    </div>
  );
};

export default ProfileMenu;
