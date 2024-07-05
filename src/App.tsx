import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SearchProvider } from './contexts/SearchContext';
import Header from './components/Header';
import Home from './routes/PokemonGrid';
import Quiz from './routes/Quiz';

const App: React.FC = () => {
  return (
    <SearchProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </Router>
    </SearchProvider>
  );
};

export default App;