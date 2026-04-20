import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import AuthGuard from "@/components/AuthGuard";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anyuly Luxe | Joyería Fina",
  description: "Descubre la elegancia en cada detalle. Tienda online de joyería premium.",
};

import PageTransition from "@/components/PageTransition";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className={`${inter.variable} ${playfair.variable} ${inter.className} ${playfair.className}`}>
      <body suppressHydrationWarning>
        <AuthProvider>
          <CartProvider>
            <AuthGuard>
              <div className="main-container">
                <Navbar />
                <main style={{ flex: 1 }}>
                  <PageTransition>{children}</PageTransition>
                </main>
                <Footer />
              </div>
            </AuthGuard>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
