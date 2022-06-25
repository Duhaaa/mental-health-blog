import styles from '../styles/Navbar.module.scss';
import Link from 'next/link';
import { Link as ScrollLink } from 'react-scroll';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

export default function Navbar() {
  const router = useRouter();
  const navBar = useRef();
  const progressBar = useRef();

  const navLinks = [
    { title: 'Home', section: 'hero', path: '/' },
    { title: 'Blog', section: 'blog', path: '/#blog' },
    { title: 'About', section: 'about', path: '/#about' },
    { title: 'Contact', section: 'contact', path: '/#contact' },
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
            <a className={styles.homelink} title="Home">
              {process.env.NEXT_PUBLIC_APP_TITLE}
            </a>
          </Link>
          <ul className={styles.navItems}>
            {router.pathname === '/' ?
              navLinks.map((navLink) => (
              <li key={navLink.title}>
                <ScrollLink to={navLink.section} smooth={true} duration={500} spy={true} activeClass={styles.active} offset={-160} title={navLink.title}>
                  {navLink.title}
                </ScrollLink>
              </li>
            )) : (
              navLinks.map((navLink) =>
              <li key={navLink.title}>
                <Link href={navLink.path} passHref>
                  <a className={navLink.path.includes('blog') ? styles.active : ''}>{navLink.title}</a>
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
