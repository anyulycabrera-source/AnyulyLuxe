"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Truck, ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";
import InvoiceModal from "@/components/InvoiceModal";
import styles from "./page.module.css";

// Stripe Imports
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripePaymentForm from "@/components/StripePaymentForm";

// Initialize Stripe outside of component to avoid recreation
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice } = useCart();
  const { user } = useAuth();
  
  const [clientSecret, setClientSecret] = useState("");
  const [loadingIntent, setLoadingIntent] = useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    address: "",
    city: "",
    zip: "",
    country: "México",
    phone: "",
  });

  // 1. Create Payment Intent as soon as the page loads or cart changes
  useEffect(() => {
    if (items.length > 0) {
      setLoadingIntent(true);
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          } else {
            console.error("Error generating client secret:", data.error);
          }
        })
        .finally(() => setLoadingIntent(false));
    }
  }, [items]);

  if (items.length === 0) {
    return (
      <div className={styles.container} style={{ textAlign: "center" }}>
        <h1 className={styles.title}>Tu carrito está vacío</h1>
        <Link href="/productos" className="btn-gold">Volver a los productos</Link>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const appearance = {
    theme: 'night' as const,
    variables: {
      colorPrimary: '#d4af37',
      colorBackground: '#1a1a1a',
      colorText: '#ffffff',
      colorDanger: '#df1b41',
      fontFamily: 'Ideal Sans, system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '8px',
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className={styles.container}>
      <header style={{ marginBottom: "2rem" }}>
        <Link href="/carrito" className={styles.backBtn} style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", color: "var(--color-accent)" }}>
          <ArrowLeft size={18} />
          Volver al carrito
        </Link>
      </header>

      <h1 className={styles.title}>Finalizar Compra</h1>

      <div className={styles.checkoutGrid}>
        <div className={styles.formsColumn}>
          {/* Shipping Information */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <Truck size={24} />
              Información de Envío
            </h2>
            <div className={styles.formGrid}>
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Nombre Completo</label>
                <input 
                  type="text" name="name" required 
                  className={styles.input} value={formData.name} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Correo Electrónico</label>
                <input 
                  type="email" name="email" required 
                  className={styles.input} value={formData.email} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Dirección</label>
                <input 
                  type="text" name="address" required 
                  className={styles.input} value={formData.address} 
                  placeholder="Calle y número" 
                  onChange={handleInputChange} 
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Ciudad</label>
                <input 
                  type="text" name="city" required 
                  className={styles.input} value={formData.city} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Código Postal</label>
                <input 
                  type="text" name="zip" required 
                  className={styles.input} value={formData.zip} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>País</label>
                <input 
                  type="text" name="country" required 
                  className={styles.input} value={formData.country} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Teléfono</label>
                <input 
                  type="tel" name="phone" required 
                  className={styles.input} value={formData.phone} 
                  onChange={handleInputChange} 
                />
              </div>
            </div>
          </section>

          {/* Payment Information - REAL STRIPE INTEGRATION */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <ShieldCheck size={24} />
              Método de Pago Seguro
            </h2>
            
            {clientSecret ? (
              <Elements options={options} stripe={stripePromise}>
                <StripePaymentForm />
              </Elements>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div className={styles.spinner}></div>
                <p style={{ marginTop: '1rem', color: 'var(--color-text-muted)' }}>
                  Estableciendo conexión segura con la pasarela de pagos...
                </p>
              </div>
            )}
          </section>
        </div>

        {/* Order Summary */}
        <aside className={styles.summary}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Resumen</h2>
            <div style={{ marginBottom: "1.5rem" }}>
              {items.map(item => (
                <div key={item.id} className={styles.summaryItem}>
                  <span>{item.quantity}x {item.name}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className={styles.summaryItem}>
              <span>Envío</span>
              <span style={{ color: "var(--color-accent)" }}>Gratis</span>
            </div>
            <div className={`${styles.summaryItem} ${styles.totalRow}`}>
              <span>Total</span>
              <span>${totalPrice.toFixed(2)} USD</span>
            </div>
            
            <button 
              type="button" 
              onClick={() => setIsInvoiceOpen(true)}
              style={{ width: "100%", marginTop: "20px", background: "none", border: "1px solid var(--color-accent)", color: "var(--color-accent)", padding: "10px", cursor: "pointer", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px" }}
            >
              Previsualizar Detalles
            </button>
          </div>
        </aside>
      </div>

      <InvoiceModal 
        isOpen={isInvoiceOpen} 
        onClose={() => setIsInvoiceOpen(false)} 
        items={items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          category: item.category || "Joyería",
          quantity: item.quantity
        }))} 
      />
    </div>
  );
}
