import styles from '../styles/Contact.module.scss';

export default function About() {
  return (
    <div id="contact" className={styles.contactContainer}>
      <h2 className={styles.contactTitle}>What&apos;s your <span>story</span>?</h2>
      <div className={styles.contactWrapper}>
        <div className={styles.contactImage}>
          <img src="/contact.svg" alt="Internalized" />
        </div>
        <div className={styles.contactContent}>
          <p>Have an experience to share? Want to collaborate? Or just want to say hi?</p>
          <div className={styles.formWrapper}>
            <form>
              <div className={styles.formControl}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" />
              </div>
              <div className={styles.formControl}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" />
              </div>
              <div className={styles.formControl}>
                <label htmlFor="message">Message</label>
                <textarea id="message" rows={5}/>
              </div>
              <div className={styles.formControl}>
                <button type="submit">Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
