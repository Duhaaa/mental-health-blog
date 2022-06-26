import Link from 'next/link'
import styles from '../styles/FourOhFour.module.scss'
import Image from 'next/image'

export default function FourOhFour() {
  return (
    <div className={styles.FourOhFour}>
      <div className={styles.errorWrapper}>
        <div className={styles.errorImage}>
          <Image src="/404.svg" alt="404 page not found" width={860.13137} height={571.14799} />
        </div>
        <div className={styles.errorContent}>
          <h1>Page not found</h1>
          <p>The page you are looking for does not exist.</p>
          <Link href="/" passHref>
            <a className={styles.link}>Back to home</a>
          </Link>
        </div>
      </div>
    </div>
  )
}
