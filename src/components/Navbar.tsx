"use client";
import Link from 'next/link';
import { ShoppingCart, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.navLinks}>
          <Link href="/" className={styles.link}>Inicio</Link>
          <Link href="/productos" className={styles.link}>Productos</Link>
          <Link href="/contacto" className={styles.link}>Contacto</Link>
        </nav>

        <div className={styles.logoContainer}>
          <Link href="/" className={styles.logo}>
            ANYULY LUXE
          </Link>
        </div>

        <div className={styles.actions}>
          <Link href="/cuenta" className={styles.iconBtn}>
            <User size={22} />
          </Link>
          <Link href="/carrito" className={styles.iconBtn}>
            <ShoppingCart size={22} />
            {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
}
