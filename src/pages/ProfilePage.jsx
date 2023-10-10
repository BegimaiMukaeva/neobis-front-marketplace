import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../components/Modal.jsx";
import ModalNumber from "../components/ModalNumber";
import autoProfileImage from '../img/human-profeli-min.svg';
import backButton from "../img/back-icon.svg";
import ProfileMenu from "../components/ProfileMenu";
import { setUserData } from "../redux/userSlice";

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalNumberOpen, setIsModalNumberOpen] = useState(false);
  const [isChoosingProfileImage, setIsChoosingProfileImage] = useState(true);
  const [chosenImage, setChosenImage] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const { username, email } = user;

  useEffect(() => {
  }, []);

  const handleLogout = () => {
    setIsModalOpen(true);
  };

  const closeModalNumber = () => {
    setIsModalNumberOpen(false);
  };

  const openModalNumber = () => {
    setIsModalNumberOpen(true);
  };

  const handleLogoutCancel = () => {
    setIsModalOpen(false);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage);
      setChosenImage(imageUrl);
      setIsChoosingProfileImage(false);
    }
  };

  return (
    <div className="profile-page">
      <ProfileMenu
        username={username}
        email={email}
        isChoosingProfileImage={isChoosingProfileImage}
        chosenImage={chosenImage}
        onImageChange={handleImageChange}
      />
      <div className="profile-content">
        <div className="profile-header">
          <div className="back-button-profile">
            <Link to="/main-page" className="mobi-market__back-text">
              <img src={backButton} alt="" />
              Назад
            </Link>
            <h2>Профиль</h2>
          </div>
        </div>
        <div className="profile-image-container">
          <img
              src={isChoosingProfileImage ? autoProfileImage : chosenImage}
              alt="Profile"
              className="profile-image"
            />
          <label htmlFor="profile-image-input" className="profile-image-label">
            <input
              type="file"
              accept="image/*"
              className="profile-image-input"
              onChange={handleImageChange}
              id="profile-image-input"
            />
            {isChoosingProfileImage ? "Выбрать фотографию" : null}
          </label>
        </div>
        <div className="profile-form">
          <form>
            <input
              type="text"
              name="firstName"
              placeholder="Имя"
              value={user.firstName}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Фамилия"
              value={user.lastName}
            />
            <div className="profile-form">
              <p>Имя пользователя: {username}</p>
            </div>
            <input
              type="text"
              name="birthDate"
              placeholder="Дата рождения (дд.мм.гггг)"
              value={user.birthDate}
            />
          </form>
        </div>
        <div className="add-number">
          <button className="add-number-button" onClick={openModalNumber}>
            Добавить номер
          </button>
          {isModalNumberOpen && (
            <ModalNumber isOpen={isModalNumberOpen} onCancel={closeModalNumber} />
          )}
          <input type="text" placeholder="0(000) 000 000" />
        </div>
        <div className="profile-form">
          <p>Почта:{user.email}</p>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          title="Вы действительно хотите выйти с приложения?"
          onCancel={handleLogoutCancel}
        />
      )}
    </div>
  );
};

export default ProfilePage;
