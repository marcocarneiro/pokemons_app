import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';

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

const StyledPaper = styled(Paper)({
    padding: '16px',
    textAlign: 'center',
    elevation: 5,
});

const PokemonGrid: React.FC = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
                const data = await response.json();
                const pokemonDetails = await Promise.all(
                    data.results.map(async (pokemon: { url: string }) => {
                        const pokemonResponse = await fetch(pokemon.url);
                        return pokemonResponse.json();
                    })
                );
                setPokemons(pokemonDetails);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar pokémons:', error);
                setLoading(false);
            }
        };

        fetchPokemons();
    }, []);

    if (loading) {
        return <Typography variant="h6">Carregando...</Typography>;
    }

    return (
        <Box sx={{ padding: '16px' }}>
            <Grid container spacing={2}>
                {pokemons.map((pokemon) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.name}>
                        <StyledPaper elevation={5}>
                            <img
                                src={pokemon.sprites.other['official-artwork'].front_default}
                                alt={pokemon.name}
                                style={{ width: '160px', height: '160px' }}
                            />
                            <Typography variant="h6">{pokemon.name}</Typography>
                            <Typography variant="body2">
                                {pokemon.types.map((typeInfo) => typeInfo.type.name).join(', ')}
                            </Typography>
                        </StyledPaper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default PokemonGrid;
