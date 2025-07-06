"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRotas } from "../../lib/hooks"
import { api } from "../../lib/api"

export default function RotasPage() {
  const { data, loading, error } = useRotas()
  const [nome, setNome] = useState("")
  const [addError, setAddError] = useState("")
  const [addLoading, setAddLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setAddError("")
    setAddLoading(true)
    try {
      await api.post("/routes", { name: nome })
      setNome("")
      setRefresh((r) => !r)
      window.location.reload()
    } catch (err: any) {
      setAddError(err.response?.data?.message || "Erro ao adicionar rota")
    } finally {
      setAddLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Rotas</h1>
      <form onSubmit={handleAdd} className="mb-6 flex gap-2 flex-wrap">
        <input
          type="text"
          placeholder="Nome da rota"
          value={nome}
          onChange={e => setNome(e.target.value)}
          className="border px-2 py-1 rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded" disabled={addLoading}>
          {addLoading ? "Adicionando..." : "Adicionar rota"}
        </button>
      </form>
      {addError && <p className="text-red-500 mb-2">{addError}</p>}
      {loading ? (
        <p>Carregando rotas...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ul className="space-y-2">
          {data.map((rota: any) => (
            <li key={rota.id} className="border p-2 rounded flex items-center justify-between">
              <Link href={`/rotas/${rota.id}`} className="font-semibold hover:underline">
                {rota.name}
              </Link>
              <button
                className="bg-red-600 text-white px-3 py-1 rounded ml-4"
                onClick={async () => {
                  await api.delete(`/routes/${rota.id}`)
                  window.location.reload()
                }}
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
} 