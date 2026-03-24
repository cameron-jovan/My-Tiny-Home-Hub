import Link from 'next/link';
import Image from 'next/image';
import styles from './EditorialCard.module.css';

export default function EditorialCard({ post, variant = 'default' }) {
  return (
    <article className={`${styles.card} ${styles[variant]}`} id={`post-${post.id}`}>
      <Link href={`/blog/${post.slug}`} className={styles.imageWrap}>
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          className={styles.image}
        />
        <div className={styles.overlay} />
      </Link>
      <div className={styles.body}>
        <span className="tag">{post.category}</span>
        <Link href={`/blog/${post.slug}`} className={styles.title}>
          {post.title}
        </Link>
        <p className={styles.excerpt}>{post.excerpt}</p>
        <Link href={`/blog/${post.slug}`} className={styles.readMore}>
          Read Story →
        </Link>
      </div>
    </article>
  );
}
