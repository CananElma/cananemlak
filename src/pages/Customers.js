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
  Avatar,
  Chip,
  Tooltip,
  Fade,
  Zoom,
  Rating,
} from '@mui/material';
import {
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Home as HomeIcon,
  Add as AddIcon,
  Star as StarIcon,
} from '@mui/icons-material';

const sampleCustomers = [
  {
    id: 1,
    name: 'Ahmet Yılmaz',
    phone: '+90 532 123 4567',
    email: 'ahmet.yilmaz@email.com',
    preferences: ['Villa', 'Deniz Manzaralı'],
    status: 'Aktif',
    notes: 'Antalya bölgesinde villa arıyor',
    rating: 4,
    lastContact: '2024-03-15',
    totalViewings: 5,
    favoriteProperties: ['Modern Villa in Antalya'],
    avatar: 'https://i.pravatar.cc/150?img=68',
    isFavorite: true,
  },
  {
    id: 2,
    name: 'Ayşe Demir',
    phone: '+90 533 765 4321',
    email: 'ayse.demir@email.com',
    preferences: ['Apartman', 'Şehir Merkezi'],
    status: 'Pasif',
    notes: 'İstanbul Avrupa yakasında daire bakıyor',
    rating: 5,
    lastContact: '2024-03-18',
    totalViewings: 3,
    favoriteProperties: ['Luxury Apartment in Istanbul'],
    avatar: 'https://i.pravatar.cc/150?img=2',
    isFavorite: false,
  },
];

function Customers() {
  const [customers, setCustomers] = useState(sampleCustomers);
  const [tabValue, setTabValue] = useState(0);

  const handleFavorite = (id) => {
    setCustomers(customers.map(customer =>
      customer.id === id ? { ...customer, isFavorite: !customer.isFavorite } : customer
    ));
  };

  const getFilteredCustomers = () => {
    switch (tabValue) {
      case 1:
        return customers.filter(customer => customer.status === 'Aktif');
      case 2:
        return customers.filter(customer => customer.isFavorite);
      default:
        return customers;
    }
  };

  const getStatusColor = (status) => {
    return status === 'Aktif' ? 'success' : 'default';
  };

  return (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 4,
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: -10,
          left: 0,
          width: '100%',
          height: '4px',
          background: 'linear-gradient(90deg, #1976d2, #64b5f6, #1976d2)',
          borderRadius: '2px',
        }
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
            Müşteriler
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
            Yeni Müşteri Ekle
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
        <Tab label="Aktif" />
        <Tab label="Favoriler" />
      </Tabs>

      <Grid container spacing={3}>
        {getFilteredCustomers().map((customer, index) => (
          <Grid item xs={12} md={6} key={customer.id}>
            <Zoom in timeout={600 + index * 200}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 25px rgba(0,0,0,0.2)',
                    '& .MuiAvatar-root': {
                      transform: 'scale(1.1)',
                      border: '4px solid #1976d2',
                    }
                  },
                  borderRadius: 3,
                  position: 'relative',
                  overflow: 'visible',
                  background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      src={customer.avatar}
                      sx={{
                        width: 70,
                        height: 70,
                        mr: 2,
                        border: '3px solid',
                        borderColor: 'primary.main',
                        transition: 'all 0.3s ease-in-out',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      }}
                    />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {customer.name}
                      </Typography>
                      <Rating
                        value={customer.rating}
                        readOnly
                        icon={<StarIcon fontSize="small" />}
                        emptyIcon={<StarIcon fontSize="small" />}
                        sx={{ color: 'primary.main' }}
                      />
                    </Box>
                    <IconButton
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        transition: 'transform 0.2s ease-in-out',
                        '&:hover': { transform: 'scale(1.1)' },
                      }}
                      onClick={() => handleFavorite(customer.id)}
                      color={customer.isFavorite ? 'error' : 'default'}
                    >
                      {customer.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                  </Box>

                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <PhoneIcon sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="body2">{customer.phone}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <EmailIcon sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="body2">{customer.email}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <HomeIcon sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="body2">
                          {customer.totalViewings} Görüntüleme
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Son görüşme: {customer.lastContact}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom sx={{ color: 'text.secondary' }}>
                      Tercihler:
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {customer.preferences.map((pref, index) => (
                        <Chip
                          key={index}
                          label={pref}
                          size="small"
                          sx={{
                            bgcolor: 'primary.main',
                            color: 'white',
                            fontWeight: 500,
                            borderRadius: '8px',
                            '&:hover': {
                              bgcolor: 'primary.dark',
                              transform: 'translateY(-2px)',
                            },
                            transition: 'all 0.2s ease-in-out',
                          }}
                        />
                      ))}
                    </Box>
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {customer.notes}
                  </Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip
                      label={customer.status}
                      color={getStatusColor(customer.status)}
                      size="small"
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

export default Customers; 