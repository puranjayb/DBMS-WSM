// PopupWindowDelete.js
import React, { useState } from 'react';

function PopupWindowDelete({ type, onSubmit }) {
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await onSubmit(formData);
      setMessage(response.message);
    } catch (error) {
      console.error('Error submitting form:', error);
      // setMessage('Error submitting form');
    }
  };

  const inputFields = {
    warehouse: (
      <>
        <input type="number" name="warehouse_id" placeholder="Warehouse ID" onChange={handleChange} />
      </>
    ),
    product: (
      <>
        <input type="number" name="product_id" placeholder="Product ID" onChange={handleChange} />
      </>
    ),
    stock: (
      <>
        <input type="number" name="stock_id" placeholder="Stock ID" onChange={handleChange} />
      </>
    ),
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <form onSubmit={handleSubmit}>
          {inputFields[type]}
          <button type="submit">Submit</button>
        </form>
        {message && <div>{message}</div>}
      </div>
    </div>
  );
}

export default PopupWindowDelete;
