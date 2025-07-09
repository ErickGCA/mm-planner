'use client';

import React, { useState, useEffect } from 'react';
import Input from './Input';
import Button from './Button';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import DraggableDestinationItem from './DraggableDestinationItem';
import { Destination, Route, RouteStopInput } from '../services/route.service';
import { destinationService } from '../services/destination.service';

interface RouteFormProps {
  initialData?: Route;
  onSubmit: (
    routeData: { name: string; description?: string },
    stops: RouteStopInput[]
  ) => void;
  isLoading: boolean;
  error: string | null;
}

const RouteForm: React.FC<RouteFormProps> = ({ initialData, onSubmit, isLoading, error }) => {
  const [routeName, setRouteName] = useState(initialData?.name || '');
  const [routeDescription, setRouteDescription] = useState(initialData?.description || '');
  const [availableDestinations, setAvailableDestinations] = useState<Destination[]>([]);
  const [selectedDestinations, setSelectedDestinations] = useState<Destination[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestinationToAdd, setSelectedDestinationToAdd] = useState('');

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const fetched = await destinationService.getAllDestinations();
        setAvailableDestinations(fetched);
      } catch (err) {
        console.error('Error fetching available destinations:', err);
      }
    };
    fetchDestinations();

    if (initialData && initialData.stops) {
      const sortedStops = [...initialData.stops].sort((a, b) => a.order - b.order);
      setSelectedDestinations(sortedStops.map(stop => stop.destination));
    }
  }, [initialData]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newDestinations = Array.from(selectedDestinations);
    const [reorderedItem] = newDestinations.splice(result.source.index, 1);
    newDestinations.splice(result.destination.index, 0, reorderedItem);

    setSelectedDestinations(newDestinations);
  };

  const handleAddDestination = () => {
    const destinationToAdd = availableDestinations.find(d => d.id === selectedDestinationToAdd);
    if (destinationToAdd && !selectedDestinations.some(d => d.id === destinationToAdd.id)) {
      setSelectedDestinations([...selectedDestinations, destinationToAdd]);
      setSelectedDestinationToAdd('');
    }
  };

  const handleRemoveDestination = (destinationId: string) => {
    setSelectedDestinations(selectedDestinations.filter(d => d.id !== destinationId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const routeData = {
      name: routeName,
      description: routeDescription || undefined,
    };
    const stopsData: RouteStopInput[] = selectedDestinations.map((dest, index) => ({
      destinationId: dest.id,
      order: index + 1,
    }));
    onSubmit(routeData, stopsData);
  };

  const filteredAvailableDestinations = availableDestinations.filter(
    (dest) =>
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !selectedDestinations.some((selected) => selected.id === dest.id)
  );

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', border: '1px solid #eee', borderRadius: '8px', maxWidth: '800px', margin: '20px auto', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', color: '#7a0909'}}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
        {initialData ? `Editar Rota: ${initialData.name}` : 'Criar Nova Rota'}
      </h2>

      <Input
        label="Nome da Rota"
        id="route-name"
        type="text"
        value={routeName}
        onChange={(e) => setRouteName(e.target.value)}
        required
      />
      <Input
        label="Descrição da Rota (Opcional)"
        id="route-description"
        type="text"
        value={routeDescription}
        onChange={(e) => setRouteDescription(e.target.value)}
      />

      <div style={{ marginTop: '20px', padding: '15px', border: '1px dashed #ccc', borderRadius: '4px', color: '#7a0909'}}>
        <h3 style={{ marginTop: 0, marginBottom: '15px' }}>Adicionar Destinos à Rota</h3>
        <Input
          label="Buscar Destinos Existentes"
          id="search-destinations"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Digite para buscar..."
        />
        <select
          id="available-destinations-select"
          value={selectedDestinationToAdd}
          onChange={(e) => setSelectedDestinationToAdd(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px', marginTop: '10px', }}
        >
          <option value="">Selecione um destino</option>
          {filteredAvailableDestinations.map((dest) => (
            <option key={dest.id} value={dest.id}>
              {dest.name} (Lat: {dest.latitude.toFixed(2)}, Lng: {dest.longitude.toFixed(2)})
            </option>
          ))}
        </select>
        <Button type="button" onClick={handleAddDestination} disabled={!selectedDestinationToAdd} style={{ color: '#7a0909'}}>
          Adicionar Destino à Rota
        </Button>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', border: '1px dashed #ccc', borderRadius: '4px' }}>
        <h3 style={{ marginTop: 0, marginBottom: '15px' }}>Destinos na Rota (Arraste para reordenar)</h3>
        {selectedDestinations.length === 0 && (
          <p style={{ textAlign: 'center', color: '#888' }}>Nenhum destino adicionado ainda. Adicione um acima!</p>
        )}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="selected-destinations">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ minHeight: '50px', backgroundColor: '#ffff', padding: '8px', borderRadius: '4px' }}
              >
                {selectedDestinations.map((dest, index) => (
                  <Draggable key={dest.id} draggableId={dest.id} index={index}>
                    {(provided, snapshot) => (
                      <DraggableDestinationItem
                        destination={dest}
                        provided={provided}
                        snapshot={snapshot}
                        index={index}
                        onRemove={handleRemoveDestination}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {error && <p style={{ color: 'red', marginBottom: '10px', marginTop: '20px' }}>{error}</p>}
      <Button type="submit" disabled={isLoading} style={{ marginTop: '20px' }}>
        {isLoading ? 'Salvando...' : (initialData ? 'Salvar Rota' : 'Criar Rota')}
      </Button>
    </form>
  );
};

export default RouteForm;