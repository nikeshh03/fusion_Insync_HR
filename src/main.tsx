import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './lib/auth/AuthContext';
import { ThemeProvider } from './lib/theme/ThemeContext';
import { Analytics } from "@vercel/analytics/react"
import './index.css';

const container = document.getElementById('root');
if (!container) throw new Error('Root element not found');
const root = createRoot(container);

root.render(
  
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
      <Analytics/>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);