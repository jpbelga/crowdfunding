import React, { useContext } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import LoginPage from './pages/LoginPage';
import CadastroPage from './pages/CadastroPage';
import DashboardPage from './pages/DashboardPage';
import OfertaDetalhePage from './pages/OfertaDetalhePage';
import MeuInvestimentoDetalhePage from './pages/MeuInvestimentoDetalhePage';
import PerfilInvestidorPage from './pages/PerfilInvestidorPage';
import MuralNegociosPage from './pages/MuralNegociosPage';
import PagamentoJurosPage from './pages/PagamentoJurosPage';
import TermosPage from './pages/TermosPage'; // Página para Termos (exemplo)
import PrivacidadePage from './pages/PrivacidadePage'; // Página para Privacidade (exemplo)
import { AuthContext } from './contexts/AuthContext';
import ScrollToTop from './components/ScrollToTop'; // Componente para rolar para o topo

// Componente para rotas protegidas
function ProtectedRoute() {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    // Pode mostrar um spinner de carregamento global aqui
    return <div className="flex justify-center items-center h-screen text-brand-primary">Carregando autenticação...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  // Outlet renderiza o componente filho da rota protegida
  return <DefaultLayout><Outlet /></DefaultLayout>; 
}

// Componente para rotas públicas (login, cadastro)
function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useContext(AuthContext);
  if (loading) {
    return <div className="flex justify-center items-center h-screen text-brand-primary">Carregando...</div>;
  }
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

function App() {
  return (
    <>
      <ScrollToTop /> {/* Garante que a navegação role para o topo da página */}
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/cadastro" element={<PublicRoute><CadastroPage /></PublicRoute>} />
        <Route path="/termos" element={<DefaultLayout><TermosPage /></DefaultLayout>} /> {/* Exemplo de página estática */}
        <Route path="/privacidade" element={<DefaultLayout><PrivacidadePage /></DefaultLayout>} /> {/* Exemplo de página estática */}


        {/* Rotas Protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/oferta/:id" element={<OfertaDetalhePage />} />
          <Route path="/meu-investimento/:id" element={<MeuInvestimentoDetalhePage />} />
          <Route path="/pagamento-juros/:investimentoId" element={<PagamentoJurosPage />} />
          <Route path="/perfil" element={<PerfilInvestidorPage />} />
          <Route path="/mural-negocios" element={<MuralNegociosPage />} />
        </Route>
        
        {/* Rota de fallback para URLs não encontradas */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
