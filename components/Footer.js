import styles from '../styles/Footer.module.scss';
import Script from 'next/script';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <span className={styles.copyright}>&copy; { new Date().getFullYear() } {process.env.NEXT_PUBLIC_APP_TITLE}</span>
      </div>
      <div id="wcb" className="carbonbadge wcb-d"></div>
      <Script src="https://unpkg.com/website-carbon-badges@1.1.3/b.min.js" defer></Script>
    </footer>
  );
}
