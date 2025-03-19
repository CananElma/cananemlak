import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
  MenuItem,
  Chip,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Tooltip,
  Fade,
  Zoom,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Send as SendIcon,
  Reply as ReplyIcon,
  Email as EmailIcon,
  MarkEmailRead as MarkEmailReadIcon,
  MarkEmailUnread as MarkEmailUnreadIcon,
} from '@mui/icons-material';

const sampleMessages = [
  {
    id: 1,
    customerId: 1,
    customerName: 'Ahmet Yılmaz',
    customerAvatar: 'https://i.pravatar.cc/150?img=1',
    subject: 'Villa Hakkında Bilgi',
    content: 'Antalya\'daki villa ile ilgili daha detaylı bilgi alabilir miyim? Özellikle fiyat ve ödeme koşulları hakkında bilgi istiyorum.',
    date: '2024-03-18',
    status: 'Okunmadı',
    replies: [],
  },
  {
    id: 2,
    customerId: 2,
    customerName: 'Ayşe Demir',
    customerAvatar: 'https://i.pravatar.cc/150?img=2',
    subject: 'Görüntüleme Randevusu',
    content: 'İstanbul\'daki daire için görüntüleme randevusu almak istiyorum. Müsait olduğunuz bir zamanı paylaşabilir misiniz?',
    date: '2024-03-17',
    status: 'Okundu',
    replies: [
      {
        id: 1,
        content: 'Merhaba, yarın saat 14:00\'te müsaitim. Size uygun mu?',
        date: '2024-03-17',
        sender: 'agent',
      },
      {
        id: 2,
        content: 'Evet, çok uygun. Teşekkür ederim.',
        date: '2024-03-17',
        sender: 'customer',
      },
    ],
  },
];

function Messages() {
  const [messages, setMessages] = useState(sampleMessages);
  const [open, setOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [tabValue, setTabValue] = useState(0);

  const handleOpen = (message = null) => {
    setSelectedMessage(message);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedMessage(null);
    setOpen(false);
  };

  const handleReplyOpen = (message) => {
    setSelectedMessage(message);
    setReplyOpen(true);
  };

  const handleReplyClose = () => {
    setSelectedMessage(null);
    setReplyOpen(false);
    setReplyContent('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newMessage = {
      id: selectedMessage ? selectedMessage.id : messages.length + 1,
      customerId: formData.get('customerId'),
      customerName: formData.get('customerName'),
      subject: formData.get('subject'),
      content: formData.get('content'),
      date: new Date().toLocaleString(),
      status: 'Unread',
      replies: selectedMessage?.replies || [],
    };

    if (selectedMessage) {
      setMessages(messages.map(m => m.id === selectedMessage.id ? newMessage : m));
    } else {
      setMessages([...messages, newMessage]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setMessages(messages.filter(m => m.id !== id));
  };

  const handleReply = () => {
    if (!selectedMessage || !replyContent.trim()) return;

    const newReply = {
      id: selectedMessage.replies.length + 1,
      content: replyContent,
      date: new Date().toLocaleString(),
      sender: 'Agent',
    };

    setMessages(messages.map(m =>
      m.id === selectedMessage.id
        ? { ...m, replies: [...m.replies, newReply], status: 'Read' }
        : m
    ));

    handleReplyClose();
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getFilteredMessages = () => {
    switch (tabValue) {
      case 1:
        return messages.filter(message => message.status === 'Okunmadı');
      case 2:
        return messages.filter(message => message.status === 'Okundu');
      default:
        return messages;
    }
  };

  const getStatusColor = (status) => {
    return status === 'Okunmadı' ? 'error' : 'success';
  };

  const getStatusIcon = (status) => {
    return status === 'Okunmadı' ? <MarkEmailUnreadIcon /> : <MarkEmailReadIcon />;
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
            Mesajlar
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
            Yeni Mesaj
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
        <Tab label="Okunmadı" />
        <Tab label="Okundu" />
      </Tabs>

      <Grid container spacing={3}>
        {getFilteredMessages().map((message, index) => (
          <Grid item xs={12} key={message.id}>
            <Zoom in timeout={600 + index * 200}>
              <Card
                sx={{
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                  },
                  borderRadius: 3,
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <Avatar
                      src={message.customerAvatar}
                      sx={{ width: 48, height: 48, mr: 2 }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {message.subject}
                        </Typography>
                        <Chip
                          icon={getStatusIcon(message.status)}
                          label={message.status}
                          color={getStatusColor(message.status)}
                          size="small"
                          sx={{ borderRadius: 1 }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Typography variant="subtitle2" sx={{ mr: 2 }}>
                          {message.customerName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {message.date}
                        </Typography>
                      </Box>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        {message.content}
                      </Typography>
                    </Box>
                  </Box>

                  {message.replies.length > 0 && (
                    <Box sx={{ pl: 7 }}>
                      {message.replies.map((reply) => (
                        <Box
                          key={reply.id}
                          sx={{
                            mb: 2,
                            p: 2,
                            bgcolor: reply.sender === 'agent' ? 'primary.light' : 'grey.100',
                            borderRadius: 2,
                            color: reply.sender === 'agent' ? 'white' : 'inherit',
                          }}
                        >
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            {reply.content}
                          </Typography>
                          <Typography variant="caption" sx={{ opacity: 0.8 }}>
                            {reply.date}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  )}

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Tooltip title="Yanıtla">
                      <IconButton
                        color="primary"
                        sx={{
                          transition: 'transform 0.2s ease-in-out',
                          '&:hover': { transform: 'scale(1.1)' },
                        }}
                      >
                        <ReplyIcon />
                      </IconButton>
                    </Tooltip>
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
                </CardContent>
              </Card>
            </Zoom>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedMessage ? 'Edit Message' : 'New Message'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="customerName"
                  label="Customer Name"
                  fullWidth
                  defaultValue={selectedMessage?.customerName}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="subject"
                  label="Subject"
                  fullWidth
                  defaultValue={selectedMessage?.subject}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="content"
                  label="Message"
                  multiline
                  rows={4}
                  fullWidth
                  defaultValue={selectedMessage?.content}
                  required
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              {selectedMessage ? 'Update' : 'Send'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog open={replyOpen} onClose={handleReplyClose} maxWidth="sm" fullWidth>
        <DialogTitle>Reply to Message</DialogTitle>
        <DialogContent>
          <TextField
            multiline
            rows={4}
            fullWidth
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Type your reply..."
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReplyClose}>Cancel</Button>
          <Button
            variant="contained"
            startIcon={<SendIcon />}
            onClick={handleReply}
            disabled={!replyContent.trim()}
          >
            Send Reply
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Messages; 