import React from 'react';

// Página de exemplo para Política de Privacidade
const PrivacidadePage = () => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-card">
      <h1 className="text-2xl md:text-3xl font-bold text-brand-primary mb-6">Política de Privacidade</h1>

      <div className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl max-w-none text-gray-custom-700">
        <p className="mb-4">
          A SuaPlataformaCrowd ("nós", "nosso" ou "Plataforma") está comprometida em proteger a privacidade
          dos seus usuários ("você", "seu"). Esta Política de Privacidade descreve como coletamos, usamos,
          armazenamos, compartilhamos e protegemos suas informações pessoais quando você utiliza nossos Serviços.
        </p>

        <h2 className="text-xl font-semibold text-gray-custom-800 mt-6 mb-3">1. Informações que Coletamos</h2>
        <p className="mb-4">
          Podemos coletar os seguintes tipos de informações:
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>
              <strong>Informações de Identificação Pessoal:</strong> Nome completo, CPF, data de nascimento, endereço de e-mail,
              endereço residencial, número de telefone, documentos de identificação (como RG ou CNH), quando você se cadastra
              e utiliza nossos serviços.
            </li>
            <li>
              <strong>Informações Financeiras:</strong> Informações sobre sua renda bruta anual, volume de investimentos financeiros,
              dados bancários para transferências (quando aplicável para aportes ou recebimento de rendimentos),
              histórico de transações na Plataforma.
            </li>
            <li>
              <strong>Informações de Uso da Plataforma:</strong> Endereço IP, tipo de navegador, sistema operacional, páginas visitadas,
              tempo gasto na plataforma, interações com ofertas e outros conteúdos. Utilizamos cookies e tecnologias
              semelhantes para coletar essas informações.
            </li>
            <li>
              <strong>Comunicações:</strong> Registros de suas comunicações conosco, incluindo e-mails, mensagens via chat
              ou interações no fórum da plataforma.
            </li>
          </ul>
        </p>

        <h2 className="text-xl font-semibold text-gray-custom-800 mt-6 mb-3">2. Como Usamos Suas Informações</h2>
        <p className="mb-4">
          Utilizamos suas informações pessoais para os seguintes propósitos:
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Fornecer, operar e manter nossos Serviços.</li>
            <li>Processar seu cadastro, verificar sua identidade (KYC - Conheça Seu Cliente) e realizar verificações
              de prevenção à lavagem de dinheiro (AML - Anti-Money Laundering).</li>
            <li>Personalizar sua experiência na Plataforma.</li>
            <li>Processar seus investimentos e facilitar os pagamentos de rendimentos.</li>
            <li>Comunicarmo-nos com você sobre sua conta, transações, atualizações da plataforma e ofertas que possam
              ser do seu interesse (com seu consentimento, quando necessário).</li>
            <li>Cumprir obrigações legais e regulatórias, incluindo as exigências da Comissão de Valores Mobiliários (CVM).</li>
            <li>Analisar o uso da Plataforma para melhorar nossos Serviços.</li>
            <li>Prevenir fraudes e garantir a segurança da Plataforma.</li>
          </ul>
        </p>

        <h2 className="text-xl font-semibold text-gray-custom-800 mt-6 mb-3">3. Compartilhamento de Informações</h2>
        <p className="mb-4">
          Não vendemos suas informações pessoais. Podemos compartilhar suas informações nas seguintes circunstâncias:
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>
              <strong>Com Empresas Emissoras:</strong> Informações necessárias para que as empresas emissoras das ofertas
              em que você investiu possam cumprir suas obrigações legais e contratuais (ex: envio de informes).
            </li>
            <li>
              <strong>Com Prestadores de Serviço:</strong> Terceiros que nos auxiliam na operação da Plataforma, como
              provedores de serviços de pagamento, verificação de identidade, análise de dados, e hospedagem.
              Exigimos que esses prestadores protejam suas informações.
            </li>
            <li>
              <strong>Por Obrigação Legal:</strong> Se formos obrigados por lei, processo judicial ou solicitação governamental
              (incluindo a CVM) a divulgar suas informações.
            </li>
            <li>
              <strong>Para Proteção e Segurança:</strong> Para proteger nossos direitos, privacidade, segurança ou propriedade,
              e/ou de nossos afiliados, você ou outros.
            </li>
          </ul>
        </p>

        <h2 className="text-xl font-semibold text-gray-custom-800 mt-6 mb-3">4. Segurança das Informações</h2>
        <p className="mb-4">
          Implementamos medidas de segurança técnicas, administrativas e físicas para proteger suas informações
          pessoais contra acesso não autorizado, uso, alteração ou destruição. No entanto, nenhum sistema de
          transmissão ou armazenamento de dados é 100% seguro.
        </p>

        <h2 className="text-xl font-semibold text-gray-custom-800 mt-6 mb-3">5. Seus Direitos</h2>
        <p className="mb-4">
          De acordo com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018), você tem o direito de:
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Confirmar a existência de tratamento de seus dados.</li>
            <li>Acessar seus dados.</li>
            <li>Corrigir dados incompletos, inexatos ou desatualizados.</li>
            <li>Anonimizar, bloquear ou eliminar dados desnecessários, excessivos ou tratados em desconformidade com a LGPD.</li>
            <li>Solicitar a portabilidade dos dados a outro fornecedor de serviço ou produto.</li>
            <li>Eliminar dados pessoais tratados com o seu consentimento.</li>
            <li>Obter informação sobre o compartilhamento de seus dados.</li>
            <li>Revogar o consentimento, quando aplicável.</li>
          </ul>
          Para exercer seus direitos, entre em contato conosco através do e-mail: privacidade@suaplatacrowd.com.br.
        </p>

        {/* Adicionar mais seções: Cookies, Retenção de Dados, Transferência Internacional, Alterações na Política, Contato */}
        
        <h2 className="text-xl font-semibold text-gray-custom-800 mt-6 mb-3">6. Contato</h2>
        <p className="mb-4">
          Se você tiver alguma dúvida sobre esta Política de Privacidade ou sobre nossas práticas de tratamento de dados,
          entre em contato conosco:
          <br />
          SuaPlataformaCrowd - Encarregado de Proteção de Dados (DPO)
          <br />
          E-mail: dpo@suaplatacrowd.com.br
        </p>

        <p className="mt-8">
          Última atualização: 14 de Maio de 2025.
        </p>
      </div>
    </div>
  );
};

export default PrivacidadePage;

