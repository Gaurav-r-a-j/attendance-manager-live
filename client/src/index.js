import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeContextProvider } from './context/ThemProvider';
import { UserProvider } from './context/UserContext';
import NotificationProvider from './context/NotificationContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NotificationProvider>
      <UserProvider>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </UserProvider>
    </NotificationProvider>
  </React.StrictMode>
);
