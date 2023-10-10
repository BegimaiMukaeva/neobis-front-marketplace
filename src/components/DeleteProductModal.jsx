import React from "react";
import deleteImg from '../img/Trash.png'

const DeleteProductModal = ({ product, onDeleteClick, onCancel }) => {
  const confirmDelete = () => {
    onDeleteClick(product.id);
  };

  return (
    <div className='modal-overlay'>
      <div className="delete-product-modal">
        <div className='delete-product'>
          <img src={deleteImg} alt=""/>
          <h2>Вы действительно хотите удалить данный товар?</h2>
          <button className='delete-button' onClick={confirmDelete}>Удалить</button>
          <button onClick={onCancel}>Отмена</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;
