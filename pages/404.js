import Link from 'next/link'
import styles from '../styles/FourOhFour.module.scss'

export default function FourOhFour() {
  return (
    <div className={styles.FourOhFour}>
      <div className={styles.errorWrapper}>
        <div className={styles.errorImage}>
          <img src="/404.svg" alt="Page not found" />
        </div>
        <div className={styles.errorContent}>
          <h1>Page not found</h1>
          <p>The page you are looking for does not exist.</p>
          <Link href="/">
            <a className={styles.link}>Go back to the homepage</a>
          </Link>
        </div>
      </div>
    </div>
  )
}
