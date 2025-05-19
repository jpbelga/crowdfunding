import React from 'react';

// Página de exemplo para Termos de Uso
const TermosPage = () => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-card">
      <h1 className="text-2xl md:text-3xl font-bold text-brand-primary mb-6">Termos de Uso</h1>
      
      <div className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl max-w-none text-gray-custom-700">
        <p className="mb-4">
          Bem-vindo à SuaPlataformaCrowd! Ao acessar ou usar nossa plataforma, você concorda em
          cumprir e estar vinculado aos seguintes termos e condições de uso. Por favor, leia
          estes termos cuidadosamente antes de usar nossos serviços.
        </p>

        <h2 className="text-xl font-semibold text-gray-custom-800 mt-6 mb-3">1. Definições</h2>
        <p className="mb-4">
          <strong>"Plataforma"</strong> refere-se ao website e aplicativos móveis da SuaPlataformaCrowd.
          <br />
          <strong>"Usuário"</strong> refere-se a qualquer pessoa que acesse ou utilize a Plataforma, seja como investidor ou representante de uma empresa emissora.
          <br />
          <strong>"Serviços"</strong> refere-se a todas as funcionalidades oferecidas pela Plataforma, incluindo a intermediação de ofertas de crowdfunding de investimento.
        </p>

        <h2 className="text-xl font-semibold text-gray-custom-800 mt-6 mb-3">2. Elegibilidade e Cadastro</h2>
        <p className="mb-4">
          Para utilizar os Serviços como investidor, você deve ser maior de 18 anos e possuir capacidade legal para contratar.
          Ao se cadastrar, você concorda em fornecer informações verdadeiras, precisas, atuais e completas sobre si mesmo,
          conforme solicitado no formulário de registro. Você é responsável por manter a confidencialidade de sua senha e conta.
        </p>
        <p className="mb-4">
          As empresas emissoras devem atender aos critérios de elegibilidade definidos pela Resolução CVM nº 88/2022 e
          passarão por um processo de análise e due diligence pela Plataforma.
        </p>

        <h2 className="text-xl font-semibold text-gray-custom-800 mt-6 mb-3">3. Natureza dos Investimentos e Riscos</h2>
        <p className="mb-4">
          A SuaPlataformaCrowd atua como intermediária, conectando investidores a sociedades empresárias de pequeno porte.
          Os investimentos realizados através da Plataforma são considerados de alto risco. Existe a possibilidade de
          perda total do capital investido.
        </p>
        <p className="mb-4">
          A Plataforma não oferece consultoria de investimento nem garante a rentabilidade ou liquidez dos valores mobiliários ofertados.
          A decisão de investir é exclusivamente sua, baseada nas informações disponibilizadas pela empresa emissora e pela Plataforma.
          Recomendamos que você leia atentamente todas as "Informações Essenciais da Oferta" e os "Alertas de Risco" antes de tomar qualquer decisão.
        </p>
        <p className="mb-4">
          A rentabilidade passada não garante rentabilidade futura. Os valores mobiliários ofertados podem ter baixa liquidez,
          dificultando a venda antes do vencimento.
        </p>

        <h2 className="text-xl font-semibold text-gray-custom-800 mt-6 mb-3">4. Obrigações da Plataforma</h2>
        <p className="mb-4">
          A SuaPlataformaCrowd se compromete a:
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Manter a Plataforma operacional e segura, dentro das melhores práticas de mercado.</li>
            <li>Realizar a devida diligência nas empresas emissoras e nas ofertas, conforme exigido pela regulamentação da CVM.</li>
            <li>Fornecer informações claras, precisas e suficientes sobre as ofertas.</li>
            <li>Cumprir todas as obrigações estabelecidas na Resolução CVM nº 88/2022.</li>
          </ul>
        </p>
        
        <h2 className="text-xl font-semibold text-gray-custom-800 mt-6 mb-3">5. Conduta do Usuário</h2>
        <p className="mb-4">
          Você concorda em não utilizar a Plataforma para fins ilegais ou não autorizados. Você não deve, no uso dos Serviços,
          violar quaisquer leis em sua jurisdição.
        </p>

        {/* Adicionar mais seções conforme necessário: Propriedade Intelectual, Limitação de Responsabilidade, Modificações nos Termos, Lei Aplicável, etc. */}

        <h2 className="text-xl font-semibold text-gray-custom-800 mt-6 mb-3">6. Disposições Gerais</h2>
        <p className="mb-4">
          Estes Termos constituem o acordo integral entre você e a SuaPlataformaCrowd em relação ao uso da Plataforma.
          Se qualquer disposição destes Termos for considerada inválida ou inexequível, tal disposição será eliminada ou
          limitada na medida mínima necessária, e as disposições restantes permanecerão em pleno vigor e efeito.
        </p>
        <p className="mb-4">
          Podemos revisar estes Termos de Uso de tempos em tempos. A versão mais atual estará sempre postada em nosso site.
          Ao continuar a usar nossos Serviços após as alterações entrarem em vigor, você concorda em estar vinculado aos termos revisados.
        </p>

        <p className="mt-8">
          Última atualização: 14 de Maio de 2025.
        </p>
      </div>
    </div>
  );
};

export default TermosPage;

