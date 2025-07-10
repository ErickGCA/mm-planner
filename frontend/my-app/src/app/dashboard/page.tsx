
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../services/auth.services';
import { routeService, Route } from '../services/route.service';
import RouteCard from '../components/RouteCard';
import Button from '../components/Button';
import Link from 'next/link';
import ProtectedRoute from '../components/ProtectedRoute';
import styles from './dashboard.module.css';

const DashboardPage: React.FC = () => {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const user = authService.getUser();
    setUserName(user?.name || user?.email || 'Usuário');

    const fetchRoutes = async () => {
      try {
        setIsLoading(true);
        const fetchedRoutes = await routeService.getAllRoutes();
        setRoutes(fetchedRoutes);
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar rotas.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoutes();
  }, [router]);

  const handleDeleteRoute = async (routeId: string) => {
    if (!confirm('Tem certeza que deseja deletar esta rota?')) {
      return;
    }
    try {
      await routeService.deleteRoute(routeId);
      setRoutes(routes.filter(route => route.id !== routeId));
      alert('Rota deletada com sucesso!');
    } catch (err: any) {
      setError(err.message || 'Erro ao deletar rota.');
      console.error('Erro ao deletar rota:', err);
    }
  };

  const handleLogout = () => {
    authService.logout();
    router.push('/auth/login');
  };

  const DashboardContent = () => {
    if (isLoading) {
      return (
        <div className={styles.loadingWrapper}>
          <div>
            <h2 className={styles.loadingTitle}>Carregando suas rotas...</h2>
            <div className={styles.spinner}></div>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.pageWrapper}>
        <div className={styles.cardContainer}>
          <div className={styles.headerRow}>
            <h2 className={styles.welcomeTitle}>
              Bem-vindo, {userName || 'Usuário'}!
            </h2>
            <Button variant="outline" onClick={handleLogout}>Sair</Button>
          </div>

          <div className={styles.routesHeaderRow}>
            <h3 className={styles.routesTitle}>
              Minhas Rotas
            </h3>
            <Link href="/routes/new" passHref>
              <Button variant="secondary">Criar Nova Rota</Button>
            </Link>
          </div>

          {error && (
            <div className={styles.errorBox}>
              {error}
            </div>
          )}

          {routes.length === 0 ? (
            <div className={styles.emptyBox}>
              <h3 className={styles.emptyTitle}>Nenhuma rota encontrada</h3>
              <p>Você ainda não tem nenhuma rota. Que tal criar uma?</p>
            </div>
          ) : (
            <div className={styles.routesGrid}>
              {routes.map((route) => (
                <RouteCard key={route.id} route={route} onDelete={handleDeleteRoute} />
              ))}
            </div>
          )}

          <div className={styles.bottomRow}>
            <Link href="/destinations" passHref>
              <Button variant="primary">Gerenciar Meus Destinos</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
};

export default DashboardPage;