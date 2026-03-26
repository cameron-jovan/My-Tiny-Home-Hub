import React from 'react';
import { Link } from 'react-router-dom';
import styles from './EditorialCard.module.css';

interface PostSnippet {
  id: string;
  slug: string;
  image: string;
  title: string;
  category: string;
  excerpt: string;
}

interface EditorialCardProps {
  post: PostSnippet;
  variant?: 'default' | 'large' | 'compact' | 'wide';
}

export default function EditorialCard({ post, variant = 'default' }: EditorialCardProps) {
  return (
    <article className={`${styles.card} ${styles[variant]}`} id={`post-${post.id}`}>
      <Link to={`/blog/${post.slug}`} className={styles.imageWrap}>
        <img
          src={post.image}
          alt={post.title}
          className={styles.image}
        />
        <div className={styles.overlay} />
      </Link>
      <div className={styles.body}>
        <span className="tag">{post.category}</span>
        <Link to={`/blog/${post.slug}`} className={styles.title}>
          {post.title}
        </Link>
        <p className={styles.excerpt}>{post.excerpt}</p>
        <Link to={`/blog/${post.slug}`} className={styles.readMore}>
          Read Story &rarr;
        </Link>
      </div>
    </article>
  );
}
