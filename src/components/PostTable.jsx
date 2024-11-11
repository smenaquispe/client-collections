import { useEffect, useState } from "react";

export function PostTable({ result }) {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const URI_BACKEND = import.meta.env.VITE_URI_BACKEND;
        fetch(`${URI_BACKEND}/posts`)
            .then(response => response.json())
            .then(data => setPosts(data))
            .catch(error => setError(error));
    }, [result]);

    return (
        <div className="p-6 bg-gray-100">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Posts</h1>
            {error && (
                <p className="text-red-500 mb-4">{error.message}</p>
            )}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Id</th>
                            <th className="py-3 px-6 text-left">User Id</th>
                            <th className="py-3 px-6 text-left">Title</th>
                            <th className="py-3 px-6 text-left">Content</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                        {posts.map(post => (
                            <tr key={post.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">{post.id}</td>
                                <td className="py-3 px-6 text-left">{post.user_id}</td>
                                <td className="py-3 px-6 text-left">{post.title}</td>
                                <td className="py-3 px-6 text-left">{post.content}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
