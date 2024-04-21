// src/components/WarehouseDetails.js
import React from 'react';

function WarehouseDetails() {
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/crud/getWarehouseDetails');
      const data = await response.json();
      const formattedData = formatData(data); // Format the data
      window.openPopup(formattedData);
    } catch (error) {
      console.error('Error fetching warehouse details:', error);
    }
  };

  // Function to format the data into a tabular structure
  const formatData = (data) => {
    return (
      <table border="1">
        <thead>
          <tr>
            <th>Warehouse ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Manager</th>
            <th>Maximum Capacity</th>
            <th>Current Capacity</th>
            <th>Updated At</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {data.map((warehouse, index) => (
            <tr key={index}>
              <td>{warehouse.warehouse_id}</td>
              <td>{warehouse.warehouse_name}</td>
              <td>{warehouse.warehouse_address}</td>
              <td>{warehouse.warehouse_manager}</td>
              <td>{warehouse.warehouse_maximum_capacity}</td>
              <td>{warehouse.warehouse_current_capacity}</td>
              <td>{warehouse.warehouse_updated_at}</td>
              <td>{warehouse.warehouse_created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h2>Warehouse Details</h2>
      <button onClick={fetchData}>Get Warehouse Details</button>
    </div>
  );
}

export default WarehouseDetails;
