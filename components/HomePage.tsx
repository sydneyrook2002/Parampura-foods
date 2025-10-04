import { ArrowRight, Leaf, Truck, Shield, Star } from 'lucide-react';
import { useApiCart } from '../contexts/ApiCartContext';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

const HomePage = () => {
  const { setPage, viewCategory, viewProduct, addToCart, foods, categories, loading } = useApiCart();

  const featuredProducts = foods.slice(0, 4);

  // Generate category-specific gradients based on category name
  const getCategoryGradient = (categoryName: string) => {
    const gradients: Record<string, string> = {
      'Vegetables': 'from-green-500 to-green-700',
      'Fruits': 'from-orange-400 to-red-500',
      'Dairy': 'from-blue-400 to-blue-600',
      'Grains': 'from-yellow-500 to-orange-500',
      'Meat': 'from-red-500 to-red-700',
      'Beverages': 'from-purple-400 to-purple-600',
    };
    
    return gradients[categoryName] || 'from-gray-500 to-gray-700';
  };

  return (
    <div className="min-h-screen bg-gradient-modern">
      {/* Hero Section - Fully Responsive */}
      <section className="responsive-video-container">
        {/* Video Background - Fully Responsive */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="responsive-video"
        >
          <source src="/Sample_Video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Text Overlay - Fully Responsive */}
        <div className="absolute inset-0 flex items-center justify-center z-10 responsive-container">
          <div className="text-center text-white animate-fade-in max-w-6xl mx-auto">
            <h1 className="hero-title font-bold mb-4 sm:mb-6 leading-tight animate-slide-up">
              Fresh & Organic Foods
              <span className="block text-green-300 animate-glow hero-subtitle">Delivered to Your Door</span>
            </h1>
            <p className="hero-description mb-6 sm:mb-8 text-gray-100 animate-slide-up max-w-4xl mx-auto leading-relaxed" style={{ animationDelay: '0.2s' }}>
              Experience the finest selection of organic produce, sourced directly from local farms with love and care.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Button
                size="lg"
                onClick={() => viewCategory('')}
                className="responsive-button bg-gradient-green hover:shadow-lg transform hover:scale-105 transition-all duration-300 rounded-xl font-semibold w-full sm:w-auto"
              >
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setPage('about')}
                className="responsive-button bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm rounded-xl font-semibold transition-all duration-300 w-full sm:w-auto"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Parampara Eats - Fully Responsive */}
      <section className="responsive-spacing bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
        {/* Animated Background Elements - Responsive */}
        <div className="absolute inset-0">
          <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-32 sm:w-48 md:w-72 h-32 sm:h-48 md:h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse-gentle"></div>
          <div className="absolute top-20 sm:top-40 right-16 sm:right-32 w-40 sm:w-64 md:w-96 h-40 sm:h-64 md:h-96 bg-emerald-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-10 sm:bottom-20 left-1/3 w-36 sm:w-56 md:w-80 h-36 sm:h-56 md:h-80 bg-teal-500/10 rounded-full blur-3xl animate-bounce-gentle" style={{ animationDelay: '4s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-green-400/10 rounded-full blur-3xl animate-pulse-gentle" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="responsive-container relative z-10">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-block mb-4 sm:mb-6">
              <span className="bg-green-500/20 text-green-400 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider animate-fade-in">
                Why Choose Us
              </span>
            </div>
            <h2 className="hero-title font-bold mb-6 sm:mb-8 text-white animate-fade-in leading-tight">
              Why Choose <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Parampara Eats</span>?
            </h2>
            <p className="hero-description text-gray-300 max-w-4xl mx-auto leading-relaxed animate-slide-up px-4" style={{ animationDelay: '0.2s' }}>
              We're not just another food delivery service - we're your partners in healthy living
            </p>
          </div>
          
          <div className="responsive-grid lg:grid-cols-3">
            {/* Main Feature Card - Glassmorphism */}
            <div className="lg:col-span-2">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="responsive-card relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 animate-card-1">
                  <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 md:gap-10">
                    <div className="relative">
                      <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 animate-float shadow-2xl">
                        <Leaf className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-green-400 rounded-full animate-pulse-gentle"></div>
                    </div>
                    <div className="flex-1 text-center lg:text-left">
                      <h3 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4 sm:mb-6 text-white">100% Organic Excellence</h3>
                      <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-gray-200">
                        Every product in our catalog is certified organic, grown without harmful pesticides, 
                        and sourced directly from trusted local farms. We believe in transparency and quality 
                        that you can taste in every bite.
                      </p>
                      <div className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center lg:justify-start">
                        <span className="bg-green-500/20 text-green-300 px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">Certified Organic</span>
                        <span className="bg-emerald-500/20 text-emerald-300 px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">Farm Fresh</span>
                        <span className="bg-teal-500/20 text-teal-300 px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">Pesticide Free</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Side Feature Cards */}
            <div className="space-y-4 sm:space-y-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
                <div className="responsive-card relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300 animate-card-2">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Truck className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-base sm:text-lg md:text-xl mb-2 sm:mb-3 text-white">Lightning Fast Delivery</h3>
                      <p className="text-gray-300 leading-relaxed text-xs sm:text-sm">
                        Free delivery on orders over ₹500 with same-day delivery available in most areas.
                      </p>
                      <div className="mt-2 sm:mt-3 flex items-center text-blue-300 text-xs sm:text-sm font-semibold">
                        <span>⚡ Same Day Delivery</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
                <div className="responsive-card relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300 animate-card-3">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Shield className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-base sm:text-lg md:text-xl mb-2 sm:mb-3 text-white">Quality Promise</h3>
                      <p className="text-gray-300 leading-relaxed text-xs sm:text-sm">
                        100% satisfaction guaranteed or your money back - we stand behind every product.
                      </p>
                      <div className="mt-2 sm:mt-3 flex items-center text-purple-300 text-xs sm:text-sm font-semibold">
                        <span>🛡️ 100% Guarantee</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories - Fully Responsive */}
      <section className="responsive-spacing bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden">
        {/* Dynamic Background Elements - Responsive */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-32 right-20 w-40 sm:w-56 md:w-80 h-40 sm:h-56 md:h-80 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-36 sm:w-48 md:w-72 h-36 sm:h-48 md:h-72 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '6s' }}></div>
          <div className="absolute top-1/2 right-1/3 w-32 sm:w-40 md:w-64 h-32 sm:h-40 md:h-64 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="responsive-container relative z-10">
          <div className="text-center mb-16 sm:mb-20 md:mb-24">
            <div className="inline-block mb-6 sm:mb-8">
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-full text-sm sm:text-base md:text-lg font-bold uppercase tracking-wider shadow-lg animate-fade-in">
                Our Categories
              </span>
            </div>
            <h2 className="hero-title font-bold mb-8 sm:mb-10 text-gray-800 animate-fade-in">
              Explore Our <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">Categories</span>
            </h2>
            <p className="hero-description text-gray-600 max-w-4xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.3s' }}>
              Discover fresh, organic products organized by category for your convenience
            </p>
          </div>

          <div className="responsive-grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 max-w-5xl mx-auto">
            {categories.slice(0, 3).map((category, index) => (
              <div
                key={category.categoryId}
                className="group cursor-pointer"
                style={{ animationDelay: `${index * 0.3}s` }}
                onClick={() => {
                  viewCategory(category.categoryId.toString());
                }}
              >
                {/* Modern Floating Card */}
                <div className="relative">
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient(category.name)} rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-all duration-700 transform group-hover:scale-110`}></div>
                  
                  {/* Main Card */}
                  <div className="responsive-card relative bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-700 transform group-hover:-translate-y-4 sm:group-hover:-translate-y-8 group-hover:rotate-1">
                    <div className="text-center">
                      {/* Category Icon with Modern Design */}
                      <div className="relative mb-6 sm:mb-8">
                        <div className={`w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 mx-auto rounded-3xl bg-gradient-to-br ${getCategoryGradient(category.name)} flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl`}>
                          <span className="text-white text-2xl sm:text-3xl md:text-4xl font-black">
                            {category.name.charAt(0)}
                          </span>
                        </div>
                        {/* Floating Elements */}
                        <div className="absolute -top-2 -right-2 w-4 h-4 sm:w-6 sm:h-6 bg-yellow-400 rounded-full animate-bounce-gentle"></div>
                        <div className="absolute -bottom-2 -left-2 w-3 h-3 sm:w-4 sm:h-4 bg-pink-400 rounded-full animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
                      </div>
                      
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-gray-800 group-hover:text-green-600 transition-colors duration-300">
                        {category.name}
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base md:text-lg">
                        {category.description}
                      </p>
                      
                      {/* Modern Action Button */}
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                        <div className="responsive-button relative bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-bold shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
                          <div className="flex items-center justify-center gap-2 sm:gap-3">
                            <span>Explore Now</span>
                            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Decorative Corner Elements */}
                    <div className="absolute top-4 right-4 w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-gentle"></div>
                    <div className="absolute bottom-4 left-4 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-gentle" style={{ animationDelay: '0.5s' }}></div>
                  </div>
                  
                  {/* Floating Particles */}
                  <div className="absolute -top-4 -left-4 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500 animate-float"></div>
                  <div className="absolute -bottom-4 -right-4 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500 animate-float" style={{ animationDelay: '1s' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products - Fully Responsive */}
      <section className="responsive-spacing bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100 relative overflow-hidden">
        {/* Background Elements - Responsive */}
        <div className="absolute top-20 right-10 w-24 sm:w-32 md:w-40 h-24 sm:h-32 md:h-40 bg-green-300 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 left-10 w-20 sm:w-24 md:w-32 h-20 sm:h-24 md:h-32 bg-emerald-300 rounded-full opacity-20 animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 sm:w-48 md:w-64 h-40 sm:h-48 md:h-64 bg-teal-200 rounded-full opacity-10 animate-pulse-gentle"></div>
        
        <div className="responsive-container relative z-10">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="hero-title font-bold mb-6 sm:mb-8 text-gray-800 animate-fade-in">
              Featured <span className="text-green-600">Products</span>
            </h2>
            <p className="hero-description text-gray-600 max-w-4xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Handpicked organic treasures that our customers love most
            </p>
          </div>

          {loading ? (
            <div className="text-center py-16 sm:py-20">
              <div className="inline-flex items-center space-x-4 text-gray-500">
                <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-green-500"></div>
                <span className="text-lg sm:text-xl">Loading our finest products...</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-start">
              {featuredProducts.map((product, index) => {
                const animationClass = `animate-card-${(index % 8) + 1}`;
                // Make middle two cards (index 1 and 2) slightly smaller but aligned to top
                const isMiddleCard = index === 1 || index === 2;
                return (
                  <div
                    key={product.foodId}
                    className={`group cursor-pointer ${animationClass} ${isMiddleCard ? 'transform scale-95 origin-top' : ''} transform hover:rotate-1 hover:scale-105 transition-all duration-300`}
                    style={{ 
                      animationDelay: `${index * 0.15}s`,
                      transform: `rotate(${(index % 4) * 0.5 - 0.75}deg)`
                    }}
                  >
                    {/* Responsive Card Design */}
                    <div className="relative bg-white rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 transform group-hover:-rotate-1 group-hover:scale-105 overflow-hidden">
                      {/* Product Image */}
                      <div
                        className="relative responsive-image overflow-hidden"
                        onClick={() => {
                          viewProduct(product.foodId);
                        }}
                      >
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                            <span className="text-gray-600 text-sm sm:text-base md:text-lg font-medium text-center px-4">{product.name}</span>
                          </div>
                        )}
                        
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Rating Badge */}
                        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/95 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-2 rounded-full flex items-center space-x-1 shadow-lg">
                          <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs sm:text-sm font-bold text-gray-700">{product.rating}</span>
                        </div>
                        
                        {/* Sale/Organic Badge */}
                        {product.isOnSale ? (
                          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-red-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg animate-pulse-gentle">
                            {product.discountPercentage}% OFF
                          </div>
                        ) : product.isOrganic ? (
                          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-green-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                            Organic
                          </div>
                        ) : null}
                      </div>
                      
                      {/* Product Info */}
                      <div className="responsive-card">
                        <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3 line-clamp-1 text-gray-800 group-hover:text-green-600 transition-colors duration-300">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 mb-3 sm:mb-4 line-clamp-2 leading-relaxed text-sm sm:text-base">
                          {product.description}
                        </p>
                        
                        {/* Price and Action */}
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            {product.isOnSale ? (
                              <>
                                <div className="flex items-center gap-2">
                                  <span className="text-lg sm:text-xl md:text-2xl font-bold text-green-600">
                                    ₹{product.salePrice?.toFixed(2)}
                                  </span>
                                  <span className="text-xs sm:text-sm text-gray-400 line-through">
                                    ₹{product.mrp.toFixed(2)}
                                  </span>
                                </div>
                                <span className="text-xs sm:text-sm text-green-600 font-semibold">
                                  Save ₹{product.savings.toFixed(2)}
                                </span>
                              </>
                            ) : (
                              <span className="text-lg sm:text-xl md:text-2xl font-bold text-green-600">
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
                            className="responsive-button bg-gradient-green hover:shadow-lg transform hover:scale-110 transition-all duration-300 rounded-2xl font-semibold"
                          >
                            {product.isAvailable && product.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
                          </Button>
                        </div>
                      </div>
                      
                      {/* Decorative Element */}
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-bounce-gentle"></div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="text-center mt-16 sm:mt-20">
            <Button
              size="lg"
              variant="outline"
              onClick={() => viewCategory('')}
              className="responsive-button bg-white border-3 border-green-500 text-green-600 hover:bg-green-50 hover:border-green-600 transition-all duration-300 rounded-2xl font-bold transform hover:scale-105"
            >
              Explore All Products
              <ArrowRight className="ml-2 sm:ml-3 h-4 w-4 sm:h-6 sm:w-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section - Fully Responsive */}
      <section className="responsive-spacing bg-gradient-green text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="responsive-container text-center relative z-10">
          <div className="animate-fade-in">
            <h2 className="hero-title font-bold mb-6 sm:mb-8 leading-tight">
              Start Your Healthy Journey Today
            </h2>
            <p className="hero-description mb-8 sm:mb-12 max-w-3xl mx-auto opacity-95 leading-relaxed">
              Join thousands of satisfied customers who trust Parampara Eats for their organic food needs. 
              Experience the difference that fresh, organic produce makes in your life.
            </p>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => viewCategory('')}
              className="responsive-button bg-white text-green-600 hover:bg-gray-100 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-xl font-bold"
            >
              Shop Now
              <ArrowRight className="ml-2 sm:ml-3 h-4 w-4 sm:h-6 sm:w-6" />
            </Button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>
    </div>
  );
};

export default HomePage;
