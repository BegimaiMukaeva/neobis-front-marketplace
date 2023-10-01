import React, { useState } from "react";
import closeButton from "../img/close-button.svg";

const AddProduct = ({ onAddProduct , onCancel}) => {
  const [productInfo, setProductInfo] = useState({
    price: "",
    name: "",
    shortDescription: "",
    fullDescription: "",
  });
  const [images, setImages] = useState([]);
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductInfo({ ...productInfo, [name]: value });
    setIsAddButtonDisabled(
      !productInfo.price || !productInfo.name || !productInfo.shortDescription || !productInfo.fullDescription
    );
  };

  const handleAddProduct = () => {

    onAddProduct(productInfo, images);
  };

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImages(selectedImages);
  };

  return (
      <div className='modal-overlay'>
          <div className="product-information-modal">
              <button className="close-button" onClick={onCancel}>
                  <img src={closeButton} alt=""/>
              </button>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
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
                disabled={isAddButtonDisabled}
                className='add-product-button'
              >
                Добавить
              </button>
          </div>
      </div>

  );
};

export default AddProduct;
