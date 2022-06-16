import styles from '../styles/Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <span className={styles.copyright}>&copy; { new Date().getFullYear() } {process.env.NEXT_PUBLIC_APP_TITLE}</span>
      </div>
    </footer>
  );
}
