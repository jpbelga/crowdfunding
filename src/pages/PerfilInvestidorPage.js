import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { User, Mail, Phone, MapPin, Edit3, Save, Shield, DollarSign, TrendingUp, AlertTriangle, CheckSquare, XSquare, Link, Info, CalendarCheck } from 'lucide-react'; // Ícones

// Componente reutilizável para campos de formulário no perfil
const ProfileInput = ({ label, id, value, onChange, type = "text", disabled, error, icon: Icon }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-custom-700 mb-1 flex items-center">
      {Icon && <Icon size={16} className="mr-2 text-gray-custom-500" />}
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-custom-300'} rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary sm:text-sm ${disabled ? 'bg-gray-custom-100 cursor-not-allowed' : 'bg-white'}`}
    />
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);

const ProfileSelect = ({ label, id, value, onChange, disabled, error, icon: Icon, children }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-custom-700 mb-1 flex items-center">
      {Icon && <Icon size={16} className="mr-2 text-gray-custom-500" />}
      {label}
    </label>
    <select
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-custom-300'} rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary sm:text-sm ${disabled ? 'bg-gray-custom-100 cursor-not-allowed' : 'bg-white'}`}
    >
      {children}
    </select>
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);


const PerfilInvestidorPage = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [errors, setErrors] = useState({});
  const [saveFeedback, setSaveFeedback] = useState({ message: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        nomeCompleto: user.nomeCompleto || '',
        cpf: user.cpf || '', // Geralmente não editável
        dataNascimento: user.dataNascimento || '',
        email: user.email || '', // Geralmente não editável ou com processo de verificação
        // Endereço
        cep: user.endereco?.cep || '',
        logradouro: user.endereco?.logradouro || '',
        numero: user.endereco?.numero || '',
        complemento: user.endereco?.complemento || '',
        bairro: user.endereco?.bairro || '',
        cidade: user.endereco?.cidade || '',
        estado: user.endereco?.estado || 'SP',
        // Financeiro
        rendaBrutaAnual: user.informacoesFinanceiras?.rendaBrutaAnual || '',
        valorInvestimentos: user.informacoesFinanceiras?.valorInvestimentos || '',
        // Declarações (visualização, geralmente não editáveis diretamente aqui)
        declInvestidorQualificado: user.declaracoes?.investidorQualificado || false,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) setErrors(prev => ({...prev, [name]: null}));
  };

  const validateProfileForm = () => {
    const newErrors = {};
    if (!formData.nomeCompleto.trim()) newErrors.nomeCompleto = "Nome completo é obrigatório.";
    if (!formData.dataNascimento) newErrors.dataNascimento = "Data de nascimento é obrigatória.";
    // Adicionar mais validações se necessário para campos editáveis
    if (!formData.cep.trim()) newErrors.cep = "CEP é obrigatório.";
    if (!formData.logradouro.trim()) newErrors.logradouro = "Logradouro é obrigatório.";
    if (!formData.numero.trim()) newErrors.numero = "Número é obrigatório.";
    if (!formData.bairro.trim()) newErrors.bairro = "Bairro é obrigatório.";
    if (!formData.cidade.trim()) newErrors.cidade = "Cidade é obrigatória.";
    if (!formData.estado) newErrors.estado = "Estado é obrigatório.";
    if (!formData.rendaBrutaAnual) newErrors.rendaBrutaAnual = "Renda bruta anual é obrigatória.";
    if (!formData.valorInvestimentos) newErrors.valorInvestimentos = "Valor de investimentos é obrigatório.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    setSaveFeedback({ message: '', type: '' });
    if (!validateProfileForm()) {
        setSaveFeedback({ message: 'Por favor, corrija os erros no formulário.', type: 'error' });
        return;
    }

    // Simulação de salvar
    // console.log("Salvando dados do perfil:", formData);
    await new Promise(resolve => setTimeout(resolve, 700)); // Simula delay de API

    // Atualiza o usuário no AuthContext (e localStorage)
    updateUser({
      nomeCompleto: formData.nomeCompleto,
      dataNascimento: formData.dataNascimento,
      endereco: {
        cep: formData.cep,
        logradouro: formData.logradouro,
        numero: formData.numero,
        complemento: formData.complemento,
        bairro: formData.bairro,
        cidade: formData.cidade,
        estado: formData.estado,
      },
      informacoesFinanceiras: {
        rendaBrutaAnual: formData.rendaBrutaAnual,
        valorInvestimentos: formData.valorInvestimentos,
      },
      declaracoes: { // Atualiza a declaração de investidor qualificado se foi alterada
        ...user.declaracoes,
        investidorQualificado: formData.declInvestidorQualificado,
      }
    });
    setSaveFeedback({ message: 'Perfil atualizado com sucesso!', type: 'success' });
    setIsEditing(false);
  };
  
  const handleCepBlur = async () => {
    const cepValue = formData.cep.replace(/\D/g, '');
    if (cepValue.length === 8) {
      // Simulação de busca de CEP
      if (cepValue === "01001000") {
        setFormData(prev => ({
          ...prev,
          logradouro: 'Praça da Sé',
          bairro: 'Sé',
          cidade: 'São Paulo',
          estado: 'SP',
        }));
        setErrors(prev => ({...prev, cep: null}));
      } else {
        setErrors(prev => ({ ...prev, cep: "CEP não encontrado (teste com 01001000)." }));
      }
    } else if (cepValue.length > 0) {
        setErrors(prev => ({ ...prev, cep: "CEP inválido." }));
    }
  };


  if (!user || !formData) {
    return <div className="text-center py-10">Carregando perfil do investidor...</div>;
  }

  const { limiteAnualCalculado = 0, valorInvestidoAnoCorrente = 0 } = user.limites || {};
  const saldoDisponivelInvestimento = limiteAnualCalculado - valorInvestidoAnoCorrente;

  const estadosBrasileiros = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
    'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-card">
        <div className="flex justify-between items-center mb-6 border-b border-gray-custom-200 pb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-brand-primary flex items-center">
            <User size={28} className="mr-3" /> Meu Perfil
          </h1>
          <button
            onClick={() => {
              if (isEditing) {
                handleSave(); // Salva se estiver editando
              } else {
                setIsEditing(true); // Entra no modo de edição
                setSaveFeedback({ message: '', type: '' }); // Limpa feedback anterior
              }
            }}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center
                        ${isEditing 
                          ? 'bg-green-500 hover:bg-green-600 text-white' 
                          : 'bg-brand-primary hover:bg-brand-primary-dark text-white'
                        }`}
          >
            {isEditing ? <Save size={16} className="mr-2" /> : <Edit3 size={16} className="mr-2" />}
            {isEditing ? 'Salvar Alterações' : 'Editar Perfil'}
          </button>
        </div>

        {saveFeedback.message && (
          <div className={`p-3 mb-4 rounded-md text-sm ${saveFeedback.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {saveFeedback.message}
          </div>
        )}

        {/* Dados Pessoais */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-custom-800 mb-4">Dados Pessoais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <ProfileInput label="Nome Completo" id="nomeCompleto" value={formData.nomeCompleto} onChange={handleChange} disabled={!isEditing || isLoading} error={errors.nomeCompleto} icon={User}/>
            <ProfileInput label="CPF" id="cpf" value={formData.cpf} disabled icon={Info} /> {/* CPF geralmente não é editável */}
            <ProfileInput label="Data de Nascimento" id="dataNascimento" type="date" value={formData.dataNascimento} onChange={handleChange} disabled={!isEditing || isLoading} error={errors.dataNascimento} icon={CalendarCheck}/>
            <ProfileInput label="E-mail" id="email" type="email" value={formData.email} disabled icon={Mail}/> {/* Email geralmente não é editável ou requer verificação */}
          </div>
        </section>

        {/* Endereço */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-custom-800 mb-4">Endereço</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <ProfileInput label="CEP" id="cep" value={formData.cep} onChange={(e) => handleChange({target: {name: 'cep', value: e.target.value.replace(/\D/g,'').slice(0,8)}})} onBlur={handleCepBlur} disabled={!isEditing || isLoading} error={errors.cep} icon={MapPin}/>
            <ProfileInput label="Logradouro" id="logradouro" value={formData.logradouro} onChange={handleChange} disabled={!isEditing || isLoading} error={errors.logradouro} />
            <ProfileInput label="Número" id="numero" value={formData.numero} onChange={handleChange} disabled={!isEditing || isLoading} error={errors.numero} />
            <ProfileInput label="Complemento" id="complemento" value={formData.complemento} onChange={handleChange} disabled={!isEditing || isLoading} />
            <ProfileInput label="Bairro" id="bairro" value={formData.bairro} onChange={handleChange} disabled={!isEditing || isLoading} error={errors.bairro} />
            <ProfileInput label="Cidade" id="cidade" value={formData.cidade} onChange={handleChange} disabled={!isEditing || isLoading} error={errors.cidade} />
            <ProfileSelect label="Estado" id="estado" value={formData.estado} onChange={handleChange} disabled={!isEditing || isLoading} error={errors.estado}>
                {estadosBrasileiros.map(uf => <option key={uf} value={uf}>{uf}</option>)}
            </ProfileSelect>
          </div>
        </section>

        {/* Informações Financeiras e Limites */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-custom-800 mb-4">Perfil Financeiro e Limites (CVM 88)</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <ProfileSelect 
                label="Renda Bruta Anual Estimada" 
                id="rendaBrutaAnual" 
                value={formData.rendaBrutaAnual} 
                onChange={handleChange} 
                disabled={!isEditing || isLoading} 
                error={errors.rendaBrutaAnual}
                icon={DollarSign}
            >
                <option value="">Selecione...</option>
                <option value="Até R$ 50.000">Até R$ 50.000</option>
                <option value="R$ 50.001 a R$ 100.000">R$ 50.001 a R$ 100.000</option>
                <option value="R$ 100.001 a R$ 200.000">R$ 100.001 a R$ 200.000</option>
                <option value="Acima de R$ 200.000">Acima de R$ 200.000</option>
            </ProfileSelect>
            <ProfileSelect 
                label="Valor Total de Investimentos Financeiros" 
                id="valorInvestimentos" 
                value={formData.valorInvestimentos} 
                onChange={handleChange} 
                disabled={!isEditing || isLoading} 
                error={errors.valorInvestimentos}
                icon={TrendingUp}
            >
                <option value="">Selecione...</option>
                <option value="Até R$ 50.000">Até R$ 50.000</option>
                <option value="R$ 50.001 a R$ 200.000">R$ 50.001 a R$ 200.000</option>
                <option value="R$ 200.001 a R$ 1.000.000">R$ 200.001 a R$ 1.000.000</option>
                <option value="Acima de R$ 1.000.000">Acima de R$ 1.000.000</option>
            </ProfileSelect>
          </div>
          <div className="mt-4 p-4 bg-gray-custom-100 rounded-lg">
            <p className="text-sm text-gray-custom-700">Seu limite anual de investimento em crowdfunding (todas as plataformas): <strong className="text-brand-primary">R$ {user.limites?.limiteAnualCalculado?.toLocaleString('pt-BR') || 'N/A'}</strong></p>
            <p className="text-sm text-gray-custom-700">Valor já investido este ano: <strong className="text-brand-primary">R$ {user.limites?.valorInvestidoAnoCorrente?.toLocaleString('pt-BR') || '0,00'}</strong></p>
            <p className="text-sm text-gray-custom-700">Saldo disponível para novas ofertas: <strong className="text-green-600">R$ {saldoDisponivelInvestimento >= 0 ? saldoDisponivelInvestimento.toLocaleString('pt-BR') : '0,00'}</strong></p>
            {saldoDisponivelInvestimento < 0 && <p className="text-xs text-red-500 mt-1">Atenção: Você ultrapassou seu limite anual de investimento.</p>}
          </div>
        </section>

        {/* Declarações */}
        <section>
          <h2 className="text-xl font-semibold text-gray-custom-800 mb-4">Suas Declarações</h2>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-gray-custom-50 rounded-md border border-gray-custom-200">
                {user.declaracoes?.informacoesVerdadeiras ? <CheckSquare size={20} className="text-green-500 mr-3 flex-shrink-0" /> : <XSquare size={20} className="text-red-500 mr-3 flex-shrink-0" />}
                <span className="text-sm text-gray-custom-700">Informações prestadas são verdadeiras.</span>
            </div>
             <div className="p-3 bg-gray-custom-50 rounded-md border border-gray-custom-200">
                <label className="flex items-center cursor-pointer">
                    <input 
                        type="checkbox" 
                        name="declInvestidorQualificado"
                        checked={formData.declInvestidorQualificado}
                        onChange={handleChange}
                        disabled={!isEditing || isLoading}
                        className="h-4 w-4 text-brand-primary border-gray-custom-300 rounded focus:ring-brand-primary mr-3"
                    />
                    <span className="text-sm text-gray-custom-700">Declaração de Investidor Qualificado.</span>
                    {formData.declInvestidorQualificado ? <CheckSquare size={20} className="text-green-500 ml-auto flex-shrink-0" /> : <XSquare size={20} className="text-gray-custom-400 ml-auto flex-shrink-0" />}
                </label>
                {isEditing && <p className="text-xs text-gray-custom-500 mt-1 pl-7">Marque se você possui investimentos financeiros superiores a R$ 1.000.000,00. Isso pode alterar seus limites de investimento.</p>}
            </div>
            <div className="flex items-center p-3 bg-gray-custom-50 rounded-md border border-gray-custom-200">
                {user.declaracoes?.cienteLimiteInvestimento ? <CheckSquare size={20} className="text-green-500 mr-3 flex-shrink-0" /> : <XSquare size={20} className="text-red-500 mr-3 flex-shrink-0" />}
                <span className="text-sm text-gray-custom-700">Ciente dos limites de investimento em crowdfunding.</span>
            </div>
            <div className="flex items-center p-3 bg-gray-custom-50 rounded-md border border-gray-custom-200">
                {user.declaracoes?.cienteRiscos ? <CheckSquare size={20} className="text-green-500 mr-3 flex-shrink-0" /> : <XSquare size={20} className="text-red-500 mr-3 flex-shrink-0" />}
                <span className="text-sm text-gray-custom-700">Ciente dos riscos de investimento.</span>
            </div>
             <div className="flex items-center p-3 bg-gray-custom-50 rounded-md border border-gray-custom-200">
                {user.declaracoes?.aceiteTermos ? <CheckSquare size={20} className="text-green-500 mr-3 flex-shrink-0" /> : <XSquare size={20} className="text-red-500 mr-3 flex-shrink-0" />}
                <span className="text-sm text-gray-custom-700">Aceitou os <Link to="/termos" className="text-brand-primary hover:underline">Termos de Uso</Link> e <Link to="/privacidade" className="text-brand-primary hover:underline">Política de Privacidade</Link>.</span>
            </div>
          </div>
          {isEditing && (
            <div className="mt-6 text-right">
                 <button
                    type="button"
                    onClick={() => { setIsEditing(false); setFormData(user); setErrors({}); setSaveFeedback({message: '', type: ''})}} // Reseta ao cancelar
                    className="px-4 py-2 text-sm font-medium rounded-md text-gray-custom-700 bg-gray-custom-200 hover:bg-gray-custom-300 transition-colors mr-3"
                    disabled={isLoading}
                >
                    Cancelar Edição
                </button>
                <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className={`px-6 py-2 text-sm font-medium rounded-md text-white transition-colors flex items-center justify-center
                                ${isLoading ? 'bg-gray-custom-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
                >
                    {isLoading ? (
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : <Save size={16} className="mr-2" />}
                    Salvar Alterações
                </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default PerfilInvestidorPage;

