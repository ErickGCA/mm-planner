
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { routeService, RouteCreationData, RouteStopInput } from '../../services/route.service';
import RouteForm from '../../components/RouteForm';
import { authService } from '../../services/auth.services';
import Link from 'next/link';
import Button from '../../components/Button';
import ProtectedRoute from '../../components/ProtectedRoute';

const NewRoutePage: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const NewRouteContent = () => {
    return (
      <div style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #292a2c 0%, #421e66 100%)',
        padding: '20px'
      }}>
        <div style={{ 
          maxWidth: '800px', 
          margin: '0 auto', 
          padding: '30px',
          background: 'rgba(20, 20, 20, 0.95)',
          borderRadius: '20px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(176, 132, 219, 0.2)'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '30px',
            paddingBottom: '20px',
            borderBottom: '1px solid #333333'
          }}>
            <h2 style={{ 
              margin: 0,
              color: '#ffffff',
              background: 'linear-gradient(45deg, #b084db, #8a2be2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Criar Nova Rota
            </h2>
            <Link href="/dashboard" passHref>
              <Button variant="outline">Voltar para Dashboard</Button>
            </Link>
          </div>
          <RouteForm onSubmit={handleSubmit} isLoading={isLoading} error={error} />
        </div>
      </div>
    );
  };

  return (
    <ProtectedRoute>
      <NewRouteContent />
    </ProtectedRoute>
  );
};

export default NewRoutePage;