"use client";

import React, { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic';
import { routeService, Route, RouteCalculationResult } from "../../services/route.service";
import Button from "../../components/Button";
import Link from "next/link";
import ProtectedRoute from "../../components/ProtectedRoute";
import styles from "./details-route.module.css";

const RouteMap = dynamic(() => import('../../components/RouteMap'), {
  ssr: false,
  loading: () => (
    <div style={{
      height: '350px',
      width: '100%',
      background: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <p>Carregando mapa...</p>
    </div>
  )
});

interface RouteDetailsPageProps {
  params: { id: string };
}

const RouteDetailsPage: React.FC<RouteDetailsPageProps> = ({ params }) => {
  console.log('RouteDetailsPage renderizou!');
  const router = useRouter();
  const { id: routeId } = use(params as unknown as Promise<{ id: string }>);
  const [routeData, setRouteData] = useState<Route | null>(null);
  const [calculation, setCalculation] = useState<RouteCalculationResult | null>(null);
  const [routePath, setRoutePath] = useState<[number, number][]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const fetchedRoute = await routeService.getRouteById(routeId);
        setRouteData(fetchedRoute);
        const calc = await routeService.calculateRoute(routeId);
        setCalculation(calc);
        
        if (fetchedRoute && fetchedRoute.stops.length > 1) {
          const sortedStops = [...fetchedRoute.stops].sort((a, b) => a.order - b.order);
          const coordinates = sortedStops.map(stop => `${stop.destination.longitude},${stop.destination.latitude}`).join(';');
          const response = await fetch(`https://router.project-osrm.org/route/v1/driving/${coordinates}?geometries=geojson`);
          const data = await response.json();
          if (data.routes && data.routes.length > 0) {
            const path = data.routes[0].geometry.coordinates.map((coord: [number, number]) => [coord[1], coord[0]]);
            setRoutePath(path);
          }
        }
      } catch (err: any) {
        setError(err.message || "Erro ao carregar detalhes da rota.");
        if (err.message?.includes("Unauthorized") || err.message?.includes("Route not found")) {
          router.push("/dashboard");
        }
      } finally {
        setIsLoading(false);
      }
    };
    if (routeId) fetchData();
  }, [routeId, router]);

  const handleDelete = async () => {
    if (!window.confirm("Tem certeza que deseja excluir esta rota?")) return;
    try {
      await routeService.deleteRoute(routeId);
      alert("Rota excluída com sucesso!");
      router.push("/dashboard");
    } catch (err: any) {
      alert(err.message || "Erro ao excluir rota.");
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
          <h3 style={{ color: '#7a0909', marginTop: 0 }}>{routeData.name}</h3>
          {routeData.description && <p style={{ color: '#333' }}>{routeData.description}</p>}
          <h4 style={{ marginTop: 30, color: '#7a0909'}}>Destinos:</h4>
          <ol style={{ paddingLeft: 20 }}>
            {routeData.stops
              .sort((a, b) => a.order - b.order)
              .map((stop) => (
                <li key={stop.id} style={{ marginBottom: 10, color: '#7a0909'}}>
                  <strong>{stop.destination.name}</strong> <br />
                  <span style={{ fontSize: '0.9em', color: '#666' }}>
                    Lat: {stop.destination.latitude.toFixed(6)}, Lng: {stop.destination.longitude.toFixed(6)}
                  </span>
                </li>
              ))}
          </ol>
          <RouteMap 
            points={routeData.stops.map(stop => ({
              latitude: stop.destination.latitude,
              longitude: stop.destination.longitude,
              name: stop.destination.name
            }))} 
            path={routePath}
          />

          {calculation && (
            <div style={{ marginTop: 30, color: '#7a0909'}}>
              <h4>Resumo do Trajeto:</h4>
              <p><strong>Distância total:</strong> {calculation.totalDistance}</p>
              <p><strong>Duração estimada:</strong> {calculation.totalDuration}</p>
            </div>
          )}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default RouteDetailsPage;