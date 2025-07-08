'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../../../services/auth.services';
import { routeService, Route, RouteStopInput } from '../../../services/route.service';
import RouteForm from '../../../components/RouteForm';
import Link from 'next/link';
import Button from '../../../components/Button';
import ProtectedRoute from '../../../components/ProtectedRoute';

interface EditRoutePageProps {
  params: { id: string }; 
}

const EditRoutePage: React.FC<EditRoutePageProps> = ({ params }) => {
  const router = useRouter();
  const routeId = params.id;
  const [routeData, setRouteData] = useState<Route | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        setIsLoading(true);
        const fetchedRoute = await routeService.getRouteById(routeId);
        setRouteData(fetchedRoute);
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar os dados da rota.');
        console.error('Erro ao carregar rota para edição:', err);
        if (err.message.includes('Unauthorized') || err.message.includes('Route not found')) {
          router.push('/dashboard');
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (routeId) {
      fetchRoute();
    }
  }, [routeId, router]);

  const handleSubmit = async (
    newRouteData: { name: string; description?: string },
    stops: RouteStopInput[]
  ) => {
    setIsSaving(true);
    setError(null);
    try {
      await routeService.updateRoute(routeId, newRouteData);

      if (stops.length > 0) {
        await routeService.addStopsToRoute(routeId, stops);
      } else {
        await routeService.addStopsToRoute(routeId, []);
      }
      
      alert('Rota atualizada com sucesso!');
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Erro ao salvar a rota.');
      console.error('Erro ao salvar rota:', err);
      if (err.message.includes('Unauthorized')) {
        authService.logout();
        router.push('/auth/login');
      }
    } finally {
      setIsSaving(false);
    }
  };

  const EditRouteContent = () => {
    if (isLoading || !routeData) {
      return (
        <div style={{ 
          textAlign: 'center', 
          padding: '50px',
          color: '#ffffff',
          background: 'linear-gradient(135deg, #292a2c 0%, #421e66 100%)',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div>
            <h2 style={{ marginBottom: '20px' }}>Carregando rota...</h2>
            <div style={{
              width: '40px',
              height: '40px',
              border: '4px solid rgba(176, 132, 219, 0.3)',
              borderTop: '4px solid #b084db',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto'
            }}></div>
          </div>
          <style jsx>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      );
    }

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
              Editar Rota
            </h2>
            <Link href={`/routes/${routeId}`} passHref>
              <Button variant="outline">Ver Detalhes</Button>
            </Link>
          </div>
          <RouteForm
            initialData={routeData}
            onSubmit={handleSubmit}
            isLoading={isSaving}
            error={error}
          />
        </div>
      </div>
    );
  };

  return (
    <ProtectedRoute>
      <EditRouteContent />
    </ProtectedRoute>
  );
};

export default EditRoutePage;