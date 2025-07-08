
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { routeService, RouteCreationData, RouteStopInput } from '../../services/route.service';
import RouteForm from '../../components/RouteForm';
import { authService } from '../../services/auth.services';
import Link from 'next/link';
import Button from '../../components/Button';

const NewRoutePage: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    if (!authService.getToken()) {
      router.push('/auth/login');
    }
  }, [router]);

  const handleSubmit = async (
    routeData: RouteCreationData,
    stops: RouteStopInput[]
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const newRoute = await routeService.createRoute(routeData);
      if (stops.length > 0) {
        await routeService.addStopsToRoute(newRoute.id, stops);
      }
      alert('Rota criada com sucesso!');
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Erro ao criar a rota.');
      console.error('Erro ao criar rota:', err);
      if (err.message.includes('Unauthorized')) {
        authService.logout();
        router.push('/auth/login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', backgroundColor: '#222', color: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>Criar Nova Rota</h2>
        <Link href="/dashboard" passHref>
          <Button style={{ backgroundColor: '#6c757d' }}>Voltar para Dashboard</Button>
        </Link>
      </div>
      <RouteForm onSubmit={handleSubmit} isLoading={isLoading} error={error} />
    </div>
  );
};

export default NewRoutePage;