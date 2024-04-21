// PopupWindowPut.js
import React, { useState } from 'react';

function PopupWindowPut({ type, onSubmit }) {
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await onSubmit(formData, type);
      setMessage(response.message);
    } catch (error) {
      console.error('Error submitting form:', error);
      // setMessage('Error submitting form');
    }
};

  const inputFields = {
    warehouse: (
      <>
        <input type="text" name="warehouse_id" placeholder="Warehouse ID" onChange={handleChange} />
        <input type="text" name="warehouse_name" placeholder="Warehouse Name" onChange={handleChange} />
        <input type="text" name="warehouse_address" placeholder="Warehouse Address" onChange={handleChange} />
        <input type="text" name="warehouse_manager" placeholder="Warehouse Manager" onChange={handleChange} />
        <input type="number" name="warehouse_maximum_capacity" placeholder="100" onChange={handleChange} />
      </>
    ),

    product: (
      <>
        <input type="number" name="product_id" placeholder="Product ID" step="any" onChange={handleChange} />
        <input type="text" name="product_name" placeholder="Product Name" onChange={handleChange} />
        <input type="text" name="prodcut_description" placeholder="Product Description" onChange={handleChange} />
        <input type="text" name="prodcut_category" placeholder="Product Category" onChange={handleChange} />
        <input type="text" name="prodcut_manufacturer" placeholder="Product Manufacturer" onChange={handleChange} />
        <input type="number" name="prodcut_weight" placeholder="Product Weight" step="any" onChange={handleChange} />
        <input type="text" name="prodcut_dimension" placeholder="Product Dimension" onChange={handleChange} />
        <input type="number" name="prodcut_price" placeholder="Product Price" step="any" onChange={handleChange} />
      </>
    ),

    stock: (
      <>
        <input type="number" name="stock_id" placeholder="Stock ID" onChange={handleChange} />
        <input type="number" name="stock_product_id" placeholder="Product ID" onChange={handleChange} />
        <input type="number" name="stock_warehouse_id" placeholder="Warehouse ID" onChange={handleChange} />
        <input type="text" name="stock_name" placeholder="Stock Name" onChange={handleChange} />
        <input type="number" name="stock_quantity" placeholder="Stock Quantity" onChange={handleChange} />
        <input type="date" name="stock_expiration_date" placeholder="Stock Expiration Date" onChange={handleChange} />
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

export default PopupWindowPut;
