import React, { useState } from "react";

const FormComponent = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ noun: "", verb: "", adjective: "" });
  const [isValid, setIsValid] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((fData) => ({ ...fData, [name]: value }));

    // Validate if all fields are filled
    setIsValid(Object.values({ ...formData, [name]: value }).every(val => val !== ""));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="noun">Noun: </label>
      <input name="noun" value={formData.noun} onChange={handleChange} />

      <label htmlFor="verb">Verb: </label>
      <input name="verb" value={formData.verb} onChange={handleChange} />

      <label htmlFor="adjective">Adjective: </label>
      <input name="adjective" value={formData.adjective} onChange={handleChange} />

      <button type="submit" disabled={!isValid}>Submit</button>
    </form>
  );
};

export default FormComponent;
