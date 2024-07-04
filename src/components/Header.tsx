import React from 'react';
import { AppBar, Box, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#ed5564' }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <Link to="/">
                        <img src="/logo-alltype.svg" alt="Pokémon Logo" style={{ width: '120px' }} />
                    </Link>
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