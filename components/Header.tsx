import { ShoppingCart, Heart, User, Search, Menu, ArrowLeft } from 'lucide-react';
import { useApiCart } from '../contexts/ApiCartContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';

const Header = () => {
  const { cart, wishlist, user, setPage, performSearch, page } = useApiCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const cartItemCount = cart?.reduce((total, item) => total + item.quantity, 0) || 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      performSearch(searchInput.trim());
      setSearchInput('');
    }
  };

  const handleBack = () => {
    // Define back navigation logic based on current page
    switch (page) {
      case 'productDetail':
        setPage('category');
        break;
      case 'category':
        setPage('home');
        break;
      case 'cart':
        setPage('home');
        break;
      case 'checkout':
        setPage('cart');
        break;
      case 'searchResults':
        setPage('home');
        break;
      case 'wishlist':
        setPage('home');
        break;
      case 'about':
      case 'contact':
        setPage('home');
        break;
      case 'account':
        setPage('home');
        break;
      case 'adminDashboard':
      case 'adminProducts':
      case 'adminUsers':
      case 'adminOrders':
      case 'adminAnalytics':
      case 'adminReviews':
      case 'adminCategories':
        setPage('adminDashboard');
        break;
      default:
        setPage('home');
    }
  };

  const showBackButton = page !== 'home' && page !== 'adminDashboard';

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg">
      <div className="responsive-container">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Back Button */}
          {showBackButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="mr-1 sm:mr-2 hover:bg-gray-800 hover:text-white transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          )}

          {/* Logo */}
          <button
            onClick={() => setPage('home')}
            className="flex items-center space-x-2 sm:space-x-3 hover:scale-105 transition-transform duration-200 group"
          >
            <div className="relative">
              <img 
                src="/logo.png" 
                alt="Parampara Eats" 
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain rounded-xl shadow-md group-hover:shadow-lg transition-shadow duration-200"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold text-gray-800 group-hover:text-green-600 transition-colors duration-200">Parampara Eats</h1>
              <p className="text-xs text-gray-500">Organic & Fresh</p>
            </div>
          </button>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4 sm:mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for products..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-10 bg-gray-50 border-gray-200 focus:bg-white focus:border-green-400 focus:ring-green-400/20 transition-all duration-200 rounded-xl"
              />
            </div>
          </form>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setPage(user ? 'wishlist' : 'login')}
              className="relative hidden sm:flex hover:bg-gray-100 transition-colors duration-200 rounded-xl"
            >
              <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
              {wishlist && wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setPage('cart')}
              className="relative hover:bg-gray-100 transition-colors duration-200 rounded-xl"
            >
              <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center animate-bounce">
                  {cartItemCount}
                </span>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                if (!user) {
                  setPage('login');
                } else if (user.role === 'Admin') {
                  setPage('adminDashboard');
                } else {
                  setPage('account');
                }
              }}
              className="hidden sm:flex hover:bg-gray-100 transition-colors duration-200 rounded-xl"
            >
              <User className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden hover:bg-gray-100 transition-colors duration-200 rounded-xl"
            >
              <Menu className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu - Responsive */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 sm:py-4 border-t border-gray-200 bg-white/95 backdrop-blur-md animate-slide-down">
            <form onSubmit={handleSearch} className="mb-3 sm:mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="pl-8 sm:pl-10 bg-gray-50 border-gray-200 focus:bg-white focus:border-green-400 focus:ring-green-400/20 transition-all duration-200 rounded-xl text-sm sm:text-base"
                />
              </div>
            </form>
            <nav className="space-y-1 sm:space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start hover:bg-gray-100 transition-colors duration-200 rounded-xl text-sm sm:text-base"
                onClick={() => {
                  setPage('home');
                  setMobileMenuOpen(false);
                }}
              >
                Home
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start hover:bg-gray-100 transition-colors duration-200 rounded-xl text-sm sm:text-base"
                onClick={() => {
                  setPage('about');
                  setMobileMenuOpen(false);
                }}
              >
                About
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start hover:bg-gray-100 transition-colors duration-200 rounded-xl text-sm sm:text-base"
                onClick={() => {
                  setPage('contact');
                  setMobileMenuOpen(false);
                }}
              >
                Contact
              </Button>
              {user && (
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:bg-gray-100 transition-colors duration-200 rounded-xl text-sm sm:text-base"
                  onClick={() => {
                    setPage('account');
                    setMobileMenuOpen(false);
                  }}
                >
                  My Account
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
