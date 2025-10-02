import React from 'react';
import { useCart } from '../contexts/CartContext';
import ProductCard from './ProductCard';

const WishlistPage: React.FC = () => {
    const { wishlistItems, setPage } = useCart();

    return (
        <div className="bg-brand-gray-100 min-h-[50vh]">
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold text-brand-gray-600 mb-2">My Wishlist</h1>
                <p className="text-brand-gray-400 mb-8">
                    <button onClick={() => setPage('home')} className="hover:text-brand-green">Home</button> / My Wishlist
                </p>

                {wishlistItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {wishlistItems.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-bold text-brand-gray-500">Your Wishlist is Empty</h2>
                        <p className="text-brand-gray-500 mt-2">Looks like you haven't added anything to your wishlist yet.</p>
                        <button 
                            onClick={() => setPage('home')}
                            className="mt-8 bg-brand-green text-white font-bold py-3 px-8 rounded hover:bg-brand-green-dark transition-colors"
                        >
                            Return to Shop
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WishlistPage;
