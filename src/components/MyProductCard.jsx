import React, { useState, useEffect, useRef } from "react";
import MyProductModal from "./MyProductModal";
import EditDeleteButtons from "./EditDeleteButtons";
import likeImg from '../img/like.svg'
import menuButton from '../img/menu-buttonn.svg';

const MyProductCard = ({ product, onLikeClick, onDeleteClick }) => {
  const [isMyProductModalOpen, setIsMyProductModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isEditDeleteButtonsOpen, setIsEditDeleteButtonsOpen] = useState(false);

  const myProductCardRef = useRef(null);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    if (onLikeClick) {
      onLikeClick(product.id);
    }
  };

  const openMyProductModal = () => {
    setIsMyProductModalOpen(true);
  };

  const closeMyProductModal = () => {
    setIsMyProductModalOpen(false);
  };

  const openEditDeleteButtons = () => {
    setIsEditDeleteButtonsOpen(true);
  };

  const closeEditDeleteButtons = () => {
    setIsEditDeleteButtonsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        myProductCardRef.current &&
        !myProductCardRef.current.contains(event.target)
      ) {
        closeEditDeleteButtons();
      }
    };

    if (isEditDeleteButtonsOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isEditDeleteButtonsOpen]);

  return (
    <div className="product-card" ref={myProductCardRef}>
      <img src={product.image} alt={product.productName} />
      <h3>{product.productName}</h3>
      <p>{product.price} $</p>
      <div className='like-button-block'>
          <button className={`like-button ${isLiked ? "liked" : ""}`} onClick={handleLikeClick}>
            <img src={likeImg} alt=""/>
          </button>
          <span>{product.likes ? product.likes : '110'}</span>
          <button className='menu-button' onClick={openEditDeleteButtons}>
            <img className='menu-button__img' src={menuButton} alt=""/>
          </button>
      </div>
      {isMyProductModalOpen && (
        <MyProductModal
          product={product}
          onSave={closeMyProductModal}
          onCancel={closeMyProductModal}
        />
      )}
      {isEditDeleteButtonsOpen && (
        <EditDeleteButtons
          onEditClick={openMyProductModal}
          onDeleteClick={() => onDeleteClick(product.id)}
        />
      )}
    </div>
  );
};

export default MyProductCard;
