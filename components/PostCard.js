import { useState } from 'react';
import { useRouter } from 'next/router';
// import { Document, Page } from 'react-pdf';


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

                <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-xl'>
                   <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                    <tr>
                        <th scope="col" className="px-6 py-3">Titre</th>
                        <th scope="col" className="px-6 py-3">Contenu</th>
                        <th scope="col" className="px-6 py-3">Fichier</th>
                        <th scope="col" className="px-6 py-3">Supression</th>
                    </tr>
                   </thead>
                   
                   <tbody>
                
                        {post.map((post) => (
                    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                      
                        <td className="px-6 py-4">{post.title}</td>
                        <td className="px-6 py-4">{post.content}</td>
                        <td className="px-6 py-4">{post.image ? (
                                // <div>{post.image}</div>
                                <div className="w-full max-h-60 object-contain mb-4">
                                <iframe src={post.image}  /></div>
                            ) : null}</td>
                            <td className="px-6 py-4">
                            <button className='bg-blue-900 p-4 rounded-xl hover:bg-cyan-500 text-white' type="button" onClick={() => deletePost(post['_id'])}>
                            {deleting ? 'supression' : 'Supprimer'}
                        </button>
                            </td>
                    </tr>))}
                   </tbody>


                </table>


            {/* <li className='bg-gray-500 mb-4 items-center p-4 flex flex-col rounded-xl w-full border border-1'>
                <h3 className='text-[30px] font-bold'>{post.title}</h3>
                <p className=' text-base'>{post.content}</p>
                <small>{new Date(post.createdAt).toLocaleDateString()}</small>
                <br />
                {post.image ? (
                        // <div>{post.image}</div>
                        <div className="w-full max-h-60 object-contain mb-4">
                        <iframe src={post.image}  /></div>
                    ) : null}
                <br />
                {!post.published ? (
                    <button className='bg-red-900 p-4 rounded-xl mb-4 hover:bg-blue-900' type="button" onClick={() => publishPost(post._id)}>
                        {publishing ? 'Publishing' : 'Publish'}
                    </button>
                ) : null}
                <button className='bg-blue-900 p-4 rounded-xl hover:bg-cyan-500' type="button" onClick={() => deletePost(post['_id'])}>
                    {deleting ? 'Deleting' : 'Delete'}
                </button>
            </li> */}
        </>
    );
}