import React, { useState } from "react";
import closeButton from '../img/close-button.svg';
import productImg from '../img/product-img.png';


const MyProductModal = ({ product, onSave, onCancel }) => {
  const [editedProduct, setEditedProduct] = useState({ ...product });
  const [isChangesSaved, setIsChangesSaved] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedProduct({ ...editedProduct, [name]: value });
    setIsChangesSaved(false);
  };

  const handleSaveClick = () => {

    onSave(editedProduct);
    setIsChangesSaved(true);
  };

  return (
      <div className='modal-overlay'>
          <div className="product-information-modal">
              <button className="close-button" onClick={onCancel}>
                  <img src={closeButton} alt=""/>
              </button>
               <div className="product-information-images">
                   <img src={productImg} alt=""/>
               </div>
                <input
                  type="text"
                  name="name"
                  value={editedProduct.name}
                  onChange={handleInputChange}
                />
                <input
                  type="number"
                  name="price"
                  value={editedProduct.price}
                  onChange={handleInputChange}
                />
                <textarea
                  name="description"
                  value={editedProduct.description}
                  onChange={handleInputChange}
                />
                <textarea
                  name="description"
                  value={editedProduct.description}
                  onChange={handleInputChange}
                />
              <button className='save-information' onClick={handleSaveClick} disabled={isChangesSaved}>
                Сохранить
              </button>
        </div>
      </div>

  );
};

export default MyProductModal;
