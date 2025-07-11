'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../../services/auth.services';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  fallback 
}) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuth = authService.isAuthenticated();
        
        if (!isAuth) {
          setIsAuthenticated(false);
          setIsLoading(false);
          authService.logout();
          router.replace('/auth/login');
          return;
        }

        try {
          const isValid = await Promise.race([
            authService.validateToken(),
            new Promise<boolean>((resolve) => 
              setTimeout(() => resolve(false), 5000) 
            )
          ]);
          
          if (!isValid) {
            setIsAuthenticated(false);
            setIsLoading(false);
            authService.logout();
            router.replace('/auth/login');
            return;
          }
        } catch (validationError) {
          console.error('Erro na validação do token:', validationError);
        }

        setIsAuthenticated(true);
        setIsLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setIsLoading(false);
        authService.logout();
        router.replace('/auth/login');
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        color: '#333'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '4px solid rgba(176, 132, 219, 0.3)',
            borderTop: '4px solid #b084db',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p>Verificando autenticação...</p>
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

  if (!isAuthenticated) {
    return fallback || null;
  }

  return <>{children}</>;
};

export default ProtectedRoute; 