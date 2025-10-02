import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { productCategories } from '../services/api';
import ProductCard from './ProductCard';

const ProductDetailPage = () => {
  const { 
    products, 
    reviews, 
    activeProductId, 
    setPage, 
    addToCart, 
    getCartItemQuantity, 
    updateQuantity,
    addReview,
    user,
    viewCategory
  } = useCart();
  
  const product = products.find(p => p.id === activeProductId);
  const productReviews = reviews.filter(r => r.productId === product?.id);
  const relatedProducts = product ? products.filter(p => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 3) : [];
  
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: ''
  });

  useEffect(() => {
    if (!product) {
      setPage('home');
    } else {
      setSelectedImage(0); // Reset image on product change
      const cartQty = getCartItemQuantity(product.id);
      setQuantity(cartQty > 0 ? cartQty : 1);
    }
  }, [product, setPage, getCartItemQuantity]);

  const handleAddReview = () => {
    if (!user) {
      alert('Please login to add a review');
      setPage('account');
      return;
    }
    
    if (!reviewForm.comment.trim()) {
      alert('Please add a comment to your review');
      return;
    }
    
    addReview(product.id, reviewForm.rating, reviewForm.comment);
    setReviewForm({ rating: 5, comment: '' });
    setActiveTab('reviews');
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-lg text-gray-600">Product not found</p>
          <button 
            onClick={() => setPage('home')}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  // FIX: Made reviewCount optional by providing a default value to fix typing errors where the prop was not provided.
  const StarRating = ({ rating, reviewCount = undefined, isLarge = false, editable = false, onRatingChange = null }: { rating: any; reviewCount?: any; isLarge?: boolean; editable?: boolean; onRatingChange?: any; }) => {
    const size = isLarge ? 'w-6 h-6' : 'w-5 h-5';
    return (
      <div className="flex items-center">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <svg 
              key={i} 
              className={`${size} ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'} ${editable ? 'cursor-pointer' : ''}`} 
              viewBox="0 0 20 20"
              onClick={() => editable && onRatingChange && onRatingChange(i + 1)}
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
          ))}
        </div>
        <span className="ml-2 text-gray-600">{rating.toFixed(1)}</span>
        {reviewCount !== undefined && <span className="ml-2 text-gray-500">({reviewCount} reviews)</span>}
      </div>
    );
  };

  const handleAddToCart = () => {
    const currentCartQty = getCartItemQuantity(product.id);
    if (currentCartQty > 0) {
      updateQuantity(product.id, quantity);
    } else {
      addToCart(product, quantity);
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const categoryName = productCategories.find(c => c.id === product.categoryId)?.name || 'Shop';
  const averageRating = productReviews.length > 0 
    ? productReviews.reduce((acc, r) => acc + r.rating, 0) / productReviews.length 
    : product.rating;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <button onClick={() => setPage('home')} className="hover:text-green-600 cursor-pointer">Home</button> 
        <span className="mx-2">/</span>
        <button onClick={() => viewCategory(product.categoryId)} className="hover:text-green-600 cursor-pointer">{categoryName}</button>
        <span className="mx-2">/</span>
        <span className="text-gray-800">{product.name}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Images */}
        <div className="lg:w-1/2">
          <div className="rounded-xl overflow-hidden shadow-lg mb-4">
            <img 
              src={product.imageUrls[selectedImage]} 
              alt={product.name}
              className="w-full h-80 object-cover"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto py-2">
            {product.imageUrls.map((url, index) => (
              <div 
                key={index}
                className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden cursor-pointer border-2 ${selectedImage === index ? 'border-green-500' : 'border-gray-200'}`}
                onClick={() => setSelectedImage(index)}
              >
                <img 
                  src={url} 
                  alt={`${product.name} view ${index + 1}`} 
                  className="w-full h-full object-cover" 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:w-1/2">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <StarRating rating={averageRating} reviewCount={productReviews.length} />
          </div>
          
          <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>
          
          <div className="flex items-baseline mb-6">
            <span className="text-3xl font-bold text-green-700">${product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="ml-3 text-lg text-gray-500 line-through">${product.oldPrice.toFixed(2)}</span>
            )}
            {product.isSale && (
              <span className="ml-3 bg-red-100 text-red-800 text-sm font-semibold px-2.5 py-0.5 rounded">
                Sale
              </span>
            )}
          </div>
          
          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {product.tags.map(tag => (
                <span key={tag} className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          {/* Quantity and Add to Cart */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
            <div className="w-full sm:w-auto">
              <span className="block text-sm text-gray-500 mb-1">Quantity</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button 
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span className="px-4 py-2 w-12 text-center">{quantity}</span>
                <button 
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                  onClick={incrementQuantity}
                >
                  +
                </button>
              </div>
            </div>
            
            <button 
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex-1"
              onClick={handleAddToCart}
            >
              {getCartItemQuantity(product.id) > 0 ? 'Update Cart' : 'Add to Cart'} - ${(product.price * quantity).toFixed(2)}
            </button>
          </div>
          
          {/* Product Details */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-semibold text-gray-900 mb-3">Product Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">SKU:</span>
                <span className="ml-2 text-gray-700">{product.sku}</span>
              </div>
              <div>
                <span className="text-gray-500">Brand:</span>
                <span className="ml-2 text-gray-700">{product.brand}</span>
              </div>
              <div>
                <span className="text-gray-500">Category:</span>
                <span className="ml-2 text-gray-700 capitalize">{categoryName}</span>
              </div>
              <div>
                <span className="text-gray-500">Availability:</span>
                <span className={`ml-2 font-medium ${product.availability === 'In Stock' ? 'text-green-600' : 'text-red-600'}`}>
                  {product.availability}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-12">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === 'description' 
                  ? 'border-green-500 text-green-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === 'specification' 
                  ? 'border-green-500 text-green-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('specification')}
            >
              Specification
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === 'reviews' 
                  ? 'border-green-500 text-green-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({productReviews.length})
            </button>
          </nav>
        </div>

        <div className="py-8">
          {activeTab === 'description' && (
            <div className="prose max-w-none text-gray-700">
              <p>{product.description}</p>
            </div>
          )}

          {activeTab === 'specification' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.specification && product.specification.map(spec => (
                <div key={spec.key} className="border-b border-gray-100 py-2">
                  <span className="font-medium text-gray-900">{spec.key}:</span>
                  <span className="ml-2 text-gray-700">{spec.value}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold mb-2">Customer Reviews</h3>
                <div className="flex items-center">
                  <StarRating rating={averageRating} isLarge={true} />
                  <span className="ml-3 text-gray-600">Based on {productReviews.length} reviews</span>
                </div>
              </div>

              {productReviews.length > 0 ? (
                <div className="space-y-6">
                  {productReviews.map(review => (
                    <div key={review.id} className="border-b border-gray-200 pb-6">
                      <div className="flex items-start mb-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="font-semibold text-green-800">
                            {review.userName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-semibold">{review.userName}</h4>
                          <div className="flex items-center mt-1">
                            <StarRating rating={review.rating} />
                            <span className="ml-2 text-sm text-gray-500">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 py-4">There are no reviews for this product yet.</p>
              )}

              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Your Rating</label>
                  <StarRating 
                    rating={reviewForm.rating} 
                    editable={true} 
                    onRatingChange={(rating) => setReviewForm({...reviewForm, rating})} 
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Your Review</label>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    rows={4}
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                    placeholder="Share your experience with this product"
                  ></textarea>
                </div>
                <button 
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                  onClick={handleAddReview}
                >
                  Submit Review
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map(item => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;