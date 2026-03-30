"use client";
import { useState, useMemo } from 'react';
import { MOCK_PRODUCTS } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import styles from './page.module.css';

const CATEGORIES = ['Todas', 'Anillos', 'Collares', 'Pulseras', 'Aretes'];

export default function ProductosPage() {
  const [activeCategory, setActiveCategory] = useState('Todas');
  
  const filteredProducts = useMemo(() => {
    if (activeCategory === 'Todas') return MOCK_PRODUCTS;
    return MOCK_PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Nuestra Colección</h1>
        <p className={styles.subtitle}>Explora piezas exquisitamente diseñadas con la máxima precisión.</p>
        <div className={styles.divider}></div>
      </header>

      <section className={styles.filtersSection}>
        <div className={styles.filters}>
          {CATEGORIES.map(category => (
            <button 
              key={category} 
              className={`${styles.filterBtn} ${activeCategory === category ? styles.active : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className={styles.gridSection}>
        {filteredProducts.length > 0 ? (
          <div className={styles.grid}>
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <p>No hay productos disponibles en esta categoría.</p>
            <button className="btn-gold" style={{marginTop: '1rem'}} onClick={() => setActiveCategory('Todas')}>
              Ver Todo
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
