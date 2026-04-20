"use client";
import { useState, useMemo } from 'react';
import { MOCK_PRODUCTS } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import styles from './page.module.css';

const FILTER_CATEGORIES = ['Todas', 'Anillos', 'Collares', 'Pulseras', 'Aretes'];
const SECTION_CATEGORIES = ['Anillos', 'Collares', 'Pulseras', 'Aretes'];

export default function ProductosPage() {
  const [activeCategory, setActiveCategory] = useState('Todas');
  
  // Group products by category helper
  const getProductsByCategory = (category: string) => {
    return MOCK_PRODUCTS.filter(p => p.category === category);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Alta Colección Anyuly Luxe</h1>
        <p className={styles.subtitle}>
          Piezas exclusivas organizadas por maestros joyeros para tu distinción.
        </p>
        <div className={styles.divider}></div>
      </header>

      <section className={styles.filtersSection}>
        <div className={styles.filters}>
          {FILTER_CATEGORIES.map(category => (
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
        {activeCategory === 'Todas' ? (
          // RENDER ALL CATEGORIES IN SECTIONS
          SECTION_CATEGORIES.map(category => {
            const products = getProductsByCategory(category);
            if (products.length === 0) return null;

            return (
              <div key={category} className={styles.categorySection}>
                <div className={styles.categoryHeader}>
                  <h2 className={styles.categoryTitle}>{category}</h2>
                  <span className={styles.categoryCount}>{products.length} Piezas</span>
                </div>
                <div className={styles.grid}>
                  {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          // RENDER ONLY SELECTED CATEGORY
          <div className={styles.categorySection}>
            <div className={styles.categoryHeader}>
              <h2 className={styles.categoryTitle}>{activeCategory}</h2>
              <span className={styles.categoryCount}>
                {getProductsByCategory(activeCategory).length} Piezas
              </span>
            </div>
            {getProductsByCategory(activeCategory).length > 0 ? (
              <div className={styles.grid}>
                {getProductsByCategory(activeCategory).map(product => (
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
          </div>
        )
        }
      </section>
    </div>
  );
}
