import React from 'react';
import { useApiCart } from '../../contexts/ApiCartContext';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ArrowLeft } from 'lucide-react';

const AdminAnalyticsPage: React.FC = () => {
    const { foods, categories, setPage } = useApiCart();

    // Calculate real analytics from API data
    const totalProducts = foods.length;
    const totalCategories = categories.length;
    const organicProducts = foods.filter(f => f.isOrganic).length;
    const availableProducts = foods.filter(f => f.isAvailable).length;
    const totalValue = foods.reduce((sum, f) => sum + (f.salePrice * f.stockQuantity), 0);
    const averagePrice = foods.length > 0 ? foods.reduce((sum, f) => sum + f.salePrice, 0) / foods.length : 0;

    // Compact stats for mobile
    const stats = [
        { title: 'Products', value: totalProducts, icon: '📦' },
        { title: 'Categories', value: totalCategories, icon: '📂' },
        { title: 'Organic', value: organicProducts, icon: '🌱' },
        { title: 'Available', value: availableProducts, icon: '✅' },
        { title: 'Value', value: `₹${totalValue.toFixed(0)}`, icon: '💰' },
        { title: 'Avg Price', value: `₹${averagePrice.toFixed(0)}`, icon: '📊' }
    ];

    // Category breakdown
    const categoryStats = categories.map(category => {
        const categoryProducts = foods.filter(f => f.categoryId === category.id);
        const percentage = totalProducts > 0 ? (categoryProducts.length / totalProducts * 100).toFixed(1) : '0';
        return {
            name: category.name,
            count: categoryProducts.length,
            percentage: `${percentage}%`
        };
    });

    // Top products by price
    const topProducts = foods
        .sort((a, b) => b.salePrice - a.salePrice)
        .slice(0, 3);

    return (
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-12 min-h-screen">
            {/* Mobile Back Button - Full Width */}
            <div className="lg:hidden mb-4">
                <Button 
                    variant="outline" 
                    onClick={() => setPage('adminDashboard')}
                    className="flex items-center gap-2 w-full"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Dashboard
                </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 lg:mb-8 gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Analytics</h1>
                    <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                        <Button variant="link" className="p-0 h-auto" onClick={() => setPage('adminDashboard')}>
                            Admin
                        </Button> / Analytics
                    </p>
                </div>
            </div>

            {/* Compact Stats Grid - 2x3 on mobile, 3x2 on larger screens */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6">
                {stats.map((stat, index) => (
                    <Card key={index} className="p-2 sm:p-3">
                        <CardContent className="p-0">
                            <div className="text-center">
                                <div className="text-lg sm:text-xl lg:text-2xl mb-1">{stat.icon}</div>
                                <p className="text-xs sm:text-sm font-bold">{stat.value}</p>
                                <p className="text-xs text-muted-foreground">{stat.title}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Single Row Layout for Mobile - Categories and Top Products */}
            <div className="space-y-4 sm:space-y-6">
                {/* Categories - Compact */}
                <Card>
                    <CardHeader className="pb-2 sm:pb-3">
                        <CardTitle className="text-base sm:text-lg">Categories ({totalCategories})</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
                            {categoryStats.map((category, index) => (
                                <div key={index} className="text-center p-2 bg-gray-50 rounded-lg">
                                    <p className="text-sm font-medium">{category.name}</p>
                                    <p className="text-xs text-muted-foreground">{category.count} ({category.percentage})</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Top Products - Compact */}
                <Card>
                    <CardHeader className="pb-2 sm:pb-3">
                        <CardTitle className="text-base sm:text-lg">Top Products</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="space-y-2">
                            {topProducts.map((food) => (
                                <div key={food.foodId} className="flex items-center gap-2 sm:gap-3 p-2 bg-gray-50 rounded-lg">
                                    <img 
                                        src={food.imageUrl} 
                                        alt={food.name}
                                        className="w-8 h-8 sm:w-10 sm:h-10 rounded object-cover"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs sm:text-sm font-medium truncate">{food.name}</p>
                                    </div>
                                    <p className="text-xs sm:text-sm font-bold text-green-600">₹{food.salePrice.toFixed(0)}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AdminAnalyticsPage;