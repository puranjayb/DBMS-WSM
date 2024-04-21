import React, { useState } from 'react';
import PopupWindowPost from './PopupWindowPost';

function AddProduct() {
  const [showForm, setShowForm] = useState(false); // State to manage form visibility

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch('http://localhost:3000/crud/addProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Product added successfully
        alert('Product added successfully'); // You can also display a message or perform other actions
      } else {
        // Error adding product
        const data = await response.json();
        alert(data); // You can display the error message received from the server
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error submitting form:', error);
      // alert('Error submitting form'); // You can display a generic error message
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <button onClick={() => setShowForm(true)}>Add Product</button>
      {showForm && <PopupWindowPost type="product" onSubmit={handleSubmit} onClose={() => setShowForm(false)} />}
    </div>
  );
}

export default AddProduct;
