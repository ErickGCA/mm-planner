"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Destination {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

interface Route {
  id: string;
  name: string;
  description?: string;
  stops: Array<{
    order: number;
    destination: Destination;
  }>;
}

export default function DashboardPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const destRes = await axios.get("http://localhost:3333/api/destinations", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDestinations(destRes.data);
        const routeRes = await axios.get("http://localhost:3333/api/routes", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRoutes(routeRes.data);
      } catch (err: any) {
        setError("Erro ao carregar dados. Faça login novamente.");
        localStorage.removeItem("token");
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.replace("/login");
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Sair
        </button>
      </div>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">Destinos</h2>
          <ul className="bg-white rounded shadow p-4">
            {destinations.length === 0 && <li>Nenhum destino cadastrado.</li>}
            {destinations.map(dest => (
              <li key={dest.id} className="mb-2 border-b last:border-b-0 pb-2 last:pb-0">
                <span className="font-medium">{dest.name}</span>
                <span className="text-gray-500 text-sm ml-2">({dest.latitude}, {dest.longitude})</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Rotas</h2>
          <ul className="bg-white rounded shadow p-4">
            {routes.length === 0 && <li>Nenhuma rota cadastrada.</li>}
            {routes.map(route => (
              <li key={route.id} className="mb-4 border-b last:border-b-0 pb-4 last:pb-0">
                <div className="font-medium">{route.name}</div>
                {route.description && <div className="text-gray-600 text-sm mb-1">{route.description}</div>}
                <div className="text-gray-500 text-xs">Destinos:</div>
                <ul className="ml-4 list-disc text-sm">
                  {route.stops && route.stops.length > 0 ? (
                    route.stops
                      .sort((a, b) => a.order - b.order)
                      .map(stop => (
                        <li key={stop.destination.id}>
                          {stop.destination.name} <span className="text-gray-400">({stop.destination.latitude}, {stop.destination.longitude})</span>
                        </li>
                      ))
                  ) : (
                    <li>Nenhum destino nesta rota.</li>
                  )}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 