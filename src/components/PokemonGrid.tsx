import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography, Button, CircularProgress } from '@mui/material';
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
    const [page, setPage] = useState<number>(1);
    const [totalCount, setTotalCount] = useState<number>(0);
    const limit = 16;

    useEffect(() => {
        const fetchPokemons = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${(page - 1) * limit}`);
                const data = await response.json();
                setTotalCount(data.count);
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
    }, [page]);

    const handleNextPage = () => {
        if (page < Math.ceil(totalCount / limit)) {
            setPage(page + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
                <CircularProgress color="secondary" />
            </Box>
        );
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
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                <Button onClick={handlePrevPage} disabled={page === 1}>
                    Anterior
                </Button>
                <Typography variant="body1" sx={{ margin: '0 16px' }}>
                    Página {page} de {Math.ceil(totalCount / limit)}
                </Typography>
                <Button onClick={handleNextPage} disabled={page === Math.ceil(totalCount / limit)}>
                    Próximos
                </Button>
            </Box>
        </Box>
    );
};

export default PokemonGrid;