// src/components/ProductDetails.js
import React from 'react';

function ProductDetails() {
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/crud/getProductDetails');
      const data = await response.json();
      const formattedData = formatData(data); // Format the data
      window.openPopup(formattedData);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  // Function to format the data into a tabular structure
  const formatData = (data) => {
    return (
      <table border="1">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Manufacturer</th>
            <th>Weight</th>
            <th>Dimension</th>
            <th>Price</th>
            <th>Updated At</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product, index) => (
            <tr key={index}>
              <td>{product.product_id}</td>
              <td>{product.product_name}</td>
              <td>{product.product_description}</td>
              <td>{product.product_category}</td>
              <td>{product.product_manufacturer}</td>
              <td>{product.product_weight}</td>
              <td>{product.product_dimension}</td>
              <td>{product.product_price}</td>
              <td>{product.product_updated_at}</td>
              <td>{product.product_created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h2>Product Details</h2>
      <button onClick={fetchData}>Get Product Details</button>
    </div>
  );
}

export default ProductDetails;
