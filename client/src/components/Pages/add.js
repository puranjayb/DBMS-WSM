import React from 'react';
import '../CSS/add.css';
import AddWarehouse from '../Post/AddWarehouse';
import AddProduct from '../Post/AddProduct';
import AddStock from '../Post/AddStock';

function AddPage() {
  return (
    <div className="add-page">
      <h2>Add Page</h2>
      <div className="add-section">
        <AddWarehouse />
      </div>
      <div className="add-section">
        <AddProduct />
      </div>
      <div className="add-section">
        <AddStock />
      </div>
    </div>
  );
}

export default AddPage;
