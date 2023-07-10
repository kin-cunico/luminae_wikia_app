import Link from "next/link";
import styles from "../styles/Card.module.css";

interface Post {
	title: string;
	author: string;
	coverPhoto: { url: string };
	datePublished: string;
	slug: string;
}

export default function Post({
	title,
	author,
	coverPhoto,
	datePublished,
	slug,
}) {
	return (
		<div className={styles.container}>
			<Link href={{ title } + slug}>
				<h1>{title}</h1>
				<img src={coverPhoto.url}></img>
				<p>{author}</p>
				<p>{datePublished}</p>
			</Link>
		</div>
	);
}
