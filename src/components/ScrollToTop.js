import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Componente para rolar a página para o topo sempre que a rota mudar.
// Isso é útil em SPAs (Single Page Applications) onde o React Router
// não faz isso por padrão.
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // Executa o efeito sempre que o 'pathname' (URL) mudar

  return null; // Este componente não renderiza nada visualmente
}

export default ScrollToTop;

