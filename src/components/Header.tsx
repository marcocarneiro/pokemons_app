import React from 'react';
import { AppBar, Box, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const Header: React.FC = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#ed5564' }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                    <Link to="/">
                        <img src="/logo-alltype.svg" alt="Pokémon Logo" style={{ width: '120px' }} />
                    </Link>
                    <Box sx={{ flexGrow: 1, mx: 2 }}>
                        <SearchBar />
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button color="inherit" component={Link} to="/">
                        Tabela de Pokemons
                    </Button>
                    <Button color="inherit" component={Link} to="/quiz">
                        Quiz
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;