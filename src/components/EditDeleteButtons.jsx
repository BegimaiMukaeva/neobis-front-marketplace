import React from "react";
import deleteButton from '../img/delete.svg'
import editButton from '../img/edit.svg'

const EditDeleteButtons = ({ onEditClick, onDeleteClick }) => {
  return (
    <div className="edit-delete-buttons">
        <div className='edit-button'>
            <img onClick={onEditClick} src={editButton} alt=""/>
            <button onClick={onEditClick}>Изменить</button>
        </div>
        <div>
            <img onClick={onDeleteClick} src={deleteButton} alt=""/>
            <button onClick={onDeleteClick}>Удалить</button>
        </div>
    </div>
  );
};

export default EditDeleteButtons;
