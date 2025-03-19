import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
  Paper,
  TextField,
  Button,
  Fab,
  Zoom,
  Divider,
  Avatar,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Dashboard as DashboardIcon,
  Home as HomeIcon,
  People as PeopleIcon,
  Visibility as VisibilityIcon,
  Message as MessageIcon,
  Analytics as AnalyticsIcon,
  Settings as SettingsIcon,
  Chat as ChatIcon,
  Send as SendIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Lottie from 'lottie-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faDragon } from '@fortawesome/free-solid-svg-icons';

const drawerWidth = 280;

const menuItems = [
  { text: 'Ana Sayfa', icon: <DashboardIcon />, path: '/', color: '#2196f3' },
  { text: 'Mülkler', icon: <HomeIcon />, path: '/properties', color: '#4caf50' },
  { text: 'Müşteriler', icon: <PeopleIcon />, path: '/customers', color: '#ff9800' },
  { text: 'Mesajlar', icon: <MessageIcon />, path: '/messages', color: '#e91e63' },
  { text: 'Görüntülemeler', icon: <CalendarIcon />, path: '/viewings', color: '#9c27b0' },
  { text: 'Analiz', icon: <AnalyticsIcon />, path: '/analytics', color: '#00bcd4' },
  { text: 'Ayarlar', icon: <SettingsIcon />, path: '/settings', color: '#607d8b' },
];

function Layout({ children }) {
  const [open, setOpen] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [foxAnimationSize, setFoxAnimationSize] = useState(40);
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(true);
  const [iconRotation, setIconRotation] = useState(0);
  
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setOpen(false);
    }
  };

  const handleChatToggle = () => {
    setChatOpen(!chatOpen);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: 'user', time: new Date().toLocaleTimeString() }]);
      setNewMessage('');
      
      // Simulate bot response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          text: 'Size nasıl yardımcı olabilirim?',
          sender: 'bot',
          time: new Date().toLocaleTimeString()
        }]);
      }, 1000);
    }
  };

  useEffect(() => {
    const rotationInterval = setInterval(() => {
      setIconRotation(prev => (prev + 5) % 360);
    }, 100);
    
    return () => clearInterval(rotationInterval);
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${open ? drawerWidth : 0}px)` },
          ml: { md: `${open ? drawerWidth : 0}px` },
          boxShadow: 'none',
          borderBottom: '1px solid rgba(0,0,0,0.12)',
          backgroundColor: 'white',
        }}
      >
        <Toolbar>
          <IconButton
            color="primary"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            flexGrow: 1,
          }}>
            <Typography 
              variant="h6" 
              noWrap 
              component="div" 
              className="animated-header"
              sx={{ 
                fontWeight: 700,
                textAlign: 'center',
                padding: '12px 0',
                '&:hover': {
                  transform: 'scale(1.05)',
                  transition: 'all 0.3s ease'
                },
                mr: 2,
              }}
            >
              HOŞGELDİNİZ
            </Typography>
            <Box 
              sx={{ 
                width: foxAnimationSize, 
                height: foxAnimationSize,
                transition: 'all 0.5s ease',
                '&:hover': {
                  transform: 'scale(1.3) rotate(5deg)',
                  cursor: 'pointer',
                  '& .icon-container': {
                    color: '#FFD700',
                    textShadow: '0 0 15px rgba(255,215,0,0.7), 0 0 30px rgba(255,215,0,0.4)'
                  }
                },
                animation: 'float 3s ease-in-out infinite',
                '@keyframes float': {
                  '0%': { transform: 'translateY(0px)' },
                  '50%': { transform: 'translateY(-10px)' },
                  '100%': { transform: 'translateY(0px)' }
                },
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-4px',
                  left: '25%',
                  width: '50%',
                  height: '6px',
                  background: 'rgba(0,0,0,0.1)',
                  borderRadius: '50%',
                  filter: 'blur(3px)',
                  animation: 'shadow 3s ease-in-out infinite',
                },
                '@keyframes shadow': {
                  '0%': { transform: 'scale(1)', opacity: 0.6 },
                  '50%': { transform: 'scale(0.8)', opacity: 0.3 },
                  '100%': { transform: 'scale(1)', opacity: 0.6 }
                },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={() => {
                setFoxAnimationSize(60);
              }}
              onMouseLeave={() => {
                setFoxAnimationSize(40);
              }}
            >
              <Box 
                className="icon-container"
                sx={{
                  color: '#d4af37',
                  fontSize: foxAnimationSize * 0.8,
                  transform: `rotate(${iconRotation}deg) scale(1.1)`,
                  transition: 'color 0.3s ease, text-shadow 0.3s ease',
                  textShadow: '0 0 10px rgba(212,175,55,0.5)',
                  animation: 'pulse 2s infinite ease-in-out',
                  '@keyframes pulse': {
                    '0%': { transform: `rotate(${iconRotation}deg) scale(1)` },
                    '50%': { transform: `rotate(${iconRotation}deg) scale(1.2)` },
                    '100%': { transform: `rotate(${iconRotation}deg) scale(1)` }
                  }
                }}
              >
                <FontAwesomeIcon icon={faDragon} />
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
        anchor="left"
        open={isMobile ? !open : open}
        onClose={handleDrawerToggle}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: '1px solid rgba(0,0,0,0.12)',
            backgroundColor: theme.palette.grey[50],
          },
        }}
      >
        <Box sx={{ 
          p: 3,
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          borderBottom: '1px solid rgba(0,0,0,0.08)',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)',
        }}>
          <Avatar
            src="/images/1.jpg"
            sx={{ 
              width: 120, 
              height: 120,
              mb: 2,
              border: '4px solid white',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease-in-out',
              position: 'relative',
              '&:hover': {
                transform: 'scale(1.05) rotate(5deg)',
                boxShadow: '0 8px 25px rgba(33,150,243,0.4)',
              },
              '@keyframes pulse': {
                '0%': { transform: 'scale(1)' },
                '50%': { transform: 'scale(1.05)' },
                '100%': { transform: 'scale(1)' }
              },
              animation: 'pulse 3s infinite ease-in-out',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: '50%',
                border: '2px solid #e91e63',
                animation: 'ripple 2s infinite ease-in-out',
                opacity: 0.8
              },
              '@keyframes ripple': {
                '0%': { transform: 'scale(0.8)', opacity: 1 },
                '100%': { transform: 'scale(1.3)', opacity: 0 }
              }
            }}
          />
          <Typography variant="h5" sx={{ 
            fontFamily: "'Playfair Display', serif",
            fontWeight: 600,
            color: 'primary.main',
            mb: 0.5,
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
            '&:hover': {
              transform: 'scale(1.1)',
              color: '#e91e63',
              transition: 'all 0.3s ease'
            }
          }}>
            Canan Elma
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '0.9rem',
            letterSpacing: 1,
            textTransform: 'uppercase',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -5,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '40px',
              height: '2px',
              background: 'linear-gradient(to right, #e91e63, #2196f3)',
              borderRadius: '2px'
            }
          }}>
            Gayrimenkul Danışmanı
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{
            mt: 2,
            fontSize: '0.85rem',
            textAlign: 'center',
            fontStyle: 'italic',
            fontFamily: "'Dancing Script', cursive",
            fontSize: '1.1rem',
            animation: 'fadeIn 2s ease-in-out',
            '@keyframes fadeIn': {
              from: { opacity: 0, transform: 'translateY(10px)' },
              to: { opacity: 1, transform: 'translateY(0)' }
            }
          }}>
            "Hayalinizdeki eve giden yolda profesyonel rehberiniz"
          </Typography>
        </Box>
        <List sx={{ p: 2, backgroundColor: 'white', borderRadius: 2, m: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                my: 0.8,
                borderRadius: 2,
                transition: 'all 0.3s ease-in-out',
                backgroundColor: location.pathname === item.path ? item.color : 'white',
                color: location.pathname === item.path ? 'white' : 'text.primary',
                boxShadow: location.pathname === item.path ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
                '&:hover': {
                  backgroundColor: location.pathname === item.path ? item.color : `${item.color}15`,
                  transform: 'translateX(8px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  '& .MuiListItemIcon-root': {
                    color: item.color,
                    transform: 'scale(1.2)',
                  },
                  '& .MuiListItemText-primary': {
                    color: location.pathname === item.path ? 'white' : item.color,
                    fontWeight: 600,
                  }
                },
                '& .MuiListItemIcon-root': {
                  minWidth: 40,
                  transition: 'all 0.3s ease-in-out',
                  color: location.pathname === item.path ? 'white' : item.color,
                },
                '& .MuiListItemText-primary': {
                  fontWeight: location.pathname === item.path ? 600 : 500,
                  fontFamily: "'Poppins', sans-serif",
                  transition: 'all 0.3s ease-in-out',
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
          backgroundColor: theme.palette.grey[100],
          minHeight: '100vh',
        }}
      >
        {children}

        {/* Chat Box */}
        <Zoom in={chatOpen}>
          <Paper
            sx={{
              position: 'fixed',
              bottom: 80,
              right: 20,
              width: 300,
              height: 400,
              display: chatOpen ? 'flex' : 'none',
              flexDirection: 'column',
              overflow: 'hidden',
              zIndex: 1000,
            }}
          >
            <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}>
              <Typography>Canlı Destek</Typography>
            </Box>
            <Box sx={{ 
              flex: 1, 
              overflowY: 'auto', 
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}>
              {messages.map((msg, index) => (
                <Box
                  key={index}
                  sx={{
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    bgcolor: msg.sender === 'user' ? 'primary.main' : 'grey.200',
                    color: msg.sender === 'user' ? 'white' : 'text.primary',
                    p: 1,
                    borderRadius: 2,
                    maxWidth: '80%',
                  }}
                >
                  <Typography variant="body2">{msg.text}</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.7 }}>
                    {msg.time}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Box sx={{ p: 2, display: 'flex', gap: 1 }}>
              <TextField
                size="small"
                fullWidth
                placeholder="Mesajınızı yazın..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <IconButton color="primary" onClick={handleSendMessage}>
                <SendIcon />
              </IconButton>
            </Box>
          </Paper>
        </Zoom>

        {/* Chat Toggle Button */}
        <Fab
          color="primary"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          onClick={handleChatToggle}
        >
          <ChatIcon />
        </Fab>
      </Box>
    </Box>
  );
}

export default Layout; 