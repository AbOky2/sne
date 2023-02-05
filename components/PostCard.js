import { useState } from 'react';
import { useRouter } from 'next/router';

export default function PostCard({ post }) {
    const [publishing, setPublishing] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const router = useRouter();

    // Publication d'un poste
    const publishPost = async (postId) => {
        // on change l'etat de la publication
        setPublishing(true);

        try {
            //mise à jour du poste
            await fetch('/api/posts', {
                method: 'PUT',
                body: postId,
            });

            // mettre par defaut
            setPublishing(false);

            // raffraîchir la page
            return router.push(router.asPath);
        } catch (error) {
           
            return setPublishing(false);
        }
    };
    // Suppression du poste
    const deletePost = async (postId) => {
        //Changer l'etat de suppression
        setDeleting(true);

        try {
            //Suppression du poste
            await fetch('/api/posts', {
                method: 'DELETE',
                body: postId,
            });

        //Changer l'etat de suppression
        setDeleting(false);

            // raffraichir la page
            return router.push(router.asPath);
        } catch (error) {
            return setDeleting(false);
        }
    };
    return (
        <>
            <li className='bg-gray-500 mb-4 items-center p-4 flex flex-col rounded-xl w-full border border-1'>
                <h3 className='text-[30px] font-bold'>{post.title}</h3>
                <p className=' text-base'>{post.content}</p>
                <small>{new Date(post.createdAt).toLocaleDateString()}</small>
                <br />
                {!post.published ? (
                    <button className='bg-red-900 p-4 rounded-xl mb-4 hover:bg-blue-900' type="button" onClick={() => publishPost(post._id)}>
                        {publishing ? 'Publishing' : 'Publish'}
                    </button>
                ) : null}
                <button className='bg-blue-900 p-4 rounded-xl hover:bg-cyan-500' type="button" onClick={() => deletePost(post['_id'])}>
                    {deleting ? 'Deleting' : 'Delete'}
                </button>
            </li>
        </>
    );
}