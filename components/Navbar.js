import styles from '../styles/Navbar.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

export default function Navbar() {
  const router = useRouter();
  const navBar = useRef();
  const progressBar = useRef();

  const navLinks = [
    { title: 'HOME', path: '/' },
    { title: 'BLOG', path: '/blog' },
    { title: 'CONTACT', path: '/contact' },
  ];

  function updateProgressBar() {
    const { scrollTop, scrollHeight } = document.documentElement;

    const scrollPercent = `${(scrollTop / (scrollHeight - window.innerHeight)) * 100}%`;

    progressBar.current.style.setProperty('--progress', scrollPercent);
  }

  function changeNavbarColor() {
    const hero = document.querySelector('#hero');

    if (!hero) {
      navBar.current.classList.add(styles.navBarGreen);
      return;
    }

    const { scrollTop } = document.documentElement;
    const offsetBottom = hero.offsetTop + hero.offsetHeight;
    const navBarHeight = navBar.current.offsetHeight;

    // If the scroll is past the hero, change the navbar color
    if (scrollTop > offsetBottom - navBarHeight) {
      navBar.current.classList.add(styles.hasBg);
    } else {
      navBar.current.classList.remove(styles.hasBg);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', changeNavbarColor);
    if (router.pathname.includes('blog')) {
      window.addEventListener('scroll', updateProgressBar);
    }
    return () => {
      window.removeEventListener('scroll', changeNavbarColor);
      if (router.pathname.includes('blog')) {
        window.removeEventListener('scroll', updateProgressBar);
      }
    }
  }, [router.pathname]);


  return(
    <div>
      <nav ref={navBar} className={[styles.navbar, router.pathname !== '/' ? styles.notHomeNav : ''].join(' ')}>
        <ul className={styles.navItems}>
          {navLinks.map((navLink) => (
            <li key={navLink.title}>
              <Link href={navLink.path} passHref>
                <a className={router.pathname === navLink.path ? styles.active : ''}>{navLink.title}</a>
              </Link>
            </li>
          ))}
        </ul>
        {router.pathname.includes('blog') &&
          <div id={styles.progress} ref={progressBar}/>
        }
      </nav>
    </div>
  );
}
