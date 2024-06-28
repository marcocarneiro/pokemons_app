import React, { useState, useEffect, useMemo } from 'react';
import { Box, IconButton, TextField, Typography, Autocomplete } from '@mui/material';
import { CatchingPokemon } from '@mui/icons-material';
import debounce from 'lodash.debounce';
import { styled } from '@mui/system';
import backgroundImage from '../assets/background.jpg'; 

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
}

const BackgroundBox = styled(Box)({
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: 0.7, // Reduz a opacidade da imagem de fundo
        zIndex: -1,
    },
});

const Quiz: React.FC = () => {
    const [currentPokemon, setCurrentPokemon] = useState<Pokemon | null>(null);
    const [answer, setAnswer] = useState<string>('');
    const [feedback, setFeedback] = useState<string>('');
    const [pokemonNames, setPokemonNames] = useState<string[]>([]);

    useEffect(() => {
        getPokemon();
    }, []);

    useEffect(() => {
        fetchAllPokemonNames();
    }, []);

    const fetchAllPokemonNames = async () => {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
        const data = await response.json();
        const names = data.results.map((pokemon: { name: string }) => pokemon.name);
        setPokemonNames(names);
    };

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

    const debouncedFetchPokemonNames = useMemo(() => 
        debounce(async (input: string) => {
            if (input) {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000&name=${input}`);
                const data = await response.json();
                const names = data.results.map((pokemon: { name: string }) => pokemon.name);
                setPokemonNames(names);
            }
        }, 500),
    []);

    const handleInputChange = (event: React.SyntheticEvent<Element, Event>, newInputValue: string) => {
        setAnswer(newInputValue);
        debouncedFetchPokemonNames(newInputValue);
    };

    if (!currentPokemon) return null; // Ou algum indicador de carregamento, caso queira

    return (
        <BackgroundBox>
            <Typography variant="h2" sx={{ position: 'relative', width: '360px'}}>
                <img src="/logo-alltype.svg" alt="Pokémon Logo" style={{ width: '250px' }} /> 
                <Typography variant="h3" sx={{ position: 'absolute', top: '30px', right: '0'}}>Quiz</Typography>
            </Typography>
            <img className="pokemon-image" src={currentPokemon.sprites?.other['official-artwork'].front_default || currentPokemon.sprites.front_default} 
            alt="Pokémon Image" style={{ width: '200px', margin: '20px 0' }} />
            <Typography variant="body1" id="question" sx={{ marginBottom: '16px'}}>Qual é o nome deste Pokémon?</Typography>
            <Autocomplete
                freeSolo
                options={pokemonNames}
                inputValue={answer}
                onInputChange={handleInputChange}
                sx={{ width: '300px' }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        id="answer"
                        label="Digite sua resposta"
                        variant="standard"
                        InputLabelProps={{
                            style: { textAlign: 'center', width: '100%' },
                            shrink: true,
                        }}
                        sx={{
                            '& .MuiInputLabel-root': {
                                left: '50%',
                                top: '18px',
                                transform: 'translateX(-50%)',
                            },
                        }}
                    />
                )}
            />
            <Box sx={{ marginTop: '40px', textAlign: 'center', display: 'flex', alignItems: 'center' }}>
                <IconButton 
                    color="primary" 
                    onClick={checkAnswer} 
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <CatchingPokemon />
                    <Typography variant="button">Enviar</Typography>
                </IconButton>
            </Box>                
            <Typography variant="body1" id="feedback">{feedback}</Typography>
        </BackgroundBox>
    );
};

export default Quiz;