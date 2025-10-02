import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { OrderItem } from '../types';
import LeaveReviewForm from './LeaveReviewForm';
import ProductCard from './ProductCard';

type AccountTab = 'dashboard' | 'orders' | 'addresses' | 'details' | 'wishlist';

const AccountPage: React.FC = () => {
    const { user, logout, orders, wishlistItems } = useCart();
    const [activeTab, setActiveTab] = useState<AccountTab>('dashboard');
    const [reviewingItem, setReviewingItem] = useState<OrderItem | null>(null);

    if (!user) {
        // This case is handled by the router in App.tsx, but it's good practice for component safety
        return null;
    }

    const userOrders = orders.filter(o => o.userId === user.id).sort((a, b) => b.date.getTime() - a.date.getTime());

    const renderContent = () => {
        switch (activeTab) {
            case 'orders':
                return (
                    <div>
                        <h2 className="text-xl font-bold mb-4">My Orders</h2>
                        {userOrders.length > 0 ? (
                            <div className="space-y-6">
                                {userOrders.map(order => (
                                    <div key={order.id} className="border rounded-lg p-4 bg-white shadow-sm">
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-3 mb-3">
                                            <div>
                                                <p className="font-bold text-brand-gray-600">Order #{order.id}</p>
                                                <p className="text-sm text-brand-gray-500">Date: {order.date.toLocaleDateString()}</p>
                                            </div>
                                            <div className="text-left sm:text-right mt-2 sm:mt-0">
                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${order.status === 'Completed' ? 'bg-green-100 text-green-800' : order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>{order.status}</span>
                                                <p className="font-semibold text-lg text-brand-gray-600 mt-1">${order.total.toFixed(2)}</p>
                                            </div>
                                        </div>
                                        <ul className="space-y-4">
                                            {order.items.map(item => (
                                                <li key={item.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                                    <div className="flex items-center gap-4">
                                                        <img src={item.imageUrls[0]} alt={item.name} className="w-16 h-16 rounded object-cover"/>
                                                        <div>
                                                            <p className="font-semibold text-brand-gray-600">{item.name}</p>
                                                            <p className="text-sm text-brand-gray-500">{item.quantity} x ${item.price.toFixed(2)}</p>
                                                        </div>
                                                    </div>
                                                    <button 
                                                        onClick={() => setReviewingItem(item)}
                                                        className="mt-3 sm:mt-0 bg-brand-green text-white text-sm font-bold py-2 px-4 rounded hover:bg-brand-green-dark transition-colors"
                                                    >
                                                        Leave a Review
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>You have no recent orders.</p>
                        )}
                    </div>
                );
            case 'wishlist':
                return (
                    <div>
                        <h2 className="text-xl font-bold mb-4">My Wishlist</h2>
                        {wishlistItems.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {wishlistItems.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <p>Your wishlist is empty. Start adding products you love!</p>
                        )}
                    </div>
                );
            case 'addresses':
                return <div><h2 className="text-xl font-bold mb-4">My Addresses</h2><p>No addresses have been saved.</p></div>;
            case 'details':
                return <div><h2 className="text-xl font-bold mb-4">Account Details</h2><p>Name: {user.name}<br/>Email: {user.email}</p></div>;
            case 'dashboard':
            default:
                return (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
                        <p>Hello, <strong>{user.name}</strong>!</p>
                        <p className="mt-2">From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.</p>
                    </div>
                );
        }
    };

    const TabButton: React.FC<{ tab: AccountTab, children: React.ReactNode }> = ({ tab, children }) => (
        <button
            onClick={() => setActiveTab(tab)}
            className={`w-full text-left px-4 py-2 rounded ${activeTab === tab ? 'bg-brand-green text-white' : 'hover:bg-brand-gray-100'}`}
        >
            {children}
        </button>
    );

    return (
        <div className="bg-brand-gray-100">
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold text-brand-gray-600 mb-2">My Account</h1>
                <p className="text-brand-gray-400 mb-8">Home / My Account</p>

                <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-1/4">
                        <div className="bg-white shadow rounded p-4 space-y-2">
                            <TabButton tab="dashboard">Dashboard</TabButton>
                            <TabButton tab="orders">Orders</TabButton>
                            <TabButton tab="wishlist">Wishlist</TabButton>
                            <TabButton tab="addresses">Addresses</TabButton>
                            <TabButton tab="details">Account Details</TabButton>
                            <button
                                onClick={logout}
                                className="w-full text-left px-4 py-2 rounded hover:bg-brand-gray-100"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                    <div className="w-full md:w-3/4">
                        <div className="bg-white shadow rounded p-6">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>
            {reviewingItem && (
                <LeaveReviewForm 
                    product={reviewingItem}
                    onClose={() => setReviewingItem(null)}
                />
            )}
        </div>
    );
};

export default AccountPage;
