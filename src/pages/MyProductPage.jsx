import React, { useState, useEffect } from "react";
import ProfileMenu from "../components/ProfileMenu";
import MyProductCard from "../components/MyProductCard";
import MyProductModal from "../components/MyProductModal";
import {Link} from "react-router-dom";
import backButton from "../img/back-icon.svg";
import autoProfileImage from "../img/human-profeli-min.svg";

const MyProductPage = () => {
  const [products, setProducts] = useState([]); // Список товаров
  const [selectedProduct, setSelectedProduct] = useState(null); // Выбранный товар для модального окна

  const username = "bemchik";
  const email = "begimai@gmail.com";
  const initialProducts = [
    {
      id: 1,
      name: "BMW M4 Coupe: A Two-Door",
      price: 23000,
      likes: 100,
      // image: "../img/car.png",
    },
    {
      id: 2,
      name: "BMW M4 Coupe: A Two-Door",
      price: 23000,
      likes: 80,
      // image: "../img/car.png",
    },
  ];

  const handleCardClick = (product) => {
    setSelectedProduct(product);
  };

  const handleLikeClick = (productId) => {

  };

  const handleDeleteClick = (productId) => {

  };

  useEffect(() => {

    setProducts(initialProducts);
  }, []);

  return (
    <div className="favorite-page">
      <ProfileMenu
        username={username}
        email={email}
        isChoosingProfileImage={autoProfileImage}
      />
      <div className="favorite-products">
        <div className="back-button-profile">
            <Link to="/main-page" className='mobi-market__back-text'>
              <img src={backButton} alt=""/>
              Назад
            </Link>
            <h2>Мои товары</h2>
        </div>
        <div className="product-cards">
          {products.map((product) => (
          <MyProductCard
            key={product.id}
            product={product}
            onLikeClick={() => handleLikeClick(product.id)}
            onEditClick={() => handleCardClick(product)}
            onDeleteClick={() => handleDeleteClick(product.id)}
          />
        ))}
        </div>
      </div>
      {selectedProduct && (
        <MyProductModal
          product={selectedProduct}
          onSave={() => setSelectedProduct(null)}
          onCancel={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default MyProductPage;
