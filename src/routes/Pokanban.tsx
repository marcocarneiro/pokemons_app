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
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

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
        setSelectedPokemon(pokemon);
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
                    <IconButton color="inherit" size="large" onClick={handleClick}>
                        <CatchingPokemon />
                    </IconButton>
                    {selectedPokemon && (
                        <Paper elevation = {5} sx={{ padding: '16px', marginTop: '16px' }}>
                            <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${selectedPokemon.url.split('/')[6]}.png`}
                                alt={selectedPokemon.name}
                                width={250}
                                height={250}
                            />
                            <Typography variant="h6">{selectedPokemon.name}</Typography>
                        </Paper>
                    )}
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        {pokemons.map((pokemon) => (
                            <MenuItem
                                key={pokemon.name}
                                onClick={() => handleSelectPokemon(pokemon)}
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








/* import { Box, IconButton, Typography } from "@mui/material";
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

const Pokanban = () => {
    return(
        <>
            <Header/>
            <Box sx={{ padding: '10px' }}>
                <Typography variant="h6" gutterBottom>
                    POKANBAN - Gestão de Pokemons
                </Typography>               
            </Box>
            <Box sx={cssColumns}>
                <Box sx={{cssColumn}}>
                    <Typography variant="subtitle1" gutterBottom>INTERESSE</Typography>
                    <IconButton color="inherit" size="large">
                            <CatchingPokemon />
                    </IconButton>
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