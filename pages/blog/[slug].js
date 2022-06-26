import { GraphQLClient , gql} from 'graphql-request';
import styles from '../../styles/BlogPost.module.scss';
import { formatDate } from '../../helpers/formatDate';
import Head from 'next/head';
import { useRouter } from 'next/router';



const graphcms = new GraphQLClient(process.env.GRAPHCMS_API_URL);

const QUERY_BLOGPOST = gql`
  query BlogPost($slug: String!) {
    blogPost(where: {slug: $slug}) {
      id
      title
      content {
        html
      }
      createdAt
      slug
      detailCoverPhoto {
        url
        width
        height
        mimeType
      }
      category
      createdAt
      metaDescriptionSeo
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
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{`${blogPost.title} | ${process.env.NEXT_PUBLIC_APP_TITLE}`}</title>

        <meta name="og:site_name" content={`${process.env.NEXT_PUBLIC_APP_TITLE}`}/>
        <meta name="title" content={`Mental Health Blog - ${process.env.NEXT_PUBLIC_APP_TITLE}`} />
        <meta name="description" content={blogPost.metaDescriptionSeo} />

        <meta property="og:title" content={`${blogPost.title} - ${process.env.NEXT_PUBLIC_APP_TITLE}`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`} />
        <meta property="og:description" content={blogPost.metaDescriptionSeo} />
        <meta property="og:image" content={blogPost.detailCoverPhoto.url} />
        <meta property="og:image:width" content={blogPost.detailCoverPhoto.width} />
        <meta property="og:image:height" content={blogPost.detailCoverPhoto.height} />
        <meta property="og:image:type" content={blogPost.detailCoverPhoto.mimeType} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`} />
        <meta property="twitter:title" content={`${blogPost.title} - ${process.env.NEXT_PUBLIC_APP_TITLE}`} />
        <meta property="twitter:description" content={blogPost.metaDescriptionSeo}/>
        <meta property="twitter:image" content={blogPost.detailCoverPhoto.url} />
      </Head>
      <div id={styles.progress} />
      <main>
        <div className={[styles.container, styles.header].join(' ')}>
          <span className={styles.category}>{blogPost.category}</span>
          <h1 className={styles.title}>{blogPost.title}</h1>
          <p className={styles.created}>{formatDate(blogPost.createdAt)}</p>
        </div>
        <div className={styles.hero}>
          <div style={{backgroundImage: `url(${blogPost.detailCoverPhoto.url})`}} className={styles.coverPhoto}/>
        </div>
      </main>
      <div className={[styles.container, styles.blogPost].join(' ')}>
        <div className={styles.content} dangerouslySetInnerHTML={{__html: blogPost.content.html}}/>
      </div>
    </div>
  );
}
