import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Briefcase, User, LogOut, LineChart, Users, Menu, X, ShieldCheck } from 'lucide-react'; // Ícones

const NavLink = ({ to, children, onClick, className = "" }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`text-gray-custom-200 hover:bg-brand-primary-dark hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${className}`}
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="text-gray-custom-700 hover:bg-gray-custom-100 hover:text-brand-primary block px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center"
  >
    {children}
  </Link>
);


const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false); // Fecha o menu mobile ao deslogar
    navigate('/login');
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  const scrollToMeusInvestimentos = () => {
    closeMobileMenu();
    navigate('/dashboard');
    setTimeout(() => {
        const el = document.getElementById('meus-investimentos-dashboard'); // ID único para a seção no Dashboard
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          // Fallback se o elemento não for encontrado imediatamente (pode acontecer em transições de rota)
          // Tenta novamente após um pequeno delay.
          setTimeout(() => {
            const elFallback = document.getElementById('meus-investimentos-dashboard');
            if (elFallback) elFallback.scrollIntoView({ behavior: 'smooth' });
          }, 300)
        }
    }, 100); // Pequeno delay para garantir que a página renderizou
  };


  return (
    <nav className="bg-brand-primary shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20"> {/* Altura aumentada para melhor visual */}
          {/* Logo */}
          <Link 
            to="/" 
            onClick={closeMobileMenu}
            className="text-2xl md:text-3xl font-bold text-white hover:text-brand-accent transition-colors flex items-center"
          >
            <ShieldCheck size={32} className="mr-2" /> {/* Ícone de escudo para a marca */}
            SuaPlataformaCrowd
          </Link>
          
          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            {isAuthenticated && user ? (
              <>
                <NavLink to="/dashboard">
                  <LineChart size={18} className="mr-2" /> Oportunidades
                </NavLink>
                {/* Link para rolar para a seção "Meus Investimentos" no Dashboard */}
                <button
                  onClick={scrollToMeusInvestimentos}
                  className="text-gray-custom-200 hover:bg-brand-primary-dark hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                >
                  <Briefcase size={18} className="mr-2" /> Meus Investimentos
                </button>
                <NavLink to="/mural-negocios">
                  <Users size={18} className="mr-2" /> Mural de Negócios
                </NavLink>
                
                <div className="relative group">
                  <button className="text-gray-custom-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                    <User size={18} className="mr-1" />
                    {user.nomeCompleto.split(' ')[0]}
                    <svg className="ml-1 h-4 w-4 fill-current text-gray-custom-400 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </button>
                  <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 transform scale-95 group-hover:scale-100 origin-top-right invisible group-hover:visible">
                    <Link to="/perfil" className="block px-4 py-2 text-sm text-gray-custom-700 hover:bg-gray-custom-100 hover:text-brand-primary">
                      Meu Perfil
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left block px-4 py-2 text-sm text-gray-custom-700 hover:bg-gray-custom-100 hover:text-brand-primary"
                    >
                      Sair
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <NavLink to="/login">Login</NavLink>
                <Link
                  to="/cadastro"
                  className="bg-brand-accent hover:bg-brand-accent-dark text-brand-primary-dark font-semibold px-4 py-2 rounded-md text-sm transition-colors"
                >
                  Cadastre-se
                </Link>
              </>
            )}
          </div>

          {/* Botão do Menu Mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="text-gray-custom-200 hover:text-white focus:outline-none focus:text-white p-2 rounded-md"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Abrir menu principal</span>
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white shadow-lg z-40 rounded-b-lg" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isAuthenticated && user ? (
              <>
                <p className="px-3 py-2 text-sm font-semibold text-brand-primary">Olá, {user.nomeCompleto.split(' ')[0]}!</p>
                <MobileNavLink to="/dashboard" onClick={closeMobileMenu}>
                  <LineChart size={18} className="mr-2" /> Oportunidades
                </MobileNavLink>
                <button
                  onClick={scrollToMeusInvestimentos} // Reutiliza a função de scroll
                  className="w-full text-left text-gray-custom-700 hover:bg-gray-custom-100 hover:text-brand-primary block px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center"
                >
                  <Briefcase size={18} className="mr-2" /> Meus Investimentos
                </button>
                <MobileNavLink to="/mural-negocios" onClick={closeMobileMenu}>
                  <Users size={18} className="mr-2" /> Mural de Negócios
                </MobileNavLink>
                <MobileNavLink to="/perfil" onClick={closeMobileMenu}>
                  <User size={18} className="mr-2" /> Meu Perfil
                </MobileNavLink>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-gray-custom-700 hover:bg-gray-custom-100 hover:text-brand-primary block px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center"
                >
                  <LogOut size={18} className="mr-2" /> Sair
                </button>
              </>
            ) : (
              <>
                <MobileNavLink to="/login" onClick={closeMobileMenu}>Login</MobileNavLink>
                <MobileNavLink to="/cadastro" onClick={closeMobileMenu}>Cadastre-se</MobileNavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
