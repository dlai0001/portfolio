import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Skills from './pages/Skills'
import Experience from './pages/Experience'
import { useAppTheme } from './hooks/useTheme'
import { ThemeProvider, CssBaseline } from '@mui/material'
import NavBar from './components/NavBar'


function App() {
  const { theme, toggleTheme, mode } = useAppTheme();

  useEffect(() => {
    if (!theme) return;
    const bg = theme.palette?.background?.default ?? '';
    const text = theme.palette?.text?.primary ?? '';
    document.documentElement.style.backgroundColor = bg;
    document.body.style.backgroundColor = bg;
    document.documentElement.style.color = text;
    document.body.style.color = text;
  }, [theme]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter basename="/portfolio">
        <NavBar mode={mode} toggleTheme={toggleTheme} />
        <Routes>          
          <Route path="/" element={<Home />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
