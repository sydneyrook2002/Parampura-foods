import React, { useState, useMemo } from 'react';
import { useCart, AnalyticsData } from '../../contexts/CartContext';
import Icon from '../Icon';

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

const SalesChart: React.FC<{ data: { label: string; sales: number }[] }> = ({ data }) => {
    const maxValue = Math.max(...data.map(d => d.sales));
    if (maxValue === 0) {
        return <div className="text-center p-10 bg-brand-gray-100 rounded">No sales data for this period.</div>;
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold text-brand-gray-600 mb-4">Sales Overview</h3>
            <div className="flex justify-around items-end h-64 border-l border-b border-brand-gray-200">
                {data.map(({ label, sales }) => (
                    <div key={label} className="flex flex-col items-center flex-1">
                        <div
                            className="w-1/2 bg-brand-green hover:bg-brand-green-dark rounded-t"
                            style={{ height: `${(sales / maxValue) * 100}%` }}
                            title={`$${sales.toFixed(2)}`}
                        ></div>
                        <span className="text-xs text-brand-gray-500 mt-2">{label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const AdminAnalyticsPage: React.FC = () => {
    const { setPage, getAnalytics } = useCart();
    const [period, setPeriod] = useState<'month' | 'year' | 'all'>('month');

    const analyticsData: AnalyticsData = useMemo(() => getAnalytics(period), [getAnalytics, period]);

    const periodTitle = {
        month: 'This Month',
        year: 'This Year',
        all: 'All Time'
    };

    return (
        <div className="bg-brand-gray-100 min-h-screen">
            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-brand-gray-600">Full Analytics</h1>
                        <p className="text-brand-gray-400">
                            <button onClick={() => setPage('adminDashboard')} className="text-brand-green hover:underline">Admin</button> / Analytics
                        </p>
                    </div>
                    <button 
                        onClick={() => setPage('adminDashboard')}
                        className="bg-brand-gray-200 text-brand-gray-600 font-bold py-2 px-4 rounded hover:bg-brand-gray-300 transition-colors"
                    >
                        Back to Dashboard
                    </button>
                </div>
                
                {/* Period Filter */}
                <div className="mb-8 flex justify-center bg-white p-2 rounded-lg shadow w-fit mx-auto">
                    {(['month', 'year', 'all'] as const).map(p => (
                        <button
                            key={p}
                            onClick={() => setPeriod(p)}
                            className={`px-6 py-2 rounded-md font-semibold transition-colors ${period === p ? 'bg-brand-green text-white shadow' : 'text-brand-gray-500 hover:bg-brand-gray-100'}`}
                        >
                            {periodTitle[p]}
                        </button>
                    ))}
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <StatCard title={`Revenue (${periodTitle[period]})`} value={`$${analyticsData.revenue.toFixed(2)}`} icon="cart" />
                    <StatCard title={`Orders (${periodTitle[period]})`} value={analyticsData.orderCount} icon="package" />
                    <StatCard title={`New Customers (${periodTitle[period]})`} value={analyticsData.newCustomerCount} icon="user" />
                </div>

                {/* Charts and Lists */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        {period === 'year' && analyticsData.salesByPeriod ? (
                           <SalesChart data={analyticsData.salesByPeriod} />
                        ) : (
                           <div className="h-full flex items-center justify-center bg-white p-6 rounded-lg shadow text-brand-gray-500">
                                {period === 'month' ? 'Daily chart coming soon!' : 'Sales chart available for yearly view.'}
                           </div>
                        )}
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-xl font-bold text-brand-gray-600 mb-4">Top Selling Products</h3>
                        {analyticsData.topSellingProducts.length > 0 ? (
                            <ul className="space-y-4">
                                {analyticsData.topSellingProducts.map(({ product, quantity }) => (
                                    <li key={product.id} className="flex items-center gap-4">
                                        <img src={product.imageUrls[0]} alt={product.name} className="w-12 h-12 object-cover rounded" />
                                        <div className="flex-1">
                                            <p className="font-semibold">{product.name}</p>
                                            <p className="text-sm text-brand-gray-500">{quantity} units sold</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-brand-gray-500">No products sold in this period.</p>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminAnalyticsPage;