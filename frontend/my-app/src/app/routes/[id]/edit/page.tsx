'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../../../services/auth.services';
import { routeService, Route, RouteStopInput } from '../../../services/route.service';
import RouteForm from '../../../components/RouteForm';
import Link from 'next/link';
import Button from '../../../components/Button';

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
    if (!authService.getToken()) {
      router.push('/auth/login');
      return;
    }

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

  if (isLoading || !routeData) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#222', color: 'white' }}>
        <p>Carregando rota...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', backgroundColor: '#222', color: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>Editar Rota</h2>
        <Link href={`/routes/${routeId}`} passHref>
          <Button style={{ backgroundColor: '#6c757d' }}>Ver Detalhes</Button>
        </Link>
      </div>
      <RouteForm
        initialData={routeData}
        onSubmit={handleSubmit}
        isLoading={isSaving}
        error={error}
      />
    </div>
  );
};

export default EditRoutePage;