import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import OrderSuccessPage from './components/OrderSuccessPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AccountPage from './components/AccountPage';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminProductsPage from './components/admin/AdminProductsPage';
import AdminUsersPage from './components/admin/AdminUsersPage';
import AdminOrdersPage from './components/admin/AdminOrdersPage';
import AdminAnalyticsPage from './components/admin/AdminAnalyticsPage';
import AdminReviewsPage from './components/admin/AdminReviewsPage';
import CategoryPage from './components/CategoryPage';
import ProductDetailPage from './components/ProductDetailPage';
import AboutPage from './components/AboutPage';
import SearchResultsPage from './components/SearchResultsPage';
import ContactPage from './components/ContactPage';
import WishlistPage from './components/WishlistPage';
import BlogPage from './components/BlogPage';
import BlogDetailPage from './components/BlogDetailPage';
import InfoPage from './components/InfoPage';
import { useCart } from './contexts/CartContext';

const App: React.FC = () => {
  const { page, user } = useCart();

  const renderPage = () => {
    // Admin Routes
    if (page.startsWith('admin')) {
      if (user?.role !== 'admin') {
        return <HomePage />; // Redirect non-admins
      }
      switch (page) {
        case 'adminDashboard':
          return <AdminDashboard />;
        case 'adminProducts':
          return <AdminProductsPage />;
        case 'adminUsers':
          return <AdminUsersPage />;
        case 'adminOrders':
          return <AdminOrdersPage />;
        case 'adminAnalytics':
          return <AdminAnalyticsPage />;
        case 'adminReviews':
          return <AdminReviewsPage />;
        default:
          return <AdminDashboard />;
      }
    }

    // Public & Customer Routes
    switch (page) {
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return user ? <CheckoutPage /> : <LoginPage />;
      case 'success':
        return <OrderSuccessPage />;
      case 'login':
        return <LoginPage />;
      case 'register':
        return <RegisterPage />;
      case 'account':
        if (user) {
          // Redirect admin users to their dashboard instead of the customer account page
          return user.role === 'admin' ? <AdminDashboard /> : <AccountPage />;
        }
        return <LoginPage />;
      case 'wishlist':
        return user ? <WishlistPage /> : <LoginPage />;
      case 'category':
        return <CategoryPage />;
      case 'productDetail':
        return <ProductDetailPage />;
      case 'about':
        return <AboutPage />;
      case 'searchResults':
        return <SearchResultsPage />;
      case 'contact':
        return <ContactPage />;
      case 'blog':
        return <BlogPage />;
      case 'blogDetail':
        return <BlogDetailPage />;
      case 'infoPage':
        return <InfoPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="bg-brand-cream font-sans text-brand-brown">
      <Header />
      <main>
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
