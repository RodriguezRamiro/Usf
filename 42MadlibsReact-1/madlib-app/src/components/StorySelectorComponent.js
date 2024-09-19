import React from "react";

const StorySelectorComponent = ({ setStoryTemplate }) => {
  const handleSelectChange = (e) => {
    setStoryTemplate(e.target.value);
  };

  return (
    <div>
      <label htmlFor="story-select">Choose a story:</label>
      <select id="story-select" onChange={handleSelectChange}>
        <option value="story1">Story 1</option>
        <option value="story2">Story 2</option>
      </select>
    </div>
  );
};

export default StorySelectorComponent;
