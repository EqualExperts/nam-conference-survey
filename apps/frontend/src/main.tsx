import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { theme } from './theme/theme';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './theme/dark-mode.css';

function AppWrapper() {
  const { resolvedTheme } = useTheme();

  return (
    <MantineProvider theme={theme} forceColorScheme={resolvedTheme}>
      <Notifications position="top-right" />
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </MantineProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AppWrapper />
    </ThemeProvider>
  </React.StrictMode>
);