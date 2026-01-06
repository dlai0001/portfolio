
import './App.css'
import { Stack, Typography, Button } from '@mui/material'

function App() {
  return <Stack spacing={2} sx={{ p: 4 }}>
    <Typography variant="h4">
      MUI is working 🚀
    </Typography>
    <Button variant="contained">
      Primary Button
    </Button>
  </Stack>
}

export default App
