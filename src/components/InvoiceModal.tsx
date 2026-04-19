"use client";
import React from "react";
import { X, Printer, ShoppingBag, ArrowRight } from "lucide-react";
import styles from "./InvoiceModal.module.css";
import { useRouter } from "next/navigation";

interface InvoiceItem {
  id: string;
  name: string;
  price: number;
  category: string;
  quantity: number;
}

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: InvoiceItem[];
}

export default function InvoiceModal({ isOpen, onClose, items }: InvoiceModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleGoToCart = () => {
    onClose();
    router.push("/carrito");
  };

  const today = new Date().toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <X size={24} />
        </button>

        <header className={styles.header}>
          <h1 className={styles.brandTitle}>Anyuly Luxe</h1>
          <p className={styles.subtitle}>Alta Joyería y Exclusividad</p>
        </header>

        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className={styles.label}>Receptor</span>
            <span className={styles.value}>Cliente Distinguido</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Hora de Impresión</span>
            <span className={styles.value}>{today}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Dirección</span>
            <span className={styles.value}>Envío Express Asegurado</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Número de Rastreo</span>
            <span className={styles.value}>AL-{Math.floor(Math.random() * 90000) + 10000}</span>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>N° Serie</th>
                <th>Especificación</th>
                <th>Nombre del Producto</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Descuento</th>
                <th>Integral</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id.slice(0, 8).toUpperCase()}</td>
                  <td>{item.category}</td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price.toLocaleString()}</td>
                  <td>$0.00</td>
                  <td>${(item.price * item.quantity).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.footerInfo}>
          <div className={styles.infoItem}>
            <span className={styles.label}>Transporte</span>
            <span className={styles.value}>Privado / Especial</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Nombre del Vendedor</span>
            <span className={styles.value}>Conserje Anyuly Luxe</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Número de Contacto</span>
            <span className={styles.value}>+52 (55) LUXE-01</span>
          </div>
        </div>

        <div className={styles.totalSection}>
          <div className={styles.totalRow}>
            <span className={styles.totalLabel}>Suma Global:</span>
            <span className={styles.totalValue}>${subtotal.toLocaleString()} USD</span>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.btnKeep} onClick={onClose}>
            <ShoppingBag size={18} style={{ marginRight: '8px' }} />
            Seguir Comprando
          </button>
          <button className={styles.btnCart} onClick={handleGoToCart}>
            Ir al Carrito
            <ArrowRight size={18} style={{ marginLeft: '8px' }} />
          </button>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button onClick={() => window.print()} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', margin: '0 auto', gap: '5px' }}>
            <Printer size={14} /> Imprimir Comprobante
          </button>
        </div>
      </div>
    </div>
  );
}
