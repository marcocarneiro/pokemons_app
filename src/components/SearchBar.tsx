import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, CircularProgress, Box, InputAdornment } from '@mui/material';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';

interface Pokemon {
  name: string;
}

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#ed5564',
    },
    '&:hover fieldset': {
      borderColor: '#ed5564',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#ed5564',
    },
    backgroundColor: '#ff7764',
  },
  '& .MuiInputBase-input': {
    color: 'white',
  },
  '& .MuiInputLabel-root': {
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    marginLeft: '8px',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'white',
  },
});

const SearchBar: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
        const data = await response.json();
        const pokemonNames = data.results.map((pokemon: { name: string }) => ({
          name: pokemon.name,
        }));
        setPokemons(pokemonNames);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar Pokémons:', error);
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <Box sx={{ display: 'inline-block', minWidth: '360px', margin: '0 40px' }}>
      <Autocomplete
        options={pokemons}
        getOptionLabel={(option) => option.name}
        loading={loading}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        filterOptions={(options, state) =>
          options.filter((option) => option.name.toLowerCase().includes(state.inputValue.toLowerCase()))
        }
        renderInput={(params) => (
          <StyledTextField
            {...params}
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={{ color: 'white' }} />
                  <span style={{ marginLeft: '8px', color: 'white' }}>Buscar Pokémon</span>
                </InputAdornment>
              ),
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </Box>
  );
};

export default SearchBar;