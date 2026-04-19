"use client";
import React from "react";
import Link from "next/link";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import styles from "../page.module.css"; // Reuse some styles or create specific ones

export default function SuccessPage() {
  return (
    <div className={styles.container} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", minHeight: "80vh" }}>
      <div style={{ marginBottom: "2rem", color: "var(--color-accent)" }}>
        <CheckCircle size={80} strokeWidth={1} />
      </div>
      
      <h1 className={styles.title} style={{ marginBottom: "1rem" }}>¡Compra Exitosa!</h1>
      <p style={{ fontSize: "1.2rem", color: "var(--color-text-muted)", maxWidth: "600px", margin: "0 auto 3rem" }}>
        Tu pedido ha sido recibido y está siendo procesado por nuestros artesanos. 
        Pronto recibirás un correo con los detalles de tu envío exclusivo.
      </p>

      <div className={styles.section} style={{ width: "100%", maxWidth: "500px", textAlign: "left" }}>
        <h2 className={styles.sectionTitle} style={{ fontSize: "1.2rem", marginBottom: "1.5rem" }}>
          <Package size={20} />
          ¿Qué sigue ahora?
        </h2>
        <ul style={{ listStyle: "none", padding: 0, color: "var(--color-text-muted)", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <li>1. Validación de piezas y control de calidad.</li>
          <li>2. Empaque de lujo asegurado.</li>
          <li>3. Envío prioritario a tu dirección.</li>
        </ul>
      </div>

      <div style={{ marginTop: "3rem", display: "flex", gap: "20px" }}>
        <Link href="/productos" className="btn-gold" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          Seguir Explorando
          <ArrowRight size={18} />
        </Link>
        <Link href="/cuenta" className="btn-outline">
          Ver mis Pedidos
        </Link>
      </div>
    </div>
  );
}
