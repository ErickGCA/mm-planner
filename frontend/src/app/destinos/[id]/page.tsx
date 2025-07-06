"use client"

import React from "react"
import { useDestino } from "../../../lib/hooks"
import { api } from "../../../lib/api"
import { useRouter } from "next/navigation"

interface DestinoDetalheProps {
  params: { id: string }
}

export default function DestinoDetalhePage({ params }: DestinoDetalheProps) {
  const { data, loading, error } = useDestino(params.id)
  const router = useRouter()

  async function handleDelete() {
    await api.delete(`/destinations/${params.id}`)
    router.push("/destinos")
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Detalhes do Destino</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : data ? (
        <div className="space-y-2">
          <p><b>ID:</b> {data.id}</p>
          <p><b>Nome:</b> {data.name}</p>
          <p><b>Latitude:</b> {data.latitude}</p>
          <p><b>Longitude:</b> {data.longitude}</p>
          <button onClick={handleDelete} className="mt-4 px-4 py-2 bg-red-600 text-white rounded">Excluir destino</button>
        </div>
      ) : null}
    </div>
  )
} 