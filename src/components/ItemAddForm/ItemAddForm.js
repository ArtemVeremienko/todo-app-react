import React from 'react';
import './ItemAddForm.css';

const ItemAddForm = ({ onItemAdded }) => {
  return (
    <div className="item-add-form">
      <button
        className="btn btn-secondary"
        onClick={() => onItemAdded('text')} >
        Add Item
      </button>
    </div>
  );
}

export default ItemAddForm;