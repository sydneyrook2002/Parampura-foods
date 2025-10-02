import React from 'react';
import { useCart } from '../contexts/CartContext';
import ProductCard from './ProductCard';

const SearchResultsPage: React.FC = () => {
  const { searchQuery, searchResults, setPage } = useCart();

  return (
    <div className="bg-brand-gray-100 min-h-[50vh]">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-brand-gray-600 mb-2">
          Search Results for "{searchQuery}"
        </h1>
        <p className="text-brand-gray-400 mb-8">
          Found {searchResults.length} {searchResults.length === 1 ? 'product' : 'products'}.
        </p>

        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {searchResults.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-brand-gray-500">No Products Found</h2>
            <p className="text-brand-gray-500 mt-2">Sorry, we couldn't find any products matching your search. Please try a different keyword.</p>
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

export default SearchResultsPage;