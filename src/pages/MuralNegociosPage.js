import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { mockOfertas } from '../data/mockData'; // Para listar tokens disponíveis
import { ArrowRightLeft, MessageCircle, Tag, Filter, Search, PlusCircle, Send } from 'lucide-react';

// Dados mockados para o mural de negócios
const mockIntencoesIniciais = [
  { id: 'int001', tipo: 'VENDA', token: 'PADXTOK', nomeEmpresa: 'Empresa X Soluções em Panificação Artesanal Ltda.', quantidade: 5, precoUnitario: 102.00, investidorNome: 'Ana S.', investidorId: 'usr456', data: '2025-10-15', contatoPlataforma: true, mensagemDireta: false },
  { id: 'int002', tipo: 'COMPRA', token: 'PADXTOK', nomeEmpresa: 'Empresa X Soluções em Panificação Artesanal Ltda.', quantidade: 3, precoUnitarioMax: 101.50, investidorNome: 'Carlos P.', investidorId: 'usr789', data: '2025-10-18', contatoPlataforma: true, mensagemDireta: false },
  { id: 'int003', tipo: 'VENDA', token: 'AGROTK', nomeEmpresa: 'TechInova Soluções Agrícolas S.A.', quantidade: 2, precoUnitario: 515.00, investidorNome: 'Beatriz L.', investidorId: 'usr000', data: '2025-10-20', contatoPlataforma: false, mensagemDireta: true, contatoInfo: 'beatriz.agro@email.exemplo (simulado)'},
];


const MuralNegociosPage = () => {
  const { user } = useContext(AuthContext);
  const [intencoes, setIntencoes] = useState(mockIntencoesIniciais);
  const [filtroToken, setFiltroToken] = useState('');
  const [filtroTipo, setFiltroTipo] = useState(''); // 'VENDA' ou 'COMPRA'
  const [termoBusca, setTermoBusca] = useState('');

  const [showModalNovaIntencao, setShowModalNovaIntencao] = useState(false);
  const [novaIntencao, setNovaIntencao] = useState({
    tipo: 'VENDA',
    token: '',
    quantidade: 1,
    precoUnitario: '', // Para venda
    precoUnitarioMax: '', // Para compra
    contatoPlataforma: true,
    mensagemDireta: false,
    contatoInfoAdicional: '', // Telefone, email, etc. se mensagemDireta for true
  });
  const [formErrors, setFormErrors] = useState({});

  const tokensDisponiveis = mockOfertas.map(o => ({ id: o.token, nome: `${o.token} (${o.nomeEmpresa})` }));
  // Adicionar tokens que o usuário possui mas não estão em ofertas ativas (se houver lógica para isso)
  if (user && user.carteiraDigital) {
    Object.keys(user.carteiraDigital).forEach(tokenKey => {
      if (tokenKey !== 'BRLCoin' && !tokensDisponiveis.find(t => t.id === tokenKey)) {
        const ofertaRelacionada = mockOfertas.find(o => o.token === tokenKey);
        tokensDisponiveis.push({ id: tokenKey, nome: `${tokenKey} (${ofertaRelacionada?.nomeEmpresa || 'Empresa Desconhecida'})` });
      }
    });
  }
  const uniqueTokensDisponiveis = Array.from(new Set(tokensDisponiveis.map(a => a.id)))
    .map(id => {
      return tokensDisponiveis.find(a => a.id === id)
    });


  const handleNovaIntencaoChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNovaIntencao(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (formErrors[name]) setFormErrors(prev => ({...prev, [name]: null}));
  };

  const validateNovaIntencao = () => {
    const errors = {};
    if (!novaIntencao.token) errors.token = "Selecione um token.";
    if (novaIntencao.quantidade <= 0) errors.quantidade = "Quantidade deve ser maior que zero.";
    if (novaIntencao.tipo === 'VENDA' && (!novaIntencao.precoUnitario || novaIntencao.precoUnitario <= 0)) {
      errors.precoUnitario = "Preço unitário para venda é obrigatório e deve ser positivo.";
    }
    if (novaIntencao.tipo === 'COMPRA' && (!novaIntencao.precoUnitarioMax || novaIntencao.precoUnitarioMax <= 0)) {
      errors.precoUnitarioMax = "Preço unitário máximo para compra é obrigatório e deve ser positivo.";
    }
    if (novaIntencao.mensagemDireta && !novaIntencao.contatoInfoAdicional.trim()) {
        errors.contatoInfoAdicional = "Forneça uma forma de contato direto (e-mail ou telefone).";
    }
    // Validação de saldo de tokens para VENDA (simulada)
    if (novaIntencao.tipo === 'VENDA' && novaIntencao.token && user?.carteiraDigital) {
        const saldoTokenUsuario = user.carteiraDigital[novaIntencao.token] || 0;
        if (novaIntencao.quantidade > saldoTokenUsuario) {
            errors.quantidade = `Você possui apenas ${saldoTokenUsuario} ${novaIntencao.token} para vender.`;
        }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegistrarNovaIntencao = (e) => {
    e.preventDefault();
    if (!validateNovaIntencao()) return;

    const nomeEmpresaDoToken = uniqueTokensDisponiveis.find(t => t.id === novaIntencao.token)?.nome.match(/\(([^)]+)\)/)?.[1] || 'Empresa Desconhecida';

    const nova = {
      id: `int${Date.now()}`,
      ...novaIntencao,
      nomeEmpresa: nomeEmpresaDoToken,
      investidorNome: user?.nomeCompleto?.split(' ')[0] || 'Usuário', // Primeiro nome
      investidorId: user?.id,
      data: new Date().toISOString().split('T')[0],
      precoUnitario: novaIntencao.tipo === 'VENDA' ? parseFloat(novaIntencao.precoUnitario) : undefined,
      precoUnitarioMax: novaIntencao.tipo === 'COMPRA' ? parseFloat(novaIntencao.precoUnitarioMax) : undefined,
    };
    setIntencoes(prev => [nova, ...prev]); // Adiciona no início
    setShowModalNovaIntencao(false);
    setNovaIntencao({ tipo: 'VENDA', token: '', quantidade: 1, precoUnitario: '', precoUnitarioMax: '', contatoPlataforma: true, mensagemDireta: false, contatoInfoAdicional: '' }); // Reset form
    setFormErrors({});
    alert("Sua intenção de negociação foi registrada no mural!");
  };

  const intencoesFiltradas = intencoes.filter(int => {
    const matchToken = filtroToken ? int.token === filtroToken : true;
    const matchTipo = filtroTipo ? int.tipo === filtroTipo : true;
    const matchTermo = termoBusca 
      ? int.nomeEmpresa.toLowerCase().includes(termoBusca.toLowerCase()) || 
        int.token.toLowerCase().includes(termoBusca.toLowerCase()) ||
        int.investidorNome.toLowerCase().includes(termoBusca.toLowerCase())
      : true;
    return matchToken && matchTipo && matchTermo;
  });

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-card">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b border-gray-custom-200 pb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-brand-primary flex items-center">
              <ArrowRightLeft size={28} className="mr-3" /> Mural de Negócios
            </h1>
            <p className="text-sm text-gray-custom-600 mt-1">
              Conecte-se com outros investidores para negociar tokens de ofertas já encerradas.
            </p>
          </div>
          <button
            onClick={() => setShowModalNovaIntencao(true)}
            className="mt-3 sm:mt-0 bg-brand-accent hover:bg-brand-accent-dark text-brand-primary-dark font-semibold py-2 px-4 rounded-md text-sm transition-colors flex items-center"
          >
            <PlusCircle size={18} className="mr-2" /> Registrar Intenção
          </button>
        </div>

        {/* Filtros */}
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-gray-custom-50 rounded-lg border border-gray-custom-200">
          <div>
            <label htmlFor="filtroToken" className="block text-xs font-medium text-gray-custom-700 mb-1">Filtrar por Token</label>
            <select
              id="filtroToken"
              value={filtroToken}
              onChange={(e) => setFiltroToken(e.target.value)}
              className="w-full p-2 border border-gray-custom-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary text-sm"
            >
              <option value="">Todos os Tokens</option>
              {uniqueTokensDisponiveis.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="filtroTipo" className="block text-xs font-medium text-gray-custom-700 mb-1">Filtrar por Tipo</label>
            <select
              id="filtroTipo"
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="w-full p-2 border border-gray-custom-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary text-sm"
            >
              <option value="">Todos os Tipos</option>
              <option value="VENDA">Intenções de Venda</option>
              <option value="COMPRA">Intenções de Compra</option>
            </select>
          </div>
          <div className="sm:col-span-2 md:col-span-1">
            <label htmlFor="termoBusca" className="block text-xs font-medium text-gray-custom-700 mb-1">Buscar</label>
            <div className="relative">
                <input
                type="text"
                id="termoBusca"
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
                placeholder="Empresa, token, investidor..."
                className="w-full p-2 pl-10 border border-gray-custom-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary text-sm"
                />
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-custom-400" />
            </div>
          </div>
        </div>
        
        {/* Aviso Legal */}
        <div className="mb-6 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 rounded-md text-xs">
          <p><strong>Atenção:</strong> A SuaPlataformaCrowd atua apenas como um facilitador para o encontro de interesses de compra e venda entre investidores. Não intermediamos diretamente as negociações nem garantimos a conclusão das transações ou os preços acordados. A negociação é de responsabilidade exclusiva das partes envolvidas. Esta funcionalidade não constitui um mercado regulamentado de valores mobiliários. (Conforme Capítulo V da Resolução CVM 88)</p>
        </div>

        {/* Lista de Intenções */}
        {intencoesFiltradas.length > 0 ? (
          <div className="space-y-4">
            {intencoesFiltradas.map(int => (
              <div key={int.id} className={`p-4 rounded-lg shadow-md border-l-4 ${int.tipo === 'VENDA' ? 'border-red-500 bg-red-50' : 'border-green-500 bg-green-50'}`}>
                <div className="flex flex-col sm:flex-row justify-between items-start">
                  <div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${int.tipo === 'VENDA' ? 'bg-red-200 text-red-700' : 'bg-green-200 text-green-700'}`}>
                      {int.tipo}
                    </span>
                    <h3 className="text-md font-semibold text-brand-primary mt-1">{int.nomeEmpresa} ({int.token})</h3>
                    <p className="text-xs text-gray-custom-500">Por: {int.investidorNome} (ID: ...{int.investidorId?.slice(-3)}) em {new Date(int.data + 'T00:00:00').toLocaleDateString('pt-BR')}</p>
                  </div>
                  <div className="mt-2 sm:mt-0 text-right">
                    <p className="text-sm text-gray-custom-700">Quantidade: <span className="font-bold">{int.quantidade}</span></p>
                    {int.tipo === 'VENDA' && <p className="text-sm text-gray-custom-700">Preço/Token: <span className="font-bold">R$ {int.precoUnitario?.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span></p>}
                    {int.tipo === 'COMPRA' && <p className="text-sm text-gray-custom-700">Preço Máx/Token: <span className="font-bold">R$ {int.precoUnitarioMax?.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span></p>}
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-custom-200 flex justify-end items-center">
                  {int.contatoPlataforma && (
                    <button className="text-xs bg-brand-primary hover:bg-brand-primary-dark text-white font-medium py-1.5 px-3 rounded-md transition-colors flex items-center">
                      <MessageCircle size={14} className="mr-1.5" /> Contatar via Plataforma (Simulado)
                    </button>
                  )}
                  {int.mensagemDireta && int.contatoInfoAdicional && (
                     <div className="ml-2 text-xs text-gray-custom-600 p-1.5 bg-gray-custom-100 rounded-md">
                        Contato Direto: <span className="font-semibold">{int.contatoInfoAdicional}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <Filter size={40} className="mx-auto text-gray-custom-400 mb-3" />
            <p className="text-gray-custom-600">Nenhuma intenção de negócio encontrada para os filtros selecionados.</p>
          </div>
        )}
      </div>

      {/* Modal para Nova Intenção */}
      {showModalNovaIntencao && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity duration-300 ease-in-out">
          <div className="bg-white p-6 rounded-lg shadow-modal max-w-lg w-full transform transition-all duration-300 ease-in-out scale-100">
            <h2 className="text-xl font-semibold text-brand-primary mb-4">Registrar Nova Intenção de Negócio</h2>
            <form onSubmit={handleRegistrarNovaIntencao} className="space-y-4">
              <div>
                <label htmlFor="tipoIntencao" className="block text-sm font-medium text-gray-custom-700">Tipo de Intenção*</label>
                <select id="tipoIntencao" name="tipo" value={novaIntencao.tipo} onChange={handleNovaIntencaoChange} className="mt-1 w-full p-2 border rounded-md">
                  <option value="VENDA">Quero Vender</option>
                  <option value="COMPRA">Quero Comprar</option>
                </select>
              </div>
              <div>
                <label htmlFor="tokenIntencao" className="block text-sm font-medium text-gray-custom-700">Token*</label>
                <select id="tokenIntencao" name="token" value={novaIntencao.token} onChange={handleNovaIntencaoChange} className="mt-1 w-full p-2 border rounded-md">
                  <option value="">Selecione o Token</option>
                  {uniqueTokensDisponiveis.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
                </select>
                {formErrors.token && <p className="text-xs text-red-500 mt-1">{formErrors.token}</p>}
              </div>
              <div>
                <label htmlFor="quantidadeIntencao" className="block text-sm font-medium text-gray-custom-700">Quantidade de Tokens*</label>
                <input type="number" id="quantidadeIntencao" name="quantidade" value={novaIntencao.quantidade} onChange={handleNovaIntencaoChange} min="1" className="mt-1 w-full p-2 border rounded-md" />
                {formErrors.quantidade && <p className="text-xs text-red-500 mt-1">{formErrors.quantidade}</p>}
              </div>
              {novaIntencao.tipo === 'VENDA' && (
                <div>
                  <label htmlFor="precoUnitarioVenda" className="block text-sm font-medium text-gray-custom-700">Preço Unitário para Venda (R$)*</label>
                  <input type="number" id="precoUnitarioVenda" name="precoUnitario" value={novaIntencao.precoUnitario} onChange={handleNovaIntencaoChange} min="0.01" step="0.01" className="mt-1 w-full p-2 border rounded-md" />
                  {formErrors.precoUnitario && <p className="text-xs text-red-500 mt-1">{formErrors.precoUnitario}</p>}
                </div>
              )}
              {novaIntencao.tipo === 'COMPRA' && (
                <div>
                  <label htmlFor="precoUnitarioMaxCompra" className="block text-sm font-medium text-gray-custom-700">Preço Unitário Máximo para Compra (R$)*</label>
                  <input type="number" id="precoUnitarioMaxCompra" name="precoUnitarioMax" value={novaIntencao.precoUnitarioMax} onChange={handleNovaIntencaoChange} min="0.01" step="0.01" className="mt-1 w-full p-2 border rounded-md" />
                  {formErrors.precoUnitarioMax && <p className="text-xs text-red-500 mt-1">{formErrors.precoUnitarioMax}</p>}
                </div>
              )}
              <div className="space-y-2 mt-3">
                <label className="block text-sm font-medium text-gray-custom-700">Preferência de Contato:</label>
                <div className="flex items-center">
                    <input type="checkbox" id="contatoPlataforma" name="contatoPlataforma" checked={novaIntencao.contatoPlataforma} onChange={handleNovaIntencaoChange} className="h-4 w-4 text-brand-primary rounded"/>
                    <label htmlFor="contatoPlataforma" className="ml-2 text-sm text-gray-custom-700">Permitir contato via plataforma (mensagens)</label>
                </div>
                <div className="flex items-center">
                    <input type="checkbox" id="mensagemDireta" name="mensagemDireta" checked={novaIntencao.mensagemDireta} onChange={handleNovaIntencaoChange} className="h-4 w-4 text-brand-primary rounded"/>
                    <label htmlFor="mensagemDireta" className="ml-2 text-sm text-gray-custom-700">Informar contato direto (e-mail/telefone)</label>
                </div>
                {novaIntencao.mensagemDireta && (
                    <div>
                        <label htmlFor="contatoInfoAdicional" className="block text-xs font-medium text-gray-custom-600 mt-1">Seu E-mail ou Telefone para Contato Direto*</label>
                        <input type="text" id="contatoInfoAdicional" name="contatoInfoAdicional" value={novaIntencao.contatoInfoAdicional} onChange={handleNovaIntencaoChange} placeholder="Ex: seuemail@dominio.com ou (XX) XXXXX-XXXX" className="mt-1 w-full p-2 text-sm border rounded-md"/>
                        {formErrors.contatoInfoAdicional && <p className="text-xs text-red-500 mt-1">{formErrors.contatoInfoAdicional}</p>}
                    </div>
                )}
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button type="button" onClick={() => {setShowModalNovaIntencao(false); setFormErrors({});}} className="px-4 py-2 text-sm font-medium text-gray-custom-700 bg-gray-custom-200 hover:bg-gray-custom-300 rounded-md transition-colors">
                  Cancelar
                </button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-brand-primary hover:bg-brand-primary-dark rounded-md transition-colors flex items-center">
                  <Send size={16} className="mr-2" /> Registrar Intenção
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MuralNegociosPage;

