import Head from "next/head";
import { GraphQLClient, gql } from "graphql-request";
import Card from "./components/Card";
import styles from "./styles/Card.module.css";

const graphcms = new GraphQLClient(
	"https://eu-west-2.cdn.hygraph.com/content/cljw6sko60amd01t61iclg6ff/master",
	{
		headers: {
			Authorization:
				"Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2ODg5NjM1MTcsImF1ZCI6WyJodHRwczovL2FwaS1ldS13ZXN0LTIuaHlncmFwaC5jb20vdjIvY2xqdzZza282MGFtZDAxdDYxaWNsZzZmZi9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiNWM2NzQ0MTMtZGNhMS00NGViLWJjMTktOWZiYTYzMjUxMTczIiwianRpIjoiY2xqd2Q5cWE1MGRwaDAxdWViZTZoaDc5MSJ9.fehjFeeKn8hHZGP5qpVLO1CFHxN8bfRluyKQmDj4wASAhTdSMYp2yIlQ1PzRVvsQ-3Co11ESqciWIITHzvI05F_pLeX3v8VCLHUa6FyXiKy4Xj5MjSFvT02Bf_4h_efXrWEgPuVrXtf8OWhLmGcp2Pwqt3eBM3OBywXDQCskOkj34A3znTNVhjGPPwFAl2yu1AsbHk5MrAVlABgP13LAnp8NrvnQOfDb9IgWkEnDkMhJnoTSZO0zZ4utDdfZyHZlyFiMeyLy3x7_bYSCxuHbxctdKwA73FXXcjKsrQwkd7wXfalPUQlVs0wnDmWPQWyXTnSkHSEDWor5B1xLEOxKbRY6rowJAjTWikujGh50d3XgxcKn7IzgCdLzBmOf0fMfsrdqbptWrJDXLydx52tUHer3DipvLz_Qq6b0i4QHCmySZnJfgtvBgt-04CPmMyaEHpm3MYixdkzhGWZHL3TxwVKSMqIbfQZArFWw1Bu-Mce-EgfWr3bXvepdCWj2scOStVTJY_PtHTo3X3IGCzFeB8LBoWuNqcBN1wh-mQj3vDwU2Sqr9TNyUfyU4SgsLgk-j6thH2Tiu9lBzUJ18ooYXgIK9YY-8GSm9ebHoUE0DY20yC6gC6wevVdXBgUD5jWN76pU8oxMo-rqHlsoEATGKu-ueaMbs6mUfuCGG-8vzFU",
		},
	}
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
