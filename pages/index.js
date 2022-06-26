import BlogPost from '../components/BlogPost';
import About from '../components/About';
import Contact from '../components/Contact';
import styles from '../styles/Home.module.scss';
import { GraphQLClient , gql} from 'graphql-request';
import Head from 'next/head';
import { Link as ScrollLink } from 'react-scroll';
import Image from 'next/image';

const graphcms = new GraphQLClient(process.env.GRAPHCMS_API_URL);

const QUERY_BLOGPOSTS = gql`
{
  blogPosts(first: 4) {
    id
    title
    content {
      html
      text
    }
    createdAt
    slug
    coverPhoto {
      url
      width
      height
      alt
    }
    category
    createdAt
  }
}
`;

export async function getStaticProps() {
  const { blogPosts } = await graphcms.request(QUERY_BLOGPOSTS);
  return {
    props: {
      blogPosts
    }
  }
}

export default function Home({blogPosts}) {
  return (
    <div>
      <Head>
        <title>{`Home | ${process.env.NEXT_PUBLIC_APP_TITLE}`} - Mental Health Blog</title>

        <meta name="og:site_name" content={`${process.env.NEXT_PUBLIC_APP_TITLE}`}/>
        <meta name="title" content={`Mental Health Blog - ${process.env.NEXT_PUBLIC_APP_TITLE}`} />
        <meta name="description" content="A blog that aims to raise mental health awareness through sharing resources, interviews, and tips." />

        <meta property="og:title" content={`Mental Health Blog - ${process.env.NEXT_PUBLIC_APP_TITLE}`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.internalized.blog" />
        <meta property="og:description" content="A blog that aims to raise mental health awareness through sharing resources, interviews, and tips." />
        <meta property="og:image" content="https://www.internalized.blog/og-image.svg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/svg+xml" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://internalized.blog/" />
        <meta property="twitter:title" content={`Mental Health Blog - ${process.env.NEXT_PUBLIC_APP_TITLE}`} />
        <meta property="twitter:description" content="A blog that aims to raise mental health awareness through sharing resources, interviews, and tips."/>
        <meta property="twitter:image" content="https://www.internalized.blog/og-image.svg" />
      </Head>
      <main>
        <section id="hero" className={styles.hero}>
          <div className={styles.heroContainer}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
                Let&apos;s talk about <span>mental health</span>
              </h1>
              <p className={styles.heroDescription}>
                Discover personal stories from people around the world who talk openly about mental health. Internalized is a blog that aims to raise mental health awareness through sharing resources, interviews, and tips.
              </p>
              <p>
                <ScrollLink className={styles.heroButton} to="blog" smooth={true} duration={500} spy={true} offset={-50} title="To Blog Overview">
                    Join the conversation
                </ScrollLink>
              </p>
            </div>
            <div className={styles.heroImage}>
              <Image src="/hero.svg" width={882.34637} height={778.99856} alt="girl sitting behind the computer" />
            </div>
          </div>
        </section>
        <section itemScope itemType="http://schema.org/Blog" id="blog" className={styles.blogPostsContainer}>
          <h2 className={styles.blogPostsTitle}>
            Our conversation starts <span>here</span>
          </h2>
          <div className={styles.blogPosts}>
            {blogPosts.map((blogPost, index) => (
              <BlogPost
                key={blogPost.id}
                index={index}
                {...blogPost}
              />
            ))}
          </div>
        </section>
        <About />
        <Contact />
      </main>
    </div>
  )
}
