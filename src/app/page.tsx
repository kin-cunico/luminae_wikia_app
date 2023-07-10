import Head from "next/head";
import Card from "./components/Card";
import styles from "./styles/Card.module.css";
import faunas from "./components/Card";

interface Fauna {
	id: string;
	name: string;
	image: { url: string };
	tag: string;
	region: string;
	publishedAt: string;
	slug: string;
	authors: {
		name: string;
		slug: string;
		authorPhoto: { url: string };
	};
}

export default function Home({ faunas }: { faunas: Fauna[] }) {
	console.log(faunas);
	return (
		<main>
			<Head>
				<title>Luminae Wikia Page</title>
				<meta
					name="description"
					content="a showcase of creating a wikia using ghaphql in Hygraph with Next.js"
				/>
				<link
					rel="icon"
					href="./favicon.ico"
				/>
			</Head>
			<div className={styles.container}>
				{faunas ? (
					faunas.map((fauna) => (
						<Card
							title={fauna.name}
							author={fauna.authors.name}
							coverPhoto={fauna.image}
							key={fauna.id}
							datePublished={fauna.publishedAt}
							slug={fauna.slug}
						/>
					))
				) : (
					<span className={styles.span}>no data returned</span>
				)}
			</div>
		</main>
	);
}
