"use client";
import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ShieldCheck, CreditCard, Calendar, Lock } from "lucide-react";
import styles from "@/app/checkout/page.module.css";

export default function DemoPaymentForm() {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    cardName: user?.displayName || "",
    cardNumber: "4242 4242 4242 4242",
    expiry: "12/28",
    cvv: "123"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate "Real" Payment delay
    setTimeout(async () => {
      try {
        const orderData = {
          userId: user?.uid || "guest",
          items: items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          total: totalPrice,
          status: "paid (DEMO)",
          createdAt: serverTimestamp(),
          isDemo: true
        };

        const docRef = await addDoc(collection(db, "orders"), orderData);
        
        clearCart();
        window.location.href = `/checkout/success?id=${docRef.id}`;
      } catch (err) {
        console.error("Firebase save error:", err);
        setIsLoading(false);
      }
    }, 2500);
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ 
        position: 'absolute', 
        top: '-15px', 
        right: '10px', 
        background: 'var(--color-accent)', 
        color: '#000', 
        fontSize: '0.65rem', 
        fontWeight: 'bold', 
        padding: '2px 8px', 
        borderRadius: '4px',
        zIndex: 10,
        letterSpacing: '1px'
      }}>
        MODO DEMO ACTIVO
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Nombre en la Tarjeta</label>
          <div style={{ position: 'relative' }}>
            <input 
              type="text" 
              name="cardName"
              className={styles.input} 
              value={formData.cardName}
              onChange={handleInputChange}
              placeholder="Nombre del Titular"
              required
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Número de Tarjeta (Simulado)</label>
          <div style={{ position: 'relative' }}>
            <input 
              type="text" 
              className={styles.input} 
              value={formData.cardNumber}
              readOnly
              style={{ background: 'rgba(255,255,255,0.03)', cursor: 'default' }}
            />
            <CreditCard size={18} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-accent)' }} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Expiración</label>
            <input 
              type="text" 
              className={styles.input} 
              value={formData.expiry}
              readOnly
              style={{ background: 'rgba(255,255,255,0.03)', cursor: 'default' }}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>CVC</label>
            <input 
              type="password" 
              className={styles.input} 
              value={formData.cvv}
              readOnly
              style={{ background: 'rgba(255,255,255,0.03)', cursor: 'default' }}
            />
          </div>
        </div>

        <div style={{ margin: '0.5rem 0', color: 'var(--color-text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', lineHeight: '1.4' }}>
          <Lock size={16} color="var(--color-accent)" />
          <span>Este es un entorno de demostración. Al configurar tus claves de Stripe, este formulario será reemplazado por la pasarela real.</span>
        </div>

        <button 
          disabled={isLoading} 
          className="btn-gold"
          style={{ width: "100%", padding: "18px", marginTop: "0.5rem", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
        >
          {isLoading ? (
            <>
              <div className={styles.spinner} style={{ width: '20px', height: '20px', borderSecondary: '2px' }}></div>
              Procesando adquisición...
            </>
          ) : (
            `Finalizar Adquisición de Lujo ($${totalPrice.toFixed(2)})`
          )}
        </button>

        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
          <ShieldCheck size={12} style={{ marginRight: '5px', verticalAlign: 'middle' }} />
          Seguridad de grado bancario (Simulada para test)
        </p>
      </form>
    </div>
  );
}
