import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import VendingMachine from './components/VendingMachine';
import Snack1 from './components/Snack1';
import Snack2 from './components/Snack2';
import Snack3 from './components/Snack3';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VendingMachine />} />
        <Route path="/snack1" element={<Snack1 />} />
        <Route path="/snack2" element={<Snack2 />} />
        <Route path="/snack3" element={<Snack3 />} />
      </Routes>
    </Router>
  );
}

export default App;
