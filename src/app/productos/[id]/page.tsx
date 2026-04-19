"use client";
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, ShoppingCart, Shield, Truck, RefreshCw, Minus, Plus } from 'lucide-react';
import { MOCK_PRODUCTS } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import InvoiceModal from '@/components/InvoiceModal';
import styles from './page.module.css';

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  
  const product = MOCK_PRODUCTS.find(p => p.id === id);

  if (!product) {
    return (
      <div className={styles.container}>
        <div className={styles.notFound}>
          <h2>Pieza No Encontrada</h2>
          <p>Lo sentimos, no pudimos encontrar la joya que buscas.</p>
          <Link href="/productos" className="btn-gold" style={{ marginTop: '2rem', padding: '12px 30px', textDecoration: 'none' }}>
            Volver a la Colección
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      category: product.category
    }, quantity);
    
    setIsInvoiceOpen(true);
  };

  const incrementQty = () => setQuantity(prev => prev + 1);
  const decrementQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className={styles.container}>
      <Link href="/productos" className={styles.backBtn}>
        <ChevronLeft size={18} />
        Volver a la colección
      </Link>

      <div className={styles.productWrapper}>
        <div className={styles.imageSection}>
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className={styles.image}
          />
        </div>

        <div className={styles.infoSection}>
          <span className={styles.category}>{product.category}</span>
          <h1 className={styles.title}>{product.name}</h1>
          <p className={styles.price}>${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD</p>
          
          <div className={styles.description}>
            <p>
              Esta exquisita pieza de la colección Anyuly Luxe representa el pináculo de la artesanía joyera. 
              Cada detalle ha sido cuidadosamente esculpido para capturar la luz y la esencia de la elegancia eterna. 
              Fabricado con materiales de la más alta calidad y gemas seleccionadas a mano por nuestros expertos gemólogos.
            </p>
          </div>

          <div className={styles.quantitySelector}>
            <span className={styles.quantityLabel}>CANTIDAD</span>
            <div className={styles.quantityControls}>
              <button className={styles.qtyBtn} onClick={decrementQty}>
                <Minus size={16} />
              </button>
              <span className={styles.qtyValue}>{quantity}</span>
              <button className={styles.qtyBtn} onClick={incrementQty}>
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className={styles.actions}>
            <button className={styles.cartBtn} onClick={handleAddToCart}>
              <ShoppingCart size={20} />
              Añadir al Carrito
            </button>
            
            <div className={styles.details}>
              <div className={styles.detailItem}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Shield size={18} color="var(--color-gold)" />
                  <span className={styles.detailLabel}>Garantía de Autenticidad</span>
                </div>
                <span className={styles.detailValue}>Certificado Incluido</span>
              </div>
              <div className={styles.detailItem}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Truck size={18} color="var(--color-gold)" />
                  <span className={styles.detailLabel}>Envío Asegurado</span>
                </div>
                <span className={styles.detailValue}>Gratis a todo el mundo</span>
              </div>
              <div className={styles.detailItem}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <RefreshCw size={18} color="var(--color-gold)" />
                  <span className={styles.detailLabel}>Devoluciones</span>
                </div>
                <span className={styles.detailValue}>30 días sin compromiso</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <InvoiceModal 
        isOpen={isInvoiceOpen} 
        onClose={() => setIsInvoiceOpen(false)} 
        items={[{ ...product, quantity }]} 
      />
    </div>
  );
}
