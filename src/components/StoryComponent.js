import React from "react";

const StoryComponent = ({ story, onRestart }) => {
  return (
    <div>
      <p className="story">{story}</p>
      <button onClick={onRestart} className="restart-btn">Restart</button>
    </div>
  );
};

export default StoryComponent;
