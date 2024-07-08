import { Box, Button, IconButton, Typography } from "@mui/material";
import { CatchingPokemon } from '@mui/icons-material';
import Header from "../components/Header";

const cssColumns = {
    display: 'flex',
    justifyContent: 'space-between',
    /* alignContent: 'flex-start', */
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
                <Box sx={{cssColumn, backgroundColor: '#e9e9e9'}}>
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

export default Pokanban;