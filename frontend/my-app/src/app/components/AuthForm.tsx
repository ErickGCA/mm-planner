import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';

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
    <form onSubmit={handleSubmit} style={{ padding: '20px', border: '1px solid #eee', borderRadius: '8px', maxWidth: '400px', margin: '50px auto', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
        {type === 'login' ? 'Login' : 'Registrar'}
      </h2>

      {type === 'register' && (
        <Input
          label="Nome"
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      )}
      <Input
        label="Email"
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        label="Senha"
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Carregando...' : (type === 'login' ? 'Entrar' : 'Registrar')}
      </Button>

      {type === 'login' ? (
        <p style={{ textAlign: 'center', marginTop: '15px' }}>
          Não tem uma conta? <a href="/auth/register" style={{ color: '#007bff', textDecoration: 'none' }}>Registre-se aqui</a>
        </p>
      ) : (
        <p style={{ textAlign: 'center', marginTop: '15px' }}>
          Já tem uma conta? <a href="/auth/login" style={{ color: '#007bff', textDecoration: 'none' }}>Faça login aqui</a>
        </p>
      )}
    </form>
  );
};

export default AuthForm;