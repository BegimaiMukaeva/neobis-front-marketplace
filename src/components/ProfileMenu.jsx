// import React from "react";
// import { Link } from "react-router-dom";
// import autoProfileImage from "../img/human-profeli-min.svg";
// import likePage from "../img/like-menu.svg";
// import myProduct from "../img/my-product.svg";
// import outLock from "../img/outLock.svg";
// import directionRight from "../img/direction-right.svg";
//
// const ProfileMenu = ({
//   username,
//   email,
//   isChoosingProfileImage,
//   chosenImage,
//   handleLogout,
// }) => {
//   return (
//     <div className="profile-menu">
//       <div className="profile-info">
//         <div className="profile-info__img">
//           <img
//             src={isChoosingProfileImage ? autoProfileImage : chosenImage}
//             alt="Profile"
//             className="profile-image"
//           />
//         </div>
//         <div className="profile-info__text">
//           <p>Имя пользователя: {username}</p>
//           <p>Почта: {email}</p>
//         </div>
//       </div>
//       <div className="profile-menu-options">
//         <div className='profile-menu-options__menu'>
//           <div>
//             <img className='profile-menu-options__menu-img' src={likePage} alt=""/>
//             <Link to="/favorites" className='profile-menu-options__like'>Понравившиеся</Link>
//           </div>
//           <Link to="/favorites"><img className='profile-menu-options__menu-direction-right' src={directionRight} alt=""/></Link>
//         </div>
//         <div className='profile-menu-options__menu'>
//           <div>
//             <img className='profile-menu-options__menu-img'  src={myProduct} alt=""/>
//             <Link to="/my-products">Мои товары</Link>
//           </div>
//           <Link to="/my-products"><img className='profile-menu-options__menu-direction-right' src={directionRight} alt=""/></Link>
//         </div>
//         <div className='profile-menu-options__menu'>
//              <div className="profile-menu-options__menu_button">
//               <img src={outLock} alt="" />
//               <button onClick={handleLogout}>Выйти</button>
//             </div>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default ProfileMenu;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import autoProfileImage from "../img/human-profeli-min.svg";
import likePage from "../img/like-menu.svg";
import myProduct from "../img/my-product.svg";
import outLock from "../img/outLock.svg";
import directionRight from "../img/direction-right.svg";
import GoOut from "../components/GoOut";

const ProfileMenu = ({
  username,
  email,
  isChoosingProfileImage,
  chosenImage,
  handleLogout,
}) => {
  const [isGoOutModalOpen, setIsGoOutModalOpen] = useState(false);

  const handleGoOutConfirm = () => {

  };

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
          <Link to='/success-sign-up'>
            <img
              src={isChoosingProfileImage ? autoProfileImage : chosenImage}
              alt="Profile"
              className="profile-image"
            />
          </Link>
        </div>
        <div className="profile-info__text">
          <div>
            <Link to='/success-sign-up'>Имя пользователя: {username}</Link>
          </div>
          <div>
            <Link to='/success-sign-up'>Почта: {email}</Link>
          </div>
        </div>
      </div>
      <div className="profile-menu-options">
        <div className='profile-menu-options__menu'>
          <div>
            <img className='profile-menu-options__menu-img' src={likePage} alt=""/>
            <Link to="/favorites" className='profile-menu-options__like'>Понравившиеся</Link>
          </div>
          <Link to="/favorites"><img className='profile-menu-options__menu-direction-right' src={directionRight} alt=""/></Link>
        </div>
        <div className='profile-menu-options__menu'>
          <div>
            <img className='profile-menu-options__menu-img'  src={myProduct} alt=""/>
            <Link to="/my-products">Мои товары</Link>
          </div>
          <Link to="/my-products"><img className='profile-menu-options__menu-direction-right' src={directionRight} alt=""/></Link>
        </div>
        <div className='profile-menu-options__menu'>
          <div className="profile-menu-options__menu_button">
            <img src={outLock} alt="" />
            <button onClick={handleLogoutClick}>Выйти</button>
          </div>
        </div>
      </div>
      {isGoOutModalOpen && (
        <GoOut onConfirm={handleGoOutConfirm} onCancel={handleGoOutCancel} />
      )}
    </div>
  );
};

export default ProfileMenu;
