'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { routeService, RouteCreationData, RouteStopInput } from '../../../services/route.service';
import RouteForm from '../../../components/routes/RouteForm';
import { authService } from '../../../services/auth.services';
import Link from 'next/link';
import Button from '../../../components/ui/Button';
import ProtectedRoute from '../../../components/auth/ProtectedRoute';
import Toast from '../../../components/ui/Toast';
import styles from './new-route.module.css';

const NewRoutePage: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

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
      setToast({ message: 'Rota criada com sucesso!', type: 'success' });
      setTimeout(() => {
        setToast(null);
        router.push('/dashboard');
      }, 1200);
    } catch (err: any) {
      setError(err.message || 'Erro ao criar a rota.');
      setToast({ message: err.message || 'Erro ao criar a rota.', type: 'error' });
      console.error('Erro ao criar rota:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const NewRouteContent = () => {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.cardContainer}>
          <div className={styles.headerRow}>
            <h2 className={styles.headerTitle}>
              Criar Nova Rota
            </h2>
            <Link href="/dashboard" passHref>
              <Button variant="outline">Voltar para Dashboard</Button>
            </Link>
          </div>
          <RouteForm onSubmit={handleSubmit} isLoading={isLoading} error={error} />
        </div>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
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