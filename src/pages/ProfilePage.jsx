import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Modal from "../components/Modal.jsx";
import ModalNumber from "../components/ModalNumber";
import autoProfileImage from '../img/human-profeli-min.svg'
import backButton from "../img/back-icon.svg";
import ProfileMenu from "../components/ProfileMenu";

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalNumberOpen, setIsModalNumberOpen] = useState(false);
  const [isChoosingProfileImage, setIsChoosingProfileImage] = useState(true);
  const [chosenImage, setChosenImage] = useState("");

  const { username, email } = useSelector((state) => state.user);

  const [userData, setUserData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    middleName: "",
    birthDate: "",
    email: "",
    profileImage: "",
  });

  useEffect(() => {
  }, []);

  const handleLogout = () => {
    setIsModalOpen(true);
  };

  const openModalNumber = () => {
    setIsModalNumberOpen(true);
  };

  const handleLogoutConfirm = () => {
    // Добавьте здесь логику выхода из аккаунта
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

  const handleNameInputChange = (event) => {
    const { name, value } = event.target;

    const isNameValid = /^[A-Za-z]+$/i.test(value);

    setUserData({
      ...userData,
      [name]: isNameValid ? value : "",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    const cleanedValue = value.replace(/[^\d.]/g, "");
    const formattedValue = cleanedValue.replace(/\.+/g, ".");

    setUserData({
      ...userData,
      [name]: formattedValue,
    });
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
            <Link to="/main-page" className='mobi-market__back-text'>
              <img src={backButton} alt=""/>
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
              title=""
            />
          </label>
        </div>
        <div className="profile-form">
          <form>
            <input
              type="text"
              name="firstName"
              placeholder="Имя"
              value={userData.firstName}
              onChange={handleNameInputChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Фамилия"
              value={userData.lastName}
              onChange={handleNameInputChange}
            />
            <input
              type="text"
              name="middleName"
              placeholder="Отчество"
              value={userData.middleName}
              onChange={handleNameInputChange}
            />
            <input
              type="text"
              name="birthDate"
              placeholder="Дата рождения (дд.мм.гггг)"
              value={userData.birthDate}
              onChange={handleInputChange}
            />
          </form>
        </div>
        <div className='add-number'>
          <button
            className="add-number-button"
            onClick={openModalNumber}
          >
            Добавить номер
          </button>
          {isModalNumberOpen && (
            <ModalNumber isOpen={isModalNumberOpen} />
          )}
          <input
            type="text"
            placeholder='0(000) 000 000'
          />
        </div>
        <div className='profile-form'>
          <p>Почта: {email}</p>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          title="Вы действительно хотите выйти с приложения?"
          onConfirm={handleLogoutConfirm}
          onCancel={handleLogoutCancel}
        />
      )}
    </div>
  );
};

export default ProfilePage;
