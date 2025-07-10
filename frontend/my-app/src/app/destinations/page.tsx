
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
import styles from './destinations.module.css';

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
        <div className={styles.loadingWrapper}>
          <div>
            <h2 className={styles.loadingTitle}>Carregando seus destinos...</h2>
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
              Gerenciar Meus Destinos
            </h2>
            <Link href="/dashboard" passHref>
              <Button variant="outline">Voltar para Dashboard</Button>
            </Link>
          </div>

          {error && (
            <div className={styles.errorBox}>
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
              className={styles.cancelEditBtn}
            >
              Cancelar Edição
            </Button>
          )}

          <h3 className={styles.listTitle}>
            Destinos Cadastrados
          </h3>
          
          {destinations.length === 0 ? (
            <div className={styles.emptyBox}>
              <h4 className={styles.emptyTitle}>Nenhum destino encontrado</h4>
              <p>Você ainda não tem destinos cadastrados.</p>
            </div>
          ) : (
            <div className={styles.destinationsGrid}>
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