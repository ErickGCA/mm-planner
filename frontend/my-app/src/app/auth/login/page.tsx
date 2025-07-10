'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from '../../components/auth/AuthForm';
import { authService } from '../../services/auth.services';
import Toast from '../../components/ui/Toast';
import styles from './login.module.css';

const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.login(data);
      authService.setToken(response.token);
      authService.setUser(response.user);
      setToast({ message: 'Login realizado com sucesso!', type: 'success' });
      setTimeout(() => {
        setToast(null);
        router.replace('/dashboard');
      }, 1200);
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido ao fazer login.');
      setToast({ message: err.message || 'Erro desconhecido ao fazer login.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AuthForm
        type="login"
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

export default LoginPage;