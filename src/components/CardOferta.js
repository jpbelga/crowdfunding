import React from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import { TrendingUp, Clock, Target, Users, CalendarDays, Tag } from 'lucide-react'; // Ícones

const CardOferta = ({ oferta }) => {
  // Calcula o percentual captado, tratando divisão por zero se metaCapitacao for 0
  const percentualCaptado = oferta.metaCapitacao > 0 ? (oferta.valorCaptado / oferta.metaCapitacao) * 100 : 0;

  return (
    <div className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col h-full">
      {/* Imagem da Oferta (Opcional) - Você pode adicionar um campo imageUrl ao mockOfertas */}
      {/* <img src={oferta.imageUrl || `https://placehold.co/600x400/00796b/FFFFFF?text=${oferta.token}&font=inter`} alt={`Imagem ${oferta.nomeEmpresa}`} className="w-full h-48 object-cover rounded-t-xl"/> */}
      
      <div className="p-5 md:p-6 flex-grow flex flex-col">
        <div className="flex items-start mb-3">
          <img 
            src={oferta.logoUrl} 
            alt={`Logo ${oferta.nomeEmpresa}`} 
            className="w-14 h-14 md:w-16 md:h-16 rounded-lg mr-4 object-contain border border-gray-custom-200 shadow-sm" 
            onError={(e) => {
              e.target.onerror = null; // Evita loop se o placeholder também falhar
              e.target.src='https://placehold.co/100x100/E0E0E0/757575?text=Logo&font=inter';
            }}
          />
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-brand-primary leading-tight hover:text-brand-primary-dark transition-colors">
              <Link to={`/oferta/${oferta.id}`}>{oferta.nomeEmpresa}</Link>
            </h3>
            <span className="text-xs bg-brand-secondary text-brand-primary-dark font-semibold px-2 py-0.5 rounded-full inline-block mt-1">
              {oferta.token}
            </span>
          </div>
        </div>
        
        <p className="text-gray-custom-700 text-sm mb-4 line-clamp-3 flex-grow" title={oferta.resumo}> {/* line-clamp para limitar o texto */}
          {oferta.resumo}
        </p>

        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-custom-600 mb-1">
            <span>Captado: <span className="font-semibold text-gray-custom-800">R$ {oferta.valorCaptado.toLocaleString('pt-BR')}</span></span>
            <span>Meta: <span className="font-semibold text-gray-custom-800">R$ {oferta.metaCapitacao.toLocaleString('pt-BR')}</span></span>
          </div>
          <ProgressBar percentual={percentualCaptado} />
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs md:text-sm mb-5">
          <div className="flex items-center text-gray-custom-700" title="Taxa de Retorno Estimada">
            <TrendingUp size={16} className="text-brand-primary mr-1.5 flex-shrink-0" />
            <span>{oferta.taxaRetornoEstimada}</span>
          </div>
          <div className="flex items-center text-gray-custom-700" title="Prazo do Título">
            <CalendarDays size={16} className="text-brand-primary mr-1.5 flex-shrink-0" />
            <span>{oferta.prazoTituloMeses} meses</span>
          </div>
          <div className="flex items-center text-gray-custom-700" title="Valor Mínimo para Sucesso da Oferta">
            <Target size={16} className="text-brand-primary mr-1.5 flex-shrink-0" />
            <span>Mín: R$ {oferta.minimoSucesso.toLocaleString('pt-BR')}</span>
          </div>
          <div className="flex items-center text-gray-custom-700" title="Tipo de Investimento">
            <Tag size={16} className="text-brand-primary mr-1.5 flex-shrink-0" />
            <span>{oferta.tipoInvestimento || 'Dívida'}</span>
          </div>
          <div className="flex items-center text-yellow-600 col-span-2" title="Prazo Restante da Oferta"> {/* Ocupa duas colunas */}
            <Clock size={16} className="mr-1.5 flex-shrink-0" />
            <span className="font-medium">Oferta encerra em: {oferta.prazoRestanteOfertaDias} dias</span>
          </div>
        </div>
        
        <div className="mt-auto"> {/* Empurra o botão para o final do card */}
          <Link
            to={`/oferta/${oferta.id}`}
            className="w-full block text-center bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-300 text-sm md:text-base"
          >
            Ver Detalhes e Investir
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardOferta;

