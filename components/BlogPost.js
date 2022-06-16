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
            <div className={styles.categoryDurationWrapper}>
              <span className={styles.category}>{category}</span>
              { minutesToRead(content.text) > 0 &&
                <span>{minutesToRead(content.text)} min read</span>
              }
            </div>
            <h2 className={styles.blogTitle}>{title}</h2>
            <div className={styles.textContent} dangerouslySetInnerHTML={{__html: content.html}} />
            <p className={styles.created}>{formatDate(createdAt)}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}
