import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Quiz from './routes/Quiz';
import PokemonData from './routes/PokemonData';
import PokemonGrid from './routes/PokemonGrid';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PokemonGrid />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/pokemon/:name" element={<PokemonData />} />
            </Routes>
        </Router>
    );
};

export default App;