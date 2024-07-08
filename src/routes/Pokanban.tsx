import { useState, useEffect, MouseEvent } from "react";
import { Box, IconButton, Typography, Paper, Menu, MenuItem } from "@mui/material";
import { CatchingPokemon } from '@mui/icons-material';
import Header from "../components/Header";

const cssColumns = {
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'flex-start',
    padding: '10px',
}

const cssColumn = {
    padding: '16px'
}

interface Pokemon {
    name: string;
    url: string;
}

const Pokanban = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedPokemons, setSelectedPokemons] = useState<Pokemon[]>([]);

    const open = Boolean(anchorEl);

    useEffect(() => {
        // Fetch the list of Pokemons from the API
        const fetchPokemons = async () => {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=500');
                const data = await response.json();
                setPokemons(data.results);
            } catch (error) {
                console.error("Failed to fetch Pokemons", error);
            }
        };

        fetchPokemons();
    }, []);

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelectPokemon = (pokemon: Pokemon) => {
        // Check if the Pokemon is already selected
        if (!selectedPokemons.some(selected => selected.name === pokemon.name)) {
            setSelectedPokemons(prevSelectedPokemons => [pokemon, ...prevSelectedPokemons]);
        }
        handleClose();
    };

    return (
        <>
            <Header />
            <Box sx={{ padding: '10px' }}>
                <Typography variant="h6" gutterBottom>
                    POKANBAN - Gestão de Pokemons
                </Typography>
            </Box>
            <Box sx={cssColumns}>
                <Box sx={cssColumn}>
                    <Typography variant="subtitle1" gutterBottom>INTERESSE</Typography>
                    <IconButton
                        color="inherit"
                        size="large"
                        onClick={handleClick}
                        sx={{
                            '&:focus': {
                                outline: 'none',
                                boxShadow: 'none',
                            },
                        }}
                    >
                        <CatchingPokemon />
                    </IconButton>
                    {selectedPokemons.map((pokemon, index) => (
                        <Paper key={index} sx={{ padding: '16px', marginTop: '16px' }}>
                            <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.split('/')[6]}.png`}
                                alt={pokemon.name}
                                width={200}
                                height={200}
                            />
                            <Typography variant="h6">{pokemon.name}</Typography>
                        </Paper>
                    ))}
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        {pokemons.map((pokemon) => (
                            <MenuItem
                                key={pokemon.name}
                                onClick={() => handleSelectPokemon(pokemon)}
                                disabled={selectedPokemons.some(selected => selected.name === pokemon.name)}
                            >
                                {pokemon.name}
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
                <Box sx={cssColumn}>
                    <Typography variant="subtitle1" gutterBottom>CAPTURADOS</Typography>
                </Box>
                <Box sx={cssColumn}>
                    <Typography variant="subtitle1" gutterBottom>ESCAPARAM</Typography>
                </Box>
                <Box sx={cssColumn}>
                    <Typography variant="subtitle1" gutterBottom>EM OUTRAS MÃOS</Typography>
                </Box>
            </Box>
        </>
    );
}

export default Pokanban;










/* import { useState, useEffect, MouseEvent } from "react";
import { Box, IconButton, Typography, Paper, Menu, MenuItem } from "@mui/material";
import { CatchingPokemon } from '@mui/icons-material';
import Header from "../components/Header";

const cssColumns = {
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'flex-start',
    padding: '10px',
}

const cssColumn = {
    padding: '16px'
}

interface Pokemon {
    name: string;
    url: string;
}

const Pokanban = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedPokemons, setSelectedPokemons] = useState<Pokemon[]>([]);

    const open = Boolean(anchorEl);

    useEffect(() => {
        // Fetch the list of Pokemons from the API
        const fetchPokemons = async () => {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=500');
                const data = await response.json();
                setPokemons(data.results);
            } catch (error) {
                console.error("Failed to fetch Pokemons", error);
            }
        };

        fetchPokemons();
    }, []);

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelectPokemon = (pokemon: Pokemon) => {
        // Check if the Pokemon is already selected
        if (!selectedPokemons.some(selected => selected.name === pokemon.name)) {
            setSelectedPokemons(prevSelectedPokemons => [...prevSelectedPokemons, pokemon]);
        }
        handleClose();
    };

    return (
        <>
            <Header />
            <Box sx={{ padding: '10px' }}>
                <Typography variant="h6" gutterBottom>
                    POKANBAN - Gestão de Pokemons
                </Typography>
            </Box>
            <Box sx={cssColumns}>
                <Box sx={cssColumn}>
                    <Typography variant="subtitle1" gutterBottom>INTERESSE</Typography>
                    <IconButton color="inherit" size="large" onClick={handleClick}
                    sx={{
                        '&:focus': {
                            outline: 'none',
                            boxShadow: 'none',
                        },
                    }}>
                        <CatchingPokemon />
                    </IconButton>
                    {selectedPokemons.map((pokemon, index) => (
                        <Paper key={index} sx={{ padding: '16px', marginTop: '16px' }}>
                            <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.split('/')[6]}.png`}
                                alt={pokemon.name}
                                width={200}
                                height={200}
                            />
                            <Typography variant="h6">{pokemon.name}</Typography>
                        </Paper>
                    ))}
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        {pokemons.map((pokemon) => (
                            <MenuItem
                                key={pokemon.name}
                                onClick={() => handleSelectPokemon(pokemon)}
                                disabled={selectedPokemons.some(selected => selected.name === pokemon.name)}
                            >
                                {pokemon.name}
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
                <Box sx={cssColumn}>
                    <Typography variant="subtitle1" gutterBottom>CAPTURADOS</Typography>
                </Box>
                <Box sx={cssColumn}>
                    <Typography variant="subtitle1" gutterBottom>ESCAPARAM</Typography>
                </Box>
                <Box sx={cssColumn}>
                    <Typography variant="subtitle1" gutterBottom>EM OUTRAS MÃOS</Typography>
                </Box>
            </Box>
        </>
    );
}

export default Pokanban; */