"use client";

import React, { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic';
import polyline from '@mapbox/polyline';
import { routeService, Route, RouteLeg, RouteCalculationResult } from "../../services/route.service";
import Button from "../../components/Button";
import Link from "next/link";
import ProtectedRoute from "../../components/ProtectedRoute";
import styles from "./details-route.module.css";
import Toast from '../../components/Toast';
import ConfirmModal from '../../components/ConfirmModal';

const RouteMap = dynamic(() => import('../../components/RouteMap'), {
  ssr: false,
  loading: () => (
    <div style={{ height: '400px', width: '100%', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p>Carregando mapa...</p>
    </div>
  )
});

interface PathSegment {
  path: [number, number][];
  color: string;
}

interface RouteDetailsPageProps {
  params: { id: string };
}

const RouteDetailsPage: React.FC<RouteDetailsPageProps> = ({ params }) => {
  const router = useRouter();
  const { id: routeId } = use(params as unknown as Promise<{ id: string }>);
  const [routeData, setRouteData] = useState<Route | null>(null);
  const [calculation, setCalculation] = useState<Omit<RouteCalculationResult, 'legs'> | null>(null);
  const [legs, setLegs] = useState<RouteLeg[]>([]);
  const [pathSegments, setPathSegments] = useState<PathSegment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const fetchedRoute = await routeService.getRouteById(routeId);
        setRouteData(fetchedRoute);
  
        if (fetchedRoute && fetchedRoute.stops.length > 1) {
          const calcResult = await routeService.calculateRoute(routeId);
          
          if (calcResult) {
            setCalculation({ totalDistance: calcResult.totalDistance, totalDuration: calcResult.totalDuration });
            setLegs(calcResult.legs || []);
            
            if (calcResult.legs) {
              const colors = ['#0d6efd', '#dc3545', '#198754', '#ffc107', '#6f42c1', '#fd7e14'];
              const segments = calcResult.legs.map((leg, index) => ({
                path: polyline.decode(leg.encodedPolyline) as [number, number][],
                color: colors[index % colors.length]
              }));
              setPathSegments(segments);
            }
          }
        }
      } catch (err: any) {
        setError(err.message || "Erro ao carregar detalhes da rota.");
      } finally {
        setIsLoading(false);
      }
    };
    if (routeId) fetchData();
  }, [routeId, router]);
  
  const handleDelete = () => {
    setConfirmOpen(true);
  };

  const confirmDeleteRoute = async () => {
    try {
      await routeService.deleteRoute(routeId);
      setToast({ message: 'Rota excluída com sucesso!', type: 'success' });
      router.push('/dashboard');
    } catch (err: any) {
      setToast({ message: err.message || 'Erro ao excluir rota.', type: 'error' });
    } finally {
      setConfirmOpen(false);
    }
  };

  if (isLoading || !routeData) {
    return (
      <div className={styles.loadingWrapper}>
        <div>
          <h2 className={styles.loadingTitle}>Carregando detalhes...</h2>
          <div className={styles.spinner}></div>
        </div>
      </div>
    );
  }

  const sortedStops = [...routeData.stops].sort((a, b) => a.order - b.order);

  return (
    <ProtectedRoute>
      <div className={styles.pageWrapper}>
        <div className={styles.cardContainer}>
          <div className={styles.headerRow}>
            <h2 className={styles.headerTitle}>Detalhes da Rota</h2>
            <div style={{ display: "flex", gap: 10 }}>
              <Link href={`/routes/${routeId}/edit`} passHref>
                <Button variant="outline">Editar</Button>
              </Link>
              <Button variant="outline" onClick={handleDelete} style={{ color: '#dc3545', borderColor: '#dc3545' }}>Excluir</Button>
              <Button variant="outline" onClick={() => router.push("/dashboard")}>Voltar</Button>
            </div>
          </div>
          <h3 style={{ color: '#7a0909', marginTop: 0, marginBottom: '20px' }}>{routeData.name}</h3>
          {routeData.description && <p style={{ color: '#333', marginTop: '-10px' }}>{routeData.description}</p>}

          <div style={{ display: 'flex', flexDirection: 'row', gap: '30px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
            <div style={{ flex: '1.2' }}>
              <h4 style={{ marginTop: 0, color: '#7a0909'}}>Destinos:</h4>
              <ol style={{ paddingLeft: 20, margin: 0 }}>
                {sortedStops.map((stop, index) => (
                  <li key={stop.id} style={{ marginBottom: 15, color: '#7a0909'}}>
                    <strong>{stop.destination.name}</strong> <br />
                    <span style={{ fontSize: '0.9em', color: '#666' }}>
                      Lat: {stop.destination.latitude.toFixed(6)}, Lng: {stop.destination.longitude.toFixed(6)}
                    </span>
                    {legs[index] && (
                       <div style={{ fontSize: '0.85em', color: '#555', background: '#f8f9fa', padding: '5px 8px', borderRadius: '4px', marginTop: '5px' }}>
                         <strong>Próximo trecho:</strong> {legs[index].distance} ({legs[index].duration})
                       </div>
                    )}
                  </li>
                ))}
              </ol>
            </div>

            <div style={{ flex: '1', borderLeft: '1px solid #eee', paddingLeft: '30px' }}>
              {calculation && (
                <div>
                  <h4 style={{ marginTop: 0, color: '#7a0909'}}>Resumo do Trajeto:</h4>
                  <p style={{ color: '#7a0909'}}><strong>Distância total:</strong> {calculation.totalDistance}</p>
                  <p style={{ color: '#7a0909'}}><strong>Duração estimada:</strong> {calculation.totalDuration}</p>
                </div>
              )}
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
          </div>
          
          <RouteMap 
            points={sortedStops.map(stop => ({
              latitude: stop.destination.latitude,
              longitude: stop.destination.longitude,
              name: stop.destination.name
            }))} 
            pathSegments={pathSegments}
          />
        </div>
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
        message="Tem certeza que deseja excluir esta rota?"
        confirmText="Excluir"
        cancelText="Cancelar"
        onConfirm={confirmDeleteRoute}
        onCancel={() => setConfirmOpen(false)}
      />
    </ProtectedRoute>
  );
};

export default RouteDetailsPage;