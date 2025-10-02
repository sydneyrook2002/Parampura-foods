import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { Order } from '../../types';
import Icon from '../Icon';

const OrderDetailsModal: React.FC<{ order: Order; onClose: () => void }> = ({ order, onClose }) => {
    const { updateOrderStatus } = useCart();
    const [currentStatus, setCurrentStatus] = useState<Order['status']>(order.status);

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value as Order['status'];
        setCurrentStatus(newStatus);
        updateOrderStatus(order.id, newStatus);
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="flex justify-between items-center mb-4 border-b pb-3">
                    <h2 className="text-2xl font-bold text-brand-gray-600">Order Details: #{order.id}</h2>
                    <button onClick={onClose} className="text-brand-gray-400 hover:text-brand-gray-600">
                        <Icon name="close" className="w-6 h-6" />
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-bold text-brand-gray-600 mb-2">Customer Info</h3>
                        <p><strong>Name:</strong> {order.userName}</p>
                        <p><strong>User ID:</strong> {order.userId}</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-brand-gray-600 mb-2">Order Summary</h3>
                        <p><strong>Date:</strong> {order.date.toLocaleDateString()}</p>
                        <p><strong>Total:</strong> <span className="font-bold text-brand-green">${order.total.toFixed(2)}</span></p>
                        <div className="flex items-center gap-2">
                          <strong>Status:</strong> 
                          <select value={currentStatus} onChange={handleStatusChange} className="border border-brand-gray-300 rounded p-1 text-sm bg-white">
                            <option value="Pending">Pending</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <h3 className="font-bold text-brand-gray-600 mb-2">Items Ordered</h3>
                    <ul className="space-y-3 border-t pt-3">
                        {order.items.map(item => (
                            <li key={item.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img src={item.imageUrls[0]} alt={item.name} className="w-12 h-12 object-cover rounded" />
                                    <div>
                                        <p className="font-semibold">{item.name}</p>
                                        <p className="text-sm text-brand-gray-500">{item.quantity} x ${item.price.toFixed(2)}</p>
                                    </div>
                                </div>
                                <p className="font-bold">${(item.quantity * item.price).toFixed(2)}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};


const AdminOrdersPage: React.FC = () => {
    const { orders, setPage } = useCart();
    const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
    
    // Sort orders from most recent to oldest
    const sortedOrders = [...orders].sort((a, b) => b.date.getTime() - a.date.getTime());

    const getStatusClass = (status: Order['status']) => {
        switch (status) {
            case 'Completed': return 'bg-green-100 text-green-800';
            case 'Shipped': return 'bg-blue-100 text-blue-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="bg-brand-gray-100 min-h-screen">
            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-brand-gray-600">Manage Orders</h1>
                        <p className="text-brand-gray-400">
                            <button onClick={() => setPage('adminDashboard')} className="text-brand-green hover:underline">Admin</button> / Manage Orders
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
                                <th className="p-4 font-semibold text-brand-gray-500">Order ID</th>
                                <th className="p-4 font-semibold text-brand-gray-500">Customer</th>
                                <th className="p-4 font-semibold text-brand-gray-500">Date</th>
                                <th className="p-4 font-semibold text-brand-gray-500">Total</th>
                                <th className="p-4 font-semibold text-brand-gray-500">Status</th>
                                <th className="p-4 font-semibold text-brand-gray-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedOrders.map(order => (
                                <tr key={order.id} className="border-b border-brand-gray-200 hover:bg-brand-gray-100">
                                    <td className="p-4 font-semibold text-brand-gray-600">#{order.id}</td>
                                    <td className="p-4 text-brand-gray-500">{order.userName}</td>
                                    <td className="p-4 text-brand-gray-500">{order.date.toLocaleDateString()}</td>
                                    <td className="p-4 font-bold text-brand-gray-600">${order.total.toFixed(2)}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <button 
                                            onClick={() => setViewingOrder(order)}
                                            className="text-sm font-bold py-1 px-3 rounded bg-brand-green text-white hover:bg-brand-green-dark"
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {viewingOrder && <OrderDetailsModal order={viewingOrder} onClose={() => setViewingOrder(null)} />}
        </div>
    );
};

export default AdminOrdersPage;
