import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import './i18n';

// Ẩn cảnh báo ResizeObserver loop completed with undelivered notifications
window.addEventListener('error', (err) => {
  if (
    err.message &&
    err.message.includes('ResizeObserver loop completed with undelivered notifications')
  ) {
    err.preventDefault && err.preventDefault();
    return false;
  }
  console.error(err);
});

window.onerror = function (message) {
  if (
    typeof message === 'string' &&
    message.includes('ResizeObserver loop completed with undelivered notifications')
  ) {
    return true;
  }
};

window.addEventListener('unhandledrejection', (event) => {
  if (
    event.reason &&
    event.reason.message &&
    event.reason.message.includes('ResizeObserver loop completed with undelivered notifications')
  ) {
    event.preventDefault();
  }
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
); 