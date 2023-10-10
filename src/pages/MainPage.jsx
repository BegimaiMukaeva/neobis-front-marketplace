import React, { useState, useEffect } from "react";
import MainProduct from "../components/MainProduct";
import AddProduct from "../components/AddProduct";
import logoImg from "../img/logo.png";
import { Link } from "react-router-dom";
import autoProfileImage from "../img/human-profeli-min.svg";
import { useSelector } from "react-redux";
import axios from "axios";

const MainPage = ({isChoosingProfileImage, chosenImage}) => {
  const { username, email } = useSelector((state) => state.user);
  const [products, setProducts] = useState([]);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  useEffect(() => {
  async function fetchProducts() {
    try {
      const token = localStorage.getItem('accessToken');

      const headers = {
        'Authorization': `Bearer ${token}`,
        'accept': '*/*',
      };

      const response = await axios.get(
        "https://neobis-project-2.up.railway.app/api/product/findAllProducts",
        { headers }
      );

      if (response.status === 200) {
        const productList = response.data;
        setProducts(productList);
      } else {
        console.error("Error fetching products:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
  fetchProducts();
  }, []);

  const handleAddProduct = (newProduct) => {
  const updatedProducts = [...products, newProduct];
  setProducts(updatedProducts);
};

  const addNewProduct = (newProduct) => {
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
  };

  const handleCloseModal = () => {
    setIsAddProductModalOpen(false);
  };

  return (
    <div className="main-page">
      <header className="header">
        <div className="logo">
          <img src={logoImg} alt="" />
        </div>
        <div className="header__button">
          <button onClick={() => setIsAddProductModalOpen(true)}>
            Подать объявление
          </button>
          <Link to="/success-sign-up">
            <div className="user-profile">
              <div>
                <p>{username}</p>
                <p>{email}</p>
              </div>
              <img
                src={autoProfileImage}
                alt="Profile"
                className="profile-image"
              />
            </div>
          </Link>
        </div>
      </header>
      {isAddProductModalOpen && (
        <AddProduct
          onAddProduct={handleAddProduct}
          onCancel={handleCloseModal}
          addNewProduct={addNewProduct}
        />
      )}
      <div className="product-list">
        {products.map((product) => (
          <MainProduct key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
