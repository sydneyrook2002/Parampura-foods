import React from 'react';
import { useCart } from '../contexts/CartContext';
import { productCategories } from '../services/api';
import ProductCard from './ProductCard';

const CategoryPage: React.FC = () => {
    const { activeCategoryId, products, setPage, viewProduct } = useCart();

    if (!activeCategoryId) {
        // Fallback if no category is selected, though the app flow should prevent this.
        setPage('home');
        return null;
    }

    const currentCategory = productCategories.find(cat => cat.id === activeCategoryId);
    const categoryProducts = products.filter(prod => prod.categoryId === activeCategoryId);

    return (
        <div className="bg-brand-gray-100">
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold text-brand-gray-600 mb-2">
                    {currentCategory ? currentCategory.name : 'Shop'}
                </h1>
                <p className="text-brand-gray-400 mb-8">
                    <button onClick={() => setPage('home')} className="hover:text-brand-green">Home</button> / Shop / {currentCategory?.name}
                </p>

                {categoryProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {categoryProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-bold text-brand-gray-500">No Products Found</h2>
                        <p className="text-brand-gray-500 mt-2">There are currently no products available in this category.</p>
                        <button 
                            onClick={() => setPage('home')}
                            className="mt-8 bg-brand-green text-white font-bold py-3 px-8 rounded hover:bg-brand-green-dark transition-colors"
                        >
                            Back to Home
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryPage;
