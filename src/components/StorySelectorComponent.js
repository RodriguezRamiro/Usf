import React from 'react';

const StorySelectorComponent = ({ setStoryTemplate }) => {
  const handleSelectChange = (e) => {
    setStoryTemplate(e.target.value); 
  };

  return (
    <div>
      <label htmlFor="storyTemplate">Choose a story template: </label>
      <select id="storyTemplate" onChange={handleSelectChange}>
        <option value="story1">Story 1</option>
        <option value="story2">Story 2</option>
      </select>
    </div>
  );
};

export default StorySelectorComponent;
