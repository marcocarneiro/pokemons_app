import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

interface Pokemon {
    name: string;
    sprites: {
        front_default: string;
        other: {
            'official-artwork': {
                front_default: string;
            };
        };
    };
    // Adicione outras propriedades que você espera receber do Pokémon
    // Se precisar de mais detalhes, você pode consultar a API do PokeAPI
}

const Quiz: React.FC = () => {
    const [currentPokemon, setCurrentPokemon] = useState<Pokemon | null>(null);
    const [answer, setAnswer] = useState<string>('');
    const [feedback, setFeedback] = useState<string>('');

    useEffect(() => {
        getPokemon();
    }, []);

    const getPokemon = async () => {
        const randomId = Math.floor(Math.random() * 150) + 1;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        const data: Pokemon = await response.json();
        setCurrentPokemon(data);
        setFeedback('');
        setAnswer('');
    };

    const checkAnswer = () => {
        if (!currentPokemon) return;

        const userAnswer = answer.toLowerCase();
        const correctAnswer = currentPokemon.name.toLowerCase();
        
        if (userAnswer === correctAnswer) {
            setFeedback('Correto!');
        } else {
            setFeedback(`Incorreto! A resposta correta é ${currentPokemon.name}.`);
        }

        setTimeout(getPokemon, 2000);
    };

    if (!currentPokemon) return null; // Ou algum indicador de carregamento, caso queira

    return (
        <Box sx={{ width: '100vw', height: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h2">Pokémon Quiz</Typography>
            <img className="pokemon-image" src={currentPokemon.sprites?.other['official-artwork'].front_default || currentPokemon.sprites.front_default} alt="Pokémon Image" style={{ width: '200px' }} />
            <Typography variant="body1" id="question">Qual é o nome deste Pokémon?</Typography>
            <TextField
                type="text"
                id="answer"
                label="Digite sua resposta"
                variant="standard"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
            />
            <Box sx={{ marginTop: '40px', textAlign: 'center'}}>
                <Button variant="contained" onClick={checkAnswer}>Enviar</Button>
            </Box>                
            <Typography variant="body1" id="feedback">{feedback}</Typography>
        </Box>
    );
};

export default Quiz;