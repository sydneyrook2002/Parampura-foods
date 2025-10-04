import { ShoppingCart, Heart, User, Search, Menu, Home, Info, Phone } from 'lucide-react';
import { useApiCart } from '../contexts/ApiCartContext';
import { Button } from './ui/button';
import { useState, useEffect, useRef } from 'react';
import SearchInput from './SearchInput';

const Header = () => {
  const { cart, wishlist, user, setPage, performSearch, page } = useApiCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  const cartItemCount = cart?.reduce((total, item) => total + item.quantity, 0) || 0;

  // Close mobile search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target as Node)) {
        setMobileSearchOpen(false);
      }
    };

    if (mobileSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileSearchOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Layout */}
        <div className="flex items-center justify-between h-16 lg:hidden">
          {/* Left: Menu & Search */}
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="hover:bg-gray-100 transition-colors duration-200 rounded-lg h-10 w-10"
            >
              <Menu className="h-5 w-5 text-gray-600" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="hover:bg-gray-100 transition-colors duration-200 rounded-lg h-10 w-10"
            >
              <Search className="h-5 w-5 text-gray-600" />
            </Button>
          </div>

          {/* Center: Logo */}
          <button
            onClick={() => setPage('home')}
            className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200 group"
          >
            <img 
              src="/logo.png" 
              alt="Parampara Eats" 
              className="w-8 h-8 object-contain rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-200"
            />
            <div className="text-left">
              <h1 className="text-sm font-bold text-gray-800 group-hover:text-green-600 transition-colors duration-200 leading-tight">Parampara Eats</h1>
              <p className="text-xs text-gray-500 leading-tight">Organic & Fresh</p>
            </div>
          </button>

          {/* Right: Profile & Cart */}
          <div className="flex items-center space-x-1">
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
              className="hover:bg-gray-100 transition-colors duration-200 rounded-lg h-10 w-10"
            >
              <User className="h-5 w-5 text-gray-600" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setPage('cart')}
              className="relative hover:bg-gray-100 transition-colors duration-200 rounded-lg h-10 w-10"
            >
              <ShoppingCart className="h-5 w-5 text-gray-600" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center animate-bounce font-bold">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-between h-20">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => setPage('home')}
              className="flex items-center space-x-3 hover:scale-105 transition-transform duration-200 group"
            >
              <img 
                src="/logo.png" 
                alt="Parampara Eats" 
                className="w-12 h-12 object-contain rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-200"
              />
              <div className="text-left">
                <h1 className="text-xl font-bold text-gray-800 group-hover:text-green-600 transition-colors duration-200 leading-tight">Parampara Eats</h1>
                <p className="text-sm text-gray-500 leading-tight">Organic & Fresh</p>
              </div>
            </button>
          </div>

          {/* Center: Search Bar - Properly sized */}
          <div className="flex-1 max-w-md mx-8">
            <SearchInput
              onSearch={performSearch}
              placeholder="Search for products..."
              className="w-full"
            />
          </div>

          {/* Right: Navigation Icons */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setPage('wishlist')}
              className="relative hover:bg-gray-100 transition-colors duration-200 rounded-lg h-10 w-10"
            >
              <Heart className="h-5 w-5 text-gray-600" />
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
              className="hover:bg-gray-100 transition-colors duration-200 rounded-lg h-10 w-10"
            >
              <User className="h-5 w-5 text-gray-600" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setPage('cart')}
              className="relative hover:bg-gray-100 transition-colors duration-200 rounded-lg h-10 w-10"
            >
              <ShoppingCart className="h-5 w-5 text-gray-600" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center animate-bounce font-bold">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search Dropdown - Mobile First */}
        {mobileSearchOpen && (
          <div ref={mobileSearchRef} className="lg:hidden py-4 border-t border-gray-200 bg-white/95 backdrop-blur-md animate-slide-down">
            <SearchInput
              onSearch={(query) => {
                performSearch(query);
                setMobileSearchOpen(false);
              }}
              placeholder="Search for products..."
              className="w-full"
            />
          </div>
        )}

        {/* Mobile Menu - Clean & Complete */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 bg-white/95 backdrop-blur-md animate-slide-down">
            <nav className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start hover:bg-gray-100 transition-colors duration-200 rounded-xl text-base py-3 h-auto"
                onClick={() => {
                  setPage('home');
                  setMobileMenuOpen(false);
                }}
              >
                <Home className="mr-3 h-4 w-4" />
                Home
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start hover:bg-gray-100 transition-colors duration-200 rounded-xl text-base py-3 h-auto"
                onClick={() => {
                  setPage(user ? 'wishlist' : 'login');
                  setMobileMenuOpen(false);
                }}
              >
                <Heart className="mr-3 h-4 w-4" />
                Wishlist
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start hover:bg-gray-100 transition-colors duration-200 rounded-xl text-base py-3 h-auto"
                onClick={() => {
                  setPage('about');
                  setMobileMenuOpen(false);
                }}
              >
                <Info className="mr-3 h-4 w-4" />
                About
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start hover:bg-gray-100 transition-colors duration-200 rounded-xl text-base py-3 h-auto"
                onClick={() => {
                  setPage('contact');
                  setMobileMenuOpen(false);
                }}
              >
                <Phone className="mr-3 h-4 w-4" />
                Contact
              </Button>
              {user && (
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:bg-gray-100 transition-colors duration-200 rounded-xl text-base py-3 h-auto"
                  onClick={() => {
                    if (user.role === 'Admin') {
                      setPage('adminDashboard');
                    } else {
                      setPage('account');
                    }
                    setMobileMenuOpen(false);
                  }}
                >
                  <User className="mr-3 h-4 w-4" />
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
