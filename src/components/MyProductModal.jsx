import React, { useState, useEffect } from "react";
import closeButton from '../img/close-button.svg';
import { useSelector, useDispatch } from 'react-redux';
import { updateProduct } from '../redux/productsSlice';

const MyProductModal = ({ product, onSave, onCancel }) => {
  const dispatch = useDispatch();
  const [editedProduct, setEditedProduct] = useState({ ...product });

    const [selectedProductId, setSelectedProductId] = useState(product.id);

    useEffect(() => {
      setSelectedProductId(product.id);
    }, [product.id]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const updatedProduct = { ...editedProduct, [name]: value };
    setEditedProduct(updatedProduct);
  };

  const handleSaveClick = () => {
      dispatch(updateProduct({ ...editedProduct, id: selectedProductId }));
      onSave(editedProduct);
  };


  return (
      <div className='modal-overlay'>
          <div className="product-information-modal">
              <button className="close-button" onClick={onCancel}>
                  <img src={closeButton} alt=""/>
              </button>
               <div className="product-information-images">
                   <img src={editedProduct.image} alt="Product" />
               </div>
                <input
                  type="text"
                  name="productName"
                  value={editedProduct.productName}
                  onChange={handleInputChange}
                />
                <input
                  type="number"
                  name="price"
                  value={editedProduct.price}
                  onChange={handleInputChange}
                />
                <input
                  name="shortDescription"
                  onChange={handleInputChange}
                  value={editedProduct.shortDescription}
                />
                <textarea
                  name="fullDescription"
                  value={editedProduct.fullDescription}
                  onChange={handleInputChange}
                />
              <button className='save-information' onClick={handleSaveClick}>
                Сохранить
              </button>
        </div>
      </div>
  );
};

export default MyProductModal;
