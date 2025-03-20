import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

console.log('index.js yükleniyor...');

// React root element kontrolü
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Root element bulunamadı!');
} else {
  console.log('Root element bulundu, React mount ediliyor');
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);

// Performans ölçümleri
reportWebVitals(console.log);

window.addEventListener('error', function(e) {
  console.error('Global hata yakalandı:', e.message);
});
