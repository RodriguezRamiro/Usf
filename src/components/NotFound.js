//NotFound.js

import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFoundPage() {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>
        Oops! It looks like the page you are looking for doesn't exist.
      </p>
      <Link to="/" className="home-link">
        Go back to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
