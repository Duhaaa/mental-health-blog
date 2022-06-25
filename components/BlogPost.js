import Link from 'next/link';
import styles from '../styles/BlogPosts.module.scss';
import { minutesToRead } from '../helpers/minutesToRead';
import { formatDate } from '../helpers/formatDate';

export default function BlogPost({title, coverPhoto, slug, index, category, createdAt, content}) {
  return (
    <article itemProp="blogPosts" itemScope itemType="http://schema.org/BlogPosting" id={index === 0 ? styles['first-card'] : ''} className={styles.card}>
      <Link href={`/blog/${slug}`} passHref>
        <a title={title}>
          <div className={styles.cardContent}>
            <div className={styles.cardImgContainer}>
              <img src={coverPhoto.url} alt={title} />
            </div>
            <div className={styles.innerContent}>
              <div>
                <span className={styles.category}>{category}</span>
              </div>
              <h3 className={styles.blogTitle}>{title}</h3>
              <div className={styles.innerFooter}>
                <div className={styles.dateWrapper}>
                  <span className={styles.created}>{formatDate(createdAt)}</span>
                  <span className={styles.bullet}>&#9679;</span>
                  { minutesToRead(content.text) > 0 &&
                    <span className={styles.minutesToRead}>{minutesToRead(content.text)} min read</span>
                  }
                </div>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </article>
  )
}
