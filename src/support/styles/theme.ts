import { createTheme } from '@mui/material/styles';

const common = {
  typography: {
    fontFamily: [
      'Calibre',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    body1: { lineHeight: 1.6 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
};

export const lightTheme = createTheme({
  ...common,
  palette: {
    mode: 'light',
    background: {
      default: '#FAF7F2', // warm sand
      paper: '#FFFFFF',
    },
    primary: {
      main: '#7C3AED', // violet
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#F59E0B', // amber
    },
    text: {
      primary: '#1F2937',
      secondary: '#4B5563',
    },
    divider: '#E5E7EB',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
        containedPrimary: {
          boxShadow: '0 6px 20px rgba(124, 58, 237, 0.25)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  ...common,
  palette: {
    mode: 'dark',
    background: {
      default: '#0B0B10', // charcoal
      paper: '#14141F',
    },
    primary: {
      main: '#A78BFA', // softened violet
      contrastText: '#0B0B10',
    },
    secondary: {
      main: '#FBBF24', // warm amber
    },
    text: {
      primary: '#EDE9FE',
      secondary: '#C7D2FE',
    },
    divider: '#27272A',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          boxShadow: '0 8px 24px rgba(167, 139, 250, 0.25)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});
