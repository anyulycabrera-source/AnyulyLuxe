"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Package, ArrowRight, FileText, Download } from "lucide-react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import InvoiceModal from "@/components/InvoiceModal";
import styles from "../page.module.css";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
  
  const [orderData, setOrderData] = useState<any>(null);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [loading, setLoading] = useState(!!orderId);

  useEffect(() => {
    async function fetchOrder() {
      if (!orderId) return;
      try {
        const docRef = doc(db, "orders", orderId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setOrderData(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [orderId]);

  return (
    <div className={styles.container} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", minHeight: "80vh" }}>
      <div style={{ marginBottom: "2rem", color: "var(--color-accent)" }}>
        <CheckCircle size={80} strokeWidth={1} />
      </div>
      
      <h1 className={styles.title} style={{ marginBottom: "0.5rem" }}>¡Compra Exitosa!</h1>
      <p style={{ color: "var(--color-accent)", fontSize: "0.9rem", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "2rem" }}>
        N° de Orden: {orderId || "GENERANDO..."}
      </p>

      <p style={{ fontSize: "1.1rem", color: "var(--color-text-muted)", maxWidth: "600px", margin: "0 auto 3rem" }}>
        Estimado cliente, su pedido ha sido recibido y está siendo procesado bajo los más altos estándares de calidad. 
        Recibirá un correo de confirmación en breve.
      </p>

      <div style={{ display: "flex", gap: "20px", marginBottom: "4rem" }}>
        <button 
          onClick={() => setIsInvoiceOpen(true)}
          className="btn-gold" 
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
          disabled={!orderData}
        >
          <FileText size={18} />
          Ver Comprobante
        </button>
        <Link href="/productos" className="btn-outline" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          Seguir Explorando
          <ArrowRight size={18} />
        </Link>
      </div>

      <div className={styles.section} style={{ width: "100%", maxWidth: "600px", textAlign: "left", background: "rgba(212, 175, 55, 0.05)", border: "1px solid rgba(212, 175, 55, 0.2)" }}>
        <h2 className={styles.sectionTitle} style={{ fontSize: "1.2rem", marginBottom: "1.5rem" }}>
          <Package size={20} />
          Protocolo de Entrega Exclusiva
        </h2>
        <ul style={{ listStyle: "none", padding: 0, color: "var(--color-text-muted)", display: "flex", flexDirection: "column", gap: "1.2rem", fontSize: "0.9rem" }}>
          <li style={{ display: "flex", gap: "15px" }}>
            <span style={{ color: "var(--color-accent)" }}>01</span>
            <span>Certificación de autenticidad y control de calidad gemológica.</span>
          </li>
          <li style={{ display: "flex", gap: "15px" }}>
            <span style={{ color: "var(--color-accent)" }}>02</span>
            <span>Empaque de seguridad sellado con lacre Anyuly Luxe.</span>
          </li>
          <li style={{ display: "flex", gap: "15px" }}>
            <span style={{ color: "var(--color-accent)" }}>03</span>
            <span>Despacho mediante transporte privado asegurado.</span>
          </li>
        </ul>
      </div>

      {orderData && (
        <InvoiceModal 
          isOpen={isInvoiceOpen} 
          onClose={() => setIsInvoiceOpen(false)} 
          items={orderData.items} 
        />
      )}
    </div>
  );
}
