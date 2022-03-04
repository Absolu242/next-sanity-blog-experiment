import Link from "next/link";
import styles from '../styles/Home.module.css'

export default function Card({ post }) {
  return (
    <Link href={`/post/${post.slug.current}`}>
      <a className={styles.card}>
        <h2>{post.title}</h2> 
      </a>
    </Link>
  );
}
