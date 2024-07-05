import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Grid } from '@mui/material';
import { useSearch } from '../contexts/SearchContext';  // Importa o contexto

interface Pokemon {
  name: string;
  url: string;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: { type: { name: string } }[];
}

const PokemonGrid: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { searchTerm } = useSearch();  // Usa o contexto

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
        const data = await response.json();
        const pokemonData = await Promise.all(
          data.results.map(async (pokemon: { name: string; url: string }) => {
            const res = await fetch(pokemon.url);
            return res.json();
          })
        );
        setPokemons(pokemonData);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar Pokémons:', error);
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Grid container spacing={3}>
        {loading ? (
          <Typography variant="h6">Carregando...</Typography>
        ) : (
          filteredPokemons.map((pokemon) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.name}>
              <Paper elevation={5} sx={{ padding: 2, textAlign: 'center' }}>
                <img
                  src={pokemon.sprites.other['official-artwork'].front_default}
                  alt={pokemon.name}
                  style={{ width: '100%', height: 'auto' }}
                />
                <Typography variant="h6">{pokemon.name}</Typography>
                <Typography variant="body2">
                  {pokemon.types.map((typeInfo) => typeInfo.type.name).join(', ')}
                </Typography>
              </Paper>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default PokemonGrid;