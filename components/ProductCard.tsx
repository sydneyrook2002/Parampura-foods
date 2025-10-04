import React from 'react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import Icon from './Icon';
import { productCategories } from '../services/api';

interface ProductCardProps {
  product: Product;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < rating ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  );
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, updateQuantity, getCartItemQuantity, viewProduct, isInWishlist, addToWishlist, removeFromWishlist } = useCart();
  const quantity = getCartItemQuantity(product.id);
  const isFavorite = isInWishlist(product.id);
  const categoryName = productCategories.find(c => c.id === product.categoryId)?.name || 'Food';
  
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

  // Use product ID to generate consistent animations
  const animationClass = getAnimationClass(product.id);
  const hoverEffectClass = getHoverEffectClass(product.id);

  const handleViewProduct = (e: React.MouseEvent) => {
    e.preventDefault();
    viewProduct(product.id);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className={`bg-white rounded-3xl shadow-sm border border-gray-100 group ${animationClass} ${hoverEffectClass} flex flex-col h-full transform hover:rotate-1 hover:scale-105 transition-all duration-300`}
         style={{ 
           animationDelay: `${(product.id % 10) * 0.05}s`,
           transform: `rotate(${(product.id % 4) * 0.5 - 0.75}deg)`
         }}>
      
      {/* Image Section - Enhanced Hover Effects */}
      <div className="relative overflow-hidden h-56 rounded-t-3xl group-hover:shadow-lg transition-all duration-700">
        <a href="#" onClick={handleViewProduct} className="block h-full">
          <img 
            src={product.imageUrls[0]} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700"
          />
        </a>
        
        {/* Favorite Button */}
        <button 
          onClick={toggleFavorite}
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-300"
          aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
        >
          <svg 
            className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500 animate-pulse-gentle' : 'text-gray-500'}`} 
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col items-start gap-2">
          {product.isSale && (
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse-gentle">
              Sale
            </span>
          )}
          {product.isNew && (
            <span className="bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              New
            </span>
          )}
        </div>

        {/* Calories for food items */}
        {product.nutrition?.calories && (
          <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-full">
            {product.nutrition.calories} cal
          </div>
        )}
      </div>
      
      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">{categoryName}</p>
          <StarRating rating={product.rating} />
        </div>
        
        <h3 className="font-bold text-gray-800 group-hover:text-green-600 transition-colors mb-3 line-clamp-2 h-12 text-lg">
          <a href="#" onClick={handleViewProduct}>{product.name}</a>
        </h3>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow leading-relaxed">
          {product.description || 'Delicious food item prepared with fresh ingredients.'}
        </p>

        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-green-600 font-bold text-xl">${product.price.toFixed(2)}</span>
            {product.isSale && product.oldPrice && (
              <span className="text-gray-400 line-through text-sm">${product.oldPrice.toFixed(2)}</span>
            )}
          </div>
          
          {/* Add to cart or quantity controls */}
          {quantity === 0 ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="bg-gradient-green hover:shadow-lg text-white font-semibold py-2.5 px-5 rounded-xl transition-all duration-300 flex items-center gap-2 transform hover:scale-105"
            >
              <Icon name="cart" className="w-4 h-4" />
              Add
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-green-50 rounded-xl p-1.5">
              <button 
                onClick={() => updateQuantity(product.id, quantity - 1)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-green-100 text-green-700 font-bold transition-colors duration-200"
              >
                <Icon name="minus" className="w-4 h-4" />
              </button>
              <span className="font-bold text-green-800 w-6 text-center">{quantity}</span>
              <button 
                onClick={() => updateQuantity(product.id, quantity + 1)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-green-100 text-green-700 font-bold transition-colors duration-200"
              >
                <Icon name="plus" className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
