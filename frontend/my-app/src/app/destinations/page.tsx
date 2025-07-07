
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

const DestinationsPage: React.FC = () => {
  const router = useRouter();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingDestination, setEditingDestination] = useState<Destination | null>(null);

  useEffect(() => {
    const token = authService.getToken();
    if (!token) {
      router.push('/auth/login');
      return;
    }

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

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <p>Carregando seus destinos...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>Gerenciar Meus Destinos</h2>
        <Link href="/dashboard" passHref>
          <Button style={{ backgroundColor: '#6c757d' }}>Voltar para Dashboard</Button>
        </Link>
      </div>

      {error && <p style={{ color: 'red', marginBottom: '20px' }}>{error}</p>}

      <DestinationForm
        initialData={editingDestination || undefined}
        onSubmit={handleFormSubmit}
        isLoading={isLoading}
        error={error}
      />
      {editingDestination && (
        <Button onClick={() => setEditingDestination(null)} style={{ backgroundColor: '#ccc', color: '#333', marginBottom: '20px' }}>
          Cancelar Edição
        </Button>
      )}

      <h3 style={{ marginTop: '30px', marginBottom: '15px' }}>Destinos Cadastrados</h3>
      {destinations.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#555' }}>Você ainda não tem nenhum destino cadastrado.</p>
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
  );
};

export default DestinationsPage;