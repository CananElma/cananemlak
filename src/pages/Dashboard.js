import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  Avatar,
  AvatarGroup,
  Tooltip,
  Fade,
  Zoom,
  Paper,
  Stack,
  Divider,
  Chip,
  LinearProgress,
  useTheme,
  Switch,
  FormControlLabel,
  TextField,
} from '@mui/material';
import {
  Home as HomeIcon,
  Person as PersonIcon,
  Visibility as VisibilityIcon,
  TrendingUp as TrendingUpIcon,
  Add as AddIcon,
  Search as SearchIcon,
  Message as MessageIcon,
  CalendarMonth as CalendarIcon,
  Instagram as InstagramIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  WhatsApp as WhatsAppIcon,
  Assessment,
  AutoGraph,
  Psychology,
  Lightbulb,
  ArrowUpward,
  ArrowDownward,
  Favorite as FavoriteIcon,
  ChatBubbleOutline as ChatBubbleOutlineIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  VisibilityOff as VisibilityOffIcon,
  Send,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import { keyframes } from '@mui/system';
import Particles from 'react-tsparticles';

const stats = [
  {
    title: 'Toplam Portföy',
    value: '245',
    icon: <Assessment />,
    color: '#2196f3',
    increase: '+12% bu ay',
    description: 'Aktif satış ve kiralık mülkler'
  },
  {
    title: 'Aktif Müşteriler',
    value: '180',
    icon: <PersonIcon />,
    color: '#4caf50',
    increase: '+8% bu ay',
    description: 'Düzenli iletişimde olan müşteriler'
  },
  {
    title: 'Aylık Görüntüleme',
    value: '1,250',
    icon: <VisibilityIcon />,
    color: '#ff9800',
    increase: '+15% bu ay',
    description: 'İlan ve profil ziyaretleri'
  },
  {
    title: 'Başarı Oranı',
    value: '%68',
    icon: <TrendingUpIcon />,
    color: '#e91e63',
    increase: '+5% bu ay',
    description: 'Başarıyla tamamlanan işlemler'
  },
];

const aiInsights = [
  {
    title: "Portföy Analizi",
    description: "Lüks konut segmentinde %25 artış potansiyeli tespit edildi. Özellikle Kadıköy ve Beşiktaş bölgelerinde yüksek talep gözlemleniyor.",
    icon: <Psychology />,
    color: "#2196f3",
    action: "Detaylı Rapor"
  },
  {
    title: "Pazar Tahmini",
    description: "Önümüzdeki ay satışlarda %15 artış bekleniyor. Yatırımcıların villa ve müstakil ev talebinde artış trendi devam ediyor.",
    icon: <AutoGraph />,
    color: "#4caf50",
    action: "Trend Analizi"
  },
  {
    title: "Müşteri Eğilimi",
    description: "Bahçeli müstakil evlere talep artışı gözlemlendi. Özellikle home-office çalışanlar için uygun lokasyonlar öne çıkıyor.",
    icon: <Lightbulb />,
    color: "#ff9800",
    action: "Detayları Gör"
  }
];

const customerReviews = [
  {
    id: 1,
    name: 'Mehmet Yılmaz',
    location: 'İstanbul, Kadıköy',
    review: 'Canan Hanım sayesinde hayalimizdeki evi bulduk. Profesyonel yaklaşımı ve sabırlı tutumu için çok teşekkür ederiz.',
    rating: 5,
    date: '2 hafta önce',
    avatar: 'https://i.pravatar.cc/150?img=52',
    propertyType: 'Villa'
  },
  {
    id: 2,
    name: 'Ahmet Kaya',
    location: 'Ankara, Çankaya',
    review: 'Yatırım amaçlı daire arayışımda bana çok yardımcı oldu. Piyasa analizi ve önerileri çok değerliydi.',
    rating: 5,
    date: '1 ay önce',
    avatar: 'https://i.pravatar.cc/150?img=53',
    propertyType: 'Daire'
  },
  {
    id: 3,
    name: 'Ali Demir',
    location: 'İzmir, Karşıyaka',
    review: 'Satış sürecinde gösterdiği özen ve profesyonellik için teşekkürler. Her aşamada bilgilendirme yapması çok güven vericiydi.',
    rating: 5,
    date: '2 ay önce',
    avatar: 'https://i.pravatar.cc/150?img=54',
    propertyType: 'Yazlık'
  },
  {
    id: 4,
    name: 'Mustafa Özkan',
    location: 'Bursa, Nilüfer',
    review: 'İş yerimiz için yer ararken tanıştık. Hem hızlı hem de müşteri odaklı çalışması bizi çok memnun etti.',
    rating: 5,
    date: '3 ay önce',
    avatar: 'https://i.pravatar.cc/150?img=55',
    propertyType: 'İş Yeri'
  },
  {
    id: 5,
    name: 'Hakan Şahin',
    location: 'Antalya, Konyaaltı',
    review: 'Yabancı yatırımcılar için de harika çözümler sunuyor. Uluslararası gayrimenkul danışmanlığında gerçekten uzman.',
    rating: 5,
    date: '3 ay önce',
    avatar: 'https://i.pravatar.cc/150?img=56',
    propertyType: 'Rezidans'
  }
];

const recentActivities = [
  {
    id: 1,
    type: 'property_view',
    title: 'Villa Antalya',
    description: 'Lüks villa için 3 yeni görüntüleme talebi geldi. Potansiyel alıcılar ile randevu planlanıyor.',
    time: '10 dakika önce',
    avatar: 'https://i.pravatar.cc/150?img=52',
    status: 'positive',
    priority: 'high'
  },
  {
    id: 2,
    type: 'client_meeting',
    title: 'Müşteri Görüşmesi',
    description: 'İstanbul Kadıköy bölgesi için yatırım görüşmesi planlandı. Portföy sunumu hazırlanıyor.',
    time: '1 saat önce',
    avatar: 'https://i.pravatar.cc/150?img=53',
    status: 'pending',
    priority: 'medium'
  },
  {
    id: 3,
    type: 'market_analysis',
    title: 'Pazar Analizi',
    description: 'Bölgesel fiyat analizi güncellendi. Yeni fırsatlar belirlendi.',
    time: '2 saat önce',
    avatar: 'https://i.pravatar.cc/150?img=54',
    status: 'neutral',
    priority: 'normal'
  }
];

const performanceData = [
  { ay: 'Ocak', görüntüleme: 850, satış: 12, kira: 8 },
  { ay: 'Şubat', görüntüleme: 920, satış: 15, kira: 10 },
  { ay: 'Mart', görüntüleme: 1100, satış: 18, kira: 12 },
  { ay: 'Nisan', görüntüleme: 980, satış: 14, kira: 9 },
  { ay: 'Mayıs', görüntüleme: 1250, satış: 22, kira: 15 },
  { ay: 'Haziran', görüntüleme: 1400, satış: 25, kira: 18 }
];

const quickActions = [
  { 
    title: 'Mülk Ekle', 
    icon: <AddIcon />, 
    color: '#2196f3',
    description: 'Yeni mülk ilanı oluştur'
  },
  { 
    title: 'Müşteri Ara', 
    icon: <SearchIcon />, 
    color: '#4caf50',
    description: 'Müşteri veritabanında ara'
  },
  { 
    title: 'Mesaj Gönder', 
    icon: <MessageIcon />, 
    color: '#ff9800',
    description: 'Toplu mesaj/bilgilendirme'
  },
  { 
    title: 'Randevu Planla', 
    icon: <CalendarIcon />, 
    color: '#e91e63',
    description: 'Görüşme takvimi oluştur'
  },
];

// Add Instagram feed data
const instagramFeed = [
  {
    id: 1,
    image: 'https://source.unsplash.com/random/400x400/?luxury,apartment',
    likes: 245,
    comments: 18,
    description: 'Boğaz manzaralı lüks daire projemiz satışa sunuldu! 🌊✨ #LuxuryRealEstate #Istanbul',
    date: '2 saat önce'
  },
  {
    id: 2,
    image: 'https://source.unsplash.com/random/400x400/?modern,house',
    likes: 189,
    comments: 12,
    description: 'Modern tasarım, konforlu yaşam! Yeni projemizden kareler 🏠 #ModernLiving',
    date: '1 gün önce'
  },
  {
    id: 3,
    image: 'https://source.unsplash.com/random/400x400/?villa,pool',
    likes: 320,
    comments: 24,
    description: 'Özel havuzlu villalarımız hakkında bilgi almak için DM! 🌟 #LuxuryVilla',
    date: '2 gün önce'
  }
];

// Yıldız animasyonu için keyframes
const starAnimation = keyframes`
  from {
    transform: translateY(0) translateX(0);
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  to {
    transform: translateY(-1000px) translateX(-1000px);
    opacity: 0;
  }
`;

// Parlama efekti için keyframes
const glowAnimation = keyframes`
  0% {
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0073e6, 0 0 20px #0073e6;
  }
  50% {
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 25px #0073e6, 0 0 30px #0073e6;
  }
  100% {
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0073e6, 0 0 20px #0073e6;
  }
`;

// Yazı hover efekti için keyframes
const textHoverAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

// Yeni animasyon keyframes
const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const floatAnimation = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const shimmerAnimation = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

// Kayma animasyonu için keyframes
const slideAnimation = keyframes`
  0% { opacity: 0; transform: translateX(-20px); }
  5% { opacity: 1; transform: translateX(0); }
  25% { opacity: 1; }
  30% { opacity: 0; transform: translateX(20px); }
  100% { opacity: 0; }
`;

function Dashboard() {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [colorMode, setColorMode] = useState('default'); // 'default', 'nature', 'ocean', 'sunset'
  const containerRef = React.useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [showParticles, setShowParticles] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const luxuryImages = [
    '/images/luxury-villa.jpg',
    '/images/luxury-homes/villa1.jpg',
    '/images/luxury-homes/villa2.jpg',
    '/images/luxury-homes/villa3.jpg'
  ];

  // Renk modları
  const colorModes = {
    default: {
      primary: '#1976d2',
      secondary: '#9c27b0',
      gradient: 'linear-gradient(135deg, #1976d2 0%, #64b5f6 100%)',
      background: darkMode ? '#0a1929' : '#f5f5f5'
    },
    nature: {
      primary: '#2e7d32',
      secondary: '#558b2f',
      gradient: 'linear-gradient(135deg, #2e7d32 0%, #81c784 100%)',
      background: darkMode ? '#1a2f1a' : '#f1f8e9'
    },
    ocean: {
      primary: '#e91e63',
      secondary: '#c2185b',
      gradient: 'linear-gradient(135deg, #e91e63 0%, #f48fb1 100%)',
      background: darkMode ? '#880e4f' : '#fce4ec'
    },
    sunset: {
      primary: '#e64a19',
      secondary: '#f57c00',
      gradient: 'linear-gradient(135deg, #e64a19 0%, #ffb74d 100%)',
      background: darkMode ? '#bf360c' : '#fff3e0'
    }
  };

  const currentColors = colorModes[colorMode];

  // Tema değiştirme fonksiyonu
  const handleColorModeChange = (newMode) => {
    setColorMode(newMode);
    // Smooth transition için tüm elementlere animasyon eklendi
    document.documentElement.style.setProperty('--transition-speed', '0.5s');
    setTimeout(() => {
      document.documentElement.style.setProperty('--transition-speed', '0.3s');
    }, 500);
  };

  // Particle efekti için config
  const particlesConfig = {
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: currentColors.primary
      },
      shape: {
        type: "circle"
      },
      opacity: {
        value: 0.5,
        random: false
      },
      size: {
        value: 3,
        random: true
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: currentColors.primary,
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
    // Theme change will be handled by the parent component
    if (window.toggleTheme) {
      window.toggleTheme();
    }
  };

  // Image carousel for luxury homes
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % luxuryImages.length);
    }, 4000);
    
    return () => clearInterval(imageInterval);
  }, []);

  const StatCard = ({ title, value, icon, color, trend, percentage, description, darkMode }) => (
    <Card sx={{ 
      height: '100%',
      background: darkMode 
        ? `linear-gradient(135deg, ${color}33 0%, ${color}11 100%)`
        : `linear-gradient(135deg, ${color}15 0%, white 100%)`,
      transition: 'all 0.3s ease',
      borderRadius: 3,
      border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: darkMode
          ? `0 8px 25px ${color}50`
          : `0 8px 25px ${color}25`
      }
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar 
            sx={{ 
              bgcolor: color,
              mr: 2,
              transform: 'scale(1.2)',
              boxShadow: `0 4px 12px ${color}40`
            }}
          >
            {icon}
          </Avatar>
          <Typography 
            variant="h6" 
            sx={{ 
              color: darkMode ? 'rgba(255,255,255,0.9)' : 'text.secondary',
              fontWeight: 500
            }}
          >
            {title}
          </Typography>
        </Box>
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 1, 
            fontWeight: 600,
            color: darkMode ? 'white' : 'text.primary'
          }}
        >
          {value}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          {trend === 'up' ? (
            <ArrowUpward sx={{ color: 'success.main', mr: 1 }} />
          ) : (
            <ArrowDownward sx={{ color: 'error.main', mr: 1 }} />
          )}
          <Typography 
            variant="body2" 
            color={trend === 'up' ? 'success.main' : 'error.main'}
          >
            {percentage}% {trend === 'up' ? 'artış' : 'azalış'}
          </Typography>
        </Box>
        <Typography 
          variant="body2" 
          sx={{ 
            color: darkMode ? 'rgba(255,255,255,0.7)' : 'text.secondary'
          }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );

  const InsightCard = ({ title, description, icon, color, action }) => (
    <Card sx={{ 
      height: '100%',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
      }
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: color }}>{icon}</Avatar>
          <Typography variant="h6" sx={{ ml: 2 }}>{title}</Typography>
        </Box>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
        <Button
          variant="outlined"
          size="small"
          sx={{ 
            color: color,
            borderColor: color,
            '&:hover': {
              borderColor: color,
              bgcolor: `${color}10`
            }
          }}
        >
          {action}
        </Button>
      </CardContent>
    </Card>
  );

  // Yıldız oluşturma fonksiyonu
  const createStars = () => {
    const stars = [];
    for (let i = 0; i < 50; i++) {
      const size = Math.random() * 3;
      stars.push(
        <Box
          key={i}
          sx={{
            position: 'fixed',
            width: size,
            height: size,
            background: 'white',
            borderRadius: '50%',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `${starAnimation} ${Math.random() * 10 + 5}s linear infinite`,
            opacity: 0,
            zIndex: 0,
          }}
        />
      );
    }
    return stars;
  };

  return (
    <Box ref={containerRef}>
      {/* Particle Background */}
      {showParticles && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
            opacity: 0.6
          }}
        >
          <Particles params={particlesConfig} />
        </Box>
      )}

      {/* Color Mode Selector */}
      <Box
        sx={{
          position: 'fixed',
          top: 80,
          right: 20,
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          backgroundColor: theme.palette.background.paper,
          padding: 2,
          borderRadius: 2,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        }}
      >
        {Object.keys(colorModes).map((mode) => (
          <Tooltip title={`${mode.charAt(0).toUpperCase() + mode.slice(1)} Mode`} key={mode}>
            <IconButton
              onClick={() => handleColorModeChange(mode)}
              sx={{
                width: 40,
                height: 40,
                background: colorModes[mode].gradient,
                '&:hover': {
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.3s ease',
                border: mode === colorMode ? '2px solid white' : 'none',
              }}
            />
          </Tooltip>
        ))}
      </Box>

      {/* Particle Toggle */}
      <Tooltip title={`${showParticles ? 'Hide' : 'Show'} Particles`}>
        <IconButton
          onClick={() => setShowParticles(!showParticles)}
          sx={{
            position: 'fixed',
            top: 260,
            right: 20,
            zIndex: 1000,
            backgroundColor: theme.palette.background.paper,
            '&:hover': {
              backgroundColor: `${currentColors.primary}22`,
            },
          }}
        >
          {showParticles ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </IconButton>
      </Tooltip>

      {/* Hero Section with enhanced design */}
      <Paper
        sx={{
          p: 4,
          mb: 4,
          background: `${currentColors.gradient}`,
          color: 'white',
          borderRadius: 3,
          position: 'relative',
          overflow: 'hidden',
          transform: scrolled ? 'translateY(-20px)' : 'translateY(0)',
          transition: 'all 0.3s ease-in-out',
          backdropFilter: 'blur(10px)',
          boxShadow: darkMode 
            ? '0 8px 32px rgba(0,0,0,0.3)'
            : '0 8px 32px rgba(25,118,210,0.3)',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
          },
          animation: `${floatAnimation} 6s ease-in-out infinite`,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Box
              sx={{
                position: 'relative',
                height: 320,
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                border: '4px solid white',
                transition: 'all 0.5s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.08)',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.3)',
                  '& img': {
                    transform: 'scale(1.2)',
                    filter: 'brightness(1.1)',
                  }
                },
              }}
            >
              {luxuryImages.map((img, index) => (
                <Box
                  key={index}
                  component="img"
                  src={img}
                  alt={`Luxury Villa ${index + 1}`}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: index === currentImage ? 1 : 0,
                    transition: 'all 1.2s ease-in-out, transform 0.5s ease-in-out',
                    zIndex: 1,
                    transform: 'scale(1.01)',
                    filter: 'brightness(1)',
                  }}
                />
              ))}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  zIndex: 2,
                  opacity: 0.3,
                  pointerEvents: 'none',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 16,
                  left: 0,
                  right: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 1.5,
                  zIndex: 3,
                }}
              >
                {luxuryImages.map((_, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      backgroundColor: index === currentImage ? 'white' : 'rgba(255,255,255,0.5)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      border: '1px solid rgba(255,255,255,0.5)',
                      transform: index === currentImage ? 'scale(1.3)' : 'scale(1)',
                      '&:hover': {
                        backgroundColor: 'white',
                        transform: 'scale(1.3)',
                      }
                    }}
                    onClick={() => setCurrentImage(index)}
                  />
                ))}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Avatar
                src="/images/2.png"
                sx={{
                  width: 80,
                  height: 80,
                  border: '3px solid white',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  }
                }}
              />
              <Typography 
                variant="h3" 
                className="animated-title"
                sx={{
                  textAlign: { xs: 'center', md: 'left' }
                }}
              >
                Elit Gayrimenkul Danışmanlık
              </Typography>
            </Box>
            <Typography variant="h5" gutterBottom sx={{ mb: 1, opacity: 0.9 }}>
              Gayrimenkul Danışmanı
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, opacity: 0.9, maxWidth: 600 }}>
              1987 Hatay doğumluyum. 10 yıllık sektör deneyimi ile İstanbul'un en değerli lokasyonlarında profesyonel gayrimenkul danışmanlığı hizmeti sunuyorum.
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                <strong>Taşınmaz Ticareti Yetki Belgesi No:</strong> YB0199/17UY0333-5/00/14105
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                <strong>İşletme Ünvanı:</strong> SKALA GAYRİMENKUL
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                <strong>E-posta:</strong> info@dialogskala.com
              </Typography>
            </Box>
            <Stack direction="row" spacing={2} sx={{ mb: 3, justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <Button
                variant="contained"
                startIcon={<WhatsAppIcon />}
                sx={{
                  bgcolor: 'success.main',
                  '&:hover': { 
                    bgcolor: 'success.dark',
                    transform: 'translateY(-3px)',
                  },
                  transition: 'all 0.3s ease'
                }}
                href="https://wa.me/905425777267"
                target="_blank"
              >
                WhatsApp
              </Button>
              <Button
                variant="contained"
                startIcon={<InstagramIcon />}
                sx={{
                  bgcolor: '#E1306C',
                  '&:hover': { 
                    bgcolor: '#C13584',
                    transform: 'translateY(-3px)',
                  },
                  transition: 'all 0.3s ease'
                }}
                href="https://instagram.com/cananelmagayrimenkul"
                target="_blank"
              >
                Instagram
              </Button>
              <Button
                variant="contained"
                startIcon={<PhoneIcon />}
                sx={{
                  bgcolor: '#1976d2',
                  '&:hover': { 
                    bgcolor: '#1565c0',
                    transform: 'translateY(-3px)',
                  },
                  transition: 'all 0.3s ease'
                }}
                href="tel:02244500450"
              >
                0224 450 04 50
              </Button>
              <Button
                variant="contained"
                startIcon={<EmailIcon />}
                sx={{
                  '&:hover': { 
                    transform: 'translateY(-3px)',
                  },
                  transition: 'all 0.3s ease'
                }}
                href="mailto:info@dialogskala.com"
              >
                E-posta
              </Button>
            </Stack>
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <Box sx={{ 
                textAlign: 'center',
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'translateY(-5px)' }
              }}>
                <Typography variant="h4" fontWeight="bold">250+</Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>Başarılı Satış</Typography>
              </Box>
              <Box sx={{ 
                textAlign: 'center',
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'translateY(-5px)' }
              }}>
                <Typography variant="h4" fontWeight="bold">180+</Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>Mutlu Müşteri</Typography>
              </Box>
              <Box sx={{ 
                textAlign: 'center',
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'translateY(-5px)' }
              }}>
                <Typography variant="h4" fontWeight="bold">15+</Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>Ödül & Başarı</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Section Titles with Glow Effect */}
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          textAlign: 'center',
          fontWeight: 'bold',
          color: darkMode ? '#fff' : '#1976d2',
          animation: `${glowAnimation} 2s ease-in-out infinite`,
          '&:hover': {
            animation: `${textHoverAnimation} 1s ease-in-out infinite`,
          },
        }}
      >
        Emlak Portföyü Yönetimi
      </Typography>

      {/* Stats Section with enhanced cards */}
      <Grid container spacing={3}>
        {loading ? (
          <Grid item xs={12}>
            <LinearProgress 
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                '& .MuiLinearProgress-bar': {
                  background: currentColors.gradient,
                }
              }}
            />
          </Grid>
        ) : (
          stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={stat.title}>
              {mounted && (
                <Zoom in={mounted} timeout={600 + index * 200}>
                  <div>
                    <StatCard
                      title={stat.title}
                      value={stat.value}
                      icon={stat.icon}
                      color={currentColors.primary}
                      trend="up"
                      percentage="12"
                      description={stat.description}
                      darkMode={darkMode}
                    />
                  </div>
                </Zoom>
              )}
            </Grid>
          ))
        )}

        <Grid item xs={12} md={8}>
          {mounted && (
            <Fade in={mounted} timeout={1200}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Son Aktiviteler
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ borderRadius: 2 }}
                  >
                    Tümünü Gör
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {recentActivities.map((activity) => (
                    <Box
                      key={activity.id}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        p: 2,
                        borderRadius: 2,
                        bgcolor: 'background.default',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateX(8px)',
                          bgcolor: 'action.hover',
                        },
                      }}
                    >
                      <Avatar src={activity.avatar} sx={{ width: 48, height: 48, mr: 2 }} />
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                            {activity.title}
                          </Typography>
                          <Chip
                            label={activity.priority}
                            size="small"
                            color={
                              activity.priority === 'high' ? 'error' :
                              activity.priority === 'medium' ? 'warning' : 'default'
                            }
                            sx={{ height: 20 }}
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {activity.description}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                          {activity.time}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Fade>
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          {mounted && (
            <Fade in={mounted} timeout={1400}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Hızlı İşlemler
                </Typography>
                <Grid container spacing={2}>
                  {quickActions.map((action) => (
                    <Grid item xs={12} key={action.title}>
                      <Button
                        variant="outlined"
                        startIcon={action.icon}
                        fullWidth
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          borderColor: action.color,
                          color: action.color,
                          justifyContent: 'flex-start',
                          '&:hover': {
                            borderColor: action.color,
                            bgcolor: `${action.color}10`,
                            transform: 'translateY(-4px)',
                          },
                          transition: 'all 0.3s ease-in-out',
                        }}
                      >
                        <Box sx={{ textAlign: 'left' }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                            {action.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {action.description}
                          </Typography>
                        </Box>
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Fade>
          )}
        </Grid>
      </Grid>

      {/* Customer Reviews Section with Enhanced Title */}
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          textAlign: 'center',
          fontWeight: 'bold',
          color: darkMode ? '#fff' : '#1976d2',
          animation: `${glowAnimation} 2s ease-in-out infinite`,
          '&:hover': {
            animation: `${textHoverAnimation} 1s ease-in-out infinite`,
          },
        }}
      >
        Müşteri Yorumları
      </Typography>

      {/* Customer Reviews Section */}
      {mounted && (
        <Grid item xs={12}>
          <Box sx={{ mt: 4, mb: 3 }}>
            <Grid container spacing={3}>
              {customerReviews.map((review) => (
                <Grid item xs={12} md={4} key={review.id}>
                  <Card sx={{ 
                    height: '100%',
                    background: darkMode 
                      ? 'rgba(255,255,255,0.05)'
                      : 'rgba(255,255,255,0.9)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-10px) scale(1.02)',
                      boxShadow: darkMode
                        ? '0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(255,255,255,0.1) inset'
                        : '0 10px 30px rgba(25,118,210,0.2), 0 0 20px rgba(25,118,210,0.1) inset',
                    }
                  }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar src={review.avatar} sx={{ width: 48, height: 48, mr: 2 }} />
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                            {review.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {review.location}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {review.review}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Chip 
                          label={review.propertyType}
                          size="small"
                          sx={{ bgcolor: 'primary.light', color: 'white' }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {review.date}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      )}

      {/* Performans Grafiği */}
      {mounted && (
        <Grid item xs={12}>
          <Card sx={{ p: 3, mt: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box>
                <Typography variant="h6" gutterBottom>Performans Analizi</Typography>
                <Typography variant="body2" color="text.secondary">
                  Son 6 aylık performans değerlendirmesi
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip label="Görüntüleme" color="primary" size="small" />
                <Chip label="Satış" color="success" size="small" />
                <Chip label="Kiralama" color="warning" size="small" />
              </Box>
            </Box>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorGörüntüleme" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2196f3" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#2196f3" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSatış" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4caf50" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4caf50" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorKira" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff9800" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ff9800" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ay" />
                <YAxis />
                <RechartsTooltip />
                <Area
                  type="monotone"
                  dataKey="görüntüleme"
                  stroke="#2196f3"
                  fillOpacity={1}
                  fill="url(#colorGörüntüleme)"
                />
                <Area
                  type="monotone"
                  dataKey="satış"
                  stroke="#4caf50"
                  fillOpacity={1}
                  fill="url(#colorSatış)"
                />
                <Area
                  type="monotone"
                  dataKey="kira"
                  stroke="#ff9800"
                  fillOpacity={1}
                  fill="url(#colorKira)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      )}

      {/* AI Öngörüleri */}
      {mounted && (
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4, mb: 3 }}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Yapay Zeka Öngörüleri
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Güncel pazar analizi ve öneriler
              </Typography>
            </Box>
            <Button
              variant="outlined"
              size="small"
              sx={{ borderRadius: 2 }}
              endIcon={<ArrowUpward />}
            >
              Detaylı Analiz
            </Button>
          </Box>
          <Grid container spacing={3}>
            {aiInsights.map((insight, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Fade in={mounted} timeout={1600 + index * 200}>
                  <div>
                    <InsightCard {...insight} />
                  </div>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}

      {/* Instagram Feed Section */}
      {mounted && (
        <Grid item xs={12}>
          <Box sx={{ mt: 4, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <InstagramIcon sx={{ color: '#E1306C' }} />
                Instagram'dan Son Paylaşımlar
              </Typography>
              <Button
                variant="outlined"
                startIcon={<InstagramIcon />}
                sx={{ 
                  borderColor: '#E1306C',
                  color: '#E1306C',
                  '&:hover': {
                    borderColor: '#C13584',
                    bgcolor: 'rgba(225,48,108,0.1)'
                  }
                }}
                href="https://instagram.com/cananelmagayrimenkul"
                target="_blank"
              >
                Profili Görüntüle
              </Button>
            </Box>
            <Grid container spacing={3}>
              {instagramFeed.map((post, index) => (
                <Grid item xs={12} md={4} key={post.id}>
                  <Fade in={mounted} timeout={1000 + index * 200}>
                    <Card
                      sx={{
                        height: '100%',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
                        }
                      }}
                    >
                      <Box
                        component="img"
                        src={post.image}
                        alt={post.description}
                        sx={{
                          width: '100%',
                          height: 300,
                          objectFit: 'cover'
                        }}
                      />
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <FavoriteIcon sx={{ color: '#E1306C', fontSize: 18 }} />
                            <Typography variant="body2">{post.likes}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <ChatBubbleOutlineIcon sx={{ fontSize: 18 }} />
                            <Typography variant="body2">{post.comments}</Typography>
                          </Box>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {post.description}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {post.date}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Fade>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      )}
    </Box>
  );
}

export default Dashboard; 