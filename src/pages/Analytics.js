import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Tabs,
  Tab,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Button,
  Divider,
} from '@mui/material';
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
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TimelineIcon from '@mui/icons-material/Timeline';
import GroupIcon from '@mui/icons-material/Group';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ShowChartIcon from '@mui/icons-material/ShowChart';

// Veri setleri
const marketPredictions = [
  { month: 'Oca', actual: 100, predicted: 105 },
  { month: 'Şub', actual: 120, predicted: 125 },
  { month: 'Mar', actual: 150, predicted: 160 },
  { month: 'Nis', actual: 180, predicted: 185 },
  { month: 'May', actual: 200, predicted: 210 },
  { month: 'Haz', actual: 220, predicted: 235 },
];

const customerTrends = [
  { age: '25-35', preference: 'Daire', percentage: 40 },
  { age: '35-45', preference: 'Villa', percentage: 30 },
  { age: '45-55', preference: 'Müstakil', percentage: 20 },
  { age: '55+', preference: 'Yazlık', percentage: 10 },
];

const portfolioAnalysis = [
  { type: 'Düşük Risk', value: 30, return: 8 },
  { type: 'Orta Risk', value: 45, return: 12 },
  { type: 'Yüksek Risk', value: 25, return: 18 },
];

const areaPerformance = [
  { area: 'Kadıköy', growth: 15, potential: 'Yüksek', score: 85 },
  { area: 'Beşiktaş', growth: 12, potential: 'Yüksek', score: 82 },
  { area: 'Üsküdar', growth: 10, potential: 'Orta', score: 75 },
  { area: 'Maltepe', growth: 8, potential: 'Orta', score: 70 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

function Analytics() {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Yapay Zeka Öngörüleri
      </Typography>

      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        sx={{ mb: 3 }}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab icon={<ShowChartIcon />} label="Pazar Tahmini" />
        <Tab icon={<AssessmentIcon />} label="Portföy Analizi" />
        <Tab icon={<GroupIcon />} label="Müşteri Eğilimleri" />
        <Tab icon={<HomeWorkIcon />} label="Bölge Performansı" />
      </Tabs>

      {/* Pazar Tahmini */}
      {currentTab === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                6 Aylık Pazar Tahmin Analizi
              </Typography>
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={marketPredictions}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="actual"
                      stroke="#8884d8"
                      name="Gerçekleşen"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="predicted"
                      stroke="#82ca9d"
                      name="Tahmin"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Pazar Öngörüleri
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <TrendingUpIcon color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Fiyat Artış Tahmini"
                    secondary="Önümüzdeki 6 ay için %8-12 artış"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <TimelineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Talep Trendi"
                    secondary="Yükselen trend (3 ay projeksiyon)"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <TrendingDownIcon color="error" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Risk Faktörleri"
                    secondary="Düşük-Orta seviye pazar riski"
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Portföy Analizi */}
      {currentTab === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Portföy Risk Dağılımı
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={portfolioAnalysis}
                      dataKey="value"
                      nameKey="type"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {portfolioAnalysis.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Yatırım Getiri Analizi
              </Typography>
              <List>
                {portfolioAnalysis.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={item.type}
                      secondary={`Beklenen Getiri: %${item.return}`}
                    />
                    <LinearProgress
                      variant="determinate"
                      value={item.value}
                      sx={{ width: '100px', ml: 2 }}
                    />
                    <Chip
                      label={`${item.value}%`}
                      size="small"
                      sx={{ ml: 2 }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Müşteri Eğilimleri */}
      {currentTab === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Yaş Gruplarına Göre Tercihler
              </Typography>
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={customerTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="age" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="percentage"
                      fill="#8884d8"
                      name="Tercih Oranı (%)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Müşteri Davranış Analizi
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="En Çok Aranan Özellikler"
                    secondary="1. Merkezi Konum
                              2. Otopark
                              3. Güvenlik
                              4. Site İçi"
                  />
                </ListItem>
                <Divider sx={{ my: 2 }} />
                <ListItem>
                  <ListItemText
                    primary="Popüler Ödeme Yöntemleri"
                    secondary="1. Banka Kredisi (%60)
                              2. Peşin Ödeme (%25)
                              3. Taksitli Ödeme (%15)"
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Bölge Performansı */}
      {currentTab === 3 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Bölgesel Yatırım Potansiyeli
              </Typography>
              <Box sx={{ mt: 2 }}>
                {areaPerformance.map((area, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="subtitle1">{area.area}</Typography>
                      <Chip
                        label={`Büyüme: %${area.growth}`}
                        color={area.growth > 10 ? 'success' : 'primary'}
                        size="small"
                      />
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={area.score}
                      sx={{ height: 10, borderRadius: 5 }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                      <Typography variant="caption">Potansiyel: {area.potential}</Typography>
                      <Typography variant="caption">Skor: {area.score}/100</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default Analytics; 