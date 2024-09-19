import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'; 

function Snack1() {
  return (
    <div className="snack-details">
      <h1>Snack 1 Details</h1>
      <p>This is Snack 1.</p>
      <Link to="/">Back to Vending Machine</Link>
    </div>
  );
}

export default Snack1;
