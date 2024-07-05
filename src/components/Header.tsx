import React from 'react';
import { AppBar, Box, Toolbar, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';

const Header: React.FC = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <AppBar position="static" sx={{ backgroundColor: '#ed5564' }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <Link to="/">
                        <img src="/logo-alltype.svg" alt="Pokémon Logo" style={{ width: '120px' }} />
                    </Link>
                </Box>
                {isHomePage && (
                    <Box sx={{ flexGrow: 1 }}>
                        <SearchBar />
                    </Box>
                )}
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