import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Lock, Mail, ShieldCheck } from 'lucide-react'; // Ícones

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Para feedback de carregamento
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simula uma pequena demora de API
    await new Promise(resolve => setTimeout(resolve, 500));

    if (login(email, password)) {
      navigate('/dashboard');
    } else {
      setError('E-mail ou senha inválidos. (Use: joao.investidor@email.com / senha123)');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-custom-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo e Título */}
        <div className="text-center">
          <Link to="/" className="inline-block mb-6">
            <ShieldCheck size={60} className="text-brand-primary" />
          </Link>
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand-primary">
            SuaPlataformaCrowd
          </h1>
          <h2 className="mt-3 text-xl md:text-2xl font-semibold text-gray-custom-800">
            Acesse sua conta
          </h2>
          <p className="mt-2 text-sm text-gray-custom-600">
            Ainda não tem uma conta?{' '}
            <Link to="/cadastro" className="font-medium text-brand-primary hover:text-brand-primary-dark underline">
              Crie uma agora
            </Link>
          </p>
        </div>

        {/* Formulário */}
        <div className="bg-white p-8 md:p-10 rounded-xl shadow-card">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-100 border-l-4 border-danger text-danger p-4 rounded-md" role="alert">
                <p className="font-bold">Erro de Autenticação</p>
                <p className="text-sm">{error}</p>
              </div>
            )}
            
            {/* Campo de Email */}
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-custom-700 mb-1">
                Endereço de e-mail
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-custom-400" aria-hidden="true" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-3 pl-10 border border-gray-custom-300 placeholder-gray-custom-500 text-gray-custom-900 rounded-md focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Campo de Senha */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-custom-700 mb-1">
                Senha
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-custom-400" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-3 pl-10 border border-gray-custom-300 placeholder-gray-custom-500 text-gray-custom-900 rounded-md focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-brand-primary focus:ring-brand-secondary border-gray-custom-300 rounded"
                  disabled={isLoading}
                />
                <label htmlFor="remember-me" className="ml-2 block text-gray-custom-900">
                  Lembrar-me
                </label>
              </div>
              <a href="#" className="font-medium text-brand-primary hover:text-brand-primary-dark underline">
                Esqueceu sua senha?
              </a>
            </div>

            {/* Botão de Login */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white 
                            ${isLoading ? 'bg-gray-custom-400 cursor-not-allowed' : 'bg-brand-primary hover:bg-brand-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary'} 
                            transition-colors duration-150 ease-in-out`}
              >
                {isLoading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : "Entrar"}
              </button>
            </div>
          </form>

          {/* Informações para Demo */}
          <div className="mt-6 pt-6 border-t border-gray-custom-200">
            <p className="text-center text-xs text-gray-custom-500 leading-relaxed">
              <strong>Para demonstração, use:</strong><br />
              E-mail: <code className="bg-gray-custom-200 p-1 rounded">joao.investidor@email.com</code><br />
              Senha: <code className="bg-gray-custom-200 p-1 rounded">senha123</code>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;

