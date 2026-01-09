import CloseIcon from '@mui/icons-material/Close';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';
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

type Props = {
    mode: 'light' | 'dark';
    toggleTheme: () => void;
};

export default function NavBar({ mode, toggleTheme }: Props) {
    const [open, setOpen] = useState(false);
    const muiTheme = useMuiTheme();
    const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

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
                <Button component="span" color="inherit" disableElevation sx={{ textTransform: 'none' }}>
                    {label}
                </Button>
            </NavLink>
        );

        return (
            <AppBar position="sticky" color="transparent" elevation={0} className="nav">
                <Toolbar disableGutters className="nav-inner">
                    <Box sx={{ flex: '1 1 auto' }}>
                        <NavLink to="/" onClick={close} className="brand-link">
                            David Lai
                        </NavLink>
                    </Box>

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
                                aria-label={open ? 'Close menu' : 'Open menu'}
                                className="mobile-toggle"
                                onClick={() => setOpen((s) => !s)}
                                size="small"
                            >
                                {open ? <CloseIcon /> : <MenuIcon />}
                            </IconButton>
                        )}
                    </Box>
                </Toolbar>

                {isMobile && (
                    <Box className={`mobile-menu ${open ? 'open' : ''}`}>
                        {items.map(([to, label]) => navLink(to, label))}
                    </Box>
                )}
            </AppBar>
        );
}
