import React, {useState} from "react";
import likeImg from "../img/like.svg";

const MainProduct = ({ product, onLikeClick }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    if (onLikeClick) {
      onLikeClick(product.product_id);
    }
  };
  return (
    <div className="product-card">
      <img src={product.image} alt="" />
      <h3>{product.productName}</h3>
      <p>{product.price} $</p>
      <div className="like-button-block">
        <button
          className={`like-button ${isLiked ? "liked" : ""}`}
          onClick={handleLikeClick}
        >
          <img src={likeImg} alt="" />
        </button>
        <span>{product.numberOfLikes}</span>
      </div>
    </div>
  );
};


export default MainProduct;
