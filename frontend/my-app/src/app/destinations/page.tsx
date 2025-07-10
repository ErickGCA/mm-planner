
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../services/auth.services';
import { destinationService, DestinationCreationData, DestinationUpdateData } from '../services/destination.service';
import { Destination } from '../services/route.service';
import DestinationForm from '../components/destinations/DestinationForm';
import DestinationCard from '../components/destinations/DestinationCard';
import Button from '../components/ui/Button';
import Link from 'next/link';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Toast from '../components/ui/Toast';
import ConfirmModal from '../components/ui/ConfirmModal';
import styles from './destinations.module.css';

const DestinationsPage: React.FC = () => {
  const router = useRouter();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingDestination, setEditingDestination] = useState<Destination | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [destinationToDelete, setDestinationToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setIsLoading(true);
        const fetchedDestinations = await destinationService.getAllDestinations();
        setDestinations(fetchedDestinations);
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar destinos.');
        setToast({ message: err.message || 'Erro ao carregar destinos.', type: 'error' });
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
        setToast({ message: 'Destino atualizado com sucesso!', type: 'success' });
        setEditingDestination(null);
      } else {
        const newDestination = await destinationService.createDestination(data as DestinationCreationData);
        setDestinations([newDestination, ...destinations]);
        setToast({ message: 'Destino criado com sucesso!', type: 'success' });
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao salvar destino.');
      setToast({ message: err.message || 'Erro ao salvar destino.', type: 'error' });
      console.error('Erro ao salvar destino:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = (destination: Destination) => {
    setEditingDestination(destination);
  };

  const handleDeleteClick = async (id: string) => {
    setDestinationToDelete(id);
    setConfirmOpen(true);
  };

  const confirmDeleteDestination = async () => {
    if (!destinationToDelete) return;
    setError(null);
    try {
      await destinationService.deleteDestination(destinationToDelete);
      setDestinations(destinations.filter(d => d.id !== destinationToDelete));
      setToast({ message: 'Destino deletado com sucesso!', type: 'success' });
    } catch (err: any) {
      setError(err.message || 'Erro ao deletar destino.');
      setToast({ message: err.message || 'Erro ao deletar destino.', type: 'error' });
      console.error('Erro ao deletar destino:', err);
    } finally {
      setConfirmOpen(false);
      setDestinationToDelete(null);
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
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
        <ConfirmModal
          open={confirmOpen}
          title="Confirmar exclusão"
          message="Tem certeza que deseja deletar este destino? Isso pode afetar rotas existentes."
          confirmText="Deletar"
          cancelText="Cancelar"
          onConfirm={confirmDeleteDestination}
          onCancel={() => { setConfirmOpen(false); setDestinationToDelete(null); }}
        />
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