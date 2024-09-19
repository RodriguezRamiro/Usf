import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'; 

function Snack3() {
  return (
    <div className="snack-details">
      <h1>Snack 3 Details</h1>
      <p>This is Snack 3.</p>
      <Link to="/">Back to Vending Machine</Link>
    </div>
  );
}

export default Snack3;
