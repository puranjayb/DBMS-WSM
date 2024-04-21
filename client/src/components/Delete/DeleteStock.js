// DeleteStock.js
import React, { useState } from 'react';
import PopupWindowDelete from './PopupWindowDelete';

function DeleteStock() {
  const [showForm, setShowForm] = useState(false); // State to manage form visibility

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch('http://localhost:3000/crud/deleteStock', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Stock deleted successfully');
      } else {
        const data = await response.json();
        alert(data);
      }
    } catch (error) {
      console.error('Error deleting stock:', error);
      // alert('Error deleting stock');
    }
  };

  return (
    <div>
      <h2>Delete Stock</h2>
      <button onClick={() => setShowForm(true)}>Delete Stock</button>
      {showForm && <PopupWindowDelete type="stock" onSubmit={handleSubmit} />}
    </div>
  );
}

export default DeleteStock;
