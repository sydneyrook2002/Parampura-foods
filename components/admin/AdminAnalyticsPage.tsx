import React from 'react';
import { useApiCart } from '../../contexts/ApiCartContext';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const AdminAnalyticsPage: React.FC = () => {
    const { foods, categories, setPage } = useApiCart();

    // Calculate some basic analytics
    const totalProducts = foods.length;
    const totalCategories = categories.length;
    const organicProducts = foods.filter(f => f.isOrganic).length;
    const availableProducts = foods.filter(f => f.isAvailable).length;
    const totalValue = foods.reduce((sum, f) => sum + (f.price * f.stockQuantity), 0);

    const stats = [
        { title: 'Total Products', value: totalProducts, icon: '📦' },
        { title: 'Total Categories', value: totalCategories, icon: '📂' },
        { title: 'Organic Products', value: organicProducts, icon: '🌱' },
        { title: 'Available Products', value: availableProducts, icon: '✅' },
        { title: 'Inventory Value', value: `₹${totalValue.toFixed(2)}`, icon: '💰' },
        { title: 'Average Price', value: `₹${(foods.reduce((sum, f) => sum + f.price, 0) / foods.length || 0).toFixed(2)}`, icon: '📊' }
    ];

    return (
        <div className="container mx-auto px-4 py-12 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Analytics</h1>
                    <p className="text-muted-foreground">
                        <Button variant="link" className="p-0 h-auto" onClick={() => setPage('adminDashboard')}>
                            Admin
                        </Button> / Analytics
                    </p>
                </div>
                <Button variant="outline" onClick={() => setPage('adminDashboard')}>
                    Back to Dashboard
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <Card key={index}>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="text-3xl">{stat.icon}</div>
                                <div>
                                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                                    <p className="text-2xl font-bold">{stat.value}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Products by Category</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {categories.map(category => {
                                const categoryProducts = foods.filter(f => f.categoryId === category.categoryId);
                                const percentage = (categoryProducts.length / totalProducts) * 100;
                                
                                return (
                                    <div key={category.categoryId} className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="font-medium">{category.name}</span>
                                            <span className="text-sm text-muted-foreground">
                                                {categoryProducts.length} products ({percentage.toFixed(1)}%)
                                            </span>
                                        </div>
                                        <div className="w-full bg-muted rounded-full h-2">
                                            <div 
                                                className="bg-primary h-2 rounded-full" 
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Top Products by Price</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {foods
                                .sort((a, b) => b.price - a.price)
                                .slice(0, 5)
                                .map(product => (
                                    <div key={product.foodId} className="flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            {product.imageUrl ? (
                                                <img 
                                                    src={product.imageUrl} 
                                                    alt={product.name}
                                                    className="w-8 h-8 rounded object-cover"
                                                />
                                            ) : (
                                                <div className="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-400 rounded flex items-center justify-center">
                                                    <span className="text-gray-600 text-xs font-medium">{product.name.charAt(0)}</span>
                                                </div>
                                            )}
                                            <span className="font-medium">{product.name}</span>
                                        </div>
                                        <span className="font-bold">₹{product.price.toFixed(2)}</span>
                                    </div>
                                ))
                            }
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AdminAnalyticsPage;