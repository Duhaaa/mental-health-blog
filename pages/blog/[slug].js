import { GraphQLClient , gql} from 'graphql-request';
import styles from '../../styles/BlogPost.module.scss';
import { minutesToRead } from '../../helpers/minutesToRead';
import { formatDate } from '../../helpers/formatDate';
import Head from 'next/head';

const graphcms = new GraphQLClient(process.env.GRAPHCMS_API_URL);

const QUERY_BLOGPOST = gql`
  query BlogPost($slug: String!) {
    blogPost(where: {slug: $slug}) {
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

const QUERY_SLUGS = gql`
{
  blogPosts {
    slug
  }
}
`;

export async function getStaticPaths() {
  const { blogPosts } = await graphcms.request(QUERY_SLUGS);

  return {
    paths: blogPosts.map(blogPost => ({ params: { slug: blogPost.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({params}) {
  const { slug } = params;
  const data  = await graphcms.request(QUERY_BLOGPOST, { slug });
  const blogPost = data.blogPost;

  return {
    props: {
      blogPost
    }
  }
}

export default function Slug({blogPost}) {
  return (
    <div>
      <Head>
        <title>{`${blogPost.title} | ${process.env.NEXT_PUBLIC_APP_TITLE}`}</title>
      </Head>
      <div id={styles.progress} />
      <main>
        <div className={[styles.container, styles.header].join(' ')}>
          <span className={styles.category}>{blogPost.category}</span>
          {minutesToRead(blogPost.content.text) > 0 &&
            <span>{minutesToRead(blogPost.content.text)} min read</span>
          }
          <h1 className={styles.title}>{blogPost.title}</h1>
          <p className={styles.created}>{formatDate(blogPost.createdAt)}</p>
        </div>
        <div className={styles.hero}>
          <div style={{backgroundImage: `url(${blogPost.coverPhoto.url})`}} className={styles.coverPhoto}/>
        </div>
      </main>
      <div className={[styles.container, styles.blogPost].join(' ')}>
        <div dangerouslySetInnerHTML={{__html: blogPost.content.html}}/>
      </div>
    </div>
  );
}