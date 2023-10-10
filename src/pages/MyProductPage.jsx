import React, { useState } from "react";
import ProfileMenu from "../components/ProfileMenu";
import MyProductCard from "../components/MyProductCard";
import DeleteProductModal from "../components/DeleteProductModal";
import { Link } from "react-router-dom";
import backButton from "../img/back-icon.svg";
import autoProfileImage from "../img/human-profeli-min.svg";
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct } from '../redux/productsSlice';

const MyProductPage = () => {
  const products = useSelector(state => state.products);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const username = "bemchik";
  const email = "begimai@gmail.com";
  const dispatch = useDispatch();

  const handleDeleteClick = (productId) => {
    setSelectedProduct(productId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    dispatch(deleteProduct(selectedProduct));
    setIsDeleteModalOpen(false);
    setSelectedProduct(null);
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="favorite-page">
      <ProfileMenu
        username={username}
        email={email}
        isChoosingProfileImage={autoProfileImage}
      />
      <div className="favorite-products">
        <div className="back-button-profile">
          <Link to="/main-page" className="mobi-market__back-text">
            <img src={backButton} alt="" />
            Назад
          </Link>
          <h2>Мои товары</h2>
        </div>
        <div className="product-cards">
          {products.map((product) => (
            <MyProductCard
              key={product.id}
              product={product}
              onDeleteClick={handleDeleteClick}
            />
          ))}
        </div>
      </div>
      {selectedProduct && (
        <DeleteProductModal
          product={selectedProduct}
          onDeleteClick={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default MyProductPage;
