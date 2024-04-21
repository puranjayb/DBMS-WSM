// DeleteWarehouse.js
import React, { useState } from 'react';
import PopupWindowDelete from './PopupWindowDelete';

function DeleteWarehouse() {
  const [showForm, setShowForm] = useState(false); // State to manage form visibility

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch('http://localhost:3000/crud/deleteWarehouse', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Warehouse deleted successfully');
      } else {
        const data = await response.json();
        alert(data);
      }
    } catch (error) {
      console.error('Error deleting warehouse:', error);
      // alert('Error deleting warehouse');
    }
  };

  return (
    <div>
      <h2>Delete Warehouse</h2>
      <button onClick={() => setShowForm(true)}>Delete Warehouse</button>
      {showForm && <PopupWindowDelete type="warehouse" onSubmit={handleSubmit} />}
    </div>
  );
}

export default DeleteWarehouse;
