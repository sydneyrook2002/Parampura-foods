import { Star, Heart, ShoppingCart, Leaf, Sparkles, Filter, Grid, List } from 'lucide-react';
import { useApiCart } from '../contexts/ApiCartContext';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { useState } from 'react';

const CategoryPage = () => {
  const { selectedCategory, viewProduct, addToCart, foods, categories, loading } = useApiCart();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating'>('name');

  const filteredProducts = selectedCategory
    ? foods.filter((p) => p.categoryId.toString() === selectedCategory)
    : foods;

  const categoryName = selectedCategory 
    ? categories.find(c => c.categoryId.toString() === selectedCategory)?.name || 'Category'
    : 'All Products';

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return (a.salePrice || a.mrp) - (b.salePrice || b.mrp);
      case 'rating':
        return b.rating - a.rating;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  // Generate unique animation classes with more variety
  const getAnimationClass = (index: number) => {
    const animations = [
      'animate-fade-in-up', 'animate-fade-in-down', 'animate-fade-in-left', 'animate-fade-in-right',
      'animate-scale-in', 'animate-rotate-in', 'animate-slide-in-up', 'animate-slide-in-down',
      'animate-bounce-in', 'animate-flip-in', 'animate-zoom-in', 'animate-slide-in-left'
    ];
    return animations[index % animations.length];
  };

  // Generate unique hover effect classes
  const getHoverEffectClass = (index: number) => {
    const hoverEffects = [
      'card-hover-spin', 'card-hover-flip', 'card-hover-bounce', 'card-hover-wiggle', 'card-hover-glow'
    ];
    return hoverEffects[index % hoverEffects.length];
  };

  return (
    <div className="min-h-screen bg-gradient-modern">
      {/* Hero Section - Fully Responsive */}
      <section className="responsive-spacing bg-gradient-to-br from-slate-900 via-gray-900 to-black overflow-hidden">
        {/* Subtle Background Elements - Responsive */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse-gentle"></div>
          <div className="absolute bottom-20 right-20 w-40 sm:w-56 md:w-80 h-40 sm:h-56 md:h-80 bg-emerald-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        </div>
        
        <div className="responsive-container relative z-10">
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-block mb-3 sm:mb-4">
              <span className="bg-green-500/20 text-green-400 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs font-medium uppercase tracking-wider">
                {selectedCategory ? 'Category' : 'All Products'}
              </span>
            </div>
            <h1 className="hero-title font-bold mb-3 sm:mb-4 text-white">
              {categoryName}
            </h1>
            <p className="hero-description text-gray-300 max-w-xl mx-auto">
              {filteredProducts.length} premium products available
            </p>
          </div>

          {/* Simplified Controls - Responsive */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-3 bg-white/5 backdrop-blur-sm rounded-2xl p-2 sm:p-3">
              <Filter className="h-3 w-3 sm:h-4 sm:w-4 text-white/70" />
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-white border-none outline-none text-xs sm:text-sm font-medium"
              >
                <option value="name" className="bg-gray-800">Sort by Name</option>
                <option value="price" className="bg-gray-800">Sort by Price</option>
                <option value="rating" className="bg-gray-800">Sort by Rating</option>
              </select>
            </div>
            
            <div className="flex items-center gap-1 bg-white/5 backdrop-blur-sm rounded-2xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-xl transition-all duration-300 ${viewMode === 'grid' ? 'bg-green-500 text-white shadow-lg' : 'text-white/70 hover:bg-white/10'}`}
              >
                <Grid className="h-3 w-3 sm:h-4 sm:w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-xl transition-all duration-300 ${viewMode === 'list' ? 'bg-green-500 text-white shadow-lg' : 'text-white/70 hover:bg-white/10'}`}
              >
                <List className="h-3 w-3 sm:h-4 sm:w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section - Fully Responsive */}
      <section className="responsive-spacing bg-gradient-to-br from-gray-50 to-white">
        <div className="responsive-container">
          {loading ? (
            <div className="responsive-grid">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="bg-white rounded-3xl shadow-sm border border-gray-100 animate-pulse">
                  <div className="responsive-image bg-gray-200 rounded-t-3xl"></div>
                  <div className="responsive-card">
                    <div className="h-4 bg-gray-200 rounded mb-3"></div>
                    <div className="h-3 bg-gray-200 rounded mb-4 w-2/3"></div>
                    <div className="h-10 bg-gray-200 rounded-2xl"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={`${viewMode === 'list' ? 'grid grid-cols-1 gap-6' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'}`}>
              {sortedProducts.map((product, index) => (
                <div
                  key={product.foodId}
                  className={`bg-white rounded-3xl shadow-sm border border-gray-100 group ${getAnimationClass(index)} ${getHoverEffectClass(index)} ${viewMode === 'list' ? 'flex flex-row overflow-hidden h-48' : 'flex flex-col h-96'} transition-all duration-300 transform hover:rotate-1 hover:scale-105`}
                  style={{ 
                    animationDelay: `${index * 0.05}s`,
                    transform: `rotate(${(index % 4) * 0.5 - 0.75}deg)`
                  }}
                >
                  {/* Image Section - Enhanced Hover Effects with Fixed Height */}
                  <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-32 sm:w-40 md:w-48 h-32 sm:h-40 md:h-48 flex-shrink-0' : 'h-48'} ${viewMode === 'grid' ? 'rounded-t-3xl' : 'rounded-l-3xl'} group-hover:shadow-lg transition-all duration-700`}>
                    <div
                      className="cursor-pointer h-full relative"
                      onClick={() => viewProduct(product.foodId)}
                    >
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-2 transition-all duration-700 ease-out"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:from-green-100 group-hover:to-green-200 transition-all duration-700">
                          <span className="text-gray-500 text-xs sm:text-sm font-medium group-hover:text-green-600 transition-colors duration-700 px-2 text-center">{product.name}</span>
                        </div>
                      )}
                      {/* Hover Overlay Effect */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    </div>
                    
                    {/* Enhanced Badges with Hover Effects */}
                    <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex flex-col gap-1 sm:gap-2">
                      {product.isOnSale && (
                        <div className="bg-red-500 text-white px-1 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-semibold shadow-lg group-hover:scale-110 group-hover:rotate-3 group-hover:bg-red-600 transition-all duration-500">
                          {product.discountPercentage}% OFF
                        </div>
                      )}
                      {product.isOrganic && !product.isOnSale && (
                        <div className="bg-green-500 text-white px-1 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-green-600 transition-all duration-500">
                          <Leaf className="h-2 w-2 sm:h-3 sm:w-3 group-hover:rotate-12 transition-transform duration-500" />
                          Organic
                        </div>
                      )}
                    </div>

                    {/* Rating - Enhanced with Hover Effects */}
                    <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 bg-white/90 backdrop-blur-sm px-1 sm:px-2 py-0.5 sm:py-1 rounded-full flex items-center space-x-1 group-hover:scale-110 group-hover:bg-yellow-50 group-hover:border group-hover:border-yellow-200 transition-all duration-500">
                      <Star className="h-2 w-2 sm:h-3 sm:w-3 fill-yellow-400 text-yellow-400 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500" />
                      <span className="text-xs font-medium group-hover:text-yellow-600 transition-colors duration-500">{product.rating}</span>
                    </div>
                  </div>
                  
                  {/* Content Section - Enhanced with Hover Effects and Fixed Layout */}
                  <div className={`responsive-card flex flex-col flex-grow ${viewMode === 'list' ? 'justify-center' : ''} group-hover:bg-gradient-to-br group-hover:from-transparent group-hover:to-green-50/30 transition-all duration-700 min-h-0`}>
                    <div className="mb-1 sm:mb-2">
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-medium group-hover:text-green-500 transition-colors duration-500">
                        {categories.find(c => c.categoryId === product.categoryId)?.name || 'Food'}
                      </p>
                    </div>
                    
                    <h3 className="font-bold text-gray-800 group-hover:text-green-600 transition-colors mb-1 sm:mb-2 line-clamp-2 text-base sm:text-lg group-hover:scale-105 transform transition-all duration-500 h-10 sm:h-12 overflow-hidden">
                      <span 
                        className="cursor-pointer"
                        onClick={() => viewProduct(product.foodId)}
                      >
                        {product.name}
                      </span>
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2 leading-relaxed group-hover:text-gray-700 transition-colors duration-500 h-8 sm:h-10 overflow-hidden flex-grow">
                      {product.description}
                    </p>

                    <div className="flex justify-between items-end mt-auto pt-2">
                      <div className="flex flex-col group-hover:scale-105 transition-transform duration-500 min-w-0 flex-1">
                        {product.isOnSale ? (
                          <>
                            <div className="flex items-center gap-1 sm:gap-2">
                              <span className="text-green-600 font-bold text-sm sm:text-lg group-hover:text-green-700 transition-colors duration-500">
                                ₹{product.salePrice?.toFixed(2)}
                              </span>
                              <span className="text-xs sm:text-sm text-gray-400 line-through group-hover:text-gray-500 transition-colors duration-500">
                                ₹{product.mrp.toFixed(2)}
                              </span>
                            </div>
                            <span className="text-xs text-green-600 font-medium group-hover:text-green-700 transition-colors duration-500">
                              Save ₹{product.savings.toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span className="text-green-600 font-bold text-sm sm:text-lg group-hover:text-green-700 transition-colors duration-500">
                            ₹{product.mrp.toFixed(2)}
                          </span>
                        )}
                      </div>
                      
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        disabled={!product.isAvailable || product.stockQuantity === 0}
                        className="responsive-button bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-2xl transition-all duration-500 flex items-center gap-1 sm:gap-2 hover:shadow-xl hover:scale-110 hover:rotate-1 group-hover:animate-pulse flex-shrink-0 ml-2"
                      >
                        <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 group-hover:rotate-12 transition-transform duration-500" />
                        <span className="hidden sm:inline">{product.isAvailable && product.stockQuantity > 0 ? 'Add' : 'Out of Stock'}</span>
                        <span className="sm:hidden">{product.isAvailable && product.stockQuantity > 0 ? '+' : 'X'}</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
