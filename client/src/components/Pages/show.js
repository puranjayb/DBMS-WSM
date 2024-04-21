import React from 'react';
import ReactDOM from 'react-dom';
import '../CSS/show.css';
import WarehouseDetails from '../Get/WarehouseDetails';
import ProductDetails from '../Get/ProductDetails';
import StockDetails from '../Get/StockDetails';
import PopupWindow from '../Get/PopupWindow';

function ShowPage() {
    // Function to open popup window
    window.openPopup = (data) => {
        const popup = window.open('', '_blank', 'width=600,height=400');
        popup.document.title = 'Data';
        popup.document.body.innerHTML = `<div id="popup-container"></div>`;
        ReactDOM.render(<PopupWindow data={data} />, popup.document.getElementById('popup-container'));
      };
  
      // Function to close popup window
      window.closePopup = () => {
        window.close();
      };
  return (
    <div className="show-page">
      <h2>Show Page</h2>
      <div className="details-section">
        <h3>Warehouse Details</h3>
        <WarehouseDetails />
      </div>
      <div className="details-section">
        <h3>Product Details</h3>
        <ProductDetails />
      </div>
      <div className="details-section">
        <h3>Stock Details</h3>
        <StockDetails />
      </div>
    </div>
  );
}

export default ShowPage;
