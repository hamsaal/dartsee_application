import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#B388FF',
    },
    secondary: {
      main: '#CE93D8',
    },
    background: {
      default: '#0E0E12',
      paper: '#1A1A24',
    },
  },
})

export default theme
