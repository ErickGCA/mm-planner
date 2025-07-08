
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../services/auth.services';
import { routeService, Route } from '../services/route.service';
import RouteCard from '../components/RouteCard';
import Button from '../components/Button';
import Link from 'next/link';
import ProtectedRoute from '../components/ProtectedRoute';

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

  const DashboardContent = () => {
    if (isLoading) {
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
            <h2 style={{ marginBottom: '20px' }}>Carregando suas rotas...</h2>
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
              Bem-vindo, {userName || 'Usuário'}!
            </h2>
            <Button variant="outline" onClick={handleLogout}>Sair</Button>
          </div>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '30px' 
          }}>
            <h3 style={{ 
              margin: 0, 
              color: '#ffffff',
              fontSize: '1.5rem'
            }}>
              Minhas Rotas
            </h3>
            <Link href="/routes/new" passHref>
              <Button variant="secondary">Criar Nova Rota</Button>
            </Link>
          </div>

          {error && (
            <div style={{ 
              color: '#ff6b6b', 
              background: 'rgba(255, 107, 107, 0.1)',
              padding: '15px',
              borderRadius: '8px',
              borderLeft: '4px solid #ff6b6b',
              marginBottom: '20px' 
            }}>
              {error}
            </div>
          )}

          {routes.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              color: '#b0b0b0',
              padding: '40px 20px',
              background: 'rgba(30, 30, 30, 0.5)',
              borderRadius: '12px',
              border: '2px dashed #333333'
            }}>
              <h3 style={{ marginBottom: '10px', color: '#ffffff' }}>Nenhuma rota encontrada</h3>
              <p>Você ainda não tem nenhuma rota. Que tal criar uma?</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '20px' }}>
              {routes.map((route) => (
                <RouteCard key={route.id} route={route} onDelete={handleDeleteRoute} />
              ))}
            </div>
          )}

          <div style={{ 
            marginTop: '40px', 
            textAlign: 'center',
            paddingTop: '30px',
            borderTop: '1px solid #333333'
          }}>
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