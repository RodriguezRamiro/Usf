//Menu.js

import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css"; // Assuming you have a CSS file for styles

function Menu({ items, title }) {
  return (
    <section className="menu">
      <h2>{title}</h2>
      <nav>
        <ul className="menu-list">
          {items.length === 0 ? (
            <li>No items available.</li>
          ) : (
            items.map((item) => (
              <li key={item.id} className="menu-item">
                <Link to={`/${title.toLowerCase()}/${item.id}`} className="menu-link">
                  {item.name}
                </Link>
              </li>
            ))
          )}
        </ul>
      </nav>
    </section>
  );
}

export default Menu;
