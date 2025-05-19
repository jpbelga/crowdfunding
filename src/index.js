import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Importa os estilos configurados com Tailwind
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; // Criaremos este contexto

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* Provedor de autenticação envolvendo o App */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
