import React, { useState } from 'react';

function PopupWindowPost({ type, onSubmit, onClose }) {
  const [formData, setFormData] = useState({}); // State to store form data
  const [message, setMessage] = useState(''); // State to store message

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Update form data
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the onSubmit function provided via props
      const response = await onSubmit(formData, type);
      // Update message state with success or error message from backend
      setMessage(response.message);
      // If submission successful, close the popup window
      if (response.success && onClose) {
        onClose();
      }
    } catch (error) {
      // Display error message
      // setMessage('Error: ' + error.message);
    }
  };

  // Define input fields based on the type of data
  const inputFields = {
    warehouse: (
      <>
        <input type="text" name="warehouse_name" placeholder="Warehouse Name" onChange={handleChange} />
        <input type="text" name="warehouse_address" placeholder="line1, line2, pincode" onChange={handleChange} />
        <input type="text" name="warehouse_manager" placeholder="Manager Name" onChange={handleChange} />
        <input type="number" name="warehouse_maximum_capacity" placeholder="100" onChange={handleChange} />
      </>
    ),
    product: (
      <>
        <input type="text" name="product_name" placeholder="Product Name" onChange={handleChange} />
        <input type="text" name="product_description" placeholder="Product Description" onChange={handleChange} />
        <input type="text" name="product_category" placeholder="Product Category" onChange={handleChange} />
        <input type="text" name="product_manufacturer" placeholder="Product Manufacturer" onChange={handleChange} />
        <input type="number" name="product_weight" placeholder="In KGs" step="any" onChange={handleChange} />
        <input type="text" name="product_dimension" placeholder="WxHxL In inch" onChange={handleChange} />
        <input type="number" name="product_price" placeholder="In rupees" step="any" onChange={handleChange} />
      </>
    ),
    stock: (
      <>
        <input type="number" name="stock_warehouse_id" placeholder="Warehouse ID" onChange={handleChange} />
        <input type="number" name="stock_product_id" placeholder="Product ID" onChange={handleChange} />
        <input type="text" name="stock_name" placeholder="Stock Name" onChange={handleChange} />
        <input type="number" name="stock_quantity" placeholder="100" onChange={handleChange} />
        <input type="date" name="stock_expiration_date" placeholder="Stock Expiration Date" onChange={handleChange} />
      </>
    ),
  };

  return (
    <div className="popup">
      <div className="popup-content">
        {/* Render input fields based on the selected type */}
        <form onSubmit={handleSubmit}>
          {inputFields[type]}
          <button type="submit">Submit</button>
        </form>
        {/* Display message */}
        {message && <div>{message}</div>}
      </div>
    </div>
  );
}

export default PopupWindowPost;
