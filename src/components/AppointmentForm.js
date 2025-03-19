import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  Autocomplete,
  Chip,
  IconButton,
  Divider,
  CircularProgress,
  Stack,
  Slide,
  Alert,
  Paper,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import {
  Close as CloseIcon,
  CalendarMonth as CalendarIcon,
  People as PeopleIcon,
  Home as HomeIcon,
  Description as DescriptionIcon,
  AccessTime as TimeIcon,
  Save as SaveIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon
} from '@mui/icons-material';

// Örnek müşteri verileri
const sampleCustomers = [
  { id: 1, name: 'Ahmet Yılmaz', email: 'ahmet@ornek.com', phone: '0532 123 4567', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, name: 'Ayşe Demir', email: 'ayse@ornek.com', phone: '0533 234 5678', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: 3, name: 'Mehmet Öz', email: 'mehmet@ornek.com', phone: '0534 345 6789', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: 4, name: 'Zeynep Kaya', email: 'zeynep@ornek.com', phone: '0535 456 7890', avatar: 'https://i.pravatar.cc/150?img=4' },
  { id: 5, name: 'Ali Yıldız', email: 'ali@ornek.com', phone: '0536 567 8901', avatar: 'https://i.pravatar.cc/150?img=5' },
];

// Örnek mülk verileri
const sampleProperties = [
  { id: 1, title: 'Modern Villa - Antalya', address: 'Konyaaltı, Antalya', type: 'Villa', price: '₺5.500.000', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80' },
  { id: 2, title: 'Deniz Manzaralı Daire - İstanbul', address: 'Kadıköy, İstanbul', type: 'Daire', price: '₺3.250.000', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80' },
  { id: 3, title: 'Bahçeli Müstakil Ev - İzmir', address: 'Karşıyaka, İzmir', type: 'Müstakil Ev', price: '₺4.100.000', image: 'https://images.unsplash.com/photo-1598228723793-52759bba239c?auto=format&fit=crop&w=600&q=80' },
  { id: 4, title: 'Rezidans Daire - Ankara', address: 'Çankaya, Ankara', type: 'Rezidans', price: '₺2.800.000', image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=600&q=80' },
  { id: 5, title: 'Yazlık Villa - Bodrum', address: 'Bodrum, Muğla', type: 'Yazlık', price: '₺6.750.000', image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=600&q=80' },
];

// Randevu durumları
const appointmentStatuses = [
  { value: 'Planlandı', color: 'primary' },
  { value: 'Onaylandı', color: 'success' },
  { value: 'Beklemede', color: 'warning' },
  { value: 'İptal Edildi', color: 'error' },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AppointmentForm = ({ open, handleClose, editAppointment = null }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  
  // Form adımları
  const steps = ['Randevu Bilgileri', 'Müşteri & Mülk Seçimi', 'Detaylar & Onay'];
  
  // Form state
  const [formData, setFormData] = useState({
    id: null,
    date: null,
    time: null,
    customer: null,
    property: null,
    status: 'Planlandı',
    notes: '',
    location: '',
    duration: 60, // dakika cinsinden
    notification: true,
    type: 'Mülk Görüntüleme'
  });

  // Form doğrulama
  const [formErrors, setFormErrors] = useState({
    date: false,
    time: false,
    customer: false,
    property: false
  });

  // Düzenleme durumunda form verilerini doldur
  useEffect(() => {
    if (editAppointment) {
      setFormData({
        ...editAppointment,
        date: editAppointment.date ? new Date(editAppointment.date) : null,
        time: editAppointment.time ? new Date(`2000-01-01T${editAppointment.time}`) : null
      });
    } else {
      // Yeni randevu için varsayılan değerler
      setFormData({
        id: Date.now(),
        date: null,
        time: null,
        customer: null,
        property: null,
        status: 'Planlandı',
        notes: '',
        location: '',
        duration: 60,
        notification: true,
        type: 'Mülk Görüntüleme'
      });
    }
  }, [editAppointment, open]);

  // Form değişikliklerini işle
  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  // Formu doğrula
  const validateForm = () => {
    const errors = {
      date: !formData.date,
      time: !formData.time,
      customer: !formData.customer,
      property: !formData.property
    };
    
    setFormErrors(errors);
    
    return !Object.values(errors).some(error => error);
  };

  // Formu gönder
  const handleSubmit = () => {
    if (!validateForm()) {
      setError('Lütfen tüm gerekli alanları doldurun.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    // Burada gerçek bir API çağrısı yapılabilir
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      // Başarılı olduğunda formu kapat
      setTimeout(() => {
        setSuccess(false);
        handleClose(formData);
      }, 1500);
    }, 1000);
  };

  const randevuTipleri = [
    'Mülk Görüntüleme',
    'Sözleşme İmzalama',
    'Portföy Sunumu',
    'İlk Görüşme',
    'Müşteri Ziyareti',
    'Diğer'
  ];

  // Adım değiştirme fonksiyonları
  const handleNext = () => {
    if (activeStep === 0) {
      const dateTimeErrors = {
        date: !formData.date,
        time: !formData.time
      };
      
      if (dateTimeErrors.date || dateTimeErrors.time) {
        setFormErrors({...formErrors, ...dateTimeErrors});
        setError('Lütfen tarih ve saat bilgilerini doldurun.');
        return;
      }
    } else if (activeStep === 1) {
      const selectionErrors = {
        customer: !formData.customer,
        property: !formData.property
      };
      
      if (selectionErrors.customer || selectionErrors.property) {
        setFormErrors({...formErrors, ...selectionErrors});
        setError('Lütfen müşteri ve mülk seçimlerini tamamlayın.');
        return;
      }
    }
    
    setActiveStep((prevStep) => prevStep + 1);
    setError('');
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
    setError('');
  };

  return (
    <Dialog 
      open={open} 
      onClose={() => handleClose(null)}
      fullWidth 
      maxWidth="md"
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          overflow: 'hidden'
        }
      }}
    >
      <DialogTitle sx={{ 
        background: 'linear-gradient(45deg, #e91e63, #ff5252)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CalendarIcon sx={{ mr: 1, fontSize: 28 }} />
          <Box>
            <Typography variant="h6" component="span">
              {editAppointment ? 'Randevu Düzenle' : 'Yeni Randevu Planla'}
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', opacity: 0.8 }}>
              Adım {activeStep + 1} / {steps.length}
            </Typography>
          </Box>
        </Box>
        <IconButton 
          onClick={() => handleClose(null)}
          sx={{ color: 'white' }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* Adım göstergesi */}
      <Box sx={{ 
        width: '100%', 
        p: 1, 
        backgroundColor: 'rgba(233, 30, 99, 0.05)',
        borderBottom: '1px solid rgba(233, 30, 99, 0.1)',
      }}>
        <Stepper activeStep={activeStep} sx={{ px: 2 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <DialogContent dividers sx={{ p: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Randevu başarıyla {editAppointment ? 'güncellendi' : 'oluşturuldu'}!
          </Alert>
        )}
        
        {/* Form adımları */}
        <Box sx={{ mt: 1, minHeight: '300px' }}>
          {activeStep === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500, display: 'flex', alignItems: 'center' }}>
                  <CalendarIcon sx={{ mr: 1, color: 'primary.main' }} /> Randevu Bilgileri
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>

              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Randevu Tarihi *"
                    value={formData.date}
                    onChange={(newDate) => setFormData({...formData, date: newDate})}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: formErrors.date,
                        helperText: formErrors.date ? 'Tarih seçmelisiniz' : ''
                      }
                    }}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    label="Randevu Saati *"
                    value={formData.time}
                    onChange={(newTime) => setFormData({...formData, time: newTime})}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: formErrors.time,
                        helperText: formErrors.time ? 'Saat seçmelisiniz' : ''
                      }
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Randevu Süresi</InputLabel>
                  <Select
                    value={formData.duration}
                    onChange={handleChange('duration')}
                    label="Randevu Süresi"
                  >
                    <MenuItem value={30}>30 dakika</MenuItem>
                    <MenuItem value={60}>1 saat</MenuItem>
                    <MenuItem value={90}>1.5 saat</MenuItem>
                    <MenuItem value={120}>2 saat</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Randevu Tipi</InputLabel>
                  <Select
                    value={formData.type}
                    onChange={handleChange('type')}
                    label="Randevu Tipi"
                  >
                    {randevuTipleri.map((tip) => (
                      <MenuItem key={tip} value={tip}>{tip}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          )}
          
          {activeStep === 1 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500, display: 'flex', alignItems: 'center' }}>
                  <PeopleIcon sx={{ mr: 1, color: 'primary.main' }} /> Müşteri ve Mülk Seçimi
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>

              <Grid item xs={12} md={6}>
                <Autocomplete
                  options={sampleCustomers}
                  value={formData.customer}
                  onChange={(event, newValue) => {
                    setFormData({...formData, customer: newValue});
                  }}
                  getOptionLabel={(option) => option.name}
                  renderOption={(props, option) => (
                    <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box 
                        component="img"
                        src={option.avatar}
                        sx={{ width: 32, height: 32, borderRadius: '50%', mr: 1 }}
                        alt={option.name}
                      />
                      <Box>
                        <Typography variant="body2" fontWeight={500}>{option.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{option.phone}</Typography>
                      </Box>
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Müşteri *"
                      error={formErrors.customer}
                      helperText={formErrors.customer ? 'Müşteri seçmelisiniz' : ''}
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <>
                            <PeopleIcon color="action" sx={{ ml: 1, mr: 1 }} />
                            {params.InputProps.startAdornment}
                          </>
                        )
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Autocomplete
                  options={sampleProperties}
                  value={formData.property}
                  onChange={(event, newValue) => {
                    setFormData({
                      ...formData, 
                      property: newValue,
                      location: newValue ? newValue.address : ''
                    });
                  }}
                  getOptionLabel={(option) => option.title}
                  renderOption={(props, option) => (
                    <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box 
                        component="img"
                        src={option.image}
                        sx={{ width: 48, height: 32, borderRadius: 1, mr: 1, objectFit: 'cover' }}
                        alt={option.title}
                      />
                      <Box>
                        <Typography variant="body2" fontWeight={500}>{option.title}</Typography>
                        <Typography variant="caption" color="text.secondary">{option.price}</Typography>
                      </Box>
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Mülk *"
                      error={formErrors.property}
                      helperText={formErrors.property ? 'Mülk seçmelisiniz' : ''}
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <>
                            <HomeIcon color="action" sx={{ ml: 1, mr: 1 }} />
                            {params.InputProps.startAdornment}
                          </>
                        )
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Randevu Lokasyonu"
                  value={formData.location}
                  onChange={handleChange('location')}
                  InputProps={{
                    startAdornment: <LocationIcon color="action" sx={{ mr: 1 }} />
                  }}
                  placeholder={formData.property ? formData.property.address : 'Randevu lokasyonu giriniz'}
                />
              </Grid>
            </Grid>
          )}
          
          {activeStep === 2 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500, display: 'flex', alignItems: 'center' }}>
                  <DescriptionIcon sx={{ mr: 1, color: 'primary.main' }} /> Ek Bilgiler ve Onay
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Durum</InputLabel>
                  <Select
                    value={formData.status}
                    onChange={handleChange('status')}
                    label="Durum"
                  >
                    {appointmentStatuses.map((status) => (
                      <MenuItem key={status.value} value={status.value}>
                        <Chip 
                          label={status.value} 
                          color={status.color} 
                          size="small" 
                          sx={{ minWidth: 80 }} 
                        />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField
                    fullWidth
                    label="Telefon"
                    value={formData.customer ? formData.customer.phone : ''}
                    InputProps={{
                      startAdornment: <PhoneIcon color="action" sx={{ mr: 1 }} />,
                      readOnly: true
                    }}
                  />
                  <TextField
                    fullWidth
                    label="E-posta"
                    value={formData.customer ? formData.customer.email : ''}
                    InputProps={{
                      startAdornment: <EmailIcon color="action" sx={{ mr: 1 }} />,
                      readOnly: true
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Notlar"
                  multiline
                  rows={4}
                  value={formData.notes}
                  onChange={handleChange('notes')}
                  placeholder="Randevu ile ilgili önemli notlar ekleyin..."
                  InputProps={{
                    startAdornment: <DescriptionIcon color="action" sx={{ mr: 1, mt: 1 }} />
                  }}
                />
              </Grid>
              
              {/* Özet kısmı */}
              {formData.customer && formData.property && formData.date && formData.time && (
                <Grid item xs={12}>
                  <Paper elevation={0} sx={{ 
                    p: 2, 
                    borderRadius: 2, 
                    bgcolor: 'background.paper', 
                    border: '1px dashed', 
                    borderColor: 'divider',
                    mt: 2
                  }}>
                    <Typography variant="subtitle2" gutterBottom color="primary">
                      Randevu Özeti
                    </Typography>
                    <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 1 }}>
                      <Chip icon={<CalendarIcon />} label={formData.date ? formData.date.toLocaleDateString() : ''} size="small" />
                      <Chip icon={<TimeIcon />} label={formData.time ? formData.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''} size="small" />
                      <Chip icon={<PeopleIcon />} label={formData.customer ? formData.customer.name : ''} size="small" />
                      <Chip icon={<HomeIcon />} label={formData.property ? formData.property.title : ''} size="small" />
                      <Chip label={formData.type} color="default" size="small" />
                      <Chip label={formData.status} color={appointmentStatuses.find(s => s.value === formData.status)?.color || 'default'} size="small" />
                    </Stack>
                  </Paper>
                </Grid>
              )}
            </Grid>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, justifyContent: 'space-between' }}>
        <Box>
          <Button 
            onClick={() => handleClose(null)} 
            color="inherit"
            sx={{ borderRadius: 2, mr: 1 }}
          >
            İptal
          </Button>
          {activeStep > 0 && (
            <Button
              onClick={handleBack}
              sx={{ borderRadius: 2 }}
            >
              Geri
            </Button>
          )}
        </Box>
        
        <Box>
          {activeStep < steps.length - 1 ? (
            <Button 
              variant="contained" 
              onClick={handleNext}
              sx={{ 
                borderRadius: 2,
                px: 3
              }}
            >
              İleri
            </Button>
          ) : (
            <Button 
              variant="contained" 
              onClick={handleSubmit}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={24} color="inherit" /> : <SaveIcon />}
              sx={{ 
                borderRadius: 2,
                background: 'linear-gradient(45deg, #e91e63, #ff5252)',
                px: 3
              }}
            >
              {loading ? 'Kaydediliyor...' : (editAppointment ? 'Güncelle' : 'Kaydet')}
            </Button>
          )}
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default AppointmentForm; 