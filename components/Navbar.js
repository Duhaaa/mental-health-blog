import styles from '../styles/Navbar.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

export default function Navbar() {
  const router = useRouter();
  const navBar = useRef();
  const progressBar = useRef();

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'About', path: '/about' },
    { title: 'Blog', path: '/blog' },
    { title: 'Contact', path: '/contact' },
  ];

  function updateProgressBar() {
    const { scrollTop, scrollHeight } = document.documentElement;

    const scrollPercent = `${(scrollTop / (scrollHeight - window.innerHeight)) * 100}%`;

    progressBar.current.style.setProperty('--progress', scrollPercent);
  }

  useEffect(() => {
    if (router.pathname.includes('blog')) {
      window.addEventListener('scroll', updateProgressBar);
    }
    return () => {
      if (router.pathname.includes('blog')) {
        window.removeEventListener('scroll', updateProgressBar);
      }
    }
  }, [router.pathname]);


  return(
    <div>
      <nav ref={navBar} className={[styles.navbar, router.pathname !== '/' ? styles.notHomeNav : ''].join(' ')}>
        <div className={styles.navContainer}>
          <Link href="/" passHref>
            <a className={styles.homelink}>
              {process.env.NEXT_PUBLIC_APP_TITLE}.
            </a>
          </Link>
          <ul className={styles.navItems}>
            {navLinks.map((navLink) => (
              <li key={navLink.title}>
                <Link href={navLink.path} passHref>
                  <a className={router.pathname === navLink.path ? styles.active : ''}>{navLink.title}</a>
                </Link>
              </li>
            ))}
          </ul>

        </div>
         {router.pathname.includes('blog') &&
            <div id={styles.progress} ref={progressBar}/>
          }
      </nav>
    </div>
  );
}
