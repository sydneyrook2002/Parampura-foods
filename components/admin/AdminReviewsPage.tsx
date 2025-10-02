import React, { useState, useMemo } from 'react';
import { useCart } from '../../contexts/CartContext';
import { Product, Review } from '../../types';
import Icon from '../Icon';

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex items-center text-yellow-400">
        {[...Array(5)].map((_, i) => (
            <Icon key={i} name="star" className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300 fill-current'}`} />
        ))}
        <span className="ml-2 text-sm text-brand-gray-500">({rating.toFixed(1)})</span>
    </div>
);

const AdminReviewsPage: React.FC = () => {
    const { products, reviews, users, setPage } = useCart();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [sortOrder, setSortOrder] = useState<'highest' | 'lowest'>('highest');

    const productsWithReviews = useMemo(() => {
        return products.map(product => {
            const productReviews = reviews.filter(r => r.productId === product.id);
            const averageRating = productReviews.length > 0
                ? productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length
                : 0;
            return { ...product, reviewCount: productReviews.length, averageRating };
        }).sort((a, b) => b.averageRating - a.averageRating);
    }, [products, reviews]);

    const selectedProductReviews = useMemo(() => {
        if (!selectedProduct) return [];
        return reviews
            .filter(r => r.productId === selectedProduct.id)
            .sort((a, b) => sortOrder === 'highest' ? b.rating - a.rating : a.rating - b.rating);
    }, [selectedProduct, reviews, sortOrder]);

    const getCustomerEmail = (userId: number) => {
        return users.find(u => u.id === userId)?.email || '';
    };

    return (
        <div className="bg-brand-gray-100 min-h-screen">
            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-brand-gray-600">Manage Reviews</h1>
                        <p className="text-brand-gray-400">
                            <button onClick={() => setPage('adminDashboard')} className="text-brand-green hover:underline">Admin</button> / Manage Reviews
                        </p>
                    </div>
                     <button 
                        onClick={() => setPage('adminDashboard')}
                        className="bg-brand-gray-200 text-brand-gray-600 font-bold py-2 px-4 rounded hover:bg-brand-gray-300 transition-colors"
                    >
                        Back to Dashboard
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Products List */}
                    <div className="w-full lg:w-1/3">
                        <div className="bg-white shadow rounded p-4">
                            <h2 className="text-xl font-bold mb-4">Products by Rating</h2>
                            <ul className="space-y-2 max-h-[70vh] overflow-y-auto">
                                {productsWithReviews.map(p => (
                                    <li key={p.id}>
                                        <button 
                                            onClick={() => setSelectedProduct(p)}
                                            className={`w-full text-left p-3 rounded transition-colors ${selectedProduct?.id === p.id ? 'bg-brand-green/10' : 'hover:bg-brand-gray-100'}`}
                                        >
                                            <p className="font-semibold">{p.name}</p>
                                            <div className="flex justify-between items-center text-sm">
                                                <StarRating rating={p.averageRating} />
                                                <span>{p.reviewCount} reviews</span>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Reviews for Selected Product */}
                    <div className="w-full lg:w-2/3">
                         <div className="bg-white shadow rounded p-6">
                            {!selectedProduct ? (
                                <div className="text-center py-20">
                                    <Icon name="star" className="w-16 h-16 mx-auto text-brand-gray-300" />
                                    <h3 className="text-xl font-bold text-brand-gray-500 mt-4">Select a product</h3>
                                    <p className="text-brand-gray-400">Choose a product from the list to see its reviews.</p>
                                </div>
                            ) : (
                                <div>
                                    <div className="flex flex-wrap justify-between items-center gap-4 mb-4 border-b pb-4">
                                        <h2 className="text-2xl font-bold text-brand-gray-600">Reviews for {selectedProduct.name}</h2>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm">Sort by:</span>
                                            <select value={sortOrder} onChange={e => setSortOrder(e.target.value as 'highest' | 'lowest')} className="border border-brand-gray-300 rounded p-1 text-sm">
                                                <option value="highest">Highest First</option>
                                                <option value="lowest">Lowest First</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    {selectedProductReviews.length > 0 ? (
                                        <ul className="space-y-4">
                                            {selectedProductReviews.map(review => (
                                                <li key={review.id} className="border p-4 rounded-lg bg-brand-gray-100/50">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <p className="font-bold">{review.userName}</p>
                                                            <p className="text-xs text-brand-gray-400 mb-2">{review.date.toLocaleDateString()}</p>
                                                            <StarRating rating={review.rating} />
                                                        </div>
                                                        <a 
                                                            href={`mailto:${getCustomerEmail(review.userId)}?subject=Regarding your review on ${selectedProduct.name}`}
                                                            className="text-sm font-bold py-1 px-3 rounded bg-blue-500 text-white hover:bg-blue-600"
                                                        >
                                                            Respond via Email
                                                        </a>
                                                    </div>
                                                    <p className="mt-2 text-brand-gray-600 italic">"{review.comment}"</p>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-center py-10 text-brand-gray-500">No reviews for this product yet.</p>
                                    )}
                                </div>
                            )}
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminReviewsPage;