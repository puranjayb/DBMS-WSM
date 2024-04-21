import React from 'react';
import '../CSS/delete.css';
import DeleteWarehouse from '../Delete/DeleteWarehouse';
import DeleteProduct from '../Delete/DeleteProduct';
import DeleteStock from '../Delete/DeleteStock';

function DeletePage() {
  return (
    <div className="delete-page">
      <h2>Delete Page</h2>
      <div className="delete-section">
        <DeleteWarehouse />
      </div>
      <div className="delete-section">
        <DeleteProduct />
      </div>
      <div className="delete-section">
        <DeleteStock />
      </div>
    </div>
  );
}

export default DeletePage;
