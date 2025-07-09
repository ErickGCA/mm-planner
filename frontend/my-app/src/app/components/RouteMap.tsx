"use client";

import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
});

interface LatLng {
  latitude: number;
  longitude: number;
  name?: string;
}

interface RouteMapProps {
  points: LatLng[];
  path?: [number, number][]; 
}

export default function RouteMap({ points, path }: RouteMapProps) {
  if (!points || points.length === 0) {
    return (
      <div style={{ width: '100%', height: 350, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Aguardando pontos para exibir no mapa...
      </div>
    );
  }

  const initialPosition: [number, number] = [points[0].latitude, points[0].longitude];

  return (
    <MapContainer center={initialPosition} zoom={13} style={{ height: '350px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {points.map((point, idx) => (
        <Marker key={idx} position={[point.latitude, point.longitude]}>
          <Popup>
            {point.name || `Ponto ${idx + 1}`}
          </Popup>
        </Marker>
      ))}

      {path && path.length > 0 && (
        <Polyline pathOptions={{ color: 'green' }} positions={path} />
      )}
    </MapContainer>
  );
}