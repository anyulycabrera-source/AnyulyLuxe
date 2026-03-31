"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import styles from "./page.module.css";

export default function AuthPage() {
  const { user, signInWithGoogle, signInWithEmail, isConfigured } = useAuth();
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    if (user) {
      router.push("/cuenta"); // Redirect if they are already logged in
    }
  }, [user, router]);

  const handleManualLogin = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError("Por favor rellena todos los campos");
      return;
    }
    try {
      await signInWithEmail(email, password);
    } catch (err: any) {
      setError("Error al iniciar sesión: " + (err.message || "Credenciales inválidas"));
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      setError("Error con Google: " + (err.message || "Fallo en la conexión"));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.bgBlob1}></div>
      <div className={styles.bgBlob2}></div>
      <div className={styles.bgBlob3}></div>

      {!isConfigured && (
        <div className={styles.configWarning}>
          <h3>⚠️ Configuración Requerida</h3>
          <p>Las llaves de Firebase son inválidas o están vacías.</p>
          <p>Por favor, actualiza tu archivo <code>.env.local</code>.</p>
        </div>
      )}

      <div className={styles.authBox}>
        <h1 className={styles.title}>Log In</h1>
        
        <form className={styles.formGroup} onSubmit={handleManualLogin}>
          <input 
            type="email" 
            placeholder="e-mail" 
            className={styles.input} 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="password" 
            className={styles.input} 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className={styles.errorMsg}>{error}</p>}
        </form>

        <div className={styles.rememberRow}>
          <label className={styles.rememberLabel}>
            <input type="checkbox" className={styles.checkbox} defaultChecked />
            <span className={styles.customCheck}></span>
            Remember me
          </label>
        </div>
        
        <div className={styles.socialSection}>
          <p className={styles.socialText}>Log in with social account</p>
          <div className={styles.socialButtons}>
            {/* El botón de Google ahora muestra los errores en pantalla */}
            <button type="button" className={styles.socialCircle} onClick={handleGoogleLogin} title="Google">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </button>
            <button type="button" className={styles.socialCircle} title="Facebook" onClick={handleManualLogin}>
              <div style={{width: 14, height: 14, backgroundColor: '#1877F2', borderRadius: '50%'}}></div>
            </button>
            <button type="button" className={styles.socialCircle} title="Instagram" onClick={handleManualLogin}>
              <div style={{width: 14, height: 14, background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', borderRadius: '50%'}}></div>
            </button>
          </div>
        </div>

        <button className={styles.mainLoginBtn} onClick={handleManualLogin}>
          Log In
        </button>

        <a href="#" className={styles.forgotPass}>Forgot your password?</a>
      </div>
    </div>
  );
}
