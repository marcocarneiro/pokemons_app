import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Grid, Button, CircularProgress } from '@mui/material';
import { useSearch } from '../contexts/SearchContext';  // Importa o contexto
import { Link, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';

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
  const [loading, setLoading] = useState<boolean>(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchTerm } = useSearch();  // Usa o contexto
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const pokemonsPerPage = 12;

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=500');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const pokemonData = await Promise.all(
          data.results.map(async (pokemon: { name: string; url: string }) => {
            const res = await fetch(pokemon.url);
            if (!res.ok) {
              throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
          })
        );
        setPokemons(pokemonData);
      } catch (error) {
        console.error('Erro ao buscar Pokémons:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  return (
    <>
      <Header />
      <Box sx={{ padding: 2 }}>
        <Grid container spacing={2}>
          {currentPokemons.map((pokemon) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.name}>
              <Paper elevation={5} sx={{ padding: 2, textAlign: 'center' }}>
                <Link to={`/pokemon/${pokemon.name}?page=${currentPage}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <img
                    src={pokemon.sprites.other['official-artwork'].front_default}
                    alt={pokemon.name}
                    style={{ width: '100%', height: 'auto' }}
                  />
                  <Typography variant="h6" component="div">
                    {pokemon.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {pokemon.types.map((type) => type.type.name).join(', ')}
                  </Typography>
                </Link>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
          <Button
            variant="contained"
            color="primary"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            sx={{ margin: '0 10px' }}
          >
            Anterior
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={indexOfLastPokemon >= filteredPokemons.length}
            onClick={() => handlePageChange(currentPage + 1)}
            sx={{ margin: '0 10px' }}
          >
            Próximo
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default PokemonGrid;