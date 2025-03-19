import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
} from '@mui/material';
import {
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Palette as PaletteIcon,
  PhotoCamera as PhotoCameraIcon,
  Save as SaveIcon,
} from '@mui/icons-material';

const sampleUser = {
  name: 'Ahmet Yılmaz',
  email: 'ahmet@email.com',
  phone: '+90 555 123 4567',
  role: 'Yönetici',
  avatar: 'https://i.pravatar.cc/150?img=68',
  notifications: {
    email: true,
    push: true,
    sms: false,
  },
  theme: 'light',
  language: 'tr',
};

function Settings() {
  const [user, setUser] = useState(sampleUser);
  const [open, setOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState('profile');

  const handleOpen = (section) => {
    setSelectedSection(section);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedUser = {
      ...user,
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
    };
    setUser(updatedUser);
    handleClose();
  };

  const handleNotificationChange = (type) => {
    setUser({
      ...user,
      notifications: {
        ...user.notifications,
        [type]: !user.notifications[type],
      },
    });
  };

  const handleThemeChange = () => {
    setUser({
      ...user,
      theme: user.theme === 'light' ? 'dark' : 'light',
    });
  };

  const handleLanguageChange = (event) => {
    setUser({
      ...user,
      language: event.target.value,
    });
  };

  const renderContent = () => {
    switch (selectedSection) {
      case 'profile':
        return (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Avatar
                  src={user.avatar}
                  sx={{ width: 100, height: 100, margin: '0 auto' }}
                />
                <IconButton
                  color="primary"
                  component="label"
                  sx={{ mt: 1 }}
                >
                  <PhotoCameraIcon />
                  <input hidden accept="image/*" type="file" />
                </IconButton>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="name"
                  label="Ad Soyad"
                  fullWidth
                  defaultValue={user.name}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="email"
                  label="E-posta"
                  type="email"
                  fullWidth
                  defaultValue={user.email}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="phone"
                  label="Telefon"
                  fullWidth
                  defaultValue={user.phone}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Rol"
                  fullWidth
                  value={user.role}
                  disabled
                />
              </Grid>
            </Grid>
          </form>
        );

      case 'notifications':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Notification Preferences
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={user.notifications.email}
                  onChange={() => handleNotificationChange('email')}
                />
              }
              label="Email Notifications"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={user.notifications.push}
                  onChange={() => handleNotificationChange('push')}
                />
              }
              label="Push Notifications"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={user.notifications.sms}
                  onChange={() => handleNotificationChange('sms')}
                />
              }
              label="SMS Notifications"
            />
          </Box>
        );

      case 'appearance':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Appearance Settings
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={user.theme === 'dark'}
                  onChange={handleThemeChange}
                />
              }
              label="Dark Mode"
            />
            <TextField
              select
              label="Language"
              value={user.language}
              onChange={handleLanguageChange}
              fullWidth
              sx={{ mt: 2 }}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="tr">Turkish</MenuItem>
              <MenuItem value="de">German</MenuItem>
              <MenuItem value="fr">French</MenuItem>
            </TextField>
          </Box>
        );

      case 'security':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Security Settings
            </Typography>
            <TextField
              type="password"
              label="Current Password"
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              type="password"
              label="New Password"
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              type="password"
              label="Confirm New Password"
              fullWidth
            />
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <List>
              <ListItem
                button
                selected={selectedSection === 'profile'}
                onClick={() => handleOpen('profile')}
              >
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Profil" />
              </ListItem>
              <ListItem
                button
                selected={selectedSection === 'notifications'}
                onClick={() => handleOpen('notifications')}
              >
                <ListItemIcon>
                  <NotificationsIcon />
                </ListItemIcon>
                <ListItemText primary="Bildirimler" />
              </ListItem>
              <ListItem
                button
                selected={selectedSection === 'appearance'}
                onClick={() => handleOpen('appearance')}
              >
                <ListItemIcon>
                  <PaletteIcon />
                </ListItemIcon>
                <ListItemText primary="Görünüm" />
              </ListItem>
              <ListItem
                button
                selected={selectedSection === 'security'}
                onClick={() => handleOpen('security')}
              >
                <ListItemIcon>
                  <SecurityIcon />
                </ListItemIcon>
                <ListItemText primary="Güvenlik" />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={9}>
          <Paper sx={{ p: 2 }}>
            {renderContent()}
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleClose}
              >
                Değişiklikleri Kaydet
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedSection === 'profile' && 'Profil Ayarları'}
          {selectedSection === 'notifications' && 'Bildirim Ayarları'}
          {selectedSection === 'appearance' && 'Görünüm Ayarları'}
          {selectedSection === 'security' && 'Güvenlik Ayarları'}
        </DialogTitle>
        <DialogContent>
          {renderContent()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>İptal</Button>
          <Button variant="contained" onClick={handleClose}>
            Kaydet
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Settings; 