import Link from 'next/link';
import styles from '../styles/BlogPosts.module.scss';
import { minutesToRead } from '../helpers/minutesToRead';
import { formatDate } from '../helpers/formatDate';

export default function BlogPost({title, coverPhoto, slug, index, category, createdAt, content}) {
  return (
    <div id={index === 0 ? styles['first-card'] : ''} className={styles.card}>
      <Link href={`/blog/${slug}`} passHref>
        <div className={styles.cardContent}>
          <div className={styles.cardImgContainer}>
            <img src={coverPhoto.url} alt={title} />
          </div>
          <div className={styles.innerContent}>
            <div>
              <span className={styles.category}>{category}</span>
            </div>
            <h3 className={styles.blogTitle}>{title}</h3>
            {/* <div className={styles.textContent} dangerouslySetInnerHTML={{__html: content.html}} /> */}
            <div className={styles.innerFooter}>
              <span className={styles.created}>{formatDate(createdAt)}</span>
              <span className={styles.bullet}>&#9679;</span>
              { minutesToRead(content.text) > 0 &&
                <span className={styles.minutesToRead}>{minutesToRead(content.text)} min read</span>
              }
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
