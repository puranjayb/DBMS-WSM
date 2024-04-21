// src/components/StockDetails.js
import React from 'react';

function StockDetails() {
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/crud/getStockDetails');
      const data = await response.json();
      const formattedData = formatData(data); // Format the data
      window.openPopup(formattedData);
    } catch (error) {
      console.error('Error fetching stock details:', error);
    }
  };

  // Function to format the data into a tabular structure
  const formatData = (data) => {
    return (
      <table border="1">
        <thead>
          <tr>
            <th>Stock ID</th>
            <th>Product ID</th>
            <th>Warehouse ID</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Expiration Date</th>
            <th>Updated At</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {data.map((stock, index) => (
            <tr key={index}>
              <td>{stock.stock_id}</td>
              <td>{stock.stock_product_id}</td>
              <td>{stock.stock_warehouse_id}</td>
              <td>{stock.stock_name}</td>
              <td>{stock.stock_quantity}</td>
              <td>{stock.stock_price}</td>
              <td>{stock.stock_expiration_date}</td>
              <td>{stock.stock_updated_at}</td>
              <td>{stock.stock_created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h2>Stock Details</h2>
      <button onClick={fetchData}>Get Stock Details</button>
    </div>
    );
}

export default StockDetails;