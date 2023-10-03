import React, { useState, useEffect, useRef } from "react";
import MyProductModal from "./MyProductModal";
import DeleteProductModal from "./DeleteProductModal";
import EditDeleteButtons from "./EditDeleteButtons";
import carPng from '../img/car.png'
import likeImg from '../img/like.svg'
import menuButton from '../img/menu-buttonn.svg';

const MyProductCard = ({ product, onLikeClick, onDeleteClick }) => {
  const [isMyProductModalOpen, setIsMyProductModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] = useState(false);
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

  const openDeleteProductModal = () => {
    setIsDeleteProductModalOpen(true);
  };

  const closeDeleteProductModal = () => {
    setIsDeleteProductModalOpen(false);
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
 {/*<img src={product.image} alt={product.name} />*/}
      <img src={carPng} alt='' />
      <h3>{product.name}</h3>
      <p>{product.price} $</p>
      <div className='like-button-block'>
          <button className={`like-button ${isLiked ? "liked" : ""}`} onClick={handleLikeClick}>
            <img src={likeImg} alt=""/>
          </button>
          <span>{product.likes}</span>
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
      {isDeleteProductModalOpen && (
        <DeleteProductModal
          product={product}
          onConfirm={onDeleteClick}
          onCancel={closeDeleteProductModal}
        />
      )}
      {isEditDeleteButtonsOpen && (
        <EditDeleteButtons
          onEditClick={openMyProductModal}
          onDeleteClick={openDeleteProductModal}
        />
      )}    </div>
  );
};

export default MyProductCard;
