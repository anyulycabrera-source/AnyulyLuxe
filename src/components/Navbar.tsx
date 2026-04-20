"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>
          <button 
            className={styles.menuToggle} 
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu size={24} />
          </button>

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
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className={styles.badge}
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className={styles.overlay}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={styles.mobileMenu}
            >
              <button 
                className={styles.closeBtn} 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X size={32} />
              </button>
              
              <Link href="/" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>Inicio</Link>
              <Link href="/productos" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>Productos</Link>
              <Link href="/contacto" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>Contacto</Link>
              <Link href="/cuenta" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>Mi Cuenta</Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
