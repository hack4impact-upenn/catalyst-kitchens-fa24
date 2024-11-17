import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProgramOutcomesVisualization from './ProgramOutcomesViz';

const App = () => {
  return (
    <Routes>
      <Route 
        path="/program-outcomes"
        element={<ProgramOutcomesVisualization />}
      />
    </Routes>
  );
};

export default App; 