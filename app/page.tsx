import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
      <h2>
            Ejercicio funcionalidad con Next.js <span>-&gt;</span>
          </h2>
          <p>Por: Joe Cordero y Ariel Raura.</p>
        
      </div>
    </main>
  );
}
