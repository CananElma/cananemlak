import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
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
} from 'recharts';

const monthlySales = [
  { month: 'Oca', sales: 1200000, rentals: 450000 },
  { month: 'Şub', sales: 1500000, rentals: 520000 },
  { month: 'Mar', sales: 1800000, rentals: 480000 },
  { month: 'Nis', sales: 2100000, rentals: 550000 },
  { month: 'May', sales: 2400000, rentals: 600000 },
  { month: 'Haz', sales: 2800000, rentals: 650000 },
];

const propertyTypes = [
  { name: 'Evler', value: 35 },
  { name: 'Daireler', value: 30 },
  { name: 'Villalar', value: 20 },
  { name: 'Arsalar', value: 10 },
  { name: 'Ticari', value: 5 },
];

const popularLocations = [
  { location: 'Antalya', properties: 45 },
  { location: 'İstanbul', properties: 38 },
  { location: 'İzmir', properties: 25 },
  { location: 'Bursa', properties: 18 },
  { location: 'Ankara', properties: 15 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

function Analytics() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Analiz Paneli
      </Typography>

      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Toplam Mülk
              </Typography>
              <Typography variant="h4">141</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Aktif Müşteriler
              </Typography>
              <Typography variant="h4">156</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Aylık Satışlar
              </Typography>
              <Typography variant="h4">₺2.8M</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Dönüşüm Oranı
              </Typography>
              <Typography variant="h4">%68</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Sales Trend Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Aylık Satış Trendi
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlySales}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#8884d8"
                    name="Satışlar"
                  />
                  <Line
                    type="monotone"
                    dataKey="rentals"
                    stroke="#82ca9d"
                    name="Kiralamalar"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Property Types Distribution */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Mülk Tipi Dağılımı
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={propertyTypes}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {propertyTypes.map((entry, index) => (
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

        {/* Popular Locations */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Popüler Lokasyonlar
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={popularLocations}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="location" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="properties"
                    fill="#8884d8"
                    name="Mülkler"
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Analytics; 