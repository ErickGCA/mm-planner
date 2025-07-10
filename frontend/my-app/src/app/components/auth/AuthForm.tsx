import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../../auth/login/login.module.css';

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
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState<{ email: boolean; password: boolean; name: boolean }>({ email: false, password: false, name: false });
  const [validation, setValidation] = useState<{ email?: string; password?: string; name?: string }>({});

  const validate = () => {
    const v: { email?: string; password?: string; name?: string } = {};
    if (type === 'register' && !name.trim()) v.name = 'Preencha seu nome completo';
    if (!email.trim()) v.email = 'Preencha seu email';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) v.email = 'Digite um email válido';
    if (!password) v.password = 'Preencha sua senha';
    else if (password.length < 6) v.password = 'A senha deve ter pelo menos 6 caracteres';
    return v;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true, name: true });
    const v = validate();
    setValidation(v);
    if (Object.keys(v).length > 0) return;
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

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          {type === 'register' && (
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>Nome completo</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setTouched(t => ({ ...t, name: true }))}
                className={styles.input}
                placeholder="Digite seu nome completo"
                autoComplete="name"
              />
              {touched.name && validation.name && (
                <span className={styles.validation}>{validation.name}</span>
              )}
            </div>
          )}

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched(t => ({ ...t, email: true }))}
              className={styles.input}
              placeholder="Digite seu email"
              autoComplete="email"
            />
            {touched.email && validation.email && (
              <span className={styles.validation}>{validation.email}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Senha</label>
            <div style={{ position: 'relative' }}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setTouched(t => ({ ...t, password: true }))}
                className={styles.input}
                placeholder="Digite sua senha"
                autoComplete={type === 'login' ? 'current-password' : 'new-password'}
              />
              <button
                type="button"
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                onClick={() => setShowPassword(s => !s)}
                style={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  color: '#7a0909',
                  fontSize: 18
                }}
              >
                {showPassword ? ':o' : ':O'}
              </button>
            </div>
            {touched.password && validation.password && (
              <span className={styles.validation}>{validation.password}</span>
            )}
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