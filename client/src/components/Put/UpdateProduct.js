// UpdateProduct.js
import React, { useState } from 'react';
import PopupWindowPut from './PopupWindowPut';

function UpdateProduct() {
  const [showForm, setShowForm] = useState(false); // State to manage form visibility

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch('http://localhost:3000/crud/updateProduct', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Product updated successfully
        alert('Product updated successfully'); // You can also display a message or perform other actions
      } else {
        // Error updating product
        const data = await response.json();
        alert(data); // You can display the error message received from the server
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error updating product:', error);
      // alert('Error updating product'); // You can display a generic error message
    }
  };

  return (
    <div>
      <h2>Update Product</h2>
      <button onClick={() => setShowForm(true)}>Update Product</button>
      {showForm && <PopupWindowPut type="product" onSubmit={handleSubmit} onClose={() => setShowForm(false)} />}
    </div>
  );
}

export default UpdateProduct;
