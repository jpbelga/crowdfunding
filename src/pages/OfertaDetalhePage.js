import React, { useState, useContext, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { mockOfertas, mockUser } from '../data/mockData';
import { AuthContext } from '../contexts/AuthContext';
import ProgressBar from '../components/ProgressBar';
import { ChevronLeft, Info, FileText, MessageSquare, AlertTriangle, CheckCircle, DollarSign, CalendarDays, Target, Users, TrendingUp, ShieldAlert, ExternalLink } from 'lucide-react';

// Componente para abas de navegação
const TabButton = ({ children, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors focus:outline-none
                ${isActive 
                  ? 'border-b-2 border-brand-primary text-brand-primary bg-white' 
                  : 'text-gray-custom-600 hover:text-brand-primary hover:bg-gray-custom-100'
                }`}
  >
    {children}
  </button>
);

// Componente para seções de informação do Anexo E
const InfoSection = ({ title, children, icon: Icon }) => (
  <div className="mb-6 p-4 border border-gray-custom-200 rounded-lg bg-white">
    <h4 className="text-lg font-semibold text-gray-custom-800 mb-3 flex items-center">
      {Icon && <Icon size={20} className="mr-2 text-brand-primary" />}
      {title}
    </h4>
    <div className="text-sm text-gray-custom-700 space-y-2 leading-relaxed">
      {children}
    </div>
  </div>
);

const OfertaDetalhePage = () => {
  const { id: ofertaId } = useParams();
  const navigate = useNavigate();
  const { user, updateUser } = useContext(AuthContext); // Usaremos para simular investimento

  const [oferta, setOferta] = useState(null);
  const [activeTab, setActiveTab] = useState('resumo');
  const [quantidadeTokensInvestir, setQuantidadeTokensInvestir] = useState(1);
  const [erroInvestimento, setErroInvestimento] = useState('');
  const [sucessoInvestimento, setSucessoInvestimento] = useState('');
  const [novaPerguntaForum, setNovaPerguntaForum] = useState('');
  const [forumMensagens, setForumMensagens] = useState([]);

  useEffect(() => {
    const ofertaEncontrada = mockOfertas.find(o => o.id === ofertaId);
    if (ofertaEncontrada) {
      setOferta(ofertaEncontrada);
      setForumMensagens(ofertaEncontrada.detalhesCompletos?.forumDisk || []);
    } else {
      // Tratar oferta não encontrada, talvez redirecionar
      navigate('/dashboard'); // Ou para uma página 404
    }
  }, [ofertaId, navigate]);

  if (!oferta) {
    return <div className="text-center py-10">Carregando detalhes da oferta...</div>;
  }
  
  const { user: mockInvestidor } = { user: mockUser }; // Para simular limites do investidor
  const limiteInvestidorParaOferta = mockInvestidor.limites.limiteAnualCalculado - mockInvestidor.limites.valorInvestidoAnoCorrente;
  const valorTotalInvestimento = quantidadeTokensInvestir * oferta.valorPorToken;
  const percentualCaptado = oferta.metaCapitacao > 0 ? (oferta.valorCaptado / oferta.metaCapitacao) * 100 : 0;

  const handleInvestir = (e) => {
    e.preventDefault();
    setErroInvestimento('');
    setSucessoInvestimento('');

    if (valorTotalInvestimento <= 0) {
      setErroInvestimento('A quantidade de tokens deve ser maior que zero.');
      return;
    }
    if (valorTotalInvestimento > limiteInvestidorParaOferta) {
      setErroInvestimento(`Valor excede seu limite de investimento disponível de R$ ${limiteInvestidorParaOferta.toLocaleString('pt-BR')}.`);
      return;
    }
    if (oferta.valorCaptado + valorTotalInvestimento > oferta.metaCapitacao) {
        setErroInvestimento(`Sua intenção de investimento excede o valor restante para atingir a meta da oferta.`);
        return;
    }

    // Simulação de investimento
    // Em um app real, aqui haveria a chamada de API, confirmações, etc.
    setSucessoInvestimento(`Parabéns! Sua intenção de investimento de R$ ${valorTotalInvestimento.toLocaleString('pt-BR')} (${quantidadeTokensInvestir} ${oferta.token}) na ${oferta.nomeEmpresa} foi registrada com sucesso. Você receberá um e-mail com a confirmação e os próximos passos. Lembre-se do seu direito de desistência em 5 dias.`);
    
    // Atualizar mockData (simulação) - Isso não persistirá de verdade sem backend
    // Esta parte é apenas para a demo funcionar visualmente
    const ofertaIndex = mockOfertas.findIndex(o => o.id === ofertaId);
    if (ofertaIndex !== -1) {
      mockOfertas[ofertaIndex].valorCaptado += valorTotalInvestimento;
      mockOfertas[ofertaIndex].investidoresParticipantes +=1;
    }
    // Atualizar dados do usuário (simulação)
    if (user) {
        const novoInvestimento = {
            id: `inv${oferta.token}${Date.now()}`,
            ofertaId: oferta.id,
            nomeEmpresa: oferta.nomeEmpresa,
            token: oferta.token,
            valorInvestido: valorTotalInvestimento,
            quantidadeTokens: quantidadeTokensInvestir,
            dataInvestimento: new Date().toISOString().split('T')[0],
            status: 'Reservado (Aguardando Efetivação)',
            taxaRetornoContratada: oferta.taxaRetornoEstimada,
            prazoTotalMeses: oferta.prazoTituloMeses,
            pagamentosJuros: [], // Inicialmente vazio
            pagamentoPrincipal: { status: 'Pendente', dataPagamentoPrevista: new Date(Date.now() + oferta.prazoTituloMeses * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], valorEstimado: valorTotalInvestimento }
        };
        const novosInvestimentos = [...(user.investimentos || []), novoInvestimento];
        const novoValorInvestidoAno = (user.limites?.valorInvestidoAnoCorrente || 0) + valorTotalInvestimento;
        
        updateUser({
            investimentos: novosInvestimentos,
            limites: { ...user.limites, valorInvestidoAnoCorrente: novoValorInvestidoAno },
            carteiraDigital: {
                ...user.carteiraDigital,
                [oferta.token]: (user.carteiraDigital?.[oferta.token] || 0) + quantidadeTokensInvestir
            }
        });
    }
    setQuantidadeTokensInvestir(1); // Resetar campo
    // Poderia redirecionar ou mostrar um modal mais elaborado
  };

  const handleEnviarPerguntaForum = (e) => {
    e.preventDefault();
    if (!novaPerguntaForum.trim()) return;
    const novaMsg = {
      id: `q${Date.now()}`,
      autor: user?.nomeCompleto || 'Investidor Anônimo',
      data: new Date().toISOString().split('T')[0] + " " + new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'}),
      pergunta: novaPerguntaForum,
      respostaPlataforma: null,
      respostaEmpresa: null,
    };
    setForumMensagens(prev => [novaMsg, ...prev]); // Adiciona no início
    setNovaPerguntaForum('');
    // Em um app real, enviaria para o backend
  };

  const renderTabContent = () => {
    const { detalhesCompletos: d } = oferta;
    switch (activeTab) {
      case 'resumo':
        return (
          <div className="space-y-6">
            <InfoSection title="Sobre a Empresa" icon={Info}>
              <p><strong>{d.nomeEmpresa}</strong> (CNPJ: {d.cnpj})</p>
              <p><strong>Setor:</strong> {d.setorAtuacao}</p>
              <p><strong>Fundação:</strong> {d.fundacao} - <strong>Localização:</strong> {d.localizacao}</p>
              <p className="mt-2">{d.resumoEmpresa}</p>
              {d.equipePrincipal && d.equipePrincipal.length > 0 && (
                <div className="mt-3">
                  <h5 className="font-semibold text-gray-custom-700">Equipe Principal:</h5>
                  <ul className="list-disc list-inside ml-1 space-y-1">
                    {d.equipePrincipal.map(membro => <li key={membro.nome}><strong>{membro.nome}</strong> ({membro.cargo}): {membro.bio}</li>)}
                  </ul>
                </div>
              )}
              {d.diferenciaisCompetitivos && d.diferenciaisCompetitivos.length > 0 && (
                 <div className="mt-3">
                  <h5 className="font-semibold text-gray-custom-700">Diferenciais:</h5>
                  <ul className="list-disc list-inside ml-1 space-y-1">
                    {d.diferenciaisCompetitivos.map(dif => <li key={dif}>{dif}</li>)}
                  </ul>
                </div>
              )}
            </InfoSection>
            <InfoSection title="Plano de Negócios e Uso dos Recursos" icon={Target}>
              <p><strong>Objetivo Principal:</strong> {d.planoDeNegocios.objetivoPrincipal}</p>
              <div className="mt-3">
                <h5 className="font-semibold text-gray-custom-700">Uso dos Recursos Captados (R$ {oferta.metaCapitacao.toLocaleString('pt-BR')}):</h5>
                <ul className="list-disc list-inside ml-1 space-y-1 mt-1">
                  {d.planoDeNegocios.usoDosRecursosCaptados.map(uso => (
                    <li key={uso.item}>{uso.item}: R$ {uso.valor.toLocaleString('pt-BR')} ({uso.percentual.toFixed(2)}%)</li>
                  ))}
                </ul>
              </div>
              <p className="mt-3"><strong>Projeções e Estratégia:</strong> {d.planoDeNegocios.projecoesFinanceirasResumo}</p>
              {d.planoDeNegocios.estrategiaSaidaInvestidor && <p className="mt-2"><strong>Estratégia de Saída (se aplicável):</strong> {d.planoDeNegocios.estrategiaSaidaInvestidor}</p>}
            </InfoSection>
            <InfoSection title="Condições do Título Ofertado" icon={DollarSign}>
                <p><strong>Instrumento:</strong> {d.condicoesDoTitulo.instrumento} ({oferta.token})</p>
                <p><strong>Remuneração:</strong> {d.condicoesDoTitulo.remuneracao}</p>
                <p><strong>Periodicidade dos Juros:</strong> {d.condicoesDoTitulo.periodicidadeJuros}</p>
                <p><strong>Pagamento do Principal:</strong> {d.condicoesDoTitulo.pagamentoPrincipal}</p>
                <p><strong>Amortização:</strong> {d.condicoesDoTitulo.amortizacao || 'Não aplicável'}</p>
                <p><strong>Garantias:</strong> {d.condicoesDoTitulo.garantias || 'Sem garantias específicas além do risco do emissor.'}</p>
                <p><strong>Valor por Token:</strong> R$ {oferta.valorPorToken.toLocaleString('pt-BR')}</p>
                <p><strong>Investimento Mínimo:</strong> R$ {d.condicoesDoTitulo.valorMinimoInvestimento.toLocaleString('pt-BR')}</p>
            </InfoSection>
            {d.informacoesFinanceirasHistoricas && (
              <InfoSection title="Informações Financeiras Históricas (Resumo)" icon={TrendingUp}>
                <p>Receita Bruta {new Date().getFullYear() - 2}: R$ {d.informacoesFinanceirasHistoricas.receitaBruta2023?.toLocaleString('pt-BR') || 'N/A'}</p>
                <p>Receita Bruta {new Date().getFullYear() - 1}: R$ {d.informacoesFinanceirasHistoricas.receitaBruta2024?.toLocaleString('pt-BR') || 'N/A'}</p>
                <p>Lucro Líquido {new Date().getFullYear() - 1}: R$ {d.informacoesFinanceirasHistoricas.lucroLiquido2024?.toLocaleString('pt-BR') || 'N/A'}</p>
                <p className="mt-2"><strong>Principais Indicadores:</strong> {d.informacoesFinanceirasHistoricas.principaisIndicadores}</p>
                <p className="text-xs mt-2">Nota: Estas informações são fornecidas pela empresa emissora. Para mais detalhes, consulte os documentos financeiros completos.</p>
              </InfoSection>
            )}
          </div>
        );
      case 'cvm88':
        const anexo = d.cvm88AnexoE || {};
        return (
          <div className="space-y-6">
            <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 rounded-md">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <ShieldAlert className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium">
                            Informações conforme Anexo E da Resolução CVM nº 88/2022
                        </p>
                        <p className="text-xs mt-1">Estas são informações essenciais para sua decisão de investimento. Leia com atenção.</p>
                    </div>
                </div>
            </div>
            <InfoSection title="Seção 5: Comunicação sobre Informações Contínuas">
                <p>{anexo.secao5_informacoesContinuas || "Informações não detalhadas pelo emissor."}</p>
            </InfoSection>
            <InfoSection title="Seção 6: Alertas sobre Riscos (Gerais e Específicos)">
                <ul className="list-disc list-inside space-y-1">
                    <li>Possibilidade de perda da totalidade do capital investido.</li>
                    <li>Baixa liquidez dos valores mobiliários de sociedades de pequeno porte.</li>
                    <li>Riscos inerentes ao negócio da empresa emissora e seu setor de atuação.</li>
                    <li>A empresa emissora não é registrada na CVM como emissor de valores mobiliários e pode não fornecer informações contínuas com o mesmo nível de detalhe de companhias abertas.</li>
                    <li>Não há garantia de rentabilidade. Retornos passados não garantem retornos futuros.</li>
                    {d.alertasDeRiscoEspecificos?.map((risco, idx) => <li key={idx} className="text-red-600 font-medium">{risco}</li>)}
                </ul>
            </InfoSection>
             <InfoSection title="Seção 7: Processos Judiciais e Administrativos">
                <p>{anexo.secao7_processosJudiciais || "A empresa declara não possuir processos relevantes."}</p>
            </InfoSection>
            <InfoSection title="Seção 8: Conflitos de Interesse (Plataforma)">
                <p>{anexo.secao8_conflitosInteresse || "Não foram identificados conflitos de interesse materiais pela plataforma."}</p>
            </InfoSection>
            <InfoSection title="Seção 9: Remuneração da Plataforma">
                <p>{anexo.secao9_remuneracaoPlataforma || "Detalhes sobre a remuneração da plataforma estão disponíveis nos Termos de Uso."}</p>
            </InfoSection>
            <InfoSection title="Seção 10: Informações sobre a Tributação Aplicável">
                <p>{anexo.secao10_tributacaoAplicavel || "Consulte um profissional para entender a tributação aplicável ao seu investimento."}</p>
            </InfoSection>
            <div className="mt-6 p-4 border border-dashed border-gray-custom-400 rounded-md bg-gray-custom-50">
                <h5 className="font-bold text-brand-primary mb-2 text-center">ADVERTÊNCIA CVM (Resolução CVM 88, Art. 34)</h5>
                <p className="text-xs text-gray-custom-700 text-center leading-relaxed">
                    "AS SOCIEDADES EMPRESÁRIAS DE PEQUENO PORTE E AS OFERTAS APRESENTADAS NESTA PLATAFORMA ESTÃO AUTOMATICAMENTE DISPENSADAS DE REGISTRO PELA COMISSÃO DE VALORES MOBILIÁRIOS - CVM. A CVM NÃO ANALISA PREVIAMENTE AS OFERTAS. AS OFERTAS REALIZADAS NÃO IMPLICAM POR PARTE DA CVM A GARANTIA DA VERACIDADE DAS INFORMAÇÕES PRESTADAS, DE ADEQUAÇÃO À LEGISLAÇÃO VIGENTE OU JULGAMENTO SOBRE A QUALIDADE DA SOCIEDADE EMPRESÁRIA DE PEQUENO PORTE. ANTES DE ACEITAR UMA OFERTA LEIA COM ATENÇÃO AS INFORMAÇÕES ESSENCIAIS DA OFERTA, EM ESPECIAL A SEÇÃO DE ALERTAS SOBRE RISCOS."
                </p>
            </div>
          </div>
        );
      case 'documentos':
        return (
          <InfoSection title="Pacote de Documentos Relevantes" icon={FileText}>
            {d.documentosDisponiveis && d.documentosDisponiveis.length > 0 ? (
              <ul className="space-y-2">
                {d.documentosDisponiveis.map((doc, idx) => (
                  <li key={idx} className="flex items-center justify-between p-2 bg-gray-custom-100 rounded-md hover:bg-gray-custom-200 transition-colors">
                    <span className="text-sm text-brand-primary hover:underline">
                      <a href={doc.url} target="_blank" rel="noopener noreferrer" title={`Abrir ${doc.nome}`}>
                        {doc.nome} <span className="text-xs text-gray-custom-500">({doc.tipo})</span>
                      </a>
                    </span>
                    <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:text-brand-primary-dark">
                      <ExternalLink size={18} />
                    </a>
                  </li>
                ))}
              </ul>
            ) : <p>Nenhum documento adicional fornecido para esta oferta.</p>}
             <p className="text-xs text-gray-custom-500 mt-4">Nota: Os documentos são fornecidos pela empresa emissora. A SuaPlataformaCrowd não se responsabiliza pela precisão ou completude do conteúdo dos mesmos, exceto onde explicitamente indicado.</p>
          </InfoSection>
        );
      case 'forum':
        return (
          <InfoSection title="Fórum de Discussão da Oferta" icon={MessageSquare}>
            <p className="text-xs text-gray-custom-500 mb-4">Faça perguntas diretamente à empresa emissora ou à plataforma. Todas as perguntas e respostas são visíveis para os investidores interessados.</p>
            <form onSubmit={handleEnviarPerguntaForum} className="mb-6 space-y-3">
              <div>
                <label htmlFor="novaPergunta" className="block text-sm font-medium text-gray-custom-700 mb-1">Sua Pergunta:</label>
                <textarea
                  id="novaPergunta"
                  rows="3"
                  className="w-full p-2 border border-gray-custom-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary"
                  value={novaPerguntaForum}
                  onChange={(e) => setNovaPerguntaForum(e.target.value)}
                  placeholder="Digite sua dúvida aqui..."
                ></textarea>
              </div>
              <button type="submit" className="px-4 py-2 bg-brand-primary text-white text-sm font-medium rounded-md hover:bg-brand-primary-dark transition-colors">
                Enviar Pergunta
              </button>
            </form>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {forumMensagens.length > 0 ? forumMensagens.map(msg => (
                <div key={msg.id} className="p-3 bg-gray-custom-50 rounded-md border border-gray-custom-200">
                  <p className="text-xs text-gray-custom-500">
                    <strong>{msg.autor}</strong> em {new Date(msg.data).toLocaleString('pt-BR')} perguntou:
                  </p>
                  <p className="text-gray-custom-800 mt-1 mb-2">{msg.pergunta}</p>
                  {msg.respostaEmpresa && (
                    <div className="ml-4 mt-2 p-2 bg-teal-50 border-l-2 border-brand-secondary rounded-r-md">
                      <p className="text-xs text-brand-primary">
                        <strong>{oferta.nomeEmpresa}</strong> respondeu em {new Date(msg.dataRespostaEmpresa || Date.now()).toLocaleString('pt-BR')}:
                      </p>
                      <p className="text-sm text-gray-custom-700 mt-1">{msg.respostaEmpresa}</p>
                    </div>
                  )}
                  {msg.respostaPlataforma && (
                     <div className="ml-4 mt-2 p-2 bg-blue-50 border-l-2 border-blue-300 rounded-r-md">
                      <p className="text-xs text-blue-600">
                        <strong>SuaPlataformaCrowd</strong> respondeu em {new Date(msg.dataRespostaPlataforma || Date.now()).toLocaleString('pt-BR')}:
                      </p>
                      <p className="text-sm text-gray-custom-700 mt-1">{msg.respostaPlataforma}</p>
                    </div>
                  )}
                  {!msg.respostaEmpresa && !msg.respostaPlataforma && (
                    <p className="text-xs text-gray-custom-400 italic mt-1">Aguardando resposta...</p>
                  )}
                </div>
              )) : <p className="text-gray-custom-500">Nenhuma pergunta feita ainda. Seja o primeiro!</p>}
            </div>
          </InfoSection>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <Link to="/dashboard" className="inline-flex items-center text-sm text-brand-primary hover:text-brand-primary-dark mb-4 group">
        <ChevronLeft size={20} className="mr-1 group-hover:-translate-x-1 transition-transform" />
        Voltar para Oportunidades
      </Link>

      {/* Cabeçalho da Oferta */}
      <header className="bg-white p-6 rounded-xl shadow-card mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center">
          <img 
            src={oferta.logoUrl} 
            alt={`Logo ${oferta.nomeEmpresa}`} 
            className="w-20 h-20 md:w-24 md:h-24 rounded-lg mr-0 md:mr-6 mb-4 md:mb-0 object-contain border border-gray-custom-200 shadow-sm"
            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/100x100/E0E0E0/757575?text=Logo&font=inter';}}
          />
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-brand-primary leading-tight">{oferta.nomeEmpresa}</h1>
            <span className="text-sm bg-brand-secondary text-brand-primary-dark font-semibold px-2.5 py-1 rounded-full inline-block mt-1">
              Token: {oferta.token}
            </span>
            <p className="text-gray-custom-600 mt-2 text-sm md:text-base">{oferta.resumo}</p>
          </div>
        </div>
        
        <div className="mt-6 border-t border-gray-custom-200 pt-6">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-custom-600">Progresso da Captação:</span>
                <span className="text-sm font-semibold text-brand-primary">{percentualCaptado.toFixed(1)}%</span>
            </div>
            <ProgressBar percentual={percentualCaptado} height="h-3" />
            <div className="flex justify-between text-xs text-gray-custom-500 mt-1.5">
                <span>Captado: R$ {oferta.valorCaptado.toLocaleString('pt-BR')}</span>
                <span>Meta: R$ {oferta.metaCapitacao.toLocaleString('pt-BR')}</span>
            </div>
             <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="bg-gray-custom-100 p-2 rounded-md">
                    <p className="text-xs text-gray-custom-600">Retorno Estimado</p>
                    <p className="font-semibold text-brand-primary text-sm">{oferta.taxaRetornoEstimada}</p>
                </div>
                <div className="bg-gray-custom-100 p-2 rounded-md">
                    <p className="text-xs text-gray-custom-600">Prazo do Título</p>
                    <p className="font-semibold text-brand-primary text-sm">{oferta.prazoTituloMeses} meses</p>
                </div>
                 <div className="bg-gray-custom-100 p-2 rounded-md">
                    <p className="text-xs text-gray-custom-600">Mín. p/ Sucesso</p>
                    <p className="font-semibold text-brand-primary text-sm">R$ {oferta.minimoSucesso.toLocaleString('pt-BR')}</p>
                </div>
                <div className="bg-yellow-100 p-2 rounded-md">
                    <p className="text-xs text-yellow-700">Encerra em</p>
                    <p className="font-semibold text-yellow-800 text-sm">{oferta.prazoRestanteOfertaDias} dias</p>
                </div>
            </div>
        </div>
      </header>

      {/* Conteúdo Principal: Abas e Box de Investimento */}
      <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
        {/* Coluna das Abas */}
        <div className="flex-grow lg:w-2/3">
          <div className="mb-1 bg-gray-custom-100 rounded-lg p-1 flex space-x-1 shadow-sm">
            <TabButton isActive={activeTab === 'resumo'} onClick={() => setActiveTab('resumo')}>Resumo da Oferta</TabButton>
            <TabButton isActive={activeTab === 'cvm88'} onClick={() => setActiveTab('cvm88')}>Info CVM 88</TabButton>
            <TabButton isActive={activeTab === 'documentos'} onClick={() => setActiveTab('documentos')}>Documentos</TabButton>
            <TabButton isActive={activeTab === 'forum'} onClick={() => setActiveTab('forum')}>Fórum ({forumMensagens.length})</TabButton>
          </div>
          <div className="bg-transparent rounded-b-lg min-h-[300px]"> {/* bg-white p-6 shadow-card */}
            {renderTabContent()}
          </div>
        </div>

        {/* Coluna do Box de Investimento (Sidebar) */}
        <aside className="lg:w-1/3 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-card sticky top-24"> {/* sticky para acompanhar scroll */}
            <h3 className="text-xl font-semibold text-brand-primary mb-1">Invista nesta Oferta</h3>
            <p className="text-xs text-gray-custom-500 mb-4">Valor por {oferta.token}: R$ {oferta.valorPorToken.toLocaleString('pt-BR')}</p>
            
            <form onSubmit={handleInvestir} className="space-y-4">
              <div>
                <label htmlFor="quantidadeTokens" className="block text-sm font-medium text-gray-custom-700 mb-1">
                  Quantidade de {oferta.token}
                </label>
                <input
                  type="number"
                  id="quantidadeTokens"
                  name="quantidadeTokens"
                  min="1"
                  // max={Math.floor(limiteInvestidorParaOferta / oferta.valorPorToken)} // Adicionar lógica de max
                  value={quantidadeTokensInvestir}
                  onChange={(e) => setQuantidadeTokensInvestir(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full p-2.5 border border-gray-custom-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary"
                />
              </div>
              <div className="bg-gray-custom-100 p-3 rounded-md text-center">
                <p className="text-sm text-gray-custom-600">Valor Total do Investimento:</p>
                <p className="text-2xl font-bold text-brand-primary">R$ {valorTotalInvestimento.toLocaleString('pt-BR')}</p>
              </div>
              <p className="text-xs text-gray-custom-500">
                Seu limite de investimento disponível para esta e outras ofertas é de R$ {limiteInvestidorParaOferta.toLocaleString('pt-BR')}.
              </p>

              {erroInvestimento && <p className="text-sm text-red-600 bg-red-100 p-2 rounded-md">{erroInvestimento}</p>}
              {sucessoInvestimento && <p className="text-sm text-green-600 bg-green-100 p-2 rounded-md flex items-center"><CheckCircle size={18} className="mr-2"/> {sucessoInvestimento}</p>}

              <div className="space-y-2 text-xs">
                <label className="flex items-start">
                    <input type="checkbox" required className="h-4 w-4 text-brand-primary border-gray-custom-300 rounded focus:ring-brand-primary mt-0.5 mr-2"/>
                    <span>Confirmo que li e entendi todas as <strong>Informações Essenciais da Oferta</strong>, o Contrato de Investimento Coletivo (Minuta) e os <strong>Alertas de Risco</strong>.</span>
                </label>
                <label className="flex items-start">
                    <input type="checkbox" required className="h-4 w-4 text-brand-primary border-gray-custom-300 rounded focus:ring-brand-primary mt-0.5 mr-2"/>
                    <span>Estou ciente de que este investimento é de risco e que posso exercer meu direito de desistência em até <strong>5 dias corridos</strong> após a confirmação do investimento (Art. 3º, III CVM 88).</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={sucessoInvestimento !== ''} // Desabilita após sucesso para evitar reenvio
                className="w-full bg-brand-accent hover:bg-brand-accent-dark text-brand-primary-dark font-semibold py-3 px-4 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sucessoInvestimento ? 'Investimento Registrado!' : 'Investir Agora'}
              </button>
            </form>
            <p className="text-xs text-gray-custom-500 mt-4 text-center">
                Os recursos ficam reservados e só são transferidos à empresa se a meta mínima for atingida.
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-card text-sm">
            <h4 className="font-semibold text-gray-custom-700 mb-2 flex items-center"><AlertTriangle size={18} className="mr-2 text-yellow-500"/> Lembretes Importantes</h4>
            <ul className="list-disc list-inside text-gray-custom-600 space-y-1 pl-1">
                <li>Investimentos em crowdfunding são de alto risco.</li>
                <li>Diversifique sua carteira.</li>
                <li>Não invista um valor que você não pode perder.</li>
                <li>Analise todos os documentos da oferta.</li>
            </ul>
            <Link to="/material-didatico" className="text-brand-primary hover:underline text-xs mt-3 block text-center">Acesse nosso Material Didático</Link>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default OfertaDetalhePage;

