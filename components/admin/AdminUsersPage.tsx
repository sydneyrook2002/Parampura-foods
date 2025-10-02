import React from 'react';
import { useCart } from '../../contexts/CartContext';

const AdminUsersPage: React.FC = () => {
    const { users, updateUserRole, user: currentUser, setPage } = useCart();

    const handleRoleChange = (userId: number, currentRole: 'customer' | 'admin') => {
        const newRole = currentRole === 'admin' ? 'customer' : 'admin';
        if (window.confirm(`Are you sure you want to change this user to a ${newRole}?`)) {
            updateUserRole(userId, newRole);
        }
    };

    return (
        <div className="bg-brand-gray-100 min-h-screen">
            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-brand-gray-600">Manage Users</h1>
                        <p className="text-brand-gray-400">
                            <button onClick={() => setPage('adminDashboard')} className="text-brand-green hover:underline">Admin</button> / Manage Users
                        </p>
                    </div>
                    <button 
                        onClick={() => setPage('adminDashboard')}
                        className="bg-brand-gray-200 text-brand-gray-600 font-bold py-2 px-4 rounded hover:bg-brand-gray-300 transition-colors"
                    >
                        Back to Dashboard
                    </button>
                </div>

                <div className="bg-white shadow rounded overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b border-brand-gray-200 bg-brand-gray-100">
                            <tr>
                                <th className="p-4 font-semibold text-brand-gray-500">User ID</th>
                                <th className="p-4 font-semibold text-brand-gray-500">Name</th>
                                <th className="p-4 font-semibold text-brand-gray-500">Email</th>
                                <th className="p-4 font-semibold text-brand-gray-500">Role</th>
                                <th className="p-4 font-semibold text-brand-gray-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} className="border-b border-brand-gray-200 hover:bg-brand-gray-100">
                                    <td className="p-4 text-brand-gray-500">{user.id}</td>
                                    <td className="p-4 font-semibold text-brand-gray-600">{user.name}</td>
                                    <td className="p-4 text-brand-gray-500">{user.email}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.role === 'admin' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                            {user.role.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        {user.id !== currentUser?.id ? (
                                            <button 
                                                onClick={() => handleRoleChange(user.id, user.role)}
                                                className={`text-sm font-bold py-1 px-3 rounded ${user.role === 'admin' ? 'bg-yellow-500 hover:bg-yellow-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'}`}
                                            >
                                                {user.role === 'admin' ? 'Demote' : 'Promote'}
                                            </button>
                                        ) : (
                                            <span className="text-sm text-brand-gray-400">Cannot change own role</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminUsersPage;