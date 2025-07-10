'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../../../services/auth.services';
import { routeService, Route, RouteStopInput } from '../../../services/route.service';
import RouteForm from '../../../components/routes/RouteForm';
import Link from 'next/link';
import Button from '../../../components/ui/Button';
import ProtectedRoute from '../../../components/auth/ProtectedRoute';
import styles from './edit-route.module.css';

interface EditRoutePageProps {
  params: { id: string }; 
}

const EditRoutePage: React.FC<EditRoutePageProps> = ({ params }) => {
  const router = useRouter();
  const { id: routeId } = use(params as unknown as Promise<{ id: string }>);
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
        if (err.message.includes('Route not found')) {
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
    } finally {
      setIsSaving(false);
    }
  };

  const EditRouteContent = () => {
    if (isLoading || !routeData) {
      return (
        <div className={styles.loadingWrapper}>
          <div>
            <h2 className={styles.loadingTitle}>Carregando rota...</h2>
            <div className={styles.spinner}></div>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.pageWrapper}>
        <div className={styles.cardContainer}>
          <div className={styles.headerRow}>
            <h2 className={styles.headerTitle}>
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