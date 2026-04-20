"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Diamond, Crown, Shield } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import styles from './page.module.css';

const MOCK_FEATURED_PRODUCTS = [
  {
    id: '1',
    name: 'Anillo de Diamante Eternidad',
    price: 25000.00,
    imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop',
    category: 'Anillos'
  },
  {
    id: '2',
    name: 'Collar Lágrima de Oro',
    price: 18500.00,
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop',
    category: 'Collares'
  },
  {
    id: '3',
    name: 'Pulsera Clásica Cadenas',
    price: 12400.00,
    imageUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000&auto=format&fit=crop',
    category: 'Pulseras'
  },
  {
    id: '4',
    name: 'Aretes Perla Negra',
    price: 9500.00,
    imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop',
    category: 'Aretes'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function Home() {
  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <motion.div 
          className={styles.heroImageContainer}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        >
          <Image 
            src="https://images.unsplash.com/photo-1515562141207-7a88fb0ce33e?q=80&w=2000&auto=format&fit=crop" 
            alt="Anyuly Luxe Hero" 
            fill 
            priority 
            className={styles.heroImage}
          />
        </motion.div>
        <div className={styles.heroOverlay}></div>
        <motion.div 
          className={styles.heroContent}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 variants={itemVariants} className={styles.heroTitle}>
            Elegancia que <span className="title-gold">te define.</span>
          </motion.h1>
          <motion.p variants={itemVariants} className={styles.heroSubtitle}>
            Joyas exclusivas que capturan la esencia de lo extraordinario.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link href="/productos" className="btn-gold">
              Ver Colección
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Section */}
      <section className={styles.featured}>
        <motion.div 
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.sectionEyebrow}>Selección Premium</span>
          <h2 className={styles.sectionTitle}>Piezas Destacadas</h2>
          <div className={styles.divider}></div>
        </motion.div>
        
        <div className={styles.productGrid}>
          {MOCK_FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <motion.div 
          className={styles.viewAll}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link href="/productos" className="btn-outline">
            Descubrir Todo
          </Link>
        </motion.div>
      </section>
      
      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.featuresContainer}>
          <motion.div 
            className={styles.featureItem}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Diamond size={40} color="var(--color-accent)" style={{ marginBottom: '1rem' }} />
            <h3>Diseño Único</h3>
            <p>Piezas exclusivas elaboradas meticulosamente por los mejores joyeros del mundo.</p>
          </motion.div>
          <motion.div 
            className={styles.featureItem}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Crown size={40} color="var(--color-accent)" style={{ marginBottom: '1rem' }} />
            <h3>Calidad Real</h3>
            <p>Diamantes certificados y metales preciosos que garantizan una inversión perdurable.</p>
          </motion.div>
          <motion.div 
            className={styles.featureItem}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Shield size={40} color="var(--color-accent)" style={{ marginBottom: '1rem' }} />
            <h3>Garantía Eterna</h3>
            <p>Monitoreo constante y seguridad total en cada una de nuestras entregas exclusivas.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
