import React from 'react';
import { DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd';
import { Destination } from '../services/route.service';
import Button from './Button';

interface DraggableDestinationItemProps {
  destination: Destination;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  index: number;
  onRemove: (destinationId: string) => void;
}

const DraggableDestinationItem: React.FC<DraggableDestinationItemProps> = ({
  destination,
  provided,
  snapshot,
  onRemove,
}) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={{
        userSelect: 'none',
        padding: '10px',
        margin: '0 0 8px 0',
        minHeight: '50px',
        backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
        color: 'white',
        border: '1px solid #ddd',
        borderRadius: '4px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...provided.draggableProps.style,
      }}
    >
      <span>{destination.name} (Lat: {destination.latitude.toFixed(4)}, Lng: {destination.longitude.toFixed(4)})</span>
      <Button
        type="button"
        onClick={() => onRemove(destination.id)}
        style={{
          backgroundColor: '#dc3545',
          color: 'white',
          fontSize: '0.8em',
          padding: '5px 10px',
          borderRadius: '4px',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Remover
      </Button>
    </div>
  );
};

export default DraggableDestinationItem;