import React from 'react';
import { Route } from '../../services/route.service';
import Link from 'next/link';

interface RouteCardProps {
  route: Route;
  onDelete: (id: string) => void;
}

const RouteCard: React.FC<RouteCardProps> = ({ route, onDelete }) => {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '15px',
      marginBottom: '15px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
    }}>
      <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{route.name}</h3>
      {route.description && <p style={{ margin: '0 0 10px 0', color: '#666' }}>{route.description}</p>}
      <p style={{ margin: '0 0 10px 0', fontSize: '0.9em', color: '#888' }}>
        {route.stops.length} destino(s)
      </p>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Link href={`/routes/${route.id}`} style={{
          padding: '8px 12px',
          backgroundColor: '#007bff',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
          fontSize: '0.9em'
        }}>
          <span style={{ color: '#ffffff' }}>Ver Detalhes</span>
        </Link>
        <Link href={`/routes/${route.id}/edit`} style={{
          padding: '8px 12px',
          backgroundColor: '#28a745',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
          fontSize: '0.9em'
        }}>
          Editar
        </Link>
        <button
          onClick={() => onDelete(route.id)}
          style={{
            padding: '8px 12px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.9em'
          }}
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

export default RouteCard;