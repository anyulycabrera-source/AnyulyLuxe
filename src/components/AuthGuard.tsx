"use client";
import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (!loading && !user && pathname !== "/auth") {
      router.push("/auth");
    }
  }, [user, loading, pathname, router]);

  // Pantalla de carga sofisticada para la joyería
  if (loading) {
    return (
      <div style={{
        display: "flex", 
        flexDirection: "column",
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh",
        backgroundColor: "var(--color-bg, #000)", // Fondo negro elegante
      }}>
        <div style={{
          width: "50px",
          height: "50px",
          border: "2px solid rgba(212, 175, 55, 0.2)",
          borderTopColor: "var(--color-gold, #D4AF37)",
          borderRadius: "50%",
          animation: "spin 1s cubic-bezier(0.55, 0.055, 0.675, 0.19) infinite"
        }} />
        <p style={{
          marginTop: "1.5rem",
          color: "var(--color-gold, #D4AF37)",
          fontFamily: "var(--font-playfair, serif)",
          fontSize: "1.1rem",
          letterSpacing: "2px"
        }}>
          ANYULY LUXE
        </p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Prevenir parpadeo UI si se está redirigiendo
  if (!user && pathname !== "/auth") {
    return null;
  }

  return <>{children}</>;
}
