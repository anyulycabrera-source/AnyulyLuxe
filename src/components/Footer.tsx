import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <h2 className={styles.logo}>ANYULY LUXE</h2>
          <p className={styles.slogan}>Descubre la elegancia en cada detalle.</p>
        </div>
        
        <div className={styles.links}>
          <h3>Colecciones</h3>
          <Link href="/productos?cat=anillos" className={styles.link}>Anillos</Link>
          <Link href="/productos?cat=collares" className={styles.link}>Collares</Link>
          <Link href="/productos?cat=pulseras" className={styles.link}>Pulseras</Link>
          <Link href="/productos?cat=aretes" className={styles.link}>Aretes</Link>
        </div>

        <div className={styles.links}>
          <h3>Atención al Cliente</h3>
          <Link href="#" className={styles.link}>Contacto</Link>
          <Link href="#" className={styles.link}>Políticas de Envío</Link>
          <Link href="#" className={styles.link}>Devoluciones</Link>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} Anyuly Luxe. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
