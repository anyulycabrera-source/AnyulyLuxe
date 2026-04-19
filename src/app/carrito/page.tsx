"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import styles from "./page.module.css";

export default function CarritoPage() {
  const router = useRouter();
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();

  const handleCheckout = () => {
    // Redirigir al proceso de pago real (Checkout)
    router.push("/checkout");
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Tu Carrito</h1>
        <div className={styles.divider}></div>
      </header>

      <div className={styles.content}>
        {items.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Tu carrito está vacío.</p>
            <Link href="/productos" className="btn-gold" style={{ marginTop: "2rem", display: "inline-block" }}>
              Explorar Joyería
            </Link>
          </div>
        ) : (
          <div className={styles.cartLayout}>
            <div className={styles.itemsList}>
              {items.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <div className={styles.itemImage}>
                    <img src={item.imageUrl} alt={item.name} />
                  </div>
                  <div className={styles.itemInfo}>
                    <span className={styles.category}>{item.category}</span>
                    <h3 className={styles.name}>{item.name}</h3>
                    <p className={styles.price}>${item.price.toFixed(2)}</p>
                  </div>
                  <div className={styles.quantityControls}>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus size={16} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className={styles.itemTotal}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <div className={styles.itemRemove}>
                    <button onClick={() => removeFromCart(item.id)} className={styles.removeBtn}>
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.summary}>
              <h2>Resumen del Pedido</h2>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)} USD</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Envío</span>
                <span>Gratis</span>
              </div>
              <div className={styles.summaryDivider}></div>
              <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                <span>Total</span>
                <span>${totalPrice.toFixed(2)} USD</span>
              </div>
              <button className="btn-gold" style={{ width: "100%", marginTop: "1.5rem" }} onClick={handleCheckout}>
                Proceder al Pago
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
