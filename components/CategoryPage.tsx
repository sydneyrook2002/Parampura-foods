import { Star, Heart, ShoppingCart, Leaf, Sparkles, Filter } from 'lucide-react';
import { useApiCart } from '../contexts/ApiCartContext';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { useState } from 'react';

const CategoryPage = () => {
  const { selectedCategory, viewProduct, addToCart, foods, categories, loading } = useApiCart();
  // Removed viewMode state - only grid view for laptop screens
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Professional Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-4 sm:mb-6">
              <span className="bg-white/20 backdrop-blur-sm text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm font-semibold uppercase tracking-wider border border-white/30">
                {selectedCategory ? 'Category' : 'All Products'}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              {categoryName}
            </h1>
            <p className="text-lg sm:text-xl text-green-100 max-w-2xl mx-auto leading-relaxed">
              {filteredProducts.length} premium organic products carefully selected for your health and wellness
            </p>
          </div>
        </div>
      </section>

      {/* Professional Controls Section */}
      <section className="bg-white border-b border-gray-200 py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
            {/* Results Count */}
            <div className="text-gray-600">
              <span className="font-semibold text-lg">{filteredProducts.length}</span> products found
            </div>
            
            {/* Controls */}
            <div className="flex items-center gap-4">
              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-gray-700 border-none outline-none text-sm font-medium cursor-pointer"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price">Sort by Price</option>
                  <option value="rating">Sort by Rating</option>
                </select>
              </div>
              
              {/* View mode toggle removed - only grid view for laptop screens */}
            </div>
          </div>
        </div>
      </section>

      {/* Professional Products Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
              {[...Array(10)].map((_, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 animate-pulse overflow-hidden">
                  <div className="h-40 sm:h-48 bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2 w-2/3"></div>
                    <div className="h-3 bg-gray-200 rounded mb-3 w-full"></div>
                    <div className="h-8 bg-gray-200 rounded-lg"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
              {sortedProducts.map((product, index) => (
                <div
                  key={product.foodId}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-auto"
                >
                  {/* Professional Image Section - Optimized for laptop */}
                  <div className="relative overflow-hidden h-40 sm:h-44 lg:h-48 rounded-t-2xl">
                    <div
                      className="cursor-pointer h-full relative"
                      onClick={() => viewProduct(product.foodId)}
                    >
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
                          <span className="text-green-600 text-sm font-medium text-center px-2">{product.name}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Professional Badges */}
                    <div className="absolute top-2 right-2 flex flex-col gap-1">
                      {product.isOnSale && (
                        <div className="bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg">
                          {product.discountPercentage}% OFF
                        </div>
                      )}
                      {product.isOrganic && !product.isOnSale && (
                        <div className="bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg flex items-center gap-1">
                          <Leaf className="h-3 w-3" />
                          <span>Organic</span>
                        </div>
                      )}
                    </div>

                    {/* Professional Rating */}
                    <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center space-x-1 shadow-md">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-semibold text-gray-700">{product.rating}</span>
                    </div>
                  </div>
                  
                  {/* Professional Content Section - Enhanced with descriptions */}
                  <div className="p-3 sm:p-4 flex flex-col flex-grow">
                    {/* Product Name */}
                    <h3 className="font-bold text-gray-800 mb-1 line-clamp-1 text-sm sm:text-base cursor-pointer hover:text-green-600 transition-colors duration-200" onClick={() => viewProduct(product.foodId)}>
                      {product.name}
                    </h3>
                    
                    {/* Category */}
                    <p className="text-green-600 text-xs font-medium mb-2">
                      {categories.find(c => c.categoryId === product.categoryId)?.name || 'Food'}
                    </p>

                    {/* Product Description */}
                    <p className="text-gray-600 text-xs line-clamp-2 mb-3 leading-relaxed">
                      {product.description || `${product.name} - Fresh, organic, and carefully selected for quality and taste. Perfect for your healthy lifestyle.`}
                    </p>

                    {/* Price and Add to Cart */}
                    <div className="flex justify-between items-center mt-auto">
                      <div className="min-w-0 flex-1">
                        {product.isOnSale ? (
                          <div className="flex items-center gap-1">
                            <span className="text-green-600 font-bold text-sm sm:text-base">
                              ₹{product.salePrice?.toFixed(2)}
                            </span>
                            <span className="text-xs text-gray-400 line-through">
                              ₹{product.mrp.toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-green-600 font-bold text-sm sm:text-base">
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
                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center h-8 w-8 p-0 flex-shrink-0 shadow-md hover:shadow-lg hover:scale-105"
                      >
                        <ShoppingCart className="h-4 w-4" />
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

