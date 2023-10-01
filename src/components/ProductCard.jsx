import React, { useState } from "react";
import carPng from '../img/car.png'
import likeImg from '../img/like.svg'

const ProductCard = ({ product, onLikeClick, onCardClick }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    if (onLikeClick) {
      onLikeClick(product.id);
    }
  };

  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick(product);
    }
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      {/*<img src={product.image} alt='' />*/}
      <img src={carPng} alt='' />
      <h3>{product.name}</h3>
      <p>{product.price} $</p>
      <div className='like-button-block'>
          <button className={`like-button ${isLiked ? "liked" : ""}`} onClick={handleLikeClick}>
            <img src={likeImg} alt=""/>
          </button>
          <span>{product.likes}</span>
      </div>
    </div>
  );
};

export default ProductCard;
