import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Fade,
  CircularProgress,
} from '@mui/material';
import {
  Send as SendIcon,
  Close as CloseIcon,
  ChatBubble as ChatBubbleIcon,
} from '@mui/icons-material';

const ChatGPTBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Merhaba! Ben Canan Emlak'ın AI asistanıyım. Size nasıl yardımcı olabilirim?",
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString()
    },
    {
      text: "Aşağıdaki konularda size yardımcı olabilirim:\n• Satılık ve kiralık mülkler\n• Bölge analizleri ve fiyat tahminleri\n• Yatırım danışmanlığı\n• Emlak piyasası trendleri",
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getPropertyResponse = (location) => {
    const properties = {
      "kadıköy": "Kadıköy'de şu anda:\n• 3 adet 2+1 daire (600.000₺ - 900.000₺)\n• 2 adet 3+1 daire (900.000₺ - 1.200.000₺)\n• 1 adet villa (2.500.000₺)\nbulunmaktadır.",
      "üsküdar": "Üsküdar'da şu anda:\n• 4 adet 2+1 daire (550.000₺ - 850.000₺)\n• 3 adet 3+1 daire (850.000₺ - 1.100.000₺)\nbulunmaktadır.",
      "beşiktaş": "Beşiktaş'da şu anda:\n• 2 adet 1+1 daire (700.000₺ - 900.000₺)\n• 3 adet 2+1 daire (1.000.000₺ - 1.500.000₺)\n• 1 adet penthouse (3.500.000₺)\nbulunmaktadır."
    };
    return properties[location] || "Bu bölgede şu anda aktif ilanımız bulunmamaktadır. Size özel arama yapabilirim, bana bütçe ve ev tipi tercihlerinizi belirtir misiniz?";
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      text: input,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Hemen yanıt ver
    const userQuestion = input.toLowerCase().trim();
    let response = "";

    // Tarih ve saat sorguları
    if (userQuestion.includes("günlerden ne") || userQuestion.includes("bugün hangi gün") || userQuestion.includes("bugun gunlerden ne")) {
      const days = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
      const today = new Date().getDay();
      response = `Bugün ${days[today]}.`;
    } 
    else if (userQuestion.includes("saat kaç") || userQuestion.includes("saat")) {
      response = `Şu an saat ${new Date().toLocaleTimeString()}.`;
    }
    // Emlak sorguları
    else if (userQuestion.includes("kadıköy")) {
      response = getPropertyResponse("kadıköy");
    }
    else if (userQuestion.includes("üsküdar")) {
      response = getPropertyResponse("üsküdar");
    }
    else if (userQuestion.includes("beşiktaş")) {
      response = getPropertyResponse("beşiktaş");
    }
    // Fiyat sorguları
    else if (userQuestion.includes("fiyat") || userQuestion.includes("tl") || userQuestion.includes("₺")) {
      response = "Size özel fiyat analizi yapabilirim. Lütfen aşağıdaki bilgileri paylaşır mısınız?\n• İlgilendiğiniz bölge\n• Ev tipi (2+1, 3+1 vb.)\n• Bütçe aralığınız";
    }
    // Yatırım sorguları
    else if (userQuestion.includes("yatırım") || userQuestion.includes("kazanç")) {
      response = "Yatırım danışmanlığı hizmetimiz kapsamında:\n• Bölgesel değer artış analizleri\n• Kira getiri hesaplamaları\n• Piyasa trend raporları\nsunabiliriz. Hangi konuda detaylı bilgi istersiniz?";
    }
    // Genel emlak sorguları
    else if (userQuestion.includes("emlak") || userQuestion.includes("ev") || userQuestion.includes("daire") || userQuestion.includes("konut")) {
      response = "Size emlak konusunda nasıl yardımcı olabilirim?\n• Satılık/kiralık mülk arama\n• Bölge analizi ve fiyat tahmini\n• Yatırım danışmanlığı\n• Randevu oluşturma";
    }
    // Selamlaşma
    else if (userQuestion.includes("merhaba") || userQuestion.includes("selam")) {
      response = "Merhaba! Size nasıl yardımcı olabilirim?\n• Bölge ve fiyat bilgisi için bölge adı yazabilirsiniz\n• Yatırım analizi için bütçenizi belirtebilirsiniz\n• Randevu için müsait zamanınızı paylaşabilirsiniz";
    }
    // Bilinmeyen sorgular
    else {
      response = "Özür dilerim, tam olarak anlayamadım. Size daha iyi yardımcı olabilmem için lütfen:\n• Hangi bölgeyle ilgileniyorsunuz?\n• Ne tür bir mülk arıyorsunuz?\n• Bütçe aralığınız nedir?\nBu bilgileri paylaşır mısınız?";
    }

    const aiMessage = {
      text: response,
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, aiMessage]);
    setIsTyping(false);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <IconButton
        onClick={() => setIsOpen(!isOpen)}
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          backgroundColor: 'primary.main',
          color: 'white',
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
          width: 60,
          height: 60,
          boxShadow: 3,
          zIndex: 1000,
        }}
      >
        {isOpen ? <CloseIcon /> : <ChatBubbleIcon />}
      </IconButton>

      {/* Chat Window */}
      <Fade in={isOpen}>
        <Paper
          elevation={3}
          sx={{
            position: 'fixed',
            bottom: 90,
            right: 20,
            width: 350,
            height: 500,
            display: isOpen ? 'flex' : 'none',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 1000,
            borderRadius: 2,
          }}
        >
          {/* Header */}
          <Box sx={{ 
            p: 2, 
            bgcolor: 'primary.main', 
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            <Avatar src="/ai-avatar.png" sx={{ width: 32, height: 32 }} />
            <Typography variant="h6">Emlak AI Asistan</Typography>
          </Box>

          {/* Messages */}
          <Box sx={{
            flex: 1,
            overflowY: 'auto',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            bgcolor: '#f5f5f5',
          }}>
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '80%',
                }}
              >
                <Paper
                  elevation={1}
                  sx={{
                    p: 1.5,
                    bgcolor: msg.sender === 'user' ? 'primary.main' : 'white',
                    color: msg.sender === 'user' ? 'white' : 'text.primary',
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="body1">{msg.text}</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.7 }}>
                    {msg.timestamp}
                  </Typography>
                </Paper>
              </Box>
            ))}
            {isTyping && (
              <Box sx={{ display: 'flex', gap: 0.5, p: 1 }}>
                <div className="typing-dot" />
                <div className="typing-dot" />
                <div className="typing-dot" />
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>

          {/* Input */}
          <Box sx={{ p: 2, bgcolor: 'white', borderTop: 1, borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Mesajınızı yazın..."
                size="small"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />
              <IconButton 
                color="primary" 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
              >
                {isTyping ? <CircularProgress size={24} /> : <SendIcon />}
              </IconButton>
            </Box>
          </Box>
        </Paper>
      </Fade>
    </>
  );
};

export default ChatGPTBox; 