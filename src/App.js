import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { blue, orange } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Properties from './pages/Properties';
import Customers from './pages/Customers';
import Viewings from './pages/Viewings';
import Messages from './pages/Messages';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import { Helmet } from 'react-helmet';
import { lightTheme, darkTheme } from './theme';
import { Box, Snackbar, Alert } from '@mui/material';

const theme = {
  palette: {
    primary: {
      main: blue[700],
      light: blue[400],
      dark: blue[900],
    },
    secondary: {
      main: orange[500],
      light: orange[300],
      dark: orange[700],
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 28px rgba(0,0,0,0.12)',
          },
        },
      },
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
};

// Bildirim verileri
const notificationData = [
  {
    id: 1,
    type: 'warning',
    message: '🔔 ÖNEMLİ: Yurtdışındaki Türk kullanıcılarımız için özel portföy hazırlanıyor!',
    time: 'Şimdi'
  },
  {
    id: 2,
    type: 'success',
    message: '🌟 Son 24 saatte Almanya\'dan 458 Türk ziyaretçi platformumuzu ziyaret etti!',
    time: '2 dakika önce'
  },
  {
    id: 3,
    type: 'info',
    message: '📈 Hollanda\'daki Türk yatırımcılardan gelen taleplerde %32 artış!',
    time: '15 dakika önce'
  },
  {
    id: 4,
    type: 'success',
    message: '🏆 Dubai\'de yaşayan Türk yatırımcılar için özel portföy hizmeti başladı!',
    time: '1 saat önce'
  },
  {
    id: 5,
    type: 'warning',
    message: '📢 15 farklı ülkede yaşayan Türk vatandaşlarına emlak danışmanlığı hizmeti veriyoruz!',
    time: '2 saat önce'
  }
];

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeNotification, setActiveNotification] = useState(null);

  useEffect(() => {
    // Tema tercihini localStorage'dan al
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    } else {
      // Sistem temasını kontrol et
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    let currentIndex = 0;
    
    // İlk bildirimi hemen göster
    setActiveNotification(notificationData[0]);

    // Her 5 saniyede bir sonraki bildirime geç
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % notificationData.length;
      setActiveNotification(notificationData[currentIndex]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Tema değiştirme fonksiyonunu global olarak tanımla
  window.toggleTheme = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('theme', !darkMode ? 'dark' : 'light');
  };

  const handleNotificationClose = () => {
    setActiveNotification(null);
  };

  return (
    <Router>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <Helmet>
          <title>Canan Elma | Emlak Danışmanı</title>
          <meta name="description" content="Canan Elma - Profesyonel Emlak Danışmanı. Hayalinizdeki eve ulaşmanın en kolay yolu." />
          <meta property="og:title" content="Canan Elma | Emlak Danışmanı" />
          <meta property="og:description" content="Profesyonel emlak danışmanlığı hizmetleri" />
          <meta property="og:image" content="https://raw.githubusercontent.com/your-username/your-repo/main/public/canan-profile.jpg" />
        </Helmet>
        <Box>
          {/* Global Bildirimler */}
          <Snackbar
            open={activeNotification !== null}
            autoHideDuration={4000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            onClose={handleNotificationClose}
            sx={{
              '& .MuiSnackbarContent-root': {
                backgroundColor: activeNotification?.type === 'success' ? 'success.main' :
                               activeNotification?.type === 'warning' ? 'warning.main' :
                               'info.main'
              }
            }}
          >
            <Alert 
              severity={activeNotification?.type || 'info'}
              sx={{ 
                width: '100%', 
                cursor: 'pointer',
                '&:hover': {
                  opacity: 0.9,
                  transform: 'scale(1.02)',
                  transition: 'all 0.2s'
                }
              }}
            >
              {activeNotification?.message}
            </Alert>
          </Snackbar>

          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/viewings" element={<Viewings />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Layout>
        </Box>
      </ThemeProvider>
    </Router>
  );
}

export default App;
