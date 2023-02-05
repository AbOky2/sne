import Head from 'next/head';

import Nav from '../components/Nav';
import PostCard from '../components/PostCard';
import styles from '../styles/Home.module.css';

export default function Home({ posts }) {
    return (
        <div>
            <Head>
                <title>Accueil</title>
            </Head>

            <Nav />

            <div className='bg-white  w-full text-[30px] p-4 items-center text-center font-bold text-green-900 mt-16'>
                Bienvenue dans la plateforme d'archivage. Ici vous pouvez consulter et archiver des documents.

            </div>

            <main>
                <div className=' p-4 w-full '>
                    {posts.length === 0 ? (
                        <h2>Pas de poste ajouter pour le moment</h2>
                    ) : (
                        <ul className=' items-center w-full md:grid md:grid-cols-2 gap-4'>
                            {posts.map((post, i) => (
                                <PostCard post={post} key={i} />
                            ))}
                        </ul>
                    )}
                </div>
            </main>
        </div>
    );
}

export async function getServerSideProps(ctx) {
    // get the current environment
    let dev = process.env.NODE_ENV !== 'production';
    let { DEV_URL, PROD_URL } = process.env;

    // request posts from api
    let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/posts`);
    // extract the data
    let data = await response.json();

    return {
        props: {
            posts: data['message'],
        },
    };
}