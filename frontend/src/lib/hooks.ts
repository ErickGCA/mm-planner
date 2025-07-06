import { useEffect, useState } from "react";
import { api } from "./api";

export function useDestinos() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    api.get("/destinations")
      .then((res) => setData(res.data))
      .catch((err) => setError(err.response?.data?.message || "Erro ao buscar destinos"))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

export function useDestino(id: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api.get(`/destinations/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => setError(err.response?.data?.message || "Erro ao buscar destino"))
      .finally(() => setLoading(false));
  }, [id]);

  return { data, loading, error };
}

export function useRotas() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    api.get("/routes")
      .then((res) => setData(res.data))
      .catch((err) => setError(err.response?.data?.message || "Erro ao buscar rotas"))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

export function useRota(id: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api.get(`/routes/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => setError(err.response?.data?.message || "Erro ao buscar rota"))
      .finally(() => setLoading(false));
  }, [id]);

  return { data, loading, error };
} 