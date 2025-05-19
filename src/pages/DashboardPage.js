import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CardOferta from '../components/CardOferta';
import { mockOfertas } from '../data/mockData';
import { AuthContext } from '../contexts/AuthContext'; // Para pegar dados do usuário
import { Link } from 'react-router-dom';
import { TrendingUp, Briefcase, DollarSign, CheckCircle, AlertTriangle, Clock, ExternalLink } from 'lucide-react';

const DashboardPage = () => {
  const { user } = useContext(AuthContext); // Pega o usuário logado do contexto
  const location = useLocation(); // Para lidar com o scroll para a âncora

  // Simula os investimentos do usuário. Em um app real, viria do 'user.investimentos'
  const investimentosDoUsuario = user?.investimentos || [];

  // Efeito para rolar para a seção "Meus Investimentos" se a URL tiver a âncora
  useEffect(() => {
    if (location.hash === '#meus-investimentos-dashboard') {
      const el = document.getElementById('meus-investimentos-dashboard');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className="space-y-10 md:space-y-12">
      {/* Seção de Boas-vindas e Resumo Rápido */}
      {user && (
        <div className="bg-gradient-to-r from-brand-primary to-teal-600 p-6 md:p-8 rounded-xl shadow-lg text-white">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Bem-vindo(a) de volta, {user.nomeCompleto.split(' ')[0]}!</h1>
          <p className="text-teal-100 mb-4 text-sm md:text-base">Pronto para explorar novas oportunidades ou acompanhar seus investimentos?</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-white/20 p-3 rounded-lg">
              <p className="font-semibold">Investimentos Ativos:</p>
              <p className="text-xl font-bold">{investimentosDoUsuario.length}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <p className="font-semibold">Valor Total Investido (Simulado):</p>
              <p className="text-xl font-bold">R$ {investimentosDoUsuario.reduce((acc, inv) => acc + inv.valorInvestido, 0).toLocaleString('pt-BR')}</p>
            </div>
          </div>
        </div>
      )}

      {/* Seção de Oportunidades */}
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-custom-900 flex items-center">
            <TrendingUp size={28} className="mr-3 text-brand-primary" />
            Oportunidades em Destaque
            </h2>
            {/* <Link to="/oportunidades/todas" className="text-sm text-brand-primary hover:underline mt-2 sm:mt-0">Ver todas</Link> */}
        </div>
        <p className="text-gray-custom-600 mb-6 text-sm md:text-base">Explore as últimas ofertas de crowdfunding disponíveis em nossa plataforma.</p>
        {mockOfertas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {mockOfertas.map(oferta => (
              <CardOferta key={oferta.id} oferta={oferta} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-white rounded-lg shadow-card">
            <AlertTriangle size={48} className="mx-auto text-gray-custom-400 mb-4" />
            <p className="text-gray-custom-600">Nenhuma oportunidade de investimento disponível no momento.</p>
            <p className="text-sm text-gray-custom-500 mt-2">Volte em breve ou ajuste seus filtros de busca.</p>
          </div>
        )}
      </div>

      {/* Seção Meus Investimentos */}
      {investimentosDoUsuario.length > 0 && (
        <div id="meus-investimentos-dashboard" className="pt-6"> {/* Adicionado pt-6 para dar espaço ao scroll */}
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-custom-900 mb-2 flex items-center">
            <Briefcase size={28} className="mr-3 text-brand-primary" />
            Meus Investimentos
          </h2>
          <p className="text-gray-custom-600 mb-6 text-sm md:text-base">Acompanhe o desempenho dos seus investimentos ativos.</p>
          <div className="space-y-6">
            {investimentosDoUsuario.map(investimento => {
              const proximoPagamentoJuros = investimento.pagamentosJuros.find(p => p.status === 'Disponível para Saque' || p.status === 'Pendente');
              const eventoPrincipalPendente = investimento.pagamentoPrincipal.status === 'Pendente';

              return (
                <div key={investimento.id} className="bg-white p-5 md:p-6 rounded-xl shadow-card hover:shadow-card-hover transition-shadow duration-300">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-brand-primary hover:text-brand-primary-dark transition-colors">
                        <Link to={`/meu-investimento/${investimento.id}`}>{investimento.nomeEmpresa}</Link>
                      </h3>
                      <span className="text-xs bg-brand-secondary text-brand-primary-dark font-semibold px-2 py-0.5 rounded-full inline-block mt-1">{investimento.token}</span>
                    </div>
                    <span className={`mt-2 sm:mt-0 text-xs md:text-sm font-medium px-3 py-1 rounded-full whitespace-nowrap ${
                      investimento.status === 'Em rendimento' ? 'bg-success/10 text-success' : 
                      investimento.status === 'Finalizado' ? 'bg-info/10 text-info' : 
                      'bg-warning/10 text-warning' // Exemplo para outros status
                    }`}>
                      {investimento.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-3 mb-4 text-xs md:text-sm">
                    <div>
                      <p className="text-gray-custom-500">Valor Investido</p>
                      <p className="font-semibold text-gray-custom-800">R$ {investimento.valorInvestido.toLocaleString('pt-BR')}</p>
                    </div>
                    <div>
                      <p className="text-gray-custom-500">Data</p>
                      <p className="font-semibold text-gray-custom-800">{new Date(investimento.dataInvestimento + 'T00:00:00').toLocaleDateString('pt-BR')}</p> {/* Adiciona T00:00:00 para evitar problemas de fuso no display */}
                    </div>
                    <div>
                      <p className="text-gray-custom-500">Retorno</p>
                      <p className="font-semibold text-gray-custom-800">{investimento.taxaRetornoContratada}</p>
                    </div>
                     <div className="col-span-2 sm:col-span-1"> {/* Ajuste para responsividade */}
                      <p className="text-gray-custom-500">Próximo Evento</p>
                      {proximoPagamentoJuros ? (
                         <p className="font-semibold text-gray-custom-800 flex items-center">
                           <DollarSign size={14} className="mr-1 text-green-500"/> Juros ({proximoPagamentoJuros.referencia})
                         </p>
                      ) : eventoPrincipalPendente ? (
                         <p className="font-semibold text-gray-custom-800 flex items-center">
                           <CheckCircle size={14} className="mr-1 text-blue-500"/> Principal ({new Date(investimento.pagamentoPrincipal.dataPagamentoPrevista  + 'T00:00:00').toLocaleDateString('pt-BR')})
                         </p>
                      ) : (
                        <p className="font-semibold text-gray-custom-800">Finalizado</p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mt-auto">
                    <Link
                      to={`/meu-investimento/${investimento.id}`}
                      className="flex-1 text-center bg-brand-primary hover:bg-brand-primary-dark text-white font-medium py-2 px-4 rounded-md text-sm transition-colors duration-150"
                    >
                      Ver Detalhes
                    </Link>
                    <Link
                      to={`/pagamento-juros/${investimento.id}`} // Ajustar para ID do investimento
                      className="flex-1 text-center bg-brand-secondary hover:bg-teal-300 text-brand-primary-dark font-medium py-2 px-4 rounded-md text-sm transition-colors duration-150"
                    >
                      Histórico de Pagamentos
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
       {investimentosDoUsuario.length === 0 && (
         <div className="text-center py-10 bg-white rounded-lg shadow-card mt-8">
            <Briefcase size={48} className="mx-auto text-gray-custom-400 mb-4" />
            <p className="text-gray-custom-600">Você ainda não realizou nenhum investimento.</p>
            <p className="text-sm text-gray-custom-500 mt-2">Explore as <Link to="/dashboard" className="text-brand-primary hover:underline">oportunidades disponíveis</Link> e comece a construir seu portfólio!</p>
          </div>
       )}
    </div>
  );
};

export default DashboardPage;

