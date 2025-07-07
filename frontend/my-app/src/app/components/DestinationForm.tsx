// src/components/DestinationForm.tsx
import React, { useState, useEffect } from 'react';
import Input from './Input';
import Button from './Button';
import { DestinationCreationData, DestinationUpdateData } from '../services/destination.service';
import { Destination } from '../services/route.service';

interface DestinationFormProps {
  initialData?: Destination;
  onSubmit: (data: DestinationCreationData | DestinationUpdateData) => void;
  isLoading: boolean;
  error: string | null;
}

const DestinationForm: React.FC<DestinationFormProps> = ({ initialData, onSubmit, isLoading, error }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [latitude, setLatitude] = useState<number | string>(initialData?.latitude || '');
  const [longitude, setLongitude] = useState<number | string>(initialData?.longitude || '');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setLatitude(initialData.latitude);
      setLongitude(initialData.longitude);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      latitude: typeof latitude === 'string' ? parseFloat(latitude) : latitude,
      longitude: typeof longitude === 'string' ? parseFloat(longitude) : longitude,
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', border: '1px solid #eee', borderRadius: '8px', marginBottom: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
      <h3 style={{ marginTop: 0 }}>{initialData ? 'Editar Destino' : 'Adicionar Novo Destino'}</h3>
      <Input
        label="Nome do Destino"
        id="destination-name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        label="Latitude"
        id="destination-latitude"
        type="number"
        step="0.000001"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
        required
      />
      <Input
        label="Longitude"
        id="destination-longitude"
        type="number"
        step="0.000001"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
        required
      />

      {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Salvando...' : (initialData ? 'Salvar Alterações' : 'Adicionar Destino')}
      </Button>
    </form>
  );
};

export default DestinationForm;