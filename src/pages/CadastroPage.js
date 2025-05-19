import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'; // Para a função register
import { ShieldCheck, Eye, EyeOff } from 'lucide-react'; // Ícones

// Componentes de Input reutilizáveis para o formulário
const InputField = ({ id, label, type = "text", value, onChange, required = false, placeholder, error, pattern, title, autoComplete, disabled }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-custom-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      pattern={pattern}
      title={title}
      autoComplete={autoComplete}
      disabled={disabled}
      className={`mt-1 block w-full px-3 py-2.5 border ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-custom-300 focus:ring-brand-primary focus:border-brand-primary'} rounded-md shadow-sm sm:text-sm`}
    />
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);

const PasswordField = ({ id, label, value, onChange, required = false, placeholder, error, autoComplete, disabled }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-custom-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          className={`mt-1 block w-full px-3 py-2.5 border ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-custom-300 focus:ring-brand-primary focus:border-brand-primary'} rounded-md shadow-sm sm:text-sm pr-10`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-custom-500 hover:text-gray-custom-700"
          aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

const SelectField = ({ id, label, value, onChange, required = false, children, error, disabled }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-custom-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      className={`mt-1 block w-full px-3 py-2.5 border ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-custom-300 focus:ring-brand-primary focus:border-brand-primary'} bg-white rounded-md shadow-sm sm:text-sm`}
    >
      {children}
    </select>
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);

const CheckboxField = ({ id, label, checked, onChange, required = false, error, disabled, children }) => (
 <div className="flex items-start mb-3">
    <div className="flex items-center h-5">
      <input
        id={id}
        name={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className="focus:ring-brand-primary h-4 w-4 text-brand-primary border-gray-custom-300 rounded"
      />
    </div>
    <div className="ml-3 text-sm">
      <label htmlFor={id} className="font-medium text-gray-custom-700">
        {children || label} {required && <span className="text-red-500">*</span>}
      </label>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  </div>
);


const CadastroPage = () => {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext); // Usando a função de registro do contexto
  const [isLoading, setIsLoading] = useState(false);
  const [formStep, setFormStep] = useState(1); // Para formulário multi-etapas

  const [formData, setFormData] = useState({
    // Etapa 1: Dados Pessoais e de Acesso
    nomeCompleto: '',
    cpf: '',
    dataNascimento: '',
    email: '',
    confirmarEmail: '',
    senha: '',
    confirmarSenha: '',
    // Etapa 2: Endereço
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: 'SP', // Default SP
    // Etapa 3: Informações Financeiras e Declarações
    rendaBrutaAnual: '',
    valorInvestimentos: '',
    declInformacoesVerdadeiras: false,
    declInvestidorQualificado: false,
    declLimiteInvestimento: false,
    declCienteRiscos: false,
    declAceiteTermos: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: null }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.nomeCompleto.trim()) newErrors.nomeCompleto = "Nome completo é obrigatório.";
    if (!formData.cpf.trim()) newErrors.cpf = "CPF é obrigatório.";
    else if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(formData.cpf)) newErrors.cpf = "CPF inválido (XXX.XXX.XXX-XX).";
    if (!formData.dataNascimento) newErrors.dataNascimento = "Data de nascimento é obrigatória.";
    if (!formData.email.trim()) newErrors.email = "E-mail é obrigatório.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "E-mail inválido.";
    if (formData.email.trim() !== formData.confirmarEmail.trim()) newErrors.confirmarEmail = "Os e-mails não coincidem.";
    if (!formData.senha) newErrors.senha = "Senha é obrigatória.";
    else if (formData.senha.length < 8) newErrors.senha = "A senha deve ter no mínimo 8 caracteres.";
    // Adicionar mais validações de senha (ex: maiúscula, número, especial)
    if (formData.senha !== formData.confirmarSenha) newErrors.confirmarSenha = "As senhas não coincidem.";
    setErrors(prev => ({...prev, ...newErrors}));
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.cep.trim()) newErrors.cep = "CEP é obrigatório.";
    if (!formData.logradouro.trim()) newErrors.logradouro = "Logradouro é obrigatório.";
    if (!formData.numero.trim()) newErrors.numero = "Número é obrigatório.";
    if (!formData.bairro.trim()) newErrors.bairro = "Bairro é obrigatório.";
    if (!formData.cidade.trim()) newErrors.cidade = "Cidade é obrigatória.";
    if (!formData.estado) newErrors.estado = "Estado é obrigatório.";
    setErrors(prev => ({...prev, ...newErrors}));
    return Object.keys(newErrors).length === 0;
  };
  
  const validateStep3 = () => {
    const newErrors = {};
    if (!formData.rendaBrutaAnual) newErrors.rendaBrutaAnual = "Renda bruta anual é obrigatória.";
    if (!formData.valorInvestimentos) newErrors.valorInvestimentos = "Valor de investimentos é obrigatório.";
    if (!formData.declInformacoesVerdadeiras) newErrors.declInformacoesVerdadeiras = "Declaração obrigatória.";
    if (!formData.declLimiteInvestimento) newErrors.declLimiteInvestimento = "Declaração obrigatória.";
    if (!formData.declCienteRiscos) newErrors.declCienteRiscos = "Declaração obrigatória.";
    if (!formData.declAceiteTermos) newErrors.declAceiteTermos = "Você deve aceitar os Termos e a Política de Privacidade.";
    setErrors(prev => ({...prev, ...newErrors}));
    return Object.keys(newErrors).length === 0;
  };


  const handleNextStep = () => {
    let isValid = false;
    if (formStep === 1) isValid = validateStep1();
    if (formStep === 2) isValid = validateStep2();
    
    if (isValid) {
      setFormStep(prev => prev + 1);
    } else {
      alert('Por favor, corrija os erros antes de prosseguir.');
    }
  };

  const handlePrevStep = () => {
    setFormStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep3()) {
      alert('Por favor, corrija os erros na última etapa.');
      return;
    }

    setIsLoading(true);
    // Simulação de chamada de API para registro
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const registrationSuccess = register(formData); // Chama a função register do AuthContext

    if (registrationSuccess) {
      alert('Cadastro realizado com sucesso! Você será redirecionado para a página de login.');
      navigate('/login');
    } else {
      alert('Ocorreu um erro durante o cadastro. Tente novamente.');
    }
    setIsLoading(false);
  };
  
  const handleCepBlur = async () => {
    const cepValue = formData.cep.replace(/\D/g, '');
    if (cepValue.length === 8) {
      setIsLoading(true); // Feedback visual para o usuário
      try {
        // Em um app real, usaria fetch para uma API de CEP, ex: ViaCEP
        // const response = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`);
        // const data = await response.json();
        // if (!data.erro) {
        //   setFormData(prev => ({
        //     ...prev,
        //     logradouro: data.logradouro,
        //     bairro: data.bairro,
        //     cidade: data.localidade,
        //     estado: data.uf,
        //   }));
        // } else {
        //   setErrors(prev => ({ ...prev, cep: "CEP não encontrado." }));
        // }
        
        // Simulação para esta demo:
        if (cepValue === "01001000") { // CEP da Praça da Sé, SP (exemplo)
            await new Promise(resolve => setTimeout(resolve, 500)); // Simula delay da API
             setFormData(prev => ({
            ...prev,
            logradouro: 'Praça da Sé',
            bairro: 'Sé',
            cidade: 'São Paulo',
            estado: 'SP',
          }));
          setErrors(prev => ({...prev, cep: null}));
        } else {
          setErrors(prev => ({ ...prev, cep: "CEP não encontrado (use 01001000 para teste)." }));
        }

      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
        setErrors(prev => ({ ...prev, cep: "Erro ao buscar CEP. Tente novamente." }));
      }
      setIsLoading(false);
    } else if (cepValue.length > 0) {
        setErrors(prev => ({ ...prev, cep: "CEP inválido." }));
    }
  };

  const estadosBrasileiros = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
    'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  return (
    <div className="min-h-screen bg-gray-custom-100 flex flex-col justify-center py-8 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <Link to="/" className="flex justify-center mb-4">
            <ShieldCheck size={48} className="text-brand-primary" />
        </Link>
        <h1 className="text-center text-3xl font-extrabold text-brand-primary">
          Crie sua Conta de Investidor
        </h1>
        <p className="mt-2 text-center text-sm text-gray-custom-600">
          Já tem uma conta?{' '}
          <Link to="/login" className="font-medium text-brand-primary hover:text-brand-primary-dark underline">
            Faça login aqui
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white py-8 px-4 shadow-card sm:rounded-xl sm:px-10">
          {/* Indicador de Etapas */}
          <div className="mb-8">
            <ol className="flex items-center w-full">
              {[1,2,3].map(step => (
                <li key={step} className={`flex w-full items-center ${step < 3 ? "after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block" : ""} ${step <= formStep ? (step === formStep ? "text-brand-primary after:border-brand-primary" : "text-brand-primary after:border-brand-primary") : "text-gray-custom-400 after:border-gray-custom-300"}`}>
                  <span className={`flex items-center justify-center w-10 h-10 ${step <= formStep ? "bg-brand-primary" : "bg-gray-custom-300"} rounded-full lg:h-12 lg:w-12 shrink-0`}>
                    <span className={`font-bold ${step <= formStep ? "text-white" : "text-gray-custom-600"}`}>{step}</span>
                  </span>
                </li>
              ))}
            </ol>
            <div className="mt-2 flex justify-between text-xs font-medium">
                <span className={formStep >= 1 ? "text-brand-primary" : "text-gray-custom-500"}>Dados Pessoais</span>
                <span className={formStep >= 2 ? "text-brand-primary" : "text-gray-custom-500"}>Endereço</span>
                <span className={formStep >= 3 ? "text-brand-primary" : "text-gray-custom-500"}>Financeiro e Declarações</span>
            </div>
          </div>


          <form onSubmit={handleSubmit} className="space-y-6">
            {formStep === 1 && (
              <fieldset className="space-y-1 p-1 border border-gray-custom-200 rounded-md animate-fadeIn">
                <legend className="text-xl font-semibold text-gray-custom-800 px-2 mb-4">Dados Pessoais e Acesso</legend>
                <InputField id="nomeCompleto" label="Nome Completo" value={formData.nomeCompleto} onChange={handleChange} required error={errors.nomeCompleto} autoComplete="name" disabled={isLoading}/>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                  <InputField 
                    id="cpf" 
                    label="CPF" 
                    value={formData.cpf} 
                    onChange={(e) => {
                        // CPF Mask
                        let value = e.target.value.replace(/\D/g, '');
                        value = value.replace(/(\d{3})(\d)/, '$1.$2');
                        value = value.replace(/(\d{3})(\d)/, '$1.$2');
                        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
                        handleChange({ target: { name: 'cpf', value: value.slice(0,14) } });
                    }}
                    required 
                    placeholder="000.000.000-00" 
                    error={errors.cpf} 
                    autoComplete="off"
                    disabled={isLoading}
                  />
                  <InputField id="dataNascimento" label="Data de Nascimento" type="date" value={formData.dataNascimento} onChange={handleChange} required error={errors.dataNascimento} autoComplete="bday" disabled={isLoading}/>
                </div>
                <InputField id="email" label="E-mail" type="email" value={formData.email} onChange={handleChange} required error={errors.email} autoComplete="email" disabled={isLoading}/>
                <InputField id="confirmarEmail" label="Confirmar E-mail" type="email" value={formData.confirmarEmail} onChange={handleChange} required error={errors.confirmarEmail} autoComplete="email" disabled={isLoading}/>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                  <PasswordField id="senha" label="Senha (mín. 8 caracteres)" value={formData.senha} onChange={handleChange} required error={errors.senha} autoComplete="new-password" disabled={isLoading}/>
                  <PasswordField id="confirmarSenha" label="Confirmar Senha" value={formData.confirmarSenha} onChange={handleChange} required error={errors.confirmarSenha} autoComplete="new-password" disabled={isLoading}/>
                </div>
              </fieldset>
            )}

            {formStep === 2 && (
              <fieldset className="space-y-1 p-1 border border-gray-custom-200 rounded-md animate-fadeIn">
                <legend className="text-xl font-semibold text-gray-custom-800 px-2 mb-4">Endereço Residencial</legend>
                <InputField id="cep" label="CEP" value={formData.cep} onChange={(e) => handleChange({target: {name: 'cep', value: e.target.value.replace(/\D/g,'').slice(0,8)}})} onBlur={handleCepBlur} required placeholder="00000000" error={errors.cep} autoComplete="postal-code" disabled={isLoading}/>
                <InputField id="logradouro" label="Logradouro" value={formData.logradouro} onChange={handleChange} required error={errors.logradouro} autoComplete="street-address" disabled={isLoading}/>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                  <InputField id="numero" label="Número" value={formData.numero} onChange={handleChange} required error={errors.numero} autoComplete="address-line2" disabled={isLoading}/>
                  <InputField id="complemento" label="Complemento (Opcional)" value={formData.complemento} onChange={handleChange} autoComplete="address-line3" disabled={isLoading}/>
                </div>
                <InputField id="bairro" label="Bairro" value={formData.bairro} onChange={handleChange} required error={errors.bairro} autoComplete="address-level3" disabled={isLoading}/>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                  <InputField id="cidade" label="Cidade" value={formData.cidade} onChange={handleChange} required error={errors.cidade} autoComplete="address-level2" disabled={isLoading}/>
                  <SelectField id="estado" label="Estado" value={formData.estado} onChange={handleChange} required error={errors.estado} disabled={isLoading}>
                    {estadosBrasileiros.map(uf => <option key={uf} value={uf}>{uf}</option>)}
                  </SelectField>
                </div>
              </fieldset>
            )}
            
            {formStep === 3 && (
              <fieldset className="space-y-1 p-1 border border-gray-custom-200 rounded-md animate-fadeIn">
                <legend className="text-xl font-semibold text-gray-custom-800 px-2 mb-4">Informações Financeiras e Declarações</legend>
                <p className="text-xs text-gray-custom-500 mb-3">Estas informações são importantes para adequação ao seu perfil de investidor, conforme Art. 4º da Resolução CVM 88.</p>
                <SelectField id="rendaBrutaAnual" label="Renda Bruta Anual Estimada" value={formData.rendaBrutaAnual} onChange={handleChange} required error={errors.rendaBrutaAnual} disabled={isLoading}>
                  <option value="">Selecione...</option>
                  <option value="ate50k">Até R$ 50.000</option>
                  <option value="50k-100k">R$ 50.001 a R$ 100.000</option>
                  <option value="100k-200k">R$ 100.001 a R$ 200.000</option>
                  <option value="acima200k">Acima de R$ 200.000</option>
                </SelectField>
                <SelectField id="valorInvestimentos" label="Valor Total Estimado de Investimentos Financeiros" value={formData.valorInvestimentos} onChange={handleChange} required error={errors.valorInvestimentos} disabled={isLoading}>
                  <option value="">Selecione...</option>
                  <option value="ate50k">Até R$ 50.000</option>
                  <option value="50k-200k">R$ 50.001 a R$ 200.000</option>
                  <option value="200k-1M">R$ 200.001 a R$ 1.000.000</option>
                  <option value="acima1M">Acima de R$ 1.000.000</option>
                </SelectField>
                
                <div className="pt-4 space-y-3">
                    <CheckboxField id="declInformacoesVerdadeiras" checked={formData.declInformacoesVerdadeiras} onChange={handleChange} required error={errors.declInformacoesVerdadeiras} disabled={isLoading}>
                        Declaro, sob as penas da lei, que as informações aqui prestadas são verdadeiras.
                    </CheckboxField>
                    <CheckboxField id="declInvestidorQualificado" checked={formData.declInvestidorQualificado} onChange={handleChange} disabled={isLoading}>
                        Declaro ser Investidor Qualificado (possuo investimentos financeiros em valor superior a R$ 1.000.000,00).
                        <span className="block text-xs text-gray-custom-500">Marcar esta opção pode alterar seus limites de investimento.</span>
                    </CheckboxField>
                    <CheckboxField 
                        id="declLimiteInvestimento" 
                        checked={formData.declLimiteInvestimento} 
                        onChange={handleChange} 
                        required
                        error={errors.declLimiteInvestimento}
                        disabled={isLoading}
                    >
                        Declaro que meu investimento total anual em ofertas de crowdfunding de investimento, somando todas as plataformas, não ultrapassará: R$ 20.000,00; <strong>OU</strong> 10% do maior valor entre minha renda bruta anual e o total de meus investimentos financeiros (caso um desses seja superior a R$ 200.000,00 e eu não seja Investidor Qualificado).
                    </CheckboxField>
                    <CheckboxField 
                        id="declCienteRiscos" 
                        checked={formData.declCienteRiscos} 
                        onChange={handleChange} 
                        required
                        error={errors.declCienteRiscos}
                        disabled={isLoading}
                    >
                        Li e estou ciente dos riscos envolvidos em investimentos em sociedades empresárias de pequeno porte, incluindo a possibilidade de perda total do capital investido, a baixa liquidez e os riscos específicos da oferta, conforme detalhado no Material Didático e nas Informações Essenciais da Oferta.
                    </CheckboxField>
                    <CheckboxField 
                        id="declAceiteTermos" 
                        checked={formData.declAceiteTermos} 
                        onChange={handleChange} 
                        required
                        error={errors.declAceiteTermos}
                        disabled={isLoading}
                    >
                        Li e aceito os <Link to="/termos" target="_blank" className="text-brand-primary hover:underline">Termos de Uso</Link> e a <Link to="/privacidade" target="_blank" className="text-brand-primary hover:underline">Política de Privacidade</Link> da SuaPlataformaCrowd.
                    </CheckboxField>
                </div>
              </fieldset>
            )}

            {/* Botões de Navegação e Submit */}
            <div className="flex justify-between items-center pt-4">
              {formStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  disabled={isLoading}
                  className="px-6 py-2.5 border border-gray-custom-300 rounded-md shadow-sm text-sm font-medium text-gray-custom-700 bg-white hover:bg-gray-custom-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors"
                >
                  Voltar
                </button>
              )}
              {formStep < 3 && (
                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={isLoading}
                  className="ml-auto px-6 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-brand-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary transition-colors"
                >
                  Avançar
                </button>
              )}
              {formStep === 3 && (
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`ml-auto group relative w-full md:w-auto flex justify-center py-3 px-6 border border-transparent text-sm font-medium rounded-md text-white 
                              ${isLoading ? 'bg-gray-custom-400 cursor-not-allowed' : 'bg-brand-accent hover:bg-brand-accent-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400'} 
                              transition-colors duration-150 ease-in-out`}
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : "Finalizar Cadastro"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CadastroPage;
