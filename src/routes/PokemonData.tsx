import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, IconButton } from '@mui/material';
import { useParams, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Pokemon {
    name: string;
    sprites: {
        other: {
            'official-artwork': {
                front_default: string;
            };
        };
    };
    types: {
        type: {
            name: string;
        };
    }[];
}

const PokemonData: React.FC = () => {
    const { name } = useParams<{ name: string }>();
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    /* const page = searchParams.get('page') || '1'; */
    const page = searchParams.get('page');

    useEffect(() => {
        const fetchPokemon = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
                const data = await response.json();
                setPokemon(data);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar o Pokémon:', error);
                setLoading(false);
            }
        };

        fetchPokemon();
    }, [name]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
                <CircularProgress color="secondary" />
            </Box>
        );
    }

    if (!pokemon) {
        return <Typography variant="h6">Pokémon não encontrado</Typography>;
    }

    return (
        <Box sx={{ padding: '16px' }}>
            <IconButton
                sx={{ position: 'absolute', top: '16px', left: '16px' }}
                onClick={() => window.location.href = `/?page=${page}`}
            >
                <ArrowBackIcon />
            </IconButton>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '16px', marginTop: '48px' }}>
                <img
                    src={pokemon.sprites.other['official-artwork'].front_default}
                    alt={pokemon.name}
                    style={{ width: '160px', height: '160px', marginRight: '16px' }}
                />
                <Box>
                    <Typography variant="h4">{pokemon.name}</Typography>
                    <Typography variant="body1">Tipos: {pokemon.types.map((typeInfo) => typeInfo.type.name).join(', ')}</Typography>
                    <Typography variant="body2">Outros dados do Pokémon...</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default PokemonData;