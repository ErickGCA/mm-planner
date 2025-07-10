'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from '../../components/auth/AuthForm';
import { authService } from '../../services/auth.services';
import Toast from '../../components/ui/Toast';
import styles from './register.module.css';

const RegisterPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.register(data);
      authService.setToken(response.token);
      authService.setUser(response.user);
      setToast({ message: 'Usuário registrado com sucesso!', type: 'success' });
      setTimeout(() => {
        setToast(null);
        router.push('/dashboard');
      }, 1200);
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido ao registrar usuário.');
      setToast({ message: err.message || 'Erro desconhecido ao registrar usuário.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AuthForm
        type="register"
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
      />
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
};

export default RegisterPage;