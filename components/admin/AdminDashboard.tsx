import React from 'react';
import { useCart } from '../../contexts/CartContext';
import Icon from '../Icon';
import { Page } from '../../types';

const StatCard: React.FC<{ title: string; value: string | number; icon: string; }> = ({ title, value, icon }) => (
    <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
        <div className="bg-brand-green/10 p-3 rounded-full">
            <Icon name={icon} className="w-8 h-8 text-brand-green" />
        </div>
        <div>
            <p className="text-sm text-brand-gray-500">{title}</p>
            <p className="text-2xl font-bold text-brand-gray-600">{value}</p>
        </div>
    </div>
);

const NavCard: React.FC<{ title: string; description: string; icon: string; page: Page; onClick: (page: Page) => void; }> = ({ title, description, icon, page, onClick }) => (
    <div
        onClick={() => onClick(page)}
        className="bg-white p-6 rounded-lg shadow hover:shadow-lg hover:border-brand-green border-2 border-transparent transition-all cursor-pointer flex items-center gap-4"
    >
        <Icon name={icon} className="w-10 h-10 text-brand-green" />
        <div>
            <h2 className="text-xl font-bold text-brand-gray-600">{title}</h2>
            <p className="text-brand-gray-500">{description}</p>
        </div>
    </div>
);

const AdminDashboard: React.FC = () => {
    const { user, setPage, getAnalytics } = useCart();
    const monthlyStats = getAnalytics('month');

    return (
        <div className="bg-brand-gray-100">
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold text-brand-gray-600 mb-2">Admin Dashboard</h1>
                <p className="text-brand-gray-400 mb-8">Welcome, {user?.name}! Here's a snapshot of this month's activity.</p>
                
                {/* Current Month's Analytics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    <StatCard title="Monthly Revenue" value={`$${monthlyStats.revenue.toFixed(2)}`} icon="cart" />
                    <StatCard title="New Orders (Month)" value={monthlyStats.orderCount} icon="package" />
                    <StatCard title="New Customers (Month)" value={monthlyStats.newCustomerCount} icon="user" />
                </div>

                {/* Navigation Section */}
                <div>
                    <h2 className="text-2xl font-bold text-brand-gray-600 mb-6">Management Tools</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <NavCard title="Manage Products" description="Add, edit, or delete products" icon="edit" page="adminProducts" onClick={setPage} />
                        <NavCard title="Manage Users" description="View and manage user roles" icon="user" page="adminUsers" onClick={setPage} />
                        <NavCard title="Manage Orders" description="View and track all customer orders" icon="package" page="adminOrders" onClick={setPage} />
                        <NavCard title="Full Analytics" description="View detailed sales reports" icon="chart-bar" page="adminAnalytics" onClick={setPage} />
                        <NavCard title="Manage Reviews" description="View and respond to customer feedback" icon="star" page="adminReviews" onClick={setPage} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;