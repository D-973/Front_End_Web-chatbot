// Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <div className="sidebar-box">
          <Link to="/">Home</Link>
        </div>
        <div className="sidebar-box">
          <Link to="/about">About</Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
