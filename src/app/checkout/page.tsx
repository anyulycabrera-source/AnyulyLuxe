"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { CreditCard, Truck, ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";
import styles from "./page.module.css";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    address: "",
    city: "",
    zip: "",
    country: "México",
    phone: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: ""
  });

  if (items.length === 0 && !loading) {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Prepare order data
      const orderData = {
        userId: user?.uid || "guest",
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: `${formData.address}, ${formData.city}, ${formData.zip}, ${formData.country}`
        },
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          imageUrl: item.imageUrl
        })),
        total: totalPrice,
        status: "pending",
        createdAt: serverTimestamp(),
        // We DON'T save full card number for security, just last 4 for reference in this simulation
        paymentMethod: {
          type: "card",
          last4: formData.cardNumber.slice(-4)
        }
      };

      // 2. Save to Firestore
      const docRef = await addDoc(collection(db, "orders"), orderData);
      console.log("Pedido guardado con ID: ", docRef.id);

      // 3. Clear cart and redirect
      clearCart();
      router.push("/checkout/success");
    } catch (error) {
      console.error("Error al procesar la compra:", error);
      alert("Hubo un error al procesar tu compra. Por favor intenta de nuevo.");
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {loading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner}></div>
          <p>Procesando tu orden exclusiva...</p>
        </div>
      )}

      <header style={{ marginBottom: "2rem" }}>
        <Link href="/carrito" className={styles.backBtn} style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", color: "var(--color-accent)" }}>
          <ArrowLeft size={18} />
          Volver al carrito
        </Link>
      </header>

      <h1 className={styles.title}>Finalizar Compra</h1>

      <form onSubmit={handleSubmit} className={styles.checkoutGrid}>
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

          {/* Payment Information */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <CreditCard size={24} />
              Método de Pago
            </h2>
            <div className={styles.cardIcon}>
              <div style={{ width: "40px", height: "25px", background: "#333", borderRadius: "4px" }}></div>
              <div style={{ width: "40px", height: "25px", background: "#333", borderRadius: "4px" }}></div>
              <div style={{ width: "40px", height: "25px", background: "#333", borderRadius: "4px" }}></div>
            </div>
            <div className={styles.formGrid}>
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Nombre en la Tarjeta</label>
                <input 
                  type="text" name="cardName" required 
                  className={styles.input} value={formData.cardName} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Número de Tarjeta</label>
                <input 
                  type="text" name="cardNumber" required 
                  className={styles.input} value={formData.cardNumber} 
                  placeholder="0000 0000 0000 0000"
                  maxLength={19}
                  onChange={handleInputChange} 
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Fecha Expiración</label>
                <input 
                  type="text" name="expiry" required 
                  className={styles.input} value={formData.expiry} 
                  placeholder="MM/YY"
                  maxLength={5}
                  onChange={handleInputChange} 
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>CVV</label>
                <input 
                  type="password" name="cvv" required 
                  className={styles.input} value={formData.cvv} 
                  placeholder="***"
                  maxLength={4}
                  onChange={handleInputChange} 
                />
              </div>
            </div>
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
            
            <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "1.5rem 0", fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
              <ShieldCheck size={16} color="var(--color-accent)" />
              Pago 100% seguro y encriptado
            </div>

            <button type="submit" className="btn-gold" style={{ width: "100%", padding: "18px" }}>
              Finalizar Compra
            </button>
          </div>
        </aside>
      </form>
    </div>
  );
}
