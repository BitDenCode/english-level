import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Инициализация Telegram WebApp, если доступен
declare global {
  interface Window {
    Telegram?: {
      WebApp?: any;
    };
  }
}

const tg = window.Telegram?.WebApp;

if (tg) {
  tg.ready(); // Сообщаем Telegram, что WebApp загружен
} else {
  console.warn('❗ Telegram.WebApp не доступен. Приложение запущено вне Telegram.');
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
