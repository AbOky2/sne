import React from 'react'
import Nav from '@/components/Nav'
import PostCard from '@/components/PostCard'

function dossiers({ posts }) {
  return (
    <div>

        <Nav />


<p className='md:text-[48px] text-center font-["DM Serif Display"] font-bold font-serif mt-4'> Liste des dossiers</p>

<main>
    <div className=' p-4 w-full '>
        {posts.length === 0 ? (
            <h2>Pas de poste ajouter pour le moment</h2>
        ) : (
            <div className=' items-center w-full  gap-4'>
             
                    <PostCard post={posts}  />
                    
          
            </div>
        )}
    </div>
</main>
    </div>
  )
}

export default dossiers

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