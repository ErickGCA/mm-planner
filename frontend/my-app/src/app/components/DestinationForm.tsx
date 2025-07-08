import React, { useState, useEffect, useCallback, useRef } from 'react';
import Input from './Input';
import Button from './Button';
import { DestinationCreationData, DestinationUpdateData } from '../services/destination.service';
import { Destination } from '../services/route.service';
import { GoogleMap, Marker, useJsApiLoader, Autocomplete } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '300px',
  borderRadius: '12px',
  marginTop: '10px',
  marginBottom: '20px',
};
const defaultCenter = { lat: -25.4284, lng: -49.2733 }; 

interface DestinationFormProps {
  initialData?: Destination;
  onSubmit: (data: DestinationCreationData | DestinationUpdateData) => void;
  isLoading: boolean;
  error: string | null;
}

const DestinationForm: React.FC<DestinationFormProps> = ({ initialData, onSubmit, isLoading, error }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [address, setAddress] = useState('');
  const [lat, setLat] = useState<number>(initialData?.latitude || defaultCenter.lat);
  const [lng, setLng] = useState<number>(initialData?.longitude || defaultCenter.lng);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({ lat, lng });
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places'],
  });

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setLat(initialData.latitude);
      setLng(initialData.longitude);
      setMapCenter({ lat: initialData.latitude, lng: initialData.longitude });
    }
  }, [initialData]);

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      setAddress(place.formatted_address || place.name || '');
      if (place.geometry && place.geometry.location) {
        const newLat = place.geometry.location.lat();
        const newLng = place.geometry.location.lng();
        setLat(newLat);
        setLng(newLng);
        setMapCenter({ lat: newLat, lng: newLng });
      }
    }
  };

  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setLat(e.latLng.lat());
      setLng(e.latLng.lng());
    }
  }, []);

  const handleMarkerDragEnd = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setLat(e.latLng.lat());
      setLng(e.latLng.lng());
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: name || address,
      latitude: lat,
      longitude: lng,
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', border: '1px solid #eee', borderRadius: '8px', marginBottom: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
      <h3 style={{ marginTop: 0 }}>{initialData ? 'Editar Destino' : 'Adicionar Novo Destino'}</h3>
      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="destination-address" style={{ color: '#7a0909', fontWeight: 600, marginBottom: 8, display: 'block' }}>Nome ou Endereço do Destino</label>
        {isLoaded && (
          <Autocomplete
            onLoad={ac => (autocompleteRef.current = ac)}
            onPlaceChanged={onPlaceChanged}
          >
            <input
              id="destination-address"
              type="text"
              value={address || name}
              onChange={e => {
                setAddress(e.target.value);
                setName(e.target.value);
              }}
              placeholder="Digite o nome ou endereço..."
              style={{
                width: '100%',
                padding: '15px 20px',
                border: '2px solid #333333',
                borderRadius: '12px',
                backgroundColor: '#fff',
                color: '#111',
                fontSize: '1rem',
                outline: 'none',
              }}
              required
            />
          </Autocomplete>
        )}
      </div>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={mapCenter}
          zoom={13}
          onClick={handleMapClick}
        >
          <Marker
            position={{ lat, lng }}
            draggable
            onDragEnd={handleMarkerDragEnd}
          />
        </GoogleMap>
      )}
      {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Salvando...' : (initialData ? 'Salvar Alterações' : 'Adicionar Destino')}
      </Button>
    </form>
  );
};

export default DestinationForm;