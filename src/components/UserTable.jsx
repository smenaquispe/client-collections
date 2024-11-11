import { useEffect, useState } from "react";

export function UserTable({ result }) {
    const [user, setUsers] = useState([]);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const URI_BACKEND = import.meta.env.VITE_URI_BACKEND;
        fetch(`${URI_BACKEND}/users`)
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => setError(error));
    }, [result]);

    return (
        <div className="p-6 bg-gray-100">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Users</h1>
            {error && (
                <p className="text-red-500 mb-4">{error.message}</p>
            )}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Id</th>
                            <th className="py-3 px-6 text-left">First Name</th>
                            <th className="py-3 px-6 text-left">Last Name</th>
                            <th className="py-3 px-6 text-left">Email</th>
                            <th className="py-3 px-6 text-left">Age</th>
                            <th className="py-3 px-6 text-left">Role</th>

                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                        {user.map(user => (
                            <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">{user.id}</td>
                                <td className="py-3 px-6 text-left">{user.first_name}</td>
                                <td className="py-3 px-6 text-left">{user.last_name}</td>
                                <td className="py-3 px-6 text-left">{user.email}</td>
                                <td className="py-3 px-6 text-left">{user.age}</td>
                                <td className="py-3 px-6 text-left">{user.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
