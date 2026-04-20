"use client";
import React, { useState } from "react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send,
  ShieldCheck
} from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import styles from "./page.module.css";

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Save contact message to Firestore
      await addDoc(collection(db, "contacts"), {
        ...formData,
        timestamp: serverTimestamp()
      });

      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error("Error saving contact:", err);
      setError("Ocurrió un error al enviar el mensaje. Por favor intente de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.title}>Contacto de Lujo</h1>
        <p className={styles.subtitle}>
          Estamos aquí para ayudarte. Contáctanos y recibe atención personalizada 
          para encontrar la pieza perfecta que resalte tu distinción.
        </p>
        <div className={styles.divider}></div>
      </section>

      <main className={styles.mainContent}>
        {/* Info Column */}
        <div className={styles.infoColumn}>
          <div className={styles.infoBlock}>
            <h2>Información de Enlace</h2>
            <div className={styles.contactItems}>
              <div className={styles.contactItem}>
                <div className={styles.iconWrapper}><Phone size={20} /></div>
                <div>
                  <span className={styles.itemLabel}>Teléfono / WhatsApp</span>
                  <p className={styles.itemValue}>+504 9898-9898</p>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.iconWrapper}><Mail size={20} /></div>
                <div>
                  <span className={styles.itemLabel}>Correo Electrónico</span>
                  <p className={styles.itemValue}>anyuly.luxe@gmail.com</p>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.iconWrapper}><MapPin size={20} /></div>
                <div>
                  <span className={styles.itemLabel}>Ubicación</span>
                  <p className={styles.itemValue}>Comayagua, Honduras</p>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.iconWrapper}><Clock size={20} /></div>
                <div>
                  <span className={styles.itemLabel}>Horario de Atención</span>
                  <p className={styles.itemValue}>Lun - Vie: 9am - 8pm | Sáb: 10am - 4pm</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.infoBlock}>
            <h2>Síguenos</h2>
            <p style={{ color: "var(--color-text-muted)", marginBottom: "1rem" }}>
              Tu satisfacción es nuestra prioridad. Encuéntranos en nuestras plataformas sociales.
            </p>
            <div className={styles.socialGrid}>
              <a href="https://wa.me/50498989898" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="WhatsApp">
                <MessageCircle size={20} />
              </a>
              <a href="https://instagram.com/anyuly.luxe" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="https://facebook.com/anyulyluxe" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className={styles.formColumn}>
          {success && (
            <div className={styles.successMsg}>
              ¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>Nombre Completo</label>
              <input 
                type="text" 
                id="name" 
                name="name"
                required
                className={styles.input}
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ej. María García"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Correo Electrónico</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                required
                className={styles.input}
                value={formData.email}
                onChange={handleInputChange}
                placeholder="maría@ejemplo.com"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>Mensaje</label>
              <textarea 
                id="message" 
                name="message"
                required
                className={styles.textarea}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="¿En qué podemos ayudarte hoy?"
              ></textarea>
            </div>

            {error && <p style={{ color: "#ff4d4d", marginBottom: "1rem", fontSize: "0.9rem" }}>{error}</p>}

            <button 
              type="submit" 
              className={styles.submitBtn}
              disabled={isLoading}
            >
              {isLoading ? "Enviando..." : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <span>Enviar mensaje</span>
                  <Send size={18} />
                </div>
              )}
            </button>

            <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
              <ShieldCheck size={16} color="var(--color-accent)" />
              <span>Privacidad Garantizada: Tus datos están seguros con nosotros.</span>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
