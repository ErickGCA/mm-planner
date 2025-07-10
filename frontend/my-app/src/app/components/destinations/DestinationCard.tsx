
import React from 'react';
import { Destination } from '../../services/route.service';
import Button from '../ui/Button';

interface DestinationCardProps {
  destination: Destination;
  onEdit: (destination: Destination) => void;
  onDelete: (id: string) => void;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination, onEdit, onDelete }) => {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '15px',
      marginBottom: '10px',
      backgroundColor: '#ffffff',
      boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
    }}>
      <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>{destination.name}</h4>
      <p style={{ margin: '0 0 5px 0', fontSize: '0.9em', color: '#666' }}>
        Lat: {destination.latitude.toFixed(6)}, Lng: {destination.longitude.toFixed(6)}
      </p>
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <Button onClick={() => onEdit(destination)} style={{ backgroundColor: '#ffc107', color: 'black', fontSize: '0.8em' }}>
          Editar
        </Button>
        <Button onClick={() => onDelete(destination.id)} style={{ backgroundColor: '#dc3545', fontSize: '0.8em' }}>
          Excluir
        </Button>
      </div>
    </div>
  );
};

export default DestinationCard;