import React from 'react';
import { Link } from 'react-router-dom'; // Para links internos como Termos e Privacidade
import { ShieldAlert } from 'lucide-react'; // Ícone para o aviso da CVM

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-custom-800 text-gray-custom-300 py-10 mt-auto"> {/* mt-auto para empurrar para baixo se o conteúdo for pouco */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Sobre a Plataforma */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-3">SuaPlataformaCrowd</h5>
            <p className="text-sm text-gray-custom-400 leading-relaxed">
              Conectando investidores a pequenas e médias empresas com potencial de crescimento,
              através de crowdfunding de investimento tokenizado.
            </p>
          </div>

          {/* Links Úteis */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-3">Links Úteis</h5>
            <ul className="space-y-2">
              <li><Link to="/dashboard" className="text-sm text-gray-custom-400 hover:text-brand-accent transition-colors">Oportunidades</Link></li>
              <li><Link to="/como-funciona" className="text-sm text-gray-custom-400 hover:text-brand-accent transition-colors">Como Funciona</Link></li> {/* Exemplo de link */}
              <li><Link to="/faq" className="text-sm text-gray-custom-400 hover:text-brand-accent transition-colors">FAQ</Link></li> {/* Exemplo de link */}
              <li><Link to="/contato" className="text-sm text-gray-custom-400 hover:text-brand-accent transition-colors">Contato</Link></li> {/* Exemplo de link */}
            </ul>
          </div>

          {/* Contato e Redes Sociais */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-3">Siga-nos</h5>
            <div className="flex space-x-4 mb-4">
              {/* Adicionar ícones de redes sociais aqui, se desejar */}
              <a href="#" className="text-gray-custom-400 hover:text-brand-accent transition-colors">Facebook</a>
              <a href="#" className="text-gray-custom-400 hover:text-brand-accent transition-colors">LinkedIn</a>
              <a href="#" className="text-gray-custom-400 hover:text-brand-accent transition-colors">Instagram</a>
            </div>
            <p className="text-sm text-gray-custom-400">
              Email: <a href="mailto:contato@suaplataformacrowd.com.br" className="hover:text-brand-accent">contato@suaplatacrowd.com</a>
            </p>
          </div>
        </div>

        {/* Aviso da CVM */}
        <div className="border-t border-gray-custom-700 pt-8">
          <div className="bg-gray-custom-700 p-4 rounded-lg mb-6 flex items-start">
            <ShieldAlert size={48} className="text-yellow-400 mr-3 flex-shrink-0" />
            <div>
              <h6 className="font-semibold text-yellow-400 mb-1">AVISO IMPORTANTE CVM:</h6>
              <p className="text-xs text-gray-custom-300 leading-relaxed">
                SuaPlataformaCrowd é uma plataforma eletrônica de investimento participativo autorizada pela Comissão de Valores Mobiliários (CVM) para realizar ofertas públicas de distribuição de valores mobiliários de emissão de sociedades empresárias de pequeno porte com dispensa de registro, nos termos da Resolução CVM nº 88/2022.
                As sociedades empresárias de pequeno porte e as ofertas apresentadas nesta plataforma estão automaticamente dispensadas de registro pela CVM.
                A CVM não analisa previamente as ofertas. As ofertas realizadas não implicam por parte da CVM a garantia da veracidade das informações prestadas, de adequação à legislação vigente ou julgamento sobre a qualidade da sociedade empresária de pequeno porte.
                Antes de aceitar uma oferta, leia com atenção as informações essenciais da oferta, em especial a seção de alertas sobre riscos. O investimento em sociedades empresárias de pequeno porte é um investimento de risco e há possibilidade de perda da totalidade do capital investido.
              </p>
            </div>
          </div>
          
          <div className="text-center text-sm text-gray-custom-500">
            <p className="mb-1">
              SuaPlataformaCrowd Intermediações Financeiras Ltda. CNPJ: 00.000.000/0001-00.
            </p>
            <p className="mb-1">
              Endereço: Rua Fictícia, 123, Sala 45, Cidade Exemplo - UF, CEP 00000-000.
            </p>
            <p>
              &copy; {currentYear} SuaPlataformaCrowd. Todos os direitos reservados.
              <Link to="/termos" className="text-gray-custom-400 hover:text-brand-accent mx-1">Termos de Uso</Link>
              |
              <Link to="/privacidade" className="text-gray-custom-400 hover:text-brand-accent ml-1">Política de Privacidade</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
