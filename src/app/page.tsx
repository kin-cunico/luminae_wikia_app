import Head from "next/head";
import { GraphQLClient, gql } from "graphql-request";
import Card from "./components/Card";
import styles from "./styles/Card.module.css";

const graphcms = new GraphQLClient(
	"https://eu-west-2.cdn.hygraph.com/content/cljw6sko60amd01t61iclg6ff/master"
);

interface Fauna {
	id: string;
	name: string;
	image: [image: "url"];
	tag: string;
	region: string;
	publishedAt: string;
	slug: string;
	authors: {
		name: string;
		slug: string;
		authorPhoto: [image: "url"];
	};
}

const QUERY = gql`
	{
		faunas {
			id
			name
			image {
				url
			}
			tag
			region
			publishedAt
			slug
			authors {
				name
				slug
				authorPhoto {
					url
				}
			}
		}
	}
`;

export async function getStaticProps() {
	const { faunas }: { faunas: Fauna[] } = await graphcms.request(QUERY);
	console.log(faunas);
	return {
		props: {
			faunas,
		},
		revalidate: 1000,
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
							author={fauna.authors}
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
