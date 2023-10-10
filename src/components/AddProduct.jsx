import React, { useState } from "react";
import closeButton from "../img/close-button.svg";
import chooseProductPhoto from "../img/Frame 851212086.png";
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/productsSlice';

const AddProduct = ({ onAddProduct, onCancel , addNewProduct}) => {
  const [productInfo, setProductInfo] = useState({
    price: "",
    name: "",
    shortDescription: "",
    fullDescription: "",
  });

  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(true);
  const [isChoosingProfileImage, setIsChoosingProfileImage] = useState(true);
  const [chosenImage, setChosenImage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductInfo({ ...productInfo, [name]: value });
    setIsAddButtonDisabled(
      !productInfo.price ||
        !productInfo.name ||
        !productInfo.shortDescription ||
        !productInfo.fullDescription
    );
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage);
      setChosenImage(imageUrl);
      setIsChoosingProfileImage(false);
    }
  };
  const dispatch = useDispatch();

  const handleAddProduct = () => {
    const newProduct = {
      image: isChoosingProfileImage ? chooseProductPhoto : chosenImage,
      productName: productInfo.name,
      shortDescription: productInfo.shortDescription,
      fullDescription: productInfo.fullDescription,
      price: parseFloat(productInfo.price),
    };
    dispatch(addProduct(newProduct));
    console.log(newProduct)

    onAddProduct(newProduct);
    addNewProduct(newProduct);
    setProductInfo({
      price: "",
      name: "",
      shortDescription: "",
      fullDescription: "",
    });
    setIsAddButtonDisabled(true);
    setIsChoosingProfileImage(true);
    onCancel();
  };

  return (
    <div className="modal-overlay">
      <div className="product-information-modal">
        <button className="close-button" onClick={onCancel}>
          <img src={closeButton} alt="" />
        </button>
        <div className="profile-image-container">
          <label htmlFor="profile-image-input" className="product-image-label">
            <img
              src={isChoosingProfileImage ? chooseProductPhoto : chosenImage}
              alt="Profile"
              className="profile-image-product"
            />
            <input
              type="file"
              id="profile-image-input"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </label>
        </div>
        <input
          type="text"
          name="name"
          placeholder="Название"
          onChange={handleInputChange}
          value={productInfo.name}
        />
        <input
          type="number"
          name="price"
          placeholder="Цена"
          onChange={handleInputChange}
          value={productInfo.price}
        />
        <input
          name="shortDescription"
          placeholder="Краткое описание"
          onChange={handleInputChange}
          value={productInfo.shortDescription}
        />
        <textarea
          name="fullDescription"
          placeholder="Полное описание"
          onChange={handleInputChange}
          value={productInfo.fullDescription}
        />

        <button
          onClick={handleAddProduct}
          className={`add-product-button ${
            isAddButtonDisabled ? "not-active" : "active-btn"
          }`}
          disabled={isAddButtonDisabled}
        >
          Добавить
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
