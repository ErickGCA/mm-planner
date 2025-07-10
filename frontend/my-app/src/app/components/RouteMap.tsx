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

interface PathSegment {
  path: [number, number][];
  color: string;
}

interface RouteMapProps {
  points: LatLng[];
  pathSegments?: PathSegment[]; 
}

export default function RouteMap({ points, pathSegments }: RouteMapProps) {
  if (!points || points.length === 0) {
    return (
      <div style={{ width: '100%', height: 350, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Aguardando pontos para exibir no mapa...
      </div>
    );
  }

  const mapBounds = L.latLngBounds(points.map(p => [p.latitude, p.longitude]));

  return (
    <MapContainer bounds={mapBounds} style={{ height: '400px', width: '100%', marginTop: '20px', borderRadius: '8px' }} scrollWheelZoom={true}>
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

      {pathSegments?.map((segment, index) => (
        <Polyline key={index} positions={segment.path} pathOptions={{ color: segment.color, weight: 5 }} />
      ))}
    </MapContainer>
  );
}