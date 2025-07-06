import React from "react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Página não encontrada</p>
      <Link href="/" className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Voltar para o início</Link>
    </div>
  )
} 