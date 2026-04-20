import Link from 'next/link';
import { Instagram, Facebook, MessageCircle, Mail, MapPin } from 'lucide-react';
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
            <a href="https://instagram.com/anyuly.luxe" target="_blank" rel="noopener noreferrer" className={styles.socialLink}><Instagram size={20} /></a>
            <a href="https://facebook.com/anyulyluxe" target="_blank" rel="noopener noreferrer" className={styles.socialLink}><Facebook size={20} /></a>
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
