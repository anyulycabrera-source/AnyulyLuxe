import Link from 'next/link';
import { MessageCircle, Mail, MapPin } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <h2 className={styles.logo}>ANYULY LUXE</h2>
          <p className={styles.slogan}>Descubre la elegancia en cada detalle. Alta joyería con distinción y exclusividad.</p>
          <div className={styles.socials}>
            <a href="https://wa.me/50498989898" target="_blank" rel="noopener noreferrer" className={styles.socialLink}><MessageCircle size={20} /></a>
            <a href="https://instagram.com/anyuly.luxe" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="https://facebook.com/anyulyluxe" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
          </div>
        </div>
        
        <div className={styles.links}>
          <h3>Colecciones</h3>
          <Link href="/productos" className={styles.link}>Anillos</Link>
          <Link href="/productos" className={styles.link}>Collares</Link>
          <Link href="/productos" className={styles.link}>Pulseras</Link>
          <Link href="/productos" className={styles.link}>Aretes</Link>
        </div>

        <div className={styles.links}>
          <h3>Atención al Cliente</h3>
          <Link href="/contacto" className={styles.link}>Contacto</Link>
          <div className={styles.footerContact}>
            <div className={styles.footerContactItem}>
              <Mail size={14} /> <span>anyuly.luxe@gmail.com</span>
            </div>
            <div className={styles.footerContactItem}>
              <MapPin size={14} /> <span>Comayagua, Honduras</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} Anyuly Luxe. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
