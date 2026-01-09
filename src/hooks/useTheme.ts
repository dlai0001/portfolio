import { useMemo, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { lightTheme, darkTheme } from '../support/styles/theme';

const storedMode = localStorage.getItem('theme') as ThemeMode | null;

export function useAppTheme() {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

  const [mode, setMode] = useState<ThemeMode>(
    storedMode ?? (prefersDark ? 'dark' : 'light')
  );


  const theme = useMemo(
    () => (mode === 'dark' ? darkTheme : lightTheme),
    [mode]
  );

  const toggleTheme = () => {
    const next = mode === 'dark' ? 'light' : 'dark';
    setMode(next);
    localStorage.setItem('theme', next);
  };

  return { theme, mode, toggleTheme };
}
