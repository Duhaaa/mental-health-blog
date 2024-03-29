import styles from '../styles/Contact.module.scss';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRef } from 'react';
import Image from 'next/image';

export default function About() {
  const button = useRef('Send Message');

  const { register, watch, reset, handleSubmit, formState: { errors, isValid } } = useForm({
    mode: 'onChange',
    defaultValues: {
      ignore: '',
      name: '',
      email: '',
      message: ''
    }
  });

  const onSubmit = async(data) => {
    if (!isValid || errors.length) return;

    button.current = 'Sending...';

    let config = {
      method: 'POST',
      url: '/api/contact_submission',
      headers: {
        'Content-Type': 'application/json'
      },
      data
    }

    try {
      const response = await axios(config);
      if (response.status === 200) {
        button.current = 'Message Sent!';
        reset();
      }
    } catch (error) {
      button.current = 'Something went wrong...';
    }
  }

  const message = watch('message', '');

  const regexEmailPattern = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;

  return (
    <div id="contact" className={styles.contactContainer}>
      <h2 className={styles.contactTitle}>What&apos;s your <span>story</span>?</h2>
      <div className={styles.contactWrapper}>
        <div className={styles.contactImage}>
          <Image src="/contact.svg" alt="girl holding an envelope" width={894.24907} height={448.2822} />
        </div>
        <div className={styles.contactContent}>
          <h3>I&apos;d love to hear it</h3>
          <p>Have an experience to share? Want to collaborate?<br/> Or just want to say hi?</p>
          <div className={styles.formWrapper}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div id={styles.shouldBeIgnored} className={styles.formControl}>
                <label htmlFor="ignore">Ignore</label>
                <input type="text" name="ignore" {...register('ignore', { validate: value => value === ''})} />
              </div>
              <div className={styles.formControl}>
                <label htmlFor="name">Name *</label>
                <input type="text" name="name" {...register('name', { required: true, maxLength: 30 })} aria-invalid={errors.name ? 'true' : 'false'}/>
                <div className={styles.errorWrapper}>
                  <span role="alert" className={styles.error}>{errors.name && errors.name.type === 'required' && 'Please specify a name' }</span>
                  <span role="alert" className={styles.error}>{errors.name && errors.name.type === 'maxLength' && 'Name cannot be longer than 30 characters' }</span>
                </div>
              </div>
              <div className={styles.formControl}>
                <label htmlFor="email">Email *</label>
                <input type="email" name="email" {...register('email', { required: true, pattern: regexEmailPattern })} aria-invalid={errors.email ? 'true' : 'false'}/>
                <div className={styles.errorWrapper}>
                  <span role="alert" className={styles.error}>{errors.email && errors.email.type === 'required' && 'Please specify an email address' }</span>
                  <span role="alert" className={styles.error}>{errors.email && errors.email.type === 'pattern' && 'Email needs to be a valid adress' }</span>
                </div>
              </div>
              <div className={styles.formControl}>
                <label htmlFor="message">Message *</label>
                <textarea id="message" rows={5} {...register('message', { required: true, maxLength: 2000 })} aria-invalid={errors.message ? 'true' : 'false'}/>
                <div id={styles.charCountWrapper} className={styles.errorWrapper}>
                  {errors.message && errors.message.type === 'required' && <span role="alert" className={styles.error}>Please specify a message</span>}
                  {errors.message && errors.message.type === 'maxLength' && <span role="alert" className={styles.error}>Message cannot be longer than 2000 characters</span>}
                  <span></span>
                  <span className={styles.charCount}>{message.length} / 2000</span>
                </div>
              </div>
              <div className={styles.formControl}>
                <button type="submit" disabled={!isValid}>{button.current}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
