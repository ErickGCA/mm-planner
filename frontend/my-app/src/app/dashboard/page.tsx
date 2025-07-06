
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../services/auth.services';
import { routeService, Route } from '../services/route.service';
import RouteCard from '../components/RouteCard';
import Button from '../components/Button';
import Link from 'next/link';

const DashboardPage: React.FC = () => {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = authService.getToken();
    const user = authService.getUser();
    if (!token || !user) {
      router.push('/auth/login');
      return;
    }
    setUserName(user.name || user.email);

    const fetchRoutes = async () => {
      try {
        setIsLoading(true);
        const fetchedRoutes = await routeService.getAllRoutes();
        setRoutes(fetchedRoutes);
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar rotas.');
        console.error('Erro ao carregar rotas:', err);
        if (err.message.includes('Unauthorized')) {
          authService.logout();
          router.push('/auth/login');
        }
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

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <p>Carregando suas rotas...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>Bem-vindo, {userName || 'Usuário'}!</h2>
        <Button onClick={handleLogout} style={{ backgroundColor: '#6c757d' }}>Sair</Button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0 }}>Minhas Rotas</h3>
        <Link href="/routes/new" passHref>
          <Button>Criar Nova Rota</Button>
        </Link>
      </div>

      {error && <p style={{ color: 'red', marginBottom: '20px' }}>{error}</p>}

      {routes.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#555' }}>Você ainda não tem nenhuma rota. Que tal criar uma?</p>
      ) : (
        <div style={{ display: 'grid', gap: '15px' }}>
          {routes.map((route) => (
            <RouteCard key={route.id} route={route} onDelete={handleDeleteRoute} />
          ))}
        </div>
      )}

      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <Link href="/destinations" passHref>
          <Button style={{ backgroundColor: '#17a2b8' }}>Gerenciar Meus Destinos</Button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;