import React from "react";

const StoryComponent = ({ story, onRestart }) => {
  return (
    <div>
      <h2>Your Madlib Story:</h2>
      <p>{story}</p>
      <button onClick={onRestart}>Restart</button>
    </div>
  );
};

export default StoryComponent;
