import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../auth/login/login.module.css';

interface AuthFormProps {
  type: 'login' | 'register';
  onSubmit: (data: any) => void;
  isLoading: boolean;
  error: string | null;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit, isLoading, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === 'register') {
      onSubmit({ name, email, password });
    } else {
      onSubmit({ email, password });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>
          {type === 'login' ? 'Bem-vindo de volta!' : 'Crie sua conta'}
        </h1>
        <p className={styles.subtitle}>
          {type === 'login' 
            ? 'Entre com suas credenciais para acessar sua conta' 
            : 'Preencha os dados abaixo para criar sua conta'
          }
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          {type === 'register' && (
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>Nome completo</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
                placeholder="Digite seu nome completo"
                required
              />
            </div>
          )}

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="Digite seu email"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Senha</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="Digite sua senha"
              required
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button type="submit" className={styles.button} disabled={isLoading}>
            <span className={styles.buttonText}>
              {isLoading ? (
                <>
                  <span className={styles.loading}></span>
                  Carregando...
                </>
              ) : (
                type === 'login' ? 'Entrar' : 'Criar conta'
              )}
            </span>
          </button>
        </form>

        <div className={styles.link}>
          {type === 'login' ? (
            <>
              Não tem uma conta?{' '}
              <Link href="/auth/register">Registre-se aqui</Link>
            </>
          ) : (
            <>
              Já tem uma conta?{' '}
              <Link href="/auth/login">Faça login aqui</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;