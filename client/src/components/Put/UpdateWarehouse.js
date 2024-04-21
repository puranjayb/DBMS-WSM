import React, { useState } from 'react';
import PopupWindowPut from './PopupWindowPut';

function UpdateWarehouse() {
  const [showForm, setShowForm] = useState(false); // State to manage form visibility

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch('http://localhost:3000/crud/updateWarehouse', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Warehouse updated successfully
        alert('Warehouse updated successfully'); // You can also display a message or perform other actions
      } else {
        // Error updating warehouse
        const data = await response.json();
        alert(data); // You can display the error message received from the server
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error updating warehouse:', error);
      // alert('Error updating warehouse'); // You can display a generic error message
    }
  };

  return (
    <div>
      <h2>Update Warehouse</h2>
      <button onClick={() => setShowForm(true)}>Update Warehouse</button>
      {showForm && <PopupWindowPut type="warehouse" onSubmit={handleSubmit} onClose={() => setShowForm(false)} />}
    </div>
  );
}

export default UpdateWarehouse;
