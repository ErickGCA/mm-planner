
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../services/auth.services';
import { destinationService, DestinationCreationData, DestinationUpdateData } from '../services/destination.service';
import { Destination } from '../services/route.service';
import DestinationForm from '../components/DestinationForm';
import DestinationCard from '../components/DestinationCard';
import Button from '../components/Button';
import Link from 'next/link';
import ProtectedRoute from '../components/ProtectedRoute';

const DestinationsPage: React.FC = () => {
  const router = useRouter();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingDestination, setEditingDestination] = useState<Destination | null>(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setIsLoading(true);
        const fetchedDestinations = await destinationService.getAllDestinations();
        setDestinations(fetchedDestinations);
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar destinos.');
        console.error('Erro ao carregar destinos:', err);
        if (err.message.includes('Unauthorized')) {
          authService.logout();
          router.push('/auth/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchDestinations();
  }, [router]);

  const handleFormSubmit = async (data: DestinationCreationData | DestinationUpdateData) => {
    setError(null);
    setIsLoading(true);
    try {
      if (editingDestination) {
        const updatedDestination = await destinationService.updateDestination(editingDestination.id, data);
        setDestinations(destinations.map(d => (d.id === updatedDestination.id ? updatedDestination : d)));
        alert('Destino atualizado com sucesso!');
        setEditingDestination(null);
      } else {
        const newDestination = await destinationService.createDestination(data as DestinationCreationData);
        setDestinations([newDestination, ...destinations]);
        alert('Destino criado com sucesso!');
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao salvar destino.');
      console.error('Erro ao salvar destino:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = (destination: Destination) => {
    setEditingDestination(destination);
  };

  const handleDeleteClick = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este destino? Isso pode afetar rotas existentes.')) {
      return;
    }
    setError(null);
    try {
      await destinationService.deleteDestination(id);
      setDestinations(destinations.filter(d => d.id !== id));
      alert('Destino deletado com sucesso!');
    } catch (err: any) {
      setError(err.message || 'Erro ao deletar destino.');
      console.error('Erro ao deletar destino:', err);
    }
  };

  const DestinationsContent = () => {
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
            <h2 style={{ marginBottom: '20px' }}>Carregando seus destinos...</h2>
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
              Gerenciar Meus Destinos
            </h2>
            <Link href="/dashboard" passHref>
              <Button variant="outline">Voltar para Dashboard</Button>
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

          <DestinationForm
            initialData={editingDestination || undefined}
            onSubmit={handleFormSubmit}
            isLoading={isLoading}
            error={error}
          />
          
          {editingDestination && (
            <Button 
              onClick={() => setEditingDestination(null)} 
              variant="outline"
              style={{ marginBottom: '20px' }}
            >
              Cancelar Edição
            </Button>
          )}

          <h3 style={{ 
            marginTop: '30px', 
            marginBottom: '15px',
            color: '#ffffff'
          }}>
            Destinos Cadastrados
          </h3>
          
          {destinations.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              color: '#b0b0b0',
              padding: '40px 20px',
              background: 'rgba(30, 30, 30, 0.5)',
              borderRadius: '12px',
              border: '2px dashed #333333'
            }}>
              <h3 style={{ marginBottom: '10px', color: '#ffffff' }}>Nenhum destino encontrado</h3>
              <p>Você ainda não tem nenhum destino cadastrado.</p>
            </div>
          ) : (
            <div>
              {destinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <ProtectedRoute>
      <DestinationsContent />
    </ProtectedRoute>
  );
};

export default DestinationsPage;