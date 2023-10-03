import React, { useState } from "react";
import MainProduct from "../components/MainProduct";
import AddProduct from "../components/AddProduct";
import logoImg from "../img/logo.png";
import { Link } from "react-router-dom";
import autoProfileImage from "../img/human-profeli-min.svg";
import ProductCard from "../components/ProductCard";

const MainPage = () => {
  const [products, setProducts] = useState([]); // Список товаров
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

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
  const handleAddProduct = (productInfo, images) => {
    setIsAddProductModalOpen(false);
  };
  const handleCloseModal = () => {
    setIsAddProductModalOpen(false);
  };


  const username = "bemchik";
  const email = "begimai@gmail.com";

  return (
    <div className="main-page">
      <header className="header">
          <div className="logo">
          <img src={logoImg} alt="" />
        </div>
          <div className='header__button'>
              <button onClick={() => setIsAddProductModalOpen(true)}>
                Подать объявление
              </button>
              <Link to="/success-sign-up">
                  <div className="user-profile">
                      <div>
                          <p>{username}</p>
                          <p>{email}</p>
                      </div>
                      <img src={autoProfileImage} alt="Фото профиля" />
                  </div>
              </Link>
          </div>
      </header>
      {isAddProductModalOpen && <AddProduct onAddProduct={handleAddProduct} onCancel={handleCloseModal} />}
      <div className="product-list">
        {initialProducts.map((product) => (
          <MainProduct
              key={product.id}
              product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
