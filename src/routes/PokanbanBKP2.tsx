import React, { useState, useEffect } from 'react';
import Grid from '../components/Grid';
import Header from '../components/Header';
import { Box, Fab, Modal, TextField, Autocomplete } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const fetchPokemonList = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=500');
    const data = await response.json();
    return data.results.map((pokemon: any) => pokemon);
};

const Pokanban = () => {
    const [open, setOpen] = useState(false);
    const [pokemonList, setPokemonList] = useState<any[]>([]);
    const [autocompleteList, setAutocompleteList] = useState<string[]>([]);
    const [selectedPokemons, setSelectedPokemons] = useState<any[]>([]);

    useEffect(() => {
        const loadPokemonList = async () => {
            const list = await fetchPokemonList();
            setPokemonList(list);
        };
        loadPokemonList();
    }, []);

    useEffect(() => {
        const selectedPokemonNames = selectedPokemons.map((p: any) => p.name);
        const availablePokemons = pokemonList.filter((pokemon: any) => !selectedPokemonNames.includes(pokemon.name));
        setAutocompleteList(availablePokemons.map((pokemon: any) => pokemon.name));
    }, [pokemonList, selectedPokemons]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSelect = (event: any, newValue: string | null) => {
        if (newValue) {
            const pokemon = pokemonList.find((p: any) => p.name === newValue);
            if (pokemon) {
                const pokemonData = {
                    name: pokemon.name,
                    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`,
                    status: 1,
                };
                setSelectedPokemons((prev) => [...prev, pokemonData]);
                setAutocompleteList((prev) => prev.filter((name) => name !== newValue));
                handleClose();
            }
        }
    };

    return (
        <>
            <Header />
            <Box sx={{ display: 'flex', gap: 2, padding: '20px' }}>
                <Grid subjectTitle="Interesse" tasksStore={selectedPokemons.filter(p => p.status === 1)} />
                <Grid subjectTitle="Capturados" />
            </Box>
            <Fab
                color="primary"
                aria-label="add"
                onClick={handleOpen}
                sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16,
                    '&:focus': {
                        outline: 'none',
                    },
                }}
            >
                <AddIcon />
            </Fab>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Autocomplete
                        id="pokemon-autocomplete"
                        options={autocompleteList}
                        onChange={handleSelect}
                        renderInput={(params) => <TextField {...params} label="Choose a Pokémon" />}
                    />
                </Box>
            </Modal>
        </>
    );
};

export default Pokanban;






/* import React, { useState, useEffect } from 'react';
import Grid from '../components/Grid';
import Header from '../components/Header';
import { Box, Fab, Modal, TextField, Autocomplete } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const fetchPokemonList = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=500');
    const data = await response.json();
    return data.results.map((pokemon: any) => pokemon);
};

const getSelectedPokemons = () => {
    const savedPokemons = localStorage.getItem('selectedPokemons');
    return savedPokemons ? JSON.parse(savedPokemons) : [];
};

const savePokemonToLocalStorage = (pokemon: any) => {
    const savedPokemons = getSelectedPokemons();
    const updatedPokemons = [...savedPokemons, pokemon];
    localStorage.setItem('selectedPokemons', JSON.stringify(updatedPokemons));
};

const Pokanban = () => {
    const [open, setOpen] = useState(false);
    const [pokemonList, setPokemonList] = useState<any[]>([]);
    const [autocompleteList, setAutocompleteList] = useState<string[]>([]);

    useEffect(() => {
        const loadPokemonList = async () => {
            const list = await fetchPokemonList();
            setPokemonList(list);
        };
        loadPokemonList();
    }, []);

    useEffect(() => {
        const selectedPokemons = getSelectedPokemons();
        const selectedPokemonNames = selectedPokemons.map((p: any) => p.name);
        const availablePokemons = pokemonList.filter((pokemon: any) => !selectedPokemonNames.includes(pokemon.name));
        setAutocompleteList(availablePokemons.map((pokemon: any) => pokemon.name));
    }, [pokemonList]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSelect = (event: any, newValue: string | null) => {
        if (newValue) {
            const pokemon = pokemonList.find((p: any) => p.name === newValue);
            if (pokemon) {
                const pokemonData = {
                    name: pokemon.name,
                    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`,
                    status: 1,
                };
                savePokemonToLocalStorage(pokemonData);
                setAutocompleteList((prev) => prev.filter((name) => name !== newValue));
                handleClose();
                console.log(localStorage.getItem('selectedPokemons'));
            }
        }
    };

    return (
        <>
            <Header />
            <Box sx={{ display: 'flex', gap: 2, padding: '20px' }}>
                <Grid subjectTitle="Interesse" />
                <Grid subjectTitle="Capturados" />
            </Box>
            <Fab
                color="primary"
                aria-label="add"
                onClick={handleOpen}
                sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16,
                    '&:focus': {
                        outline: 'none',
                    },
                }}
            >
                <AddIcon />
            </Fab>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Autocomplete
                        id="pokemon-autocomplete"
                        options={autocompleteList}
                        onChange={handleSelect}
                        renderInput={(params) => <TextField {...params} label="Choose a Pokémon" />}
                    />
                </Box>
            </Modal>
        </>
    );
};

export default Pokanban; */