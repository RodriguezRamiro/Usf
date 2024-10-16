//ItemDetail.js

import React from "react";
import { useParams, Redirect } from "react-router-dom";
import "./ItemDetail.css"; // Assuming you have a CSS file for styles

function ItemDetail({ items, cantFind }) {
  const { id } = useParams(); // Get the id from the URL parameters
  const itemId = parseInt(id, 10);
  const item = items.find((item) => item.id === itemId);

  // Redirect if item not found
  if (!item) {
    return <Redirect to={cantFind} />;
  }

  return (
    <div className="item-detail">
      <h1 className="item-title">{item.name}</h1>
      <p className="item-description">{item.description}</p>
      <p className="item-price"><strong>Price: ${item.price.toFixed(2)}</strong></p>
      <p className="item-ingredients"><strong>Ingredients:</strong> {item.ingredients.join(", ")}</p>
    </div>
  );
}

export default ItemDetail;
