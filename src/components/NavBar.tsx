import CloseIcon from '@mui/icons-material/Close';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

type Props = {
    mode: 'light' | 'dark';
    toggleTheme: () => void;
};

export default function NavBar({ mode, toggleTheme }: Props) {
    const [menuOpen, setMenuOpen] = useState(false);
    const muiTheme = useMuiTheme();
    const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

    const close = () => setMenuOpen(false);

    const items: Array<[string, string]> = [
        ['/', 'Home'],
        ['/about', 'About'],
        ['/experience', 'Experience'],
        ['/skills', 'Skills'],
    ];

    const navLink = (to: string, label: string) => (
        <NavLink
            key={to}
            to={to}
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={close}
        >
            <Button component="span" color="inherit" disableElevation sx={{ textTransform: 'none' }}>
                {label}
            </Button>
        </NavLink>
    );

    return (
        <AppBar position="sticky" color="transparent" elevation={0} className="nav">
            <Toolbar disableGutters className="nav-inner" sx={{
                backgroundColor: muiTheme.palette.background.paper,
                paddingX: { xs: 2, md: 4 },
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <Link to="/" className="brand-link" component={RouterLink} underline="none" color={muiTheme.palette.text.primary}>
                    <Typography variant="h6" color="inherit" component="div" fontWeight="bold">
                        David Lai
                    </Typography>
                </Link>

                <Box display="flex" alignItems="center" gap={1} flexDirection="row">
                    {!isMobile && (
                        <Box component="nav" className="links" aria-label="Primary">
                            {items.map(([to, label]) => navLink(to, label))}
                        </Box>
                    )}

                    <Box className="controls" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box className="theme-toggle" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <LightModeIcon fontSize="small" />
                            <Switch checked={mode === 'dark'} onChange={toggleTheme} size="small" />
                            <DarkModeIcon fontSize="small" />
                        </Box>

                        {isMobile && (
                            <IconButton
                                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                                className="mobile-toggle"
                                onClick={() => setMenuOpen((s) => !s)}
                                size="small"
                            >
                                {menuOpen ? <CloseIcon /> : <MenuIcon />}
                            </IconButton>
                        )}
                    </Box>
                </Box>
            </Toolbar>

            {isMobile && menuOpen && (
                <Box className={`mobile-menu`}>
                    {items.map(([to, label]) => navLink(to, label))}
                </Box>
            )}
        </AppBar>
    );
}
