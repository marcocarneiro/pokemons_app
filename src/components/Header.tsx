import React from 'react';
import { useState } from 'react';
import { AppBar, Box, Toolbar, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';

const Header: React.FC = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };

    const navigationButtons = (
        <>
            <Button color="inherit" component={Link} to="/" sx={{ '&:hover': { color: '#900' } }} >
                Tabela de Pokemons
            </Button>
            <Button color="inherit" component={Link} to="/quiz" sx={{ '&:hover': { color: '#900' } }} >
                Quiz
            </Button>
        </>
    );

    const boxMenu = (
        <Box
            sx={{
                position: 'absolute',
                top: '68px',
                right: '8px',
                display: 'flex',
                flexDirection: 'column',
                padding: '16px',
                width: '300px',
                height: '50%',
                background: '#fff',
                boxShadow: '0 4px 4px #999',
                zIndex: 1201, 
            }}
        >
            {isHomePage && <SearchBar />}
            {navigationButtons}
        </Box>
    );

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: '#ed5564' }}>
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: '6px' }}>
                        <Link to="/">
                            <img src="/logo-alltype.svg" alt="Pokémon Logo" style={{ width: '120px' }} />
                        </Link>

                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'flex-end', height: '100%' }}>
                        {isHomePage && <SearchBar />}
                        {navigationButtons}
                    </Box>

                    {/* Menu Hamburguer */}
                    <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                        <IconButton
                            color="inherit"
                            edge="start"
                            onClick={handleMenuToggle}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {menuOpen && boxMenu}                
        </>
    );
};

export default Header;