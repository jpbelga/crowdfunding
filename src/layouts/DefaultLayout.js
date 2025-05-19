import React from 'react';
import Navbar from '../components/Navbar'; // Criaremos este componente
import Footer from '../components/Footer'; // Criaremos este componente

const DefaultLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-custom-50">
      {/* Navbar - Fica no topo de todas as páginas que usam este layout */}
      <Navbar />

      {/* Conteúdo principal da página */}
      {/* O 'flex-grow' faz com que este elemento ocupe o espaço restante, empurrando o footer para baixo */}
      <main className="flex-grow container mx-auto px-4 py-6 md:py-8">
        {children}
      </main>

      {/* Footer - Fica na parte inferior */}
      <Footer />
    </div>
  );
};

export default DefaultLayout;
