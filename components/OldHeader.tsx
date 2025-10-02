import React, { useState, useEffect, useRef } from 'react';
import Icon from './Icon';
import { useCart } from '../contexts/CartContext';
import { siteInfo, navLinks } from '../services/api';
import CartDropdown from './CartDropdown';
import { NavLink as NavLinkType, Page, Product } from '../types';

const NavLink: React.FC<{ link: NavLinkType; onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void }> = ({ link, onClick }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    } else if (link.href === '#') {
      e.preventDefault();
    }
  };

  return (
    <a href={link.href} onClick={handleClick} className="flex items-center gap-1 uppercase font-bold text-sm text-brand-gray-600 hover:text-brand-green transition-colors">
      {link.text}
      {link.submenu && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>}
    </a>
  );
};

const Header: React.FC = () => {
  const { products, getCartItemCount, getCartTotal, setPage, user, logout, viewCategory, performSearch, viewProduct } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const itemCount = getCartItemCount();
  const cartTotal = getCartTotal();
  
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, page: Page) => {
    e.preventDefault();
    setPage(page);
    setIsMobileMenuOpen(false);
  };

  const handleCategoryNav = (e: React.MouseEvent<HTMLAnchorElement>, categoryId: string) => {
    e.preventDefault();
    viewCategory(categoryId);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    logout();
    setIsMobileMenuOpen(false);
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInputValue.trim()) {
      performSearch(searchInputValue.trim());
      setSearchInputValue('');
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchInputValue(query);

    if (query.trim()) {
      const lowercasedQuery = query.toLowerCase();
      const filteredSuggestions = products.filter(p =>
        p.name.toLowerCase().includes(lowercasedQuery) ||
        p.description.toLowerCase().includes(lowercasedQuery)
      ).slice(0, 5);
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };
  
  const handleSuggestionClick = (productId: number) => {
    viewProduct(productId);
    setSearchInputValue('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const homePage: Page = user?.role === 'admin' ? 'adminDashboard' : 'home';
  const accountPage: Page = user?.role === 'admin' ? 'adminDashboard' : 'account';

  return (
    <header className="bg-brand-cream text-brand-gray-500 text-sm">
      {/* Top Bar */}
      <div className="bg-brand-gray-100 border-b border-brand-gray-200">
        <div className="container mx-auto px-4 flex justify-between items-center h-10">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Icon name="phone" className="w-4 h-4 text-brand-green" />
              <span>{siteInfo.phone}</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Icon name="email" className="w-4 h-4 text-brand-green" />
              <span>{siteInfo.email}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <a href={siteInfo.socials.facebook} className="hover:text-brand-green"><Icon name="facebook" className="w-4 h-4" /></a>
              <a href={siteInfo.socials.twitter} className="hover:text-brand-green"><Icon name="twitter" className="w-4 h-4" /></a>
              <a href={siteInfo.socials.pinterest} className="hover:text-brand-green"><Icon name="pinterest" className="w-4 h-4" /></a>
              <a href={siteInfo.socials.linkedin} className="hover:text-brand-green"><Icon name="linkedin" className="w-4 h-4" /></a>
            </div>
            <span className="hidden sm:inline text-brand-gray-300">|</span>
            <div className="hidden sm:flex items-center gap-2">
              {user ? (
                <>
                  <span>Hi, {user.name}</span>
                  <span className="text-brand-gray-300">|</span>
                   <a href="#" onClick={(e) => handleNav(e, accountPage)} className="hover:text-brand-green">My Account</a>
                  <span className="text-brand-gray-300">|</span>
                  <a href="#" onClick={handleLogout} className="hover:text-brand-green">Logout</a>
                </>
              ) : (
                <>
                  <a href="#" onClick={(e) => handleNav(e, 'login')} className="hover:text-brand-green">Login</a>
                  <span>/</span>
                  <a href="#" onClick={(e) => handleNav(e, 'register')} className="hover:text-brand-green">Register</a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b border-brand-gray-200">
        <div className="container mx-auto px-4 flex justify-between items-center py-5 flex-wrap gap-y-4">
          <div className="text-4xl font-serif font-bold text-brand-green-dark">
            <a href="#" onClick={(e) => handleNav(e, homePage)}>PARAMPARA EATS</a>
          </div>

          <div className="w-full lg:flex-1 lg:mx-8 order-3 lg:order-2 relative">
            <form onSubmit={handleSearchSubmit}>
              <input 
                type="text" 
                placeholder="Search for products..." 
                value={searchInputValue}
                onChange={handleSearchChange}
                onFocus={() => searchInputValue && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Delay to allow suggestion click
                className="w-full border border-brand-gray-300 px-4 py-2 rounded-md focus:ring-brand-green focus:border-brand-green bg-white" 
              />
              <button type="submit" className="absolute top-0 right-0 h-full bg-brand-green text-white px-5 rounded-r-md hover:bg-brand-green-dark">
                <Icon name="search" className="w-5 h-5" />
              </button>
            </form>
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white border border-brand-gray-200 shadow-lg rounded-b-md z-50">
                <ul className="max-h-96 overflow-y-auto">
                  {suggestions.map(product => (
                    <li key={product.id}>
                      <button
                        onClick={() => handleSuggestionClick(product.id)}
                        className="w-full text-left flex items-center gap-4 p-3 hover:bg-brand-gray-100 transition-colors"
                      >
                        <img src={product.imageUrls[0]} alt={product.name} className="w-12 h-12 object-cover rounded"/>
                        <div>
                          <p className="font-semibold text-brand-gray-600">{product.name}</p>
                          <p className="text-sm text-brand-green font-bold">${product.price.toFixed(2)}</p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-4 order-2 lg:order-3">
            <a href="#" onClick={(e) => handleNav(e, 'wishlist')} className="hidden sm:block hover:text-brand-green text-brand-brown" title="Wishlist"><Icon name="heart" className="w-7 h-7" /></a>
            <a href="#" onClick={(e) => handleNav(e, accountPage)} className="hidden sm:block hover:text-brand-green text-brand-brown"><Icon name="user" className="w-7 h-7" /></a>
            {user?.role !== 'admin' && (
              <div className="relative group">
                <a href="#" onClick={(e) => handleNav(e, 'cart')} className="flex items-center gap-2 hover:text-brand-green text-brand-brown">
                  <div className="relative">
                    <Icon name="cart" className="w-7 h-7" />
                    <span className="absolute -top-1 -right-2 bg-brand-green text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{itemCount}</span>
                  </div>
                  <div className="hidden md:block">
                    <p className="font-bold">${cartTotal.toFixed(2)}</p>
                    <p className="text-xs text-brand-gray-500">{itemCount} items</p>
                  </div>
                </a>
                <CartDropdown />
              </div>
            )}
             <button
              className="lg:hidden text-brand-gray-600 hover:text-brand-green"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              <Icon name="menu" className="w-8 h-8" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:block border-b border-brand-gray-200">
        <div className="container mx-auto px-4">
          <ul className="flex items-center justify-center gap-10 h-16">
            {navLinks.map((link) => (
              <li key={link.id} className="relative group">
                <NavLink 
                    link={link} 
                    onClick={link.page ? (e) => handleNav(e, link.page!) : undefined}
                />
                {link.submenu && (
                  <div className="absolute top-full left-0 bg-white border border-brand-gray-200 shadow-lg p-5 w-56 hidden group-hover:block z-50">
                    <ul className="space-y-3">
                      {link.submenu.map((sublink) => (
                         <li key={sublink.id}>
                          <a href={sublink.href} onClick={(e) => handleCategoryNav(e, sublink.id)} className="block hover:text-brand-green">{sublink.text}</a>
                         </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
             {user?.role === 'admin' && (
              <li>
                <NavLink link={{ id: 'admin', text: 'Admin', href: '#', page: 'adminDashboard' }} onClick={(e) => handleNav(e, 'adminDashboard')} />
              </li>
            )}
          </ul>
        </div>
      </nav>

       {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="lg:hidden bg-white border-b border-brand-gray-200">
          <div className="p-4 space-y-2">
            {navLinks.map(link => (
              <div key={link.id}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    if (link.page) {
                      handleNav(e, link.page);
                    } else if (link.submenu) {
                      e.preventDefault();
                    }
                  }}
                  className="block w-full text-left py-2 px-3 rounded uppercase font-bold text-sm text-brand-gray-600 hover:bg-brand-gray-100"
                >
                  {link.text}
                </a>
                {link.submenu && (
                  <div className="pl-4 mt-1 space-y-1 border-l-2 border-brand-green/50">
                    {link.submenu.map(sublink => (
                      <a
                        key={sublink.id}
                        href={sublink.href}
                        onClick={(e) => handleCategoryNav(e, sublink.id)}
                        className="block py-2 px-3 rounded text-brand-gray-500 hover:bg-brand-gray-100"
                      >
                        {sublink.text}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
             {user?.role === 'admin' && (
              <a
                href="#"
                onClick={(e) => handleNav(e, 'adminDashboard')}
                className="block w-full text-left py-2 px-3 rounded uppercase font-bold text-sm text-brand-gray-600 hover:bg-brand-gray-100"
              >
                Admin
              </a>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;