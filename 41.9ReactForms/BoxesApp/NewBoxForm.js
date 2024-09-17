import React, { useState } from "react";

function NewBoxForm({ addBox }) {
  const INITIAL_STATE = { width: "", height: "", backgroundColor: "" };
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addBox(formData);
    setFormData(INITIAL_STATE);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="width"
        value={formData.width}
        onChange={handleChange}
        placeholder="Width"
      />
      <input
        name="height"
        value={formData.height}
        onChange={handleChange}
        placeholder="Height"
      />
      <input
        name="backgroundColor"
        value={formData.backgroundColor}
        onChange={handleChange}
        placeholder="Background Color"
      />
      <button>Create Box</button>
    </form>
  );
}

export default NewBoxForm;
