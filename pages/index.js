import BlogPost from '../components/BlogPost';
import styles from '../styles/Home.module.scss';
import { GraphQLClient , gql} from 'graphql-request';
import Head from 'next/head';

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
      </Head>
      <main>
        <div id="hero" className={styles.hero}>
          <h1 className={styles.title}>
            Internalized.
          </h1>
          <p className={styles.description}>

          </p>
        </div>
        <div id="blog" className="container">
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
      </main>
    </div>
  )
}
