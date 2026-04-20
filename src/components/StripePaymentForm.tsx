"use client";
import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import styles from "@/app/checkout/page.module.css";
import { ShieldCheck } from "lucide-react";

export default function StripePaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    setIsLoading(true);

    // 1. Confirm the payment with Stripe
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required", // Handle redirects manually to save to Firebase
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message || "Ocurrió un error con su tarjeta.");
      } else {
        setMessage("Ocurrió un error inesperado.");
      }
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      // 2. PAYMENT SUCCEEDED - Save to Firestore
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
          status: "paid",
          paymentIntentId: paymentIntent.id,
          createdAt: serverTimestamp(),
        };

        const docRef = await addDoc(collection(db, "orders"), orderData);
        
        // 3. Success! Clear cart and redirect
        clearCart();
        window.location.href = `/checkout/success?id=${docRef.id}`;
      } catch (err) {
        console.error("Firebase save error:", err);
        setMessage("Pago exitoso pero hubo un error al guardar la orden. Contacte soporte.");
      }
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      
      <div style={{ margin: "1.5rem 0", color: "var(--color-text-muted)", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "8px" }}>
        <ShieldCheck size={18} color="var(--color-accent)" />
        Su pago es procesado de forma segura por Stripe. No almacenamos sus datos bancarios.
      </div>

      <button 
        disabled={isLoading || !stripe || !elements} 
        id="submit" 
        className="btn-gold"
        style={{ width: "100%", padding: "18px", marginTop: "1rem" }}
      >
        <span id="button-text">
          {isLoading ? "Procesando adquisición..." : `Pagar L. ${totalPrice.toLocaleString()} HNL`}
        </span>
      </button>

      {/* Show any error or success messages */}
      {message && <div id="payment-message" style={{ color: "#ff4d4d", marginTop: "1rem", textAlign: "center", fontSize: "0.9rem" }}>{message}</div>}
    </form>
  );
}
