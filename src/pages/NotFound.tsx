import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const NotFound: React.FC = () => {
    return (
        <Box
            component="main"
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '2rem',
                background: '#f8fafc',
                color: '#0f172a',
            }}
        >
            <Typography variant="h1" sx={{ fontSize: '4rem', margin: 0 }}>
                404
            </Typography>
            <Typography variant="body1" sx={{ margin: '1rem 0 2rem', fontSize: '1.125rem' }}>
                Sorry — the page you are looking for does not exist.
            </Typography>
            <Button
                href="./"
                component="a"
                variant="contained"
                sx={{
                    padding: '0.6rem 1rem',
                    borderRadius: 1,
                }}
                aria-label="Go to home page"
            >
                Go home
            </Button>
        </Box>
    );
};

export default NotFound;