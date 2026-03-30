"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import styles from "./page.module.css";
import { Package } from "lucide-react";

export default function CuentaPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.dashboard}>
        <aside className={styles.sidebar}>
          <div className={styles.profileInfo}>
            <div className={styles.avatar}>
              {user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || "U"}
            </div>
            <h2 className={styles.name}>{user.displayName || "Usuario Luxe"}</h2>
            <p className={styles.email}>{user.email}</p>
          </div>
          
          <nav className={styles.nav}>
            <button className={`${styles.menuBtn} ${styles.active}`}>Mis Pedidos</button>
            <button className={styles.menuBtn}>Detalles de Cuenta</button>
            <button onClick={handleLogout} className={`${styles.menuBtn} ${styles.logoutBtn}`}>
              Cerrar Sesión
            </button>
          </nav>
        </aside>
        
        <main className={styles.content}>
          <h1 className={styles.title}>Historial de Compras</h1>
          <div className={styles.divider}></div>
          
          <div className={styles.emptyOrders}>
            <Package size={48} className={styles.icon} />
            <h3>No tienes pedidos recientes</h3>
            <p>Descubre nuevas colecciones y agrega piezas a tu historia.</p>
            <button className="btn-gold" onClick={() => router.push('/productos')} style={{marginTop: '2rem'}}>
              Ir a la Tienda
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
