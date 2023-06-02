import { useState } from 'react';
import { useRouter } from 'next/router';
import queryString from 'query-string';

export default function PostCard({ post }) {
  const [publishing, setPublishing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const publishPost = async (postId) => {
    setPublishing(true);

    try {
      await fetch('/api/posts', {
        method: 'PUT',
        body: postId,
      });

      setPublishing(false);

      return router.push(router.asPath);
    } catch (error) {
      setPublishing(false);
    }
  };

  const deletePost = async (postId) => {
    setDeleting(true);

    try {
      const queryParams = queryString.stringify({ id: postId });
      await fetch(`/api/posts?${queryParams}`, {
        method: 'DELETE',
      });

      setDeleting(false);

      return router.push(router.asPath);
    } catch (error) {
      setDeleting(false);
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
            <th scope="col" className="px-6 py-3">Suppression</th>
          </tr>
        </thead>
        <tbody>
          {post.map((post) => (
            <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700' key={post._id}>
              <td className="px-6 py-4">{post.title}</td>
              <td className="px-6 py-4">{post.content}</td>
              <td className="px-6 py-4">
                {post.image ? (
                  <div className="w-full max-h-60 object-contain mb-4">
                    <iframe src={post.image} />
                  </div>
                ) : null}
              </td>
              <td className="px-6 py-4">
                <button className='bg-blue-900 p-4 rounded-xl hover:bg-cyan-500 text-white' type="button" onClick={() => deletePost(post._id)}>
                  {deleting ? 'Suppression' : 'Supprimer'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
