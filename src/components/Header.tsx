import React from 'react';
import { AppBar, Box, Toolbar, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';

const Header: React.FC = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    const navigationButtons = (
        <>
            <Button color="inherit" component={Link} to="/" sx={{ '&:hover': { color: '#900' } }} >
                Pokemons
            </Button>
            <Button color="inherit" component={Link} to="/quiz" sx={{ '&:hover': { color: '#900' } }} >
                Quiz
            </Button>
        </>
    );

    return (
        <AppBar position="static" sx={{ backgroundColor: '#ed5564' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: '6px' }}>
                <Link to="/">
                    <img src="/logo-alltype.svg" alt="Pokémon Logo" style={{ width: '120px' }} />
                </Link>

                <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'flex-end', height: '100%' }}>
                    {isHomePage && <SearchBar />}
                    {navigationButtons}
                </Box>

                {/* menu hamburguer */}
                <Box sx={{ display: { xs: 'block', md: 'none' }, }}>
                    <MenuIcon />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;