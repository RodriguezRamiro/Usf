import React, { useState } from 'react';

const FormComponent = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    noun: '',
    verb: '',
    adjective: '', // In case you need it for more complex templates
  });

  // Update form state on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ensure that all fields are filled out before submitting
    if (formData.noun && formData.verb) {
      onSubmit(formData);
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="noun"
        placeholder="Enter a noun"
        value={formData.noun}
        onChange={handleChange}
      />
      <input
        type="text"
        name="verb"
        placeholder="Enter a verb"
        value={formData.verb}
        onChange={handleChange}
      />
      {/* Optional field based on template */}
      <input
        type="text"
        name="adjective"
        placeholder="Enter an adjective"
        value={formData.adjective}
        onChange={handleChange}
      />
      <button type="submit">Get Story</button>
    </form>
  );
};

export default FormComponent;
