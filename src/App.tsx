import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SearchProvider } from './contexts/SearchContext';
import Home from './routes/PokemonGrid';
import Quiz from './routes/Quiz';
import PokemonData from './routes/PokemonData';

const App: React.FC = () => {
  return (
    <SearchProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/pokemon/:name" element={<PokemonData />} />
        </Routes>
      </Router>
    </SearchProvider>
  );
};

export default App;