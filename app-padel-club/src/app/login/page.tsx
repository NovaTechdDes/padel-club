"use client";

import React, { useState, useEffect } from "react";
import { Mail, Lock, Eye, EyeOff, Loader2, Trophy } from "lucide-react";
import { supabase } from "@/src/lib/supabase";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberEmail, setRememberEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Cargar el email guardado al iniciar
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberEmail(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Persistencia del email si "Recordar" está activo
      if (rememberEmail) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      Swal.fire({
        icon: "success",
        title: "¡Bienvenido!",
        text: "Inicio de sesión exitoso",
        timer: 1500,
        showConfirmButton: false,
        background: "#121212",
        color: "#ffffff",
      });

      router.push("/");
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Credenciales incorrectas";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        background: "#121212",
        color: "#ffffff",
        confirmButtonColor: "#a3e635",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden font-sans">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-lime-400/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-lime-500/10 rounded-full blur-[120px]" />

      <div className="w-full max-w-md p-8 relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-lime-400 rounded-2xl mb-4 shadow-[0_0_20px_rgba(163,230,53,0.4)] transform -rotate-6">
            <Trophy className="text-black w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Padel Club</h1>
          <p className="text-gray-400">Ingresa a tu cuenta para reservar tu cancha</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Email</label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-lime-400 transition-colors" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="w-full bg-[#181818] border border-gray-800 text-white pl-10 pr-4 py-3 rounded-xl focus:border-lime-400 focus:ring-1 focus:ring-lime-400 outline-none transition-all placeholder:text-gray-600"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Contraseña</label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-lime-400 transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-[#181818] border border-gray-800 text-white pl-10 pr-12 py-3 rounded-xl focus:border-lime-400 focus:ring-1 focus:ring-lime-400 outline-none transition-all placeholder:text-gray-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Remember me and Forgot password */}
          <div className="flex items-center justify-between px-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={rememberEmail}
                  onChange={(e) => setRememberEmail(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-5 h-5 border-2 border-gray-700 rounded-md bg-[#181818] peer-checked:bg-lime-400 peer-checked:border-lime-400 transition-all" />
                <svg
                  className="absolute top-1 left-1 w-3 h-3 text-black opacity-0 peer-checked:opacity-100 transition-opacity"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors">Recordar email</span>
            </label>
            <button type="button" className="text-sm text-lime-400 hover:text-lime-300 font-medium transition-colors">
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-lime-400 hover:bg-lime-300 disabled:bg-gray-700 disabled:cursor-not-allowed text-black font-bold py-4 rounded-xl shadow-[0_4px_20px_rgba(163,230,53,0.3)] hover:shadow-[0_4px_25px_rgba(163,230,53,0.5)] transition-all flex items-center justify-center gap-2 transform active:scale-[0.98]"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Iniciar Sesión"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
