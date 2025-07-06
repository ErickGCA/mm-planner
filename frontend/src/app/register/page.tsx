"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await axios.post("http://localhost:3333/api/auth/register", data);
      setSuccess("Cadastro realizado com sucesso! Faça login.");
      setTimeout(() => router.push("/login"), 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao registrar");
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
        <h2 className="text-2xl font-bold mb-6 text-center">Criar Conta</h2>
        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
        {success && <div className="mb-4 text-green-600 text-center">{success}</div>}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Nome</label>
          <input
            type="text"
            {...register("name", { required: "Nome é obrigatório" })}
            className="w-full border border-gray-300 rounded px-3 py-2"
            autoComplete="name"
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message as string}</span>}
        </div>
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
            autoComplete="new-password"
          />
          {errors.password && <span className="text-red-500 text-sm">{errors.password.message as string}</span>}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition mb-2"
          disabled={loading}
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
        <button
          type="button"
          className="w-full bg-gray-200 text-blue-700 py-2 rounded font-semibold hover:bg-gray-300 transition"
          onClick={() => router.push("/login")}
        >
          Já tenho conta
        </button>
      </form>
    </div>
  );
} 