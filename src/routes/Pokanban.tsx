import { useState, useEffect } from 'react';
import Grid from '../components/Grid';
import Header from '../components/Header';
import { Box, Fab, Modal, TextField, Autocomplete } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const fetchPokemonList = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=500');
    const data = await response.json();
    return data.results.map((pokemon: any) => pokemon.name);
};

const Pokanban = () => {
    const [open, setOpen] = useState(false);
    const [pokemonList, setPokemonList] = useState<string[]>([]);
    const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);

    useEffect(() => {
        const loadPokemonList = async () => {
            const list = await fetchPokemonList();
            setPokemonList(list);
        };
        loadPokemonList();
    }, []);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                        options={pokemonList}
                        onChange={(event, newValue) => {
                            setSelectedPokemon(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} label="Choose a Pokémon" />}
                    />
                </Box>
            </Modal>
        </>
    );
};

export default Pokanban;



/* import * as AspNetData from 'devextreme-aspnet-data-nojquery';
import Grid from '../components/Grid';
import Header from '../components/Header';
import { Box } from '@mui/material';

const url = 'https://js.devexpress.com/Demos/Mvc/api/DnDBetweenGrids';

const tasksStore = AspNetData.createStore({
  key: 'ID',
  loadUrl: `${url}/Tasks`,
  updateUrl: `${url}/UpdateTask`,
  onBeforeSend(method, ajaxOptions) {
    ajaxOptions.xhrFields = { withCredentials: true };
  },
});

const Pokanban = () => (
    <>
        <Header />
        <Box sx={{ display: 'flex', gap: 2, padding: '20px'}}>
            <Grid tasksStore={tasksStore} status={1} subjectTitle="Interesse" />
            <Grid tasksStore={tasksStore} status={2} subjectTitle="Capturados" />            
        </Box>
    </>
);

export default Pokanban; */