import '../styles/globals.scss'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Head from 'next/head';
import TagManager from 'react-gtm-module';
import { useEffect } from 'react'
import Script from 'next/script'
import { useRouter } from "next/router";
import * as gtag from "../lib/gtag";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-NFCS3CN' });

    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    // const handleClicks = (e) => {
    //   console.log(e.target.tagName)
    //   if (e.target.tagName === "A" || e.target.tagName === "a") {
    //     console.log('a');
    //   }
    // }

    // document.addEventListener('click', handleClicks);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);

      // document.removeEventListener('click', handleClicks);
    };
  }, [router.events]);
  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-CSMS1S0777" />
      <Script id="google-analytics" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html:
        `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gtag.GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
        `,
      }}/>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp
