"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("http://localhost:3333/api/auth/login", data);
      const { token } = response.data;
      localStorage.setItem("token", token);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email é obrigatório" })}
            className="w-full border border-gray-300 rounded px-3 py-2"
            autoComplete="email"
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message as string}</span>}
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium">Senha</label>
          <input
            type="password"
            {...register("password", { required: "Senha é obrigatória" })}
            className="w-full border border-gray-300 rounded px-3 py-2"
            autoComplete="current-password"
          />
          {errors.password && <span className="text-red-500 text-sm">{errors.password.message as string}</span>}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition mb-2"
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
        <button
          type="button"
          className="w-full bg-gray-200 text-blue-700 py-2 rounded font-semibold hover:bg-gray-300 transition"
          onClick={() => router.push("/register")}
        >
          Criar conta
        </button>
      </form>
    </div>
  );
} 