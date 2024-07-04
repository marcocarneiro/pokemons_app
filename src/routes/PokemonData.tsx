import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, CircularProgress, IconButton } from '@mui/material';
import { useParams, useLocation, Link } from 'react-router-dom';
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
    height: number; // Adicionando altura
    weight: number; // Adicionando peso
    abilities: { ability: { name: string } }[]; // Adicionando habilidades
}

const PokemonData: React.FC = () => {
    const { name } = useParams<{ name: string }>();
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get('page') || '1';

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
        <Box sx={{ width: '80vw', margin: '0 auto', padding: '16px' }}>
            <IconButton
                sx={{ position: 'absolute', top: '16px', left: '16px' }}
                component={Link}
                to={`/?page=${page}`}
            >
                <ArrowBackIcon />
            </IconButton>
            <Grid container spacing={4} alignItems="center" justifyContent="center">
                <Grid item xs={12} md={6}>
                    <img
                        src={pokemon.sprites.other['official-artwork'].front_default}
                        alt={pokemon.name}
                        style={{ width: '100%', maxHeight: '500px', objectFit: 'contain' }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h4">{pokemon.name}</Typography>
                    <Typography variant="body1">Tipos: {pokemon.types.map((typeInfo) => typeInfo.type.name).join(', ')}</Typography>
                    <Typography variant="body2">Características:</Typography>
                    <Typography variant="body2">Altura: {pokemon.height / 10} m</Typography> {/* Convertendo para metros */}
                    <Typography variant="body2">Peso: {pokemon.weight / 10} kg</Typography> {/* Convertendo para quilogramas */}
                    <Typography variant="body2">Habilidades: {pokemon.abilities.map((ability) => ability.ability.name).join(', ')}</Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default PokemonData;