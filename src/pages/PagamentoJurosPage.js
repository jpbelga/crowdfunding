import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { mockOfertas } from '../data/mockData'; // Para detalhes da oferta original
import { ChevronLeft, DollarSign, CheckCircle, AlertCircle, Clock, Download, ExternalLink } from 'lucide-react';

const PagamentoJurosPage = () => {
  const { investimentoId } = useParams();
  const navigate = useNavigate();
  const { user, updateUser } = useContext(AuthContext); // Para simular o saque

  const [investimento, setInvestimento] = useState(null);
  const [ofertaOriginal, setOfertaOriginal] = useState(null);
  const [feedbackSaque, setFeedbackSaque] = useState({ message: '', type: '' }); // 'success' ou 'error'

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
    } else if (user === null) {
        navigate('/login');
    }
  }, [investimentoId, user, navigate]);

  const handleSaqueJuros = async (pagamentoId) => {
    setFeedbackSaque({ message: '', type: '' });
    if (!investimento || !user) return;

    const investimentoIndex = user.investimentos.findIndex(inv => inv.id === investimento.id);
    if (investimentoIndex === -1) return;

    const pagamentoIndex = investimento.pagamentosJuros.findIndex(p => p.id === pagamentoId && p.status === 'Disponível para Saque');
    if (pagamentoIndex === -1) {
      setFeedbackSaque({ message: 'Este pagamento não está disponível para saque ou já foi sacado.', type: 'error' });
      return;
    }

    // Simulação de chamada de API para saque e interação com smart contract
    // console.log(`Simulando saque do pagamento ${pagamentoId}`);
    await new Promise(resolve => setTimeout(resolve, 700)); // Simula delay

    // Atualizar o estado do pagamento e do saldo do usuário (mockado)
    const updatedInvestimentos = [...user.investimentos];
    const pagamentoAtualizado = {
      ...updatedInvestimentos[investimentoIndex].pagamentosJuros[pagamentoIndex],
      status: 'Pago',
      dataPagamentoEfetiva: new Date().toISOString().split('T')[0],
      transacaoBlockchainId: `0xSAQUE${Date.now().toString(16)}` // ID de transação simulado
    };
    updatedInvestimentos[investimentoIndex].pagamentosJuros[pagamentoIndex] = pagamentoAtualizado;

    const novoSaldoBRLCoin = (user.carteiraDigital?.BRLCoin || 0) + pagamentoAtualizado.valorEstimado;

    updateUser({
      investimentos: updatedInvestimentos,
      carteiraDigital: {
        ...user.carteiraDigital,
        BRLCoin: novoSaldoBRLCoin
      }
    });
    
    // Atualiza o estado local para refletir a mudança imediatamente
    setInvestimento(prev => ({
        ...prev,
        pagamentosJuros: prev.pagamentosJuros.map(p => p.id === pagamentoId ? pagamentoAtualizado : p)
    }));

    setFeedbackSaque({ message: `Saque de R$ ${pagamentoAtualizado.valorEstimado.toLocaleString('pt-BR')} realizado com sucesso para sua carteira BRL Coin!`, type: 'success' });
  };


  if (!investimento || !ofertaOriginal) {
    return <div className="text-center py-10">Carregando histórico de pagamentos...</div>;
  }

  const todosPagamentos = [
    ...(investimento.pagamentosJuros || []),
    investimento.pagamentoPrincipal ? { ...investimento.pagamentoPrincipal, tipo: 'Principal', referencia: 'Pagamento Final', id: `principal_${investimento.id}` } : null
  ].filter(p => p !== null).sort((a, b) => new Date(a.dataPagamentoPrevista || a.dataPagamentoEfetiva) - new Date(b.dataPagamentoPrevista || b.dataPagamentoEfetiva));

  return (
    <div className="max-w-4xl mx-auto">
      <Link to={`/meu-investimento/${investimentoId}`} className="inline-flex items-center text-sm text-brand-primary hover:text-brand-primary-dark mb-6 group">
        <ChevronLeft size={20} className="mr-1 group-hover:-translate-x-1 transition-transform" />
        Voltar para Detalhes do Investimento
      </Link>

      <header className="bg-white p-6 rounded-xl shadow-card mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-brand-primary mb-1">Histórico de Pagamentos e Saques</h1>
        <p className="text-gray-custom-600 text-sm">
          {investimento.nomeEmpresa} ({investimento.token})
        </p>
        <div className="mt-4 border-t border-gray-custom-200 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
                <p className="text-xs text-gray-custom-500">Seu Investimento Total:</p>
                <p className="text-lg font-semibold text-brand-primary">R$ {investimento.valorInvestido.toLocaleString('pt-BR')}</p>
            </div>
            <div className="mt-2 sm:mt-0 sm:text-right">
                <p className="text-xs text-gray-custom-500">Saldo em BRL Coin (para juros):</p>
                <p className="text-lg font-semibold text-green-600">R$ {user?.carteiraDigital?.BRLCoin?.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) || '0,00'}</p>
            </div>
        </div>
      </header>

      {feedbackSaque.message && (
        <div className={`p-4 mb-6 rounded-md text-sm ${feedbackSaque.type === 'success' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
          {feedbackSaque.message}
        </div>
      )}

      <div className="bg-white p-6 rounded-xl shadow-card">
        <h2 className="text-xl font-semibold text-gray-custom-800 mb-1">Pagamentos Programados e Realizados</h2>
        <p className="text-xs text-gray-custom-500 mb-4">Os juros marcados como "Disponível para Saque" são depositados pela empresa emissora em um contrato inteligente e podem ser transferidos para sua carteira BRL Coin na plataforma.</p>
        
        {todosPagamentos.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-custom-200">
              <thead className="bg-gray-custom-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-custom-500 uppercase tracking-wider">Tipo / Referência</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-custom-500 uppercase tracking-wider">Data</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-custom-500 uppercase tracking-wider">Valor (R$)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-custom-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-custom-500 uppercase tracking-wider">Ação / ID Transação</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-custom-200">
                {todosPagamentos.map((pag, index) => {
                  let statusIcon = <Clock size={16} className="text-gray-custom-500" />;
                  let statusTextClass = "text-gray-custom-700";
                  let dateToDisplay = pag.dataPagamentoPrevista ? new Date(pag.dataPagamentoPrevista + 'T00:00:00').toLocaleDateString('pt-BR') : '-';
                  let valueToDisplay = pag.valorEstimado || pag.valorPago;

                  if (pag.status === 'Pago') {
                    statusIcon = <CheckCircle size={16} className="text-success" />;
                    statusTextClass = "text-success";
                    dateToDisplay = pag.dataPagamentoEfetiva ? new Date(pag.dataPagamentoEfetiva + 'T00:00:00').toLocaleDateString('pt-BR') : dateToDisplay;
                  } else if (pag.status === 'Disponível para Saque') {
                    statusIcon = <DollarSign size={16} className="text-blue-500" />;
                    statusTextClass = "text-blue-500 font-semibold";
                  } else if (pag.status === 'Pendente') {
                    statusIcon = <Clock size={16} className="text-yellow-600" />;
                     statusTextClass = "text-yellow-600";
                  }


                  return (
                    <tr key={pag.id || `principal-${index}`} className="hover:bg-gray-custom-50 transition-colors">
                      <td className="px-4 py-3 text-sm text-gray-custom-800">{pag.tipo === 'Principal' ? <strong>Principal</strong> : `Juros Trim. ${pag.trimestre} (${pag.referencia})`}</td>
                      <td className="px-4 py-3 text-sm text-gray-custom-700">{dateToDisplay}</td>
                      <td className="px-4 py-3 text-sm text-gray-custom-800 font-semibold">R$ {valueToDisplay?.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                      <td className={`px-4 py-3 text-sm font-medium flex items-center ${statusTextClass}`}>
                        {statusIcon} <span className="ml-1.5">{pag.status}</span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {pag.status === 'Disponível para Saque' && pag.tipo !== 'Principal' && (
                          <button
                            onClick={() => handleSaqueJuros(pag.id)}
                            className="bg-brand-accent hover:bg-brand-accent-dark text-brand-primary-dark font-medium py-1.5 px-3 rounded-md text-xs transition-colors flex items-center"
                          >
                            <Download size={14} className="mr-1" /> Sacar Juros
                          </button>
                        )}
                        {pag.status === 'Pago' && pag.transacaoBlockchainId && (
                          <span className="text-xs text-gray-custom-500 truncate cursor-pointer" title={`ID: ${pag.transacaoBlockchainId}`}>
                            {`${pag.transacaoBlockchainId.substring(0, 10)}...`} <ExternalLink size={12} className="inline ml-1" />
                          </span>
                        )}
                         {pag.status !== 'Disponível para Saque' && !(pag.status === 'Pago' && pag.transacaoBlockchainId) && (
                            <span className="text-xs text-gray-custom-400">-</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <AlertCircle size={32} className="mx-auto text-gray-custom-400 mb-3" />
            <p className="text-gray-custom-600">Nenhum histórico de pagamento encontrado para este investimento.</p>
          </div>
        )}
        <p className="text-xs text-gray-custom-500 mt-6">
            <strong>Nota:</strong> "BRL Coin" é uma representação da stablecoin utilizada pela plataforma para o pagamento de juros.
            O ID da Transação é um identificador simulado da operação na blockchain.
        </p>
      </div>
    </div>
  );
};

export default PagamentoJurosPage;

