// Dados mockados para simular um usuário e ofertas
// Em uma aplicação real, esses dados viriam de uma API.

export const mockUser = {
  id: 'usr123abc',
  nomeCompleto: 'João Investidor Silva',
  cpf: '123.456.789-00',
  dataNascimento: '1990-05-15',
  email: 'joao.investidor@email.com', // Email para login mockado
  endereco: {
    cep: '12345-678',
    logradouro: 'Rua das Palmeiras',
    numero: '10',
    complemento: 'Apto 3B',
    bairro: 'Centro',
    cidade: 'Cidade Exemplo',
    estado: 'SP',
  },
  informacoesFinanceiras: {
    rendaBrutaAnual: 'R$ 100.001 a R$ 200.000',
    valorInvestimentos: 'R$ 50.001 a R$ 200.000',
  },
  limites: {
    // O cálculo real do limite de investimento conforme CVM 88 seria feito na lógica da aplicação
    limiteAnualCalculado: 20000, // Exemplo: R$20.000 ou 10% da renda/investimentos
    valorInvestidoAnoCorrente: 1000, // Simulação de já ter investido na Empresa X
  },
  declaracoes: {
    informacoesVerdadeiras: true,
    investidorQualificado: false, // Pode ser alterado no perfil
    cienteLimiteInvestimento: true,
    cienteRiscos: true,
    aceiteTermos: true,
  },
  carteiraDigital: { // Para simular saldo de stablecoins e tokens
    BRLCoin: 45.00, // Saldo após um pagamento de juros simulado da Empresa X
    PADXTOK: 10,
    AGROTK: 0,
  },
  investimentos: [
    {
      id: 'invPadX001', // ID único do investimento
      ofertaId: 'empresaX', // ID da oferta correspondente
      nomeEmpresa: 'Empresa X Soluções em Panificação Artesanal Ltda.',
      token: 'PADXTOK',
      valorInvestido: 1000,
      quantidadeTokens: 10,
      dataInvestimento: '2025-04-10', // Formato YYYY-MM-DD
      status: 'Em rendimento', // Outros status: 'Finalizado', 'Liquidado Antecipadamente'
      taxaRetornoContratada: '18% a.a. (Prefixado)',
      prazoTotalMeses: 24,
      pagamentosJuros: [
        { id: 'pj001X', trimestre: 1, referencia: 'Jul/2025', dataPagamentoEfetiva: '2025-07-10', valorPago: 45.00, status: 'Pago', transacaoBlockchainId: '0x123abc456def7890123abc456def7890123abc456def7890123abc456def' },
        { id: 'pj002X', trimestre: 2, referencia: 'Out/2025', dataPagamentoPrevista: '2025-10-10', valorEstimado: 45.00, status: 'Disponível para Saque' },
        { id: 'pj003X', trimestre: 3, referencia: 'Jan/2026', dataPagamentoPrevista: '2026-01-10', valorEstimado: 45.00, status: 'Pendente' },
        // ... mais pagamentos de juros
      ],
      pagamentoPrincipal: {
        dataPagamentoPrevista: '2027-04-10', // 24 meses após dataInvestimento
        valorEstimado: 1000,
        status: 'Pendente'
      }
    }
    // Adicionar mais investimentos mockados se necessário
  ]
};

export const mockOfertas = [
  {
    id: 'empresaX',
    nomeEmpresa: 'Empresa X Soluções em Panificação Artesanal Ltda.',
    token: 'PADXTOK',
    logoUrl: 'https://placehold.co/150x150/00796b/FFFFFF?text=EmpX&font=inter',
    resumo: 'Invista na expansão da padaria artesanal que conquistou o bairro! Compra de novo forno e reforma da segunda loja para aumentar a produção e atender mais clientes.',
    metaCapitacao: 300000,
    minimoSucesso: 200000,
    valorCaptado: 150000, // Simulação de captação em andamento
    taxaRetornoEstimada: '18% a.a. (Juros Prefixados)',
    prazoTituloMeses: 24,
    prazoRestanteOfertaDias: 25,
    valorPorToken: 100,
    investidoresParticipantes: 23,
    tipoInvestimento: 'Dívida (Contrato de Investimento Coletivo)',
    detalhesCompletos: {
      cnpj: '11.222.333/0001-44 (Fictício)',
      setorAtuacao: 'Alimentício / Panificação Artesanal',
      fundacao: '2022',
      localizacao: 'Bairro Felicidade, Cidade Exemplo - SP',
      resumoEmpresa: 'Fundada há 3 anos pela Dona Maria, a Empresa X rapidamente se tornou uma referência em pães artesanais, bolos caseiros e cafés especiais no bairro Felicidade. Com uma clientela fiel e crescente, a empresa busca expandir sua capacidade produtiva e alcançar novos clientes com a abertura de uma segunda unidade em uma área estratégica da cidade.',
      equipePrincipal: [
        { nome: 'Dona Maria da Silva', cargo: 'Sócia-Administradora e Mestre Padeira', bio: 'Apaixonada por panificação desde jovem, com 15 anos de experiência no setor.' },
        { nome: 'Carlos Alberto Souza', cargo: 'Gerente de Operações (Nova Loja)', bio: 'Profissional com 10 anos de experiência em gestão de varejo alimentício.' }
      ],
      diferenciaisCompetitivos: ['Produtos frescos feitos com ingredientes selecionados', 'Receitas tradicionais com toque de inovação', 'Atendimento personalizado e ambiente acolhedor', 'Forte presença e engajamento com a comunidade local'],
      planoDeNegocios: {
        objetivoPrincipal: 'Aumentar a capacidade produtiva da loja matriz e inaugurar uma segunda unidade para expandir o alcance da marca e atender à crescente demanda.',
        usoDosRecursosCaptados: [
          { item: 'Aquisição de Forno Industrial XPT-5000 (Matriz)', valor: 100000, percentual: 33.33 },
          { item: 'Reforma e Adaptação do Ponto Comercial (Filial Rua das Flores)', valor: 150000, percentual: 50.00 },
          { item: 'Capital de Giro Inicial (Filial - Estoque, Marketing de Lançamento)', valor: 50000, percentual: 16.67 },
        ],
        projecoesFinanceirasResumo: 'Estimativa de aumento de 40% no faturamento da loja matriz com o novo forno. A nova loja tem potencial para atingir 80% do faturamento da matriz no primeiro ano de operação, com ponto de equilíbrio esperado em 6 meses. Detalhes completos e premissas no documento "Plano de Negócios Detalhado".',
        estrategiaSaidaInvestidor: 'Pagamento integral do principal e juros no vencimento do título. Não há previsão de conversão em equity para esta oferta.'
      },
      condicoesDoTitulo: {
        instrumento: 'Contrato de Investimento Coletivo (CIC) - Dívida',
        remuneracao: '18% ao ano, juros prefixados.',
        periodicidadeJuros: 'Trimestral, pagos via smart contract na plataforma (em BRL Coin).',
        pagamentoPrincipal: 'Integralmente ao final dos 24 meses.',
        amortizacao: 'Sistema Bullet (principal ao final).',
        garantias: 'Aval dos sócios e cessão fiduciária de 120% dos recebíveis de cartões da empresa (limitado ao saldo devedor da operação).',
        valorMinimoInvestimento: 100, // 1 token
      },
      informacoesFinanceirasHistoricas: {
        receitaBruta2023: 1800000,
        receitaBruta2024: 2000000,
        lucroLiquido2024: 250000,
        principaisIndicadores: 'Margem Bruta: 60%, EBITDA: 20%. Endividamento atual baixo, focado em financiamento de equipamentos de pequeno porte.'
      },
      documentosDisponiveis: [ // Links simulados
        { nome: 'Contrato Social Consolidado - Empresa X.pdf', url: '#doc1', tipo: 'Jurídico' },
        { nome: 'Contrato de Investimento Coletivo PADXTOK (Minuta).pdf', url: '#doc2', tipo: 'Oferta' },
        { nome: 'Demonstrações Financeiras Simplificadas 2024 - Empresa X.pdf (Não Auditadas)', url: '#doc3', tipo: 'Financeiro' },
        { nome: 'Plano de Negócios Detalhado e Projeções (5 anos).pdf', url: '#doc4', tipo: 'Negócios' },
        { nome: 'Certidão Negativa de Débitos Federais - Empresa X.pdf', url: '#doc5', tipo: 'Jurídico' },
        { nome: 'Material Publicitário da Oferta.pdf', url: '#doc6', tipo: 'Oferta' },
      ],
      forumDisk: [ // Fórum de discussão simulado
        { id: 'q1', autor: 'Investidor Curioso', data: '2025-05-10 10:30', pergunta: 'Olá Dona Maria, qual a principal estratégia para atrair clientes para a nova loja, considerando a concorrência local?', respostaPlataforma: null, respostaEmpresa: 'Olá Investidor! Nossa estratégia inclui um forte marketing de inauguração, parcerias com comércios locais, e claro, a qualidade já conhecida dos nossos produtos. Também teremos um programa de fidelidade especial para os primeiros clientes da filial!', dataRespostaEmpresa: '2025-05-10 14:00' },
        { id: 'q2', autor: 'Ana Analista', data: '2025-05-11 09:15', pergunta: 'A projeção de aumento de 40% na matriz com o novo forno parece otimista. Quais são as premissas para esse crescimento?', respostaPlataforma: 'Ana, a Empresa X detalha no Plano de Negócios (página 12) que o forno atual opera em capacidade máxima nos horários de pico, e há demanda reprimida. O novo forno permitirá dobrar a produção de pães especiais e reduzir o tempo de espera.', dataRespostaPlataforma: '2025-05-11 11:00', respostaEmpresa: null },
      ],
      alertasDeRiscoEspecificos: [
        'Risco de execução do plano de expansão (atrasos na reforma, dificuldades na contratação para a nova loja).',
        'Flutuação nos preços de insumos básicos (farinha, manteiga, energia).',
        'Aumento da concorrência no setor de panificação artesanal na região da nova filial.',
        'Dependência da figura da Dona Maria para a qualidade e gestão do negócio.',
        'Risco de crédito e inadimplência da Empresa X no pagamento dos juros ou principal.'
      ],
      // Campos do Anexo E da CVM 88 (alguns já cobertos, outros a adicionar)
      cvm88AnexoE: {
        secao5_informacoesContinuas: 'A Empresa X se compromete a disponibilizar, via plataforma SuaPlataformaCrowd, relatórios semestrais contendo: (a) resumo do desempenho financeiro do período; (b) principais acontecimentos e desafios; (c) atualização sobre o uso dos recursos captados e o andamento do plano de negócios. Estes relatórios não serão auditados, a menos que a empresa atinja os critérios de obrigatoriedade de auditoria previstos na Resolução CVM 88.',
        secao7_processosJudiciais: 'A Empresa X declara, para a presente data, não ser parte em processos judiciais, administrativos ou arbitrais relevantes, não sigilosos, que possam, isoladamente ou em conjunto, impactar adversamente suas operações ou capacidade de honrar os compromissos desta oferta.',
        secao8_conflitosInteresse: 'A SuaPlataformaCrowd, na qualidade de plataforma eletrônica de investimento participativo, recebe uma taxa de sucesso de 6% sobre o montante efetivamente captado pela Empresa X. Não há outras relações comerciais, societárias ou de controle entre a plataforma (ou seus administradores e sócios) e a Empresa X (ou seus administradores e sócios) que caracterizem conflito de interesses material para esta oferta.',
        secao9_remuneracaoPlataforma: 'Taxa de sucesso: 6% (seis por cento) incidentes sobre o valor total dos recursos captados pela Empresa X por meio desta oferta. Esta taxa é devida pela Empresa X à SuaPlataformaCrowd apenas se a captação atingir o valor alvo mínimo.',
        secao10_tributacaoAplicavel: 'Os rendimentos auferidos pelos investidores nesta oferta (juros) são, em geral, sujeitos à incidência de Imposto de Renda Retido na Fonte (IRRF), conforme alíquotas regressivas aplicáveis a investimentos de renda fixa, variando de 22,5% a 15% de acordo com o prazo da aplicação. Ganhos de capital na eventual negociação dos títulos em mercado secundário também podem estar sujeitos à tributação. Recomenda-se que cada investidor consulte um profissional de contabilidade ou assessoria tributária para entender as implicações fiscais específicas à sua situação individual.',
      }
    }
  },
  // Outra oferta para diversificar a dashboard
  {
    id: 'techInova',
    nomeEmpresa: 'TechInova Soluções Agrícolas S.A.',
    token: 'AGROTK',
    logoUrl: 'https://placehold.co/150x150/2E7D32/FFFFFF?text=Agro&font=inter',
    resumo: 'Financie o desenvolvimento de drones com Inteligência Artificial para otimizar a agricultura de precisão e aumentar a produtividade no campo.',
    metaCapitacao: 700000,
    minimoSucesso: 500000,
    valorCaptado: 350000,
    taxaRetornoEstimada: 'CDI + 6% a.a.',
    prazoTituloMeses: 36,
    prazoRestanteOfertaDias: 40,
    valorPorToken: 500,
    investidoresParticipantes: 15,
    tipoInvestimento: 'Debênture Conversível',
    detalhesCompletos: { // Preencher com detalhes fictícios similares ao da Empresa X
      cnpj: '44.555.666/0001-77 (Fictício)',
      setorAtuacao: 'AgroTech / Tecnologia para Agricultura',
      fundacao: '2021',
      localizacao: 'Polo Tecnológico de Campinas - SP',
      resumoEmpresa: 'A TechInova é uma startup de base tecnológica focada em desenvolver soluções inovadoras para o agronegócio. Seu produto principal é uma plataforma de drones autônomos equipados com IA para monitoramento de safras, identificação de pragas e pulverização seletiva, visando reduzir custos e impacto ambiental.',
      equipePrincipal: [
        { nome: 'Dr. Ricardo Alves', cargo: 'CEO e Fundador', bio: 'Engenheiro Agrônomo com PhD em Agricultura de Precisão.' },
        { nome: 'Sofia Chen', cargo: 'CTO', bio: 'Engenheira de Software com especialização em IA e Machine Learning.' }
      ],
      planoDeNegocios: {
        objetivoPrincipal: 'Finalizar o desenvolvimento do protótipo do drone AGRO-X, iniciar a produção em pequena escala e realizar os primeiros testes de campo em parceria com grandes produtores.',
        usoDosRecursosCaptados: [
          { item: 'P&D e Prototipagem Final (AGRO-X)', valor: 300000, percentual: 42.86 },
          { item: 'Estruturação da Linha de Montagem Piloto', valor: 200000, percentual: 28.57 },
          { item: 'Testes de Campo e Validação', valor: 100000, percentual: 14.28 },
          { item: 'Marketing e Prospecção Comercial Inicial', valor: 100000, percentual: 14.29 },
        ],
      },
      condicoesDoTitulo: {
        instrumento: 'Debênture Simples, Não Conversível em Ações, da Espécie com Garantia Flutuante.',
        remuneracao: '100% da Taxa DI (CDI) + 6% ao ano.',
        periodicidadeJuros: 'Semestral.',
        pagamentoPrincipal: 'No vencimento (36 meses).',
        garantias: 'Garantia flutuante sobre os ativos da empresa, incluindo patentes e equipamentos.',
      },
      documentosDisponiveis: [
        { nome: 'Prospecto Preliminar AGROTK.pdf', url: '#docAgro1', tipo: 'Oferta' },
        { nome: 'Plano de Negócios TechInova 2025-2028.pdf', url: '#docAgro2', tipo: 'Negócios' },
      ],
      alertasDeRiscoEspecificos: [
        'Risco tecnológico (desafios no desenvolvimento do produto).',
        'Risco de mercado (aceitação da solução pelos produtores, concorrência).',
        'Necessidade de futuras rodadas de captação para escalar a produção.',
      ],
      cvm88AnexoE: {
        // ... Preencher campos relevantes do Anexo E para esta oferta
        secao5_informacoesContinuas: 'Relatórios trimestrais de avanço do projeto e desempenho financeiro simplificado.',
        secao9_remuneracaoPlataforma: '5.5% sobre o valor efetivamente captado.',
      }
    }
  }
];

