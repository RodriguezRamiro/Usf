// Navigation.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "./UserContext";

function Navigation() {
  const { currentUser, logout } = useContext(UserContext);

  return (
    <nav>
      <Link to="/">Home</Link>
      {currentUser ? (
        <>
          <span>Welcome, {currentUser.username}</span>
          <Link to="/profile">Profile</Link> {/* Link to Profile Page */}
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </>
      )}
    </nav>
  );
}

export default Navigation;
