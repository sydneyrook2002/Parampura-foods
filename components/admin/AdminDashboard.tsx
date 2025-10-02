import React, { useState, useEffect } from 'react';
import { useApiCart } from '../../contexts/ApiCartContext';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { apiClient, DashboardStatsDto } from '../../services/apiClient';

const StatCard: React.FC<{ title: string; value: string | number; icon: string; }> = ({ title, value, icon }) => (
    <Card>
        <CardContent className="p-6">
            <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                    <span className="text-2xl">{icon}</span>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">{title}</p>
                    <p className="text-2xl font-bold">{value}</p>
                </div>
            </div>
        </CardContent>
    </Card>
);

const NavCard: React.FC<{ title: string; description: string; icon: string; page: string; onClick: (page: string) => void; }> = ({ title, description, icon, page, onClick }) => (
    <Card 
        className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-primary"
        onClick={() => onClick(page)}
    >
        <CardContent className="p-6">
            <div className="flex items-center gap-4">
                <div className="text-3xl">{icon}</div>
                <div>
                    <h2 className="text-xl font-bold">{title}</h2>
                    <p className="text-muted-foreground">{description}</p>
                </div>
            </div>
        </CardContent>
    </Card>
);

const AdminDashboard: React.FC = () => {
    const { user, setPage, logout } = useApiCart();
    const [stats, setStats] = useState<DashboardStatsDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadDashboardStats();
    }, []);

    const loadDashboardStats = async () => {
        try {
            setLoading(true);
            setError(null);
            const dashboardStats = await apiClient.getDashboardStats();
            setStats(dashboardStats);
        } catch (err) {
            console.error('Error loading dashboard stats:', err);
            setError('Failed to load dashboard statistics');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 min-h-screen">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
                <p className="text-muted-foreground">Welcome, {user?.fullName}! Manage your store from here.</p>
            </div>
            
            {/* Dashboard Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {loading ? (
                    <>
                        <StatCard title="Loading..." value="..." icon="⏳" />
                        <StatCard title="Loading..." value="..." icon="⏳" />
                        <StatCard title="Loading..." value="..." icon="⏳" />
                        <StatCard title="Loading..." value="..." icon="⏳" />
                    </>
                ) : error ? (
                    <div className="col-span-full">
                        <Card>
                            <CardContent className="p-6 text-center">
                                <p className="text-red-500 mb-4">{error}</p>
                                <Button onClick={loadDashboardStats} variant="outline">
                                    Retry
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                ) : stats ? (
                    <>
                        <StatCard title="Total Products" value={stats.totalProducts} icon="📦" />
                        <StatCard title="Total Categories" value={stats.totalCategories} icon="📂" />
                        <StatCard title="Active Users" value={stats.totalUsers} icon="👤" />
                        <StatCard title="Total Orders" value={stats.totalOrders} icon="📋" />
                        <StatCard title="Total Revenue" value={`₹${stats.totalRevenue.toFixed(2)}`} icon="💰" />
                        <StatCard title="Pending Orders" value={stats.pendingOrders} icon="⏰" />
                        <StatCard title="Low Stock Items" value={stats.lowStockProducts} icon="⚠️" />
                        <StatCard title="Organic Products" value={stats.organicProducts} icon="🌱" />
                    </>
                ) : null}
            </div>

            {/* Navigation Section */}
            <div>
                <h2 className="text-2xl font-bold mb-6">Management Tools</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <NavCard title="Manage Products" description="Add, edit, or delete products" icon="🛍️" page="adminProducts" onClick={setPage} />
                    <NavCard title="Manage Categories" description="Organize products into categories" icon="📂" page="adminCategories" onClick={setPage} />
                    <NavCard title="Manage Users" description="View and manage user roles" icon="👥" page="adminUsers" onClick={setPage} />
                    <NavCard title="Manage Orders" description="View and track all customer orders" icon="📋" page="adminOrders" onClick={setPage} />
                    <NavCard title="Analytics" description="View detailed sales reports" icon="📊" page="adminAnalytics" onClick={setPage} />
                    <NavCard title="Manage Reviews" description="View and respond to customer feedback" icon="⭐" page="adminReviews" onClick={setPage} />
                </div>
            </div>
            
            <div className="mt-8 flex gap-4">
                <Button 
                    variant="outline" 
                    onClick={() => setPage('home')}
                >
                    Back to Store
                </Button>
                <Button 
                    variant="destructive" 
                    onClick={logout}
                >
                    Logout
                </Button>
            </div>
        </div>
    );
};

export default AdminDashboard;