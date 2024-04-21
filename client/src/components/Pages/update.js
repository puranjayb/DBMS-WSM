import React from 'react';
import '../CSS/update.css';
import UpdateWarehouse from '../Put/UpdateWarehouse';
import UpdateProduct from '../Put/UpdateProduct';
import UpdateStock from '../Put/UpdateStock';

function UpdatePage() {
  return (
    <div className="update-page">
      <h2>Update Page</h2>
      <div className="update-section">
        <UpdateWarehouse />
      </div>
      <div className="update-section">
        <UpdateProduct />
      </div>
      <div className="update-section">
        <UpdateStock />
      </div>
    </div>
  );
}

export default UpdatePage;
