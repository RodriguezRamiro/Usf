import React, { useState } from "react";
import FormComponent from "./components/FormComponent";
import StoryComponent from "./components/StoryComponent";
import StorySelectorComponent from "./components/StorySelectorComponent";

const Madlib = () => {
  const [story, setStory] = useState(null); // Story data state
  const [storyTemplate, setStoryTemplate] = useState("story1"); // Selected story template

  // Handle form submission to create the story
  const handleFormSubmit = (formData) => {
    const stories = {
      story1: `Once upon a time, there was a ${formData.noun} who loved to ${formData.verb}.`,
      story2: `The ${formData.adjective} ${formData.noun} decided to ${formData.verb} at the park.`,
    };
    setStory(stories[storyTemplate]); // Select the template based on user choice
  };

  // Restart the game to go back to the form
  const handleRestart = () => {
    setStory(null);
  };

  return (
    <div>
      {!story ? (
        <>
          <StorySelectorComponent setStoryTemplate={setStoryTemplate} />
          <FormComponent onSubmit={handleFormSubmit} />
        </>
      ) : (
        <StoryComponent story={story} onRestart={handleRestart} />
      )}
    </div>
  );
};

export default Madlib;
