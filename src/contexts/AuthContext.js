import React, { createContext, useState, useEffect, useCallback } from 'react';
// mockUser e mockOfertas serão importados de mockData.js
// Não precisamos deles diretamente aqui, mas o login usará o mockUser.
import { mockUser as defaultMockUser } from '../data/mockData';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Para simular carregamento inicial

  // Simula a verificação de um token ou sessão ao carregar o aplicativo
  useEffect(() => {
    try {
      const storedAuth = localStorage.getItem('isAuthenticatedSuaPlataforma');
      const storedUser = localStorage.getItem('userSuaPlataforma');
      if (storedAuth === 'true' && storedUser) {
        setIsAuthenticated(true);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Erro ao carregar dados de autenticação do localStorage:", error);
      // Limpar localStorage em caso de dados corrompidos
      localStorage.removeItem('isAuthenticatedSuaPlataforma');
      localStorage.removeItem('userSuaPlataforma');
    }
    setLoading(false);
  }, []);

  const login = useCallback((email, password) => {
    // Simulação de login com dados mockados
    // Em um app real, isso faria uma chamada de API
    if (email === defaultMockUser.email && password === 'senha123') { // Senha mockada
      const userData = { ...defaultMockUser }; // Copia para evitar mutação direta do mock
      setIsAuthenticated(true);
      setUser(userData);
      try {
        localStorage.setItem('isAuthenticatedSuaPlataforma', 'true');
        localStorage.setItem('userSuaPlataforma', JSON.stringify(userData));
      } catch (error) {
        console.error("Erro ao salvar dados de autenticação no localStorage:", error);
      }
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUser(null);
    try {
      localStorage.removeItem('isAuthenticatedSuaPlataforma');
      localStorage.removeItem('userSuaPlataforma');
    } catch (error) {
      console.error("Erro ao remover dados de autenticação do localStorage:", error);
    }
  }, []);

  const updateUser = useCallback((updatedUserData) => {
    setUser(prevUser => {
      const newUser = { ...prevUser, ...updatedUserData };
      try {
        localStorage.setItem('userSuaPlataforma', JSON.stringify(newUser));
      } catch (error)
      {
        console.error("Erro ao atualizar dados do usuário no localStorage:", error);
      }
      return newUser;
    });
  }, []);
  
  // Função para registrar um novo usuário (simulada)
  const register = useCallback((userData) => {
    // Em uma aplicação real, isso enviaria os dados para um backend.
    // Para esta demo, podemos apenas simular o sucesso.
    console.log("Novo usuário registrado (simulado):", userData);
    // Poderia adicionar o novo usuário a uma lista mockada ou localStorage se quisesse persistir
    // entre sessões de demonstração sem um backend.
    return true; // Simula sucesso
  }, []);


  // O valor fornecido pelo contexto
  const contextValue = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    updateUser,
    register, // Adicionando a função de registro ao contexto
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};