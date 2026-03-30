import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import styles from './page.module.css';

const MOCK_FEATURED_PRODUCTS = [
  {
    id: '1',
    name: 'Anillo de Diamante Eternidad',
    price: 1250.00,
    imageUrl: '/ring.png',
    category: 'Anillos'
  },
  {
    id: '2',
    name: 'Collar Lágrima de Oro',
    price: 890.00,
    imageUrl: '/banner.png',
    category: 'Collares'
  },
  {
    id: '3',
    name: 'Pulsera Clásica Cadenas',
    price: 540.00,
    imageUrl: '/ring.png',
    category: 'Pulseras'
  },
  {
    id: '4',
    name: 'Aretes Perla Negra',
    price: 450.00,
    imageUrl: '/banner.png',
    category: 'Aretes'
  }
];

export default function Home() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={`${styles.heroTitle} fade-in`}>
            Descubre la elegancia<br />en cada detalle.
          </h1>
          <p className={`${styles.heroSubtitle} fade-in`} style={{ animationDelay: '0.2s' }}>
            Joyería exclusiva que trasciende el tiempo y define tu estilo con sutileza.
          </p>
          <div className={`fade-in`} style={{ animationDelay: '0.4s' }}>
            <Link href="/productos" className="btn-gold">
              Ver Colección
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.featured}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionEyebrow}>Selección Exclusiva</span>
          <h2 className={styles.sectionTitle}>Piezas Destacadas</h2>
          <div className={styles.divider}></div>
        </div>
        
        <div className={styles.productGrid}>
          {MOCK_FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className={styles.viewAll}>
          <Link href="/productos" className="btn-outline">
            Ver Todo el Catálogo
          </Link>
        </div>
      </section>
      
      <section className={styles.features}>
        <div className={styles.featuresContainer}>
          <div className={styles.featureItem}>
            <h3>Diseño Único</h3>
            <p>Piezas exclusivas elaboradas por los mejores joyeros.</p>
          </div>
          <div className={styles.featureItem}>
            <h3>Materiales Premium</h3>
            <p>Diamantes certificados y oro puro de 18 kilates.</p>
          </div>
          <div className={styles.featureItem}>
            <h3>Envíos Seguros</h3>
            <p>Su compra está protegida y monitoreada hasta sus manos.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
