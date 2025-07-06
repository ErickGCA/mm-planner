"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence, easeInOut, easeOut } from "framer-motion"
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const onSubmit = async (data: any) => {
    setLoading(true)
    setError("")
    try {
      const response = await axios.post("http://localhost:3333/api/auth/login", data)
      const { token } = response.data
      localStorage.setItem("token", token)

      // Animação de sucesso antes de redirecionar
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao fazer login")
    } finally {
      setLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: easeOut },
    },
  }

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: easeInOut,
      },
    },
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating Elements */}
      <motion.div variants={floatingVariants} animate="animate" className="absolute top-20 left-20 text-white/20">
        <Sparkles size={24} />
      </motion.div>
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-40 right-32 text-white/20"
        style={{ animationDelay: "2s" }}
      >
        <Sparkles size={32} />
      </motion.div>
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute bottom-32 left-32 text-white/20"
        style={{ animationDelay: "4s" }}
      >
        <Sparkles size={20} />
      </motion.div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-md">
          <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
            <CardHeader className="text-center pb-8">
              <motion.div variants={itemVariants}>
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <User className="w-8 h-8 text-white" />
                </div>
              </motion.div>
              <motion.div variants={itemVariants}>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Bem-vindo de volta
                </CardTitle>
              </motion.div>
              <motion.div variants={itemVariants}>
                <CardDescription className="text-gray-300 text-lg">Entre na sua conta para continuar</CardDescription>
              </motion.div>
            </CardHeader>

            <CardContent className="space-y-6">
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: easeOut }}
                  >
                    <Alert className="border-red-500/50 bg-red-500/10 text-red-300">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="email" className="text-gray-200 font-medium">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      {...register("email", { required: "Email é obrigatório" })}
                      className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-300"
                      autoComplete="email"
                    />
                  </div>
                  {errors.email && (
                    <motion.span
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: easeOut }}
                      className="text-red-400 text-sm"
                    >
                      {errors.email.message as string}
                    </motion.span>
                  )}
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="password" className="text-gray-200 font-medium">
                    Senha
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...register("password", { required: "Senha é obrigatória" })}
                      className="pl-10 pr-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-300"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <motion.span
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: easeOut }}
                      className="text-red-400 text-sm"
                    >
                      {errors.password.message as string}
                    </motion.span>
                  )}
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-4">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Entrando...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <span>Entrar</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/register")}
                    className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30 font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    Criar nova conta
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
