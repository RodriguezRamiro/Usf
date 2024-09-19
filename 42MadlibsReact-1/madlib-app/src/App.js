import React from "react";
import Madlib from "./Madlib"; // Importing the top-level Madlib component
import './App.css'; // CSS for styling

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the Madlibs Game!</h1>
      </header>
      <main>
        <Madlib />
      </main>
    </div>
  );
}

export default App;
