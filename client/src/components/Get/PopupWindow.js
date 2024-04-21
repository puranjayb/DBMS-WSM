// src/components/PopupWindow.js
import React from 'react';

function PopupWindow({ data }) {
  return (
    <div className="popup">
      <div className="popup-content">
        <pre>{data}</pre>
      </div>
    </div>
  );
}

export default PopupWindow;
