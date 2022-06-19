import BlogPost from '../components/BlogPost';
import About from '../components/About';
import Contact from '../components/Contact';
import styles from '../styles/Home.module.scss';
import { GraphQLClient , gql} from 'graphql-request';
import Head from 'next/head';
import { Link as ScrollLink } from 'react-scroll';

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
        <title>{`Home | ${process.env.NEXT_PUBLIC_APP_TITLE}`}</title>
        <meta property="og:title" content={`${process.env.NEXT_PUBLIC_APP_TITLE}`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.internalized.blog" />
        <meta property="og:description" content="A blog about mental health" />
        <meta property="og:image" content="https://www.internalized.blog/og-image.svg" />
      </Head>
      <main>
        <div id="hero" className={styles.hero}>
          <div className={styles.heroContainer}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
                Let&apos;s talk about <span>mental health</span>
              </h1>
              <p className={styles.heroDescription}>
                Come with me to the edge of the world. We will talk about mental health and how to deal with it. Internalized is the place where you can be yourself, together with me.
              </p>
              <p>
                <ScrollLink className={styles.heroButton} to="blog" smooth={true} duration={500} spy={true} offset={-50}>
                  {/* <a className={styles.heroButton}> */}
                    Read my blog
                  {/* </a> */}
                </ScrollLink>
              </p>
            </div>
            <div className={styles.heroImage}>
              <img src="/hero.svg" alt="Internalized" />
            </div>
          </div>
        </div>
        <div id="blog" className={styles.blogPostsContainer}>
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
        </div>
        <About />
        <Contact />
      </main>
    </div>
  )
}
