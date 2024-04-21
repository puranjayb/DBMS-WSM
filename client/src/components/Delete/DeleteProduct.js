// DeleteProduct.js

import React, { useState } from 'react';
import PopupWindowDelete from './PopupWindowDelete';

function DeleteProduct() {
  const [showForm, setShowForm] = useState(false); // State to manage form visibility

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch('http://localhost:3000/crud/deleteProduct', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Product deleted successfully');
      } else {
        const data = await response.json();
        alert(data);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      // alert('Error deleting product');
    }
  };

  return (
    <div>
      <h2>Delete Product</h2>
      <button onClick={() => setShowForm(true)}>Delete Product</button>
      {showForm && <PopupWindowDelete type="product" onSubmit={handleSubmit} />}
    </div>
  );
}

export default DeleteProduct;
