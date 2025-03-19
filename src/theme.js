import { createTheme } from '@mui/material/styles';

// Ortak tema özellikleri
const commonTheme = {
  typography: {
    fontFamily: "'Poppins', 'Roboto', 'Arial', sans-serif",
    h1: {
      fontWeight: 700,
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'scale(1.02)',
        textShadow: '0 0 15px rgba(0,115,230,0.5)',
      },
    },
    h2: {
      fontWeight: 600,
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'scale(1.02)',
        textShadow: '0 0 12px rgba(0,115,230,0.4)',
      },
    },
    h3: {
      fontWeight: 600,
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'scale(1.02)',
        textShadow: '0 0 10px rgba(0,115,230,0.3)',
      },
    },
    h4: {
      fontWeight: 600,
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'scale(1.02)',
        textShadow: '0 0 8px rgba(0,115,230,0.3)',
      },
    },
    h5: {
      fontWeight: 500,
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'scale(1.01)',
        textShadow: '0 0 6px rgba(0,115,230,0.2)',
      },
    },
    h6: {
      fontWeight: 500,
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'scale(1.01)',
        textShadow: '0 0 4px rgba(0,115,230,0.2)',
      },
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
            '&::after': {
              transform: 'translateX(100%)',
            },
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            transition: 'transform 0.5s ease',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-8px) scale(1.01)',
            boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'scale(1.01)',
            boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateX(5px)',
            backgroundColor: 'rgba(0,115,230,0.1)',
          },
        },
      },
    },
    MuiIcon: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.2) rotate(5deg)',
          },
        },
      },
    },
  },
};

// Açık tema
export const lightTheme = createTheme({
  ...commonTheme,
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
    },
    success: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#666666',
    },
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0,0,0,0.05)',
    '0px 4px 8px rgba(0,0,0,0.08)',
    '0px 8px 16px rgba(0,0,0,0.1)',
    // ... diğer gölgeler
  ],
});

// Koyu tema
export const darkTheme = createTheme({
  ...commonTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
      light: '#e3f2fd',
      dark: '#42a5f5',
    },
    secondary: {
      main: '#ce93d8',
      light: '#f3e5f5',
      dark: '#ab47bc',
    },
    success: {
      main: '#66bb6a',
      light: '#81c784',
      dark: '#388e3c',
    },
    background: {
      default: '#0a1929',
      paper: '#1a2027',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255,255,255,0.7)',
    },
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0,0,0,0.2)',
    '0px 4px 8px rgba(0,0,0,0.3)',
    '0px 8px 16px rgba(0,0,0,0.4)',
    // ... diğer gölgeler
  ],
}); 