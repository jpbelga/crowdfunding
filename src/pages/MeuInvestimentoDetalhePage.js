import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { mockOfertas } from '../data/mockData'; // Para pegar detalhes da oferta original
import { ChevronLeft, CalendarCheck, TrendingUp, DollarSign, FileText, Percent, Hash, Landmark, Info, CheckCircle, XCircle, Clock, CalendarDays, ExternalLink } from 'lucide-react';

// Componente para exibir um item de informação
const DetailItem = ({ label, value, icon: Icon, className = "" }) => (
  <div className={`py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 ${className}`}>
    <dt className="text-sm font-medium text-gray-custom-500 flex items-center">
      {Icon && <Icon size={16} className="mr-2 text-brand-primary flex-shrink-0" />}
      {label}
    </dt>
    <dd className="mt-1 text-sm text-gray-custom-900 sm:mt-0 sm:col-span-2 font-semibold">
      {value || '-'}
    </dd>
  </div>
);

// Componente para a linha da tabela de pagamentos
const PaymentRow = ({ payment, type }) => {
  let statusColor = 'text-gray-custom-500';
  let statusIcon = <Clock size={14} className="mr-1.5" />;
  let dateLabel = "Data Prevista";
  let dateValue = payment.dataPagamentoPrevista ? new Date(payment.dataPagamentoPrevista + 'T00:00:00').toLocaleDateString('pt-BR') : '-';
  let valueLabel = type === "Juros" ? "Valor Estimado" : "Valor Principal";
  let valueData = payment.valorEstimado || payment.valorPago;

  if (payment.status === 'Pago') {
    statusColor = 'text-success';
    statusIcon = <CheckCircle size={14} className="mr-1.5" />;
    dateLabel = "Data Pagamento";
    dateValue = payment.dataPagamentoEfetiva ? new Date(payment.dataPagamentoEfetiva + 'T00:00:00').toLocaleDateString('pt-BR') : '-';
    valueLabel = "Valor Pago";
  } else if (payment.status === 'Disponível para Saque') {
    statusColor = 'text-blue-500';
    statusIcon = <DollarSign size={14} className="mr-1.5" />;
  } else if (payment.status === 'Atrasado' || payment.status === 'Falhou') { // Exemplo de outros status
    statusColor = 'text-danger';
    statusIcon = <XCircle size={14} className="mr-1.5" />;
  }


  return (
    <tr className="border-b border-gray-custom-200 hover:bg-gray-custom-50 transition-colors">
      <td className="px-4 py-3 text-sm text-gray-custom-700">{type === "Juros" ? `Juros Trim. ${payment.trimestre} (${payment.referencia})` : 'Principal'}</td>
      <td className="px-4 py-3 text-sm text-gray-custom-700">{dateValue}</td>
      <td className="px-4 py-3 text-sm text-gray-custom-700 font-semibold">R$ {valueData?.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '-'}</td>
      <td className={`px-4 py-3 text-sm font-medium flex items-center ${statusColor}`}>
        {statusIcon}
        {payment.status}
      </td>
      <td className="px-4 py-3 text-xs text-gray-custom-500 truncate" title={payment.transacaoBlockchainId}>
        {payment.transacaoBlockchainId ? `${payment.transacaoBlockchainId.substring(0, 10)}...` : '-'}
      </td>
    </tr>
  );
};


const MeuInvestimentoDetalhePage = () => {
  const { id: investimentoId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [investimento, setInvestimento] = useState(null);
  const [ofertaOriginal, setOfertaOriginal] = useState(null);

  useEffect(() => {
    if (user && user.investimentos) {
      const invEncontrado = user.investimentos.find(inv => inv.id === investimentoId);
      if (invEncontrado) {
        setInvestimento(invEncontrado);
        const ofertaOrig = mockOfertas.find(o => o.id === invEncontrado.ofertaId);
        setOfertaOriginal(ofertaOrig);
      } else {
        navigate('/dashboard'); // Investimento não encontrado
      }
    } else if (user === null) { // Se user for null (logout por exemplo)
        navigate('/login');
    }
  }, [investimentoId, user, navigate]);

  if (!investimento || !ofertaOriginal) {
    return <div className="text-center py-10">Carregando detalhes do investimento...</div>;
  }

  const todosPagamentos = [
    ...(investimento.pagamentosJuros || []),
    investimento.pagamentoPrincipal ? { ...investimento.pagamentoPrincipal, tipo: 'Principal', referencia: 'Pagamento Final' } : null
  ].filter(p => p !== null).sort((a, b) => new Date(a.dataPagamentoPrevista || a.dataPagamentoEfetiva) - new Date(b.dataPagamentoPrevista || b.dataPagamentoEfetiva));


  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/dashboard#meus-investimentos-dashboard" className="inline-flex items-center text-sm text-brand-primary hover:text-brand-primary-dark mb-6 group">
        <ChevronLeft size={20} className="mr-1 group-hover:-translate-x-1 transition-transform" />
        Voltar para Meus Investimentos
      </Link>

      <header className="bg-white p-6 rounded-xl shadow-card mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <img 
                src={ofertaOriginal.logoUrl} 
                alt={`Logo ${investimento.nomeEmpresa}`} 
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg mr-0 sm:mr-5 mb-3 sm:mb-0 object-contain border border-gray-custom-200 shadow-sm"
                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/100x100/E0E0E0/757575?text=Logo&font=inter';}}
            />
            <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-brand-primary leading-tight">{investimento.nomeEmpresa}</h1>
                <span className="text-sm bg-brand-secondary text-brand-primary-dark font-semibold px-2.5 py-1 rounded-full inline-block mt-1">
                Token: {investimento.token}
                </span>
            </div>
            <Link 
                to={`/oferta/${investimento.ofertaId}`} 
                className="mt-3 sm:mt-0 text-xs sm:text-sm text-brand-primary hover:underline flex items-center"
            >
                Ver Oferta Original <ExternalLink size={14} className="ml-1" />
            </Link>
        </div>
      </header>

      {/* Detalhes do Investimento */}
      <div className="bg-white p-6 rounded-xl shadow-card mb-6">
        <h2 className="text-xl font-semibold text-gray-custom-800 mb-4 border-b border-gray-custom-200 pb-3">Resumo do Seu Investimento</h2>
        <dl className="divide-y divide-gray-custom-200">
          <DetailItem label="Valor Total Investido" value={`R$ ${investimento.valorInvestido.toLocaleString('pt-BR')}`} icon={DollarSign} />
          <DetailItem label="Quantidade de Tokens" value={`${investimento.quantidadeTokens} ${investimento.token}`} icon={Hash} />
          <DetailItem label="Data do Investimento" value={new Date(investimento.dataInvestimento + 'T00:00:00').toLocaleDateString('pt-BR')} icon={CalendarDays} />
          <DetailItem label="Status Atual" value={investimento.status} icon={Info} className={
             investimento.status === 'Em rendimento' ? 'text-success font-bold' : 
             investimento.status === 'Finalizado' ? 'text-info font-bold' : 
             'text-warning font-bold'
          }/>
          <DetailItem label="Taxa de Retorno Contratada" value={investimento.taxaRetornoContratada} icon={Percent} />
          <DetailItem label="Prazo Total do Título" value={`${investimento.prazoTotalMeses} meses`} icon={Clock} />
          <DetailItem label="Empresa Emissora" value={ofertaOriginal.nomeEmpresa} icon={Landmark} />
          <DetailItem label="Tipo de Investimento" value={ofertaOriginal.tipoInvestimento} icon={FileText} />
        </dl>
      </div>

      {/* Cronograma de Pagamentos */}
      <div className="bg-white p-6 rounded-xl shadow-card">
        <h2 className="text-xl font-semibold text-gray-custom-800 mb-4 border-b border-gray-custom-200 pb-3">Cronograma de Pagamentos (Estimado e Realizado)</h2>
        {todosPagamentos.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-custom-200">
              <thead className="bg-gray-custom-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-custom-500 uppercase tracking-wider">Tipo / Referência</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-custom-500 uppercase tracking-wider">Data</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-custom-500 uppercase tracking-wider">Valor (R$)</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-custom-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-custom-500 uppercase tracking-wider">ID Transação (Blockchain)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-custom-200">
                {todosPagamentos.map((pag, index) => (
                  <PaymentRow key={pag.id || `principal-${index}`} payment={pag} type={pag.tipo === 'Principal' ? 'Principal' : 'Juros'} />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-custom-600">Nenhum pagamento programado ou realizado para este investimento ainda.</p>
        )}
        <div className="mt-6 flex justify-end">
            <Link
                to={`/pagamento-juros/${investimento.id}`}
                className="bg-brand-primary hover:bg-brand-primary-dark text-white font-medium py-2 px-4 rounded-md text-sm transition-colors"
            >
                Ver Histórico Detalhado e Saques
            </Link>
        </div>
         <p className="text-xs text-gray-custom-500 mt-4">
            Nota: As datas e valores previstos para pagamentos futuros são estimativas e podem sofrer alterações.
            O ID da Transação é um identificador simulado da operação na blockchain.
        </p>
      </div>
      
      {/* Seção de Documentos do Investimento (opcional) */}
      <div className="bg-white p-6 rounded-xl shadow-card mt-6">
        <h2 className="text-xl font-semibold text-gray-custom-800 mb-4 border-b border-gray-custom-200 pb-3">Documentos do Seu Investimento</h2>
        <ul className="space-y-2">
            {/* Simular links para documentos específicos do investimento do usuário */}
            <li className="flex items-center justify-between p-2 bg-gray-custom-100 rounded-md">
                <span className="text-sm text-brand-primary hover:underline">
                    <a href="#" title="Abrir Contrato de Investimento">Seu Contrato de Investimento - {investimento.token}.pdf</a>
                </span>
                <a href="#" className="text-brand-primary hover:text-brand-primary-dark"><ExternalLink size={18} /></a>
            </li>
            <li className="flex items-center justify-between p-2 bg-gray-custom-100 rounded-md">
                <span className="text-sm text-brand-primary hover:underline">
                    <a href="#" title="Abrir Termo de Adesão">Seu Termo de Adesão e Ciência de Risco.pdf</a>
                </span>
                <a href="#" className="text-brand-primary hover:text-brand-primary-dark"><ExternalLink size={18} /></a>
            </li>
        </ul>
         <p className="text-xs text-gray-custom-500 mt-4">
            Guarde cópias destes documentos para sua referência.
        </p>
      </div>

    </div>
  );
};

export default MeuInvestimentoDetalhePage;

