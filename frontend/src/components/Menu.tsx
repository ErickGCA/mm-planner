"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Menu() {
    const pathname = usePathname()
    if (pathname === "/login" || pathname === "/register") return null;
  return (
    <nav className="w-full bg-gray-900 text-white px-4 py-3 flex items-center justify-between shadow-md sticky top-0 z-50">
      <div className="flex items-center gap-6">
        <Link href="/dashboard" className="font-bold text-lg hover:text-blue-400 transition">Dashboard</Link>
        <Link href="/destinos" className="hover:text-blue-400 transition">Destinos</Link>
        <Link href="/rotas" className="hover:text-blue-400 transition">Rotas</Link>
        <Link href="/perfil" className="hover:text-blue-400 transition">Perfil</Link>
      </div>
      <div>
        <button onClick={() => { localStorage.removeItem('token'); window.location.href = '/login'; }} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition">Sair</button>
      </div>
    </nav>
  )
} 