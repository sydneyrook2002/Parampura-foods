import { useApiCart } from '../contexts/ApiCartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HomePage from '../components/HomePage';
import CartPage from '../components/CartPage';
import LoginPage from '../components/EnhancedLoginPage';
import RegisterPage from '../components/EnhancedRegisterPage';
import CategoryPage from '../components/CategoryPage';
import ApiProductDetailPage from '../components/ApiProductDetailPage';
import CheckoutPage from '../components/CheckoutPage';
import OrderSuccessPage from '../components/OrderSuccessPage';
import AboutPage from '../components/AboutPage';
import ContactPage from '../components/ContactPage';
import AdminDashboard from '../components/admin/AdminDashboard';
import AdminProductsPage from '../components/admin/AdminProductsPage';
import AdminUsersPage from '../components/admin/AdminUsersPage';
import AdminRolesPage from '../components/admin/AdminRolesPage';
import AdminOrdersPage from '../components/admin/AdminOrdersPage';
import AdminAnalyticsPage from '../components/admin/AdminAnalyticsPage';
import AdminReviewsPage from '../components/admin/AdminReviewsPage';
import AdminCategoriesPage from '../components/admin/AdminCategoriesPage';
import UserProfilePage from '../components/UserProfilePage';
import SearchResultsPage from '../components/SearchResultsPage';
import WishlistPage from '../components/WishlistPage';

const Index = () => {
  const { page } = useApiCart();

  const renderPage = () => {
    switch (page) {
      case 'cart':
        return <CartPage />;
      case 'login':
        return <LoginPage />;
      case 'register':
        return <RegisterPage />;
      case 'category':
        return <CategoryPage />;
      case 'productDetail':
        return <ApiProductDetailPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'success':
        return <OrderSuccessPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'searchResults':
        return <SearchResultsPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'adminDashboard':
        return <AdminDashboard />;
      case 'adminProducts':
        return <AdminProductsPage />;
      case 'adminUsers':
        return <AdminUsersPage />;
      case 'adminRoles':
        return <AdminRolesPage />;
      case 'adminOrders':
        return <AdminOrdersPage />;
      case 'adminAnalytics':
        return <AdminAnalyticsPage />;
      case 'adminReviews':
        return <AdminReviewsPage />;
      case 'adminCategories':
        return <AdminCategoriesPage />;
      case 'account':
        return <UserProfilePage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-modern">
      <Header />
      <main className="w-full overflow-x-hidden">{renderPage()}</main>
      <Footer />
    </div>
  );
};

export default Index;

