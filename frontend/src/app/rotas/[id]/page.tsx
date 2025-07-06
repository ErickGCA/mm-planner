"use client"

import React from "react"
import { useRota } from "../../../lib/hooks"
import { api } from "../../../lib/api"
import { useRouter } from "next/navigation"

interface RotaDetalheProps {
  params: { id: string }
}

export default function RotaDetalhePage({ params }: RotaDetalheProps) {
  const { data, loading, error } = useRota(params.id)
  const router = useRouter()

  async function handleDelete() {
    await api.delete(`/routes/${params.id}`)
    router.push("/rotas")
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Detalhes da Rota</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : data ? (
        <div className="space-y-2">
          <p><b>ID:</b> {data.id}</p>
          <p><b>Nome:</b> {data.name}</p>
          {/* Adicione mais campos conforme necessário */}
          <button onClick={handleDelete} className="mt-4 px-4 py-2 bg-red-600 text-white rounded">Excluir rota</button>
        </div>
      ) : null}
    </div>
  )
} 