import { createTheme, ThemeOptions } from '@mui/material';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#EBAC20',
    },
    secondary: {
      main: '#006471',
    },
  },
};

export default createTheme(themeOptions)