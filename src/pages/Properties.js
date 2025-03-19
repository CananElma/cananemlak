import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Grid,
  Typography,
  IconButton,
  Chip,
  Fade,
  Zoom,
  Tooltip,
  Badge,
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  BedOutlined as BedIcon,
  BathtubOutlined as BathIcon,
  SquareFoot as AreaIcon,
  LocationOn as LocationIcon,
  Add as AddIcon,
} from '@mui/icons-material';

const sampleProperties = [
  {
    id: 1,
    title: 'Antalya\'da Modern Villa',
    location: 'Antalya, Türkiye',
    price: '₺65.000.000',
    bedrooms: 4,
    bathrooms: 3,
    area: '250m²',
    status: 'Satılık',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
    description: 'Lüks modern villa, deniz manzaralı, özel havuzlu',
    isFavorite: false,
  },
  {
    id: 2,
    title: 'İstanbul\'da Lüks Daire',
    location: 'İstanbul, Türkiye',
    price: '₺32.000.000',
    bedrooms: 3,
    bathrooms: 2,
    area: '150m²',
    status: 'Satıldı',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    description: 'Boğaz manzaralı lüks daire, modern tasarım',
    isFavorite: true,
  },
];

function Properties() {
  const [properties, setProperties] = useState(sampleProperties);

  const handleFavorite = (id) => {
    setProperties(properties.map(property =>
      property.id === id ? { ...property, isFavorite: !property.isFavorite } : property
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Satılık':
        return 'success';
      case 'Satıldı':
        return 'error';
      default:
        return 'default';
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
            Mülkler
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
            Yeni Mülk Ekle
          </Button>
        </Zoom>
      </Box>

      <Grid container spacing={3}>
        {properties.map((property, index) => (
          <Grid item xs={12} md={6} key={property.id}>
            <Zoom in timeout={600 + index * 200}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 25px rgba(0,0,0,0.15)',
                  },
                  borderRadius: 3,
                  overflow: 'hidden',
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={property.image}
                  alt={property.title}
                  sx={{
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                />
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                        {property.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <LocationIcon sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="body2" color="text.secondary">
                          {property.location}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 600,
                        color: 'primary.main',
                      }}
                    >
                      {property.price}
                    </Typography>
                  </Box>

                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={4}>
                      <Tooltip title="Yatak Odası">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <BedIcon sx={{ mr: 1, color: 'primary.main' }} />
                          <Typography>{property.bedrooms}</Typography>
                        </Box>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={4}>
                      <Tooltip title="Banyo">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <BathIcon sx={{ mr: 1, color: 'primary.main' }} />
                          <Typography>{property.bathrooms}</Typography>
                        </Box>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={4}>
                      <Tooltip title="Alan">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <AreaIcon sx={{ mr: 1, color: 'primary.main' }} />
                          <Typography>{property.area}</Typography>
                        </Box>
                      </Tooltip>
                    </Grid>
                  </Grid>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {property.description}
                  </Typography>

                  <Chip
                    label={property.status}
                    color={getStatusColor(property.status)}
                    size="small"
                    sx={{ borderRadius: 1 }}
                  />
                </CardContent>
                <CardActions sx={{ mt: 'auto', justifyContent: 'space-between', px: 2, pb: 2 }}>
                  <Box>
                    <IconButton
                      onClick={() => handleFavorite(property.id)}
                      color={property.isFavorite ? 'error' : 'default'}
                      sx={{
                        transition: 'transform 0.2s ease-in-out',
                        '&:hover': { transform: 'scale(1.1)' },
                      }}
                    >
                      {property.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                    <IconButton
                      color="primary"
                      sx={{
                        transition: 'transform 0.2s ease-in-out',
                        '&:hover': { transform: 'scale(1.1)' },
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      sx={{
                        transition: 'transform 0.2s ease-in-out',
                        '&:hover': { transform: 'scale(1.1)' },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardActions>
              </Card>
            </Zoom>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Properties; 