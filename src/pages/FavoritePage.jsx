import React, { useState, useEffect } from "react";
import ProfileMenu from "../components/ProfileMenu";
import ProductCard from "../components/ProductCard";
import ProductInformationModal from "../components/ProductInformationModal";
import {Link} from "react-router-dom";
import backButton from "../img/back-icon.svg";

const FavoritePage = () => {
  const [products, setProducts] = useState([]); // Список избранных товаров
  const [selectedProduct, setSelectedProduct] = useState(null); // Выбранный товар для модального окна

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
  const fetchFavoriteProducts = () => {
  };

  useEffect(() => {
    fetchFavoriteProducts();
  }, []);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
  };


  const handleLikeClick = (productId) => {

  };

  return (
    <div className="favorite-page">
      <ProfileMenu />
       <div className="favorite-products">
         <div className="back-button-profile">
            <Link to="/main-page" className='mobi-market__back-text'>
              <img src={backButton} alt=""/>
              Назад
            </Link>
            <h2>Понравившиеся</h2>
          </div>
         <div className='product-cards'>
           {initialProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onCardClick={handleCardClick}
            />
          ))}
         </div>
        </div>
      {selectedProduct && (
        <ProductInformationModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default FavoritePage;



