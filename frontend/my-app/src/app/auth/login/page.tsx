'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from '../../components/AuthForm';
import { authService } from '../../services/auth.services';
import styles from './login.module.css';

const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.login(data);
      
      // Salvar token e usuário
      authService.setToken(response.token);
      authService.setUser(response.user);
      
      alert('Login realizado com sucesso!');
      
      // Aguardar um pouco e usar replace para evitar conflitos
      setTimeout(() => {
        router.replace('/dashboard');
      }, 500);
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido ao fazer login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm
      type="login"
      onSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
    />
  );
};

export default LoginPage;