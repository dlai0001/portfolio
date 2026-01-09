import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

type Props = {
    mode: 'light' | 'dark';
    toggleTheme: () => void;
};

export default function NavBar({ mode: themeMode, toggleTheme }: Props) {
    const [open, setOpen] = useState(false);

    const close = () => setOpen(false);

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
            {/* Render Button as a span so we don't nest a <button> inside an <a> */}
            <Button component="span" color="inherit" disableElevation sx={{ textTransform: 'none' }}>
                {label}
            </Button>
        </NavLink>
    );

    return (
        <AppBar position="static" color="transparent" elevation={0} className="nav">
            <Toolbar className="nav-inner">
                <Box className="brand" sx={{ flex: '1 1 auto' }}>
                    <NavLink to="/" onClick={close} className="brand-link">
                        David Lai
                    </NavLink>
                </Box>

                <Box component="nav" className="links" aria-label="Primary">
                    {items.map(([to, label]) => navLink(to, label))}
                </Box>

                <Box className="controls" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box className="theme-toggle" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Switch checked={themeMode === 'dark'} onChange={toggleTheme} size="small" />
                        {themeMode === 'dark' ? <DarkModeIcon fontSize="small" /> : <LightModeIcon fontSize="small" />}


                    </Box>

                    <IconButton
                        aria-label={open ? 'Close menu' : 'Open menu'}
                        className="mobile-toggle"
                        onClick={() => setOpen((s) => !s)}
                        size="small"
                    >
                        {open ? <CloseIcon /> : <MenuIcon />}
                    </IconButton>
                </Box>
            </Toolbar>

            <Box className={`mobile-menu ${open ? 'open' : ''}`}>
                {items.map(([to, label]) => navLink(to, label))}
            </Box>
        </AppBar>
    );
}
