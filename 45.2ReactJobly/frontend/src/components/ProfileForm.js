// components/ProfileForm.js
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import JoblyAPI from "./api.js"; // Adjust the import path according to your structure

const ProfileForm = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    // Include any other fields that may be necessary
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the current user's profile data when the component mounts
    const fetchProfile = async () => {
      try {
        const user = await JoblyAPI.getCurrentUser();
        setFormData(user);
      } catch (err) {
        setError("Failed to load user profile.");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await JoblyAPI.updateUser(formData); // Implement this in your API helper
      history.push("/profile"); // Redirect to the profile page after successful update
    } catch (err) {
      setError("Failed to update profile. Please try again.");
    }
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            disabled // Assuming username cannot be changed
          />
        </div>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        {/*additional fields here */}
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfileForm;
