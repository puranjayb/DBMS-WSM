// UpdateStock.js
import React, { useState } from 'react';
import PopupWindowPut from './PopupWindowPut';

function UpdateStock() {
  const [showForm, setShowForm] = useState(false); // State to manage form visibility

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch('http://localhost:3000/crud/updateStock', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Stock updated successfully
        alert('Stock updated successfully'); // You can also display a message or perform other actions
      } else {
        // Error updating stock
        const data = await response.json();
        alert(data); // You can display the error message received from the server
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error updating stock:', error);
      // alert('Error updating stock'); // You can display a generic error message
    }
  };

  return (
    <div>
      <h2>Update Stock</h2>
      <button onClick={() => setShowForm(true)}>Update Stock</button>
      {showForm && <PopupWindowPut type="stock" onSubmit={handleSubmit} onClose={() => setShowForm(false)} />}
    </div>
  );
}

export default UpdateStock;
