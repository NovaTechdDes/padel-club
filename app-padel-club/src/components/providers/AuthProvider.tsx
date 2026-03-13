"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabase";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/src/store/auth.store";
import { Loader2 } from "lucide-react";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setIsLoading, isLoading, user } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isMounting, setIsMounting] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (error) {
        console.error("Error checking session:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
        setIsMounting(false);
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, setIsLoading]);

  useEffect(() => {
    if (isMounting || isLoading) return;

    const isLoginPage = pathname === "/login";
    
    if (!user && !isLoginPage) {
      router.replace("/login");
    } else if (user && isLoginPage) {
      router.replace("/");
    }
  }, [user, isLoading, pathname, router, isMounting]);

  if (isMounting || (isLoading && pathname !== "/login")) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-lime-400 animate-spin" />
          <p className="text-gray-400 font-medium">Cargando sesión...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
