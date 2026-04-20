"use client";
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import styles from './ProductCard.module.css';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      category: product.category
    });
    // Opcionalmente agregar toast feedback
  };

  return (
    <motion.div 
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Link href={`/productos/${product.id}`} className={styles.imageContainer}>
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className={styles.image}
        />
        <div className={styles.overlay}>
          <span className={styles.viewText}>Ver detalle</span>
        </div>
      </Link>
      
      <div className={styles.info}>
        <span className={styles.category}>{product.category}</span>
        <h3 className={styles.name}>
          <Link href={`/productos/${product.id}`}>{product.name}</Link>
        </h3>
        <p className={styles.price}>L. {product.price.toLocaleString('en-HN', { minimumFractionDigits: 2 })} HNL</p>
        
        <button className={styles.addToCartBtn} onClick={handleAddToCart}>
          <ShoppingCart size={18} />
          <span>Añadir</span>
        </button>
      </div>
    </motion.div>
  );
}
