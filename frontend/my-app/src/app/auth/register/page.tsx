'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from '../../components/AuthForm';
import { authService } from '../../services/auth.services';
import styles from './register.module.css';

const RegisterPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.register(data);
      authService.setToken(response.token);
      authService.setUser(response.user);
      alert('Usuário registrado com sucesso!');
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido ao registrar usuário.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm
      type="register"
      onSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
    />
  );
};

export default RegisterPage;