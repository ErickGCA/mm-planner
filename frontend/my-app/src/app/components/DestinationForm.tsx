import React, { useState, useEffect, useRef } from 'react';
import Button from './Button';
import { DestinationCreationData, DestinationUpdateData } from '../services/destination.service';
import { Destination } from '../services/route.service';
import { APIProvider, Map, AdvancedMarker, useMapsLibrary } from '@vis.gl/react-google-maps';

const mapContainerStyle = {
  width: '100%',
  height: '300px',
  borderRadius: '12px',
  marginTop: '10px',
  marginBottom: '20px',
};
const defaultCenter = { lat: -25.4284, lng: -49.2733 };

const AutocompleteInput = ({ onPlaceSelect, initialName }: { onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void; initialName: string; }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const places = useMapsLibrary('places');

    useEffect(() => {
        if (!places || !inputRef.current) return;

        const autocomplete = new places.Autocomplete(inputRef.current);
        autocomplete.addListener('place_changed', () => {
            onPlaceSelect(autocomplete.getPlace());
        });
    }, [places, onPlaceSelect]);

    useEffect(() => {
        if(inputRef.current) {
            inputRef.current.value = initialName;
        }
    }, [initialName]);

    return (
        <input
            ref={inputRef}
            placeholder="Digite o nome ou endereço..."
            style={{
                width: '100%', padding: '15px 20px', border: '2px solid #333333', borderRadius: '12px',
                backgroundColor: '#fff', color: '#111', fontSize: '1rem', outline: 'none',
            }}
            required
        />
    );
};

interface DestinationFormProps {
  initialData?: Destination;
  onSubmit: (data: DestinationCreationData | DestinationUpdateData) => void;
  isLoading: boolean;
  error: string | null;
}

const DestinationForm: React.FC<DestinationFormProps> = ({ initialData, onSubmit, isLoading, error }) => {
    const [name, setName] = useState(initialData?.name || '');
    const [position, setPosition] = useState<{ lat: number, lng: number }>(initialData ? { lat: initialData.latitude, lng: initialData.longitude } : defaultCenter);
    
    const handlePlaceSelect = (place: google.maps.places.PlaceResult | null) => {
        if (!place) return;

        setName(place.name || place.formatted_address || '');
        if (place.geometry && place.geometry.location) {
            setPosition({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            name: name,
            latitude: position.lat,
            longitude: position.lng,
        });
    };

    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
            <form onSubmit={handleSubmit} style={{ padding: '20px', border: '1px solid #eee', borderRadius: '8px', marginBottom: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', color: '#7a0909' }}>
                <h3 style={{ marginTop: 0 }}>{initialData ? 'Editar Destino' : 'Adicionar Novo Destino'}</h3>
                
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ color: '#7a0909', fontWeight: 600, marginBottom: 8, display: 'block' }}>Nome ou Endereço do Destino</label>
                    <AutocompleteInput onPlaceSelect={handlePlaceSelect} initialName={initialData?.name || ''} />
                </div>

                <Map
                    mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
                    style={mapContainerStyle}
                    defaultCenter={defaultCenter}
                    center={position}
                    defaultZoom={13}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                    onClick={e => e.detail.latLng && setPosition(e.detail.latLng)}
                >
                    <AdvancedMarker 
                        position={position}
                        draggable={true}
                        onDragEnd={e => e.latLng && setPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() })}
                    />
                </Map>

                {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
                
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Salvando...' : (initialData ? 'Salvar Alterações' : 'Adicionar Destino')}
                </Button>
            </form>
        </APIProvider>
    );
};

export default DestinationForm;