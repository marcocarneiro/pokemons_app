import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';

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
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '16px' }}>
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
    );
};

export default PokemonData;
