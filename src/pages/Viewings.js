import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Tabs,
  Tab,
  IconButton,
  Chip,
  Tooltip,
  Fade,
  Zoom,
  Avatar,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Event as EventIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
  Home as HomeIcon,
  Comment as CommentIcon,
} from '@mui/icons-material';

const sampleViewings = [
  {
    id: 1,
    propertyId: 1,
    propertyTitle: 'Modern Villa in Antalya',
    propertyImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
    customerId: 1,
    customerName: 'Ahmet Yılmaz',
    customerAvatar: 'https://i.pravatar.cc/150?img=1',
    date: '2024-03-20',
    time: '14:30',
    status: 'Planlandı',
    notes: 'Müşteri özellikle deniz manzarasıyla ilgileniyor',
    feedback: '',
  },
  {
    id: 2,
    propertyId: 2,
    propertyTitle: 'Luxury Apartment in Istanbul',
    propertyImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    customerId: 2,
    customerName: 'Ayşe Demir',
    customerAvatar: 'https://i.pravatar.cc/150?img=2',
    date: '2024-03-19',
    time: '11:00',
    status: 'Tamamlandı',
    notes: 'Şehir manzaralı daireler tercih ediliyor',
    feedback: 'Daire çok beğenildi, fiyat konusunda görüşülecek',
  },
];

function Viewings() {
  const [viewings, setViewings] = useState(sampleViewings);
  const [tabValue, setTabValue] = useState(0);

  const getFilteredViewings = () => {
    switch (tabValue) {
      case 1:
        return viewings.filter(viewing => viewing.status === 'Planlandı');
      case 2:
        return viewings.filter(viewing => viewing.status === 'Tamamlandı');
      case 3:
        return viewings.filter(viewing => viewing.status === 'İptal Edildi');
      default:
        return viewings;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Planlandı':
        return 'primary';
      case 'Tamamlandı':
        return 'success';
      case 'İptal Edildi':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Planlandı':
        return <EventIcon />;
      case 'Tamamlandı':
        return <CheckCircleIcon />;
      case 'İptal Edildi':
        return <CancelIcon />;
      default:
        return null;
    }
  };

  return (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 4 
      }}>
        <Fade in timeout={800}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              background: 'linear-gradient(45deg, #1976d2, #64b5f6)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Görüntülemeler
          </Typography>
        </Fade>
        <Zoom in timeout={800}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              borderRadius: 2,
              background: 'linear-gradient(45deg, #1976d2, #64b5f6)',
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1565c0, #42a5f5)',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 15px rgba(0,0,0,0.2)',
              },
              transition: 'all 0.3s ease-in-out',
            }}
          >
            Yeni Görüntüleme Ekle
          </Button>
        </Zoom>
      </Box>

      <Tabs
        value={tabValue}
        onChange={(e, newValue) => setTabValue(newValue)}
        sx={{
          mb: 3,
          '& .MuiTab-root': {
            minWidth: 100,
            fontWeight: 500,
          },
          '& .Mui-selected': {
            color: 'primary.main',
          },
        }}
      >
        <Tab label="Tümü" />
        <Tab label="Planlandı" />
        <Tab label="Tamamlandı" />
        <Tab label="İptal Edildi" />
      </Tabs>

      <Grid container spacing={3}>
        {getFilteredViewings().map((viewing, index) => (
          <Grid item xs={12} md={6} key={viewing.id}>
            <Zoom in timeout={600 + index * 200}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 25px rgba(0,0,0,0.15)',
                  },
                  borderRadius: 3,
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    height: 200,
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    component="img"
                    src={viewing.propertyImage}
                    alt={viewing.propertyTitle}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                      p: 2,
                      color: 'white',
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {viewing.propertyTitle}
                    </Typography>
                  </Box>
                </Box>

                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      src={viewing.customerAvatar}
                      sx={{ width: 40, height: 40, mr: 2 }}
                    />
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                        {viewing.customerName}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <EventIcon sx={{ fontSize: 18, mr: 0.5, color: 'primary.main' }} />
                          <Typography variant="body2" color="text.secondary">
                            {viewing.date}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <TimeIcon sx={{ fontSize: 18, mr: 0.5, color: 'primary.main' }} />
                          <Typography variant="body2" color="text.secondary">
                            {viewing.time}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {viewing.notes}
                  </Typography>

                  {viewing.feedback && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" gutterBottom sx={{ color: 'text.secondary' }}>
                        Geri Bildirim:
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {viewing.feedback}
                      </Typography>
                    </Box>
                  )}

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip
                      icon={getStatusIcon(viewing.status)}
                      label={viewing.status}
                      color={getStatusColor(viewing.status)}
                      sx={{ borderRadius: 1 }}
                    />
                    <Box>
                      <Tooltip title="Düzenle">
                        <IconButton
                          color="primary"
                          sx={{
                            transition: 'transform 0.2s ease-in-out',
                            '&:hover': { transform: 'scale(1.1)' },
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Sil">
                        <IconButton
                          color="error"
                          sx={{
                            transition: 'transform 0.2s ease-in-out',
                            '&:hover': { transform: 'scale(1.1)' },
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Zoom>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Viewings; 