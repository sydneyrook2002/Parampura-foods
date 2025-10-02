import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { Product, CartItem, Page, User, Order, Review } from '../types';
import { allProducts, initialUsers, initialOrders, initialReviews } from '../services/api';

export interface AnalyticsData {
  revenue: number;
  orderCount: number;
  newCustomerCount: number;
  topSellingProducts: { product: Product, quantity: number }[];
  salesByPeriod?: { label: string; sales: number }[];
}

interface CartContextType {
  // Product State
  products: Product[];
  addProduct: (productData: Omit<Product, 'id' | 'rating'>) => void;
  updateProduct: (productData: Product) => void;
  deleteProduct: (productId: number) => void;

  // Cart State
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, newQuantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  getCartItemQuantity: (productId: number) => number;

  // Wishlist State
  wishlistItems: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;

  // Order State
  orders: Order[];
  placeOrder: () => void;
  updateOrderStatus: (orderId: number, status: Order['status']) => void;
  
  // Review State
  reviews: Review[];
  addReview: (productId: number, rating: number, comment: string) => void;

  // Admin Analytics
  getAnalytics: (period: 'month' | 'year' | 'all') => AnalyticsData;
  
  // App State
  page: Page;
  setPage: (page: Page) => void;
  activeCategoryId: string | null;
  viewCategory: (categoryId: string) => void;
  activeProductId: number | null;
  viewProduct: (productId: number) => void;
  activePostId: number | null;
  viewBlogPost: (postId: number) => void;
  activeInfoPageId: string | null;
  viewInfoPage: (pageId: string) => void;
  searchQuery: string;
  searchResults: Product[];
  performSearch: (query: string) => void;
  
  // Auth & User Management State
  user: User | null;
  users: User[];
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  register: (name: string, email: string, pass: string) => boolean;
  updateUserRole: (userId: number, role: 'customer' | 'admin') => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(allProducts);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [page, setPage] = useState<Page>('home');
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [activeProductId, setActiveProductId] = useState<number | null>(null);
  const [activePostId, setActivePostId] = useState<number | null>(null);
  const [activeInfoPageId, setActiveInfoPageId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  // --- Product Management ---
  const addProduct = (productData: Omit<Product, 'id' | 'rating'>) => {
    setProducts(prevProducts => {
        const newProduct: Product = {
            ...productData,
            id: Date.now(),
            rating: Math.floor(Math.random() * 2) + 4, // 4 or 5
        };
        return [...prevProducts, newProduct];
    });
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prevProducts => prevProducts.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };
  
  const deleteProduct = (productId: number) => {
    setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
  };

  // --- Cart Management ---
  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };
  
  const updateQuantity = (productId: number, newQuantity: number) => {
    setCartItems(prevItems => {
      if (newQuantity <= 0) {
        return prevItems.filter(item => item.id !== productId);
      }
      return prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const getCartItemQuantity = (productId: number) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  // --- Wishlist Management ---
  const addToWishlist = (product: Product) => {
    setWishlistItems(prev => {
      if (prev.find(item => item.id === product.id)) {
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId: number) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
  };

  const isInWishlist = (productId: number) => {
    return wishlistItems.some(item => item.id === productId);
  };

  // --- Order Management ---
  const placeOrder = () => {
    if (!user || cartItems.length === 0) return;
    const newOrder: Order = {
      id: Date.now(),
      userId: user.id,
      userName: user.name,
      items: cartItems,
      total: getCartTotal(),
      date: new Date(),
      status: 'Pending',
    };
    setOrders(prevOrders => [...prevOrders, newOrder]);
    clearCart();
  };
  
  const updateOrderStatus = (orderId: number, status: Order['status']) => {
    setOrders(prevOrders => prevOrders.map(order => order.id === orderId ? { ...order, status } : order));
  };

  // --- Review Management ---
  const addReview = (productId: number, rating: number, comment: string) => {
    if (!user) return;
    const newReview: Review = {
        id: Date.now(),
        productId,
        userId: user.id,
        userName: user.name,
        rating,
        comment,
        date: new Date(),
    };
    setReviews(prev => [...prev, newReview]);
  };

  // --- Admin Analytics ---
  const getAnalytics = useMemo(() => (period: 'month' | 'year' | 'all'): AnalyticsData => {
    const now = new Date();
    let startDate: Date;

    if (period === 'month') {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    } else if (period === 'year') {
      startDate = new Date(now.getFullYear(), 0, 1);
    } else {
      startDate = new Date(0); // Epoch
    }

    const filteredOrders = orders.filter(o => o.date >= startDate);
    
    const revenue = filteredOrders.reduce((sum, order) => sum + order.total, 0);
    const orderCount = filteredOrders.length;
    
    const customerIdsInPeriod = new Set(filteredOrders.map(o => o.userId));
    const newCustomerCount = [...customerIdsInPeriod].filter(id => {
      const firstOrder = orders.find(o => o.userId === id);
      return firstOrder && firstOrder.date >= startDate;
    }).length;

    const productCount = new Map<number, { product: Product, quantity: number }>();
    filteredOrders.forEach(order => {
      order.items.forEach(item => {
        const existing = productCount.get(item.id) || { product: item, quantity: 0 };
        productCount.set(item.id, { ...existing, quantity: existing.quantity + item.quantity });
      });
    });
    const topSellingProducts = [...productCount.values()]
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);
      
    let salesByPeriod;
    if (period === 'year') {
        salesByPeriod = Array.from({ length: 12 }, (_, i) => {
            const monthName = new Date(now.getFullYear(), i, 1).toLocaleString('default', { month: 'short' });
            const monthSales = filteredOrders
                .filter(o => o.date.getMonth() === i)
                .reduce((sum, o) => sum + o.total, 0);
            return { label: monthName, sales: monthSales };
        });
    }

    return { revenue, orderCount, newCustomerCount, topSellingProducts, salesByPeriod };
  }, [orders]);


  // --- Auth & User Management ---
  const login = (email: string, pass: string): boolean => {
    const foundUser = users.find(u => u.email === email && u.password === pass);
    if (foundUser) {
        setUser(foundUser);
        setPage(foundUser.role === 'admin' ? 'adminDashboard' : 'account');
        return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setPage('home');
  };
  
  const register = (name: string, email: string, pass: string): boolean => {
    if (users.find(u => u.email === email)) {
        return false; // User already exists
    }
    const newUser: User = { id: Date.now(), name, email, password: pass, role: 'customer' };
    setUsers(prevUsers => [...prevUsers, newUser]);
    setUser(newUser);
    setPage('account');
    return true;
  };
  
  const updateUserRole = (userId: number, role: 'customer' | 'admin') => {
    setUsers(prevUsers => prevUsers.map(u => u.id === userId ? { ...u, role } : u));
  };
  
  // --- Page Navigation & Search ---
  const viewCategory = (categoryId: string) => {
    setActiveCategoryId(categoryId);
    setPage('category');
  };
  
  const viewProduct = (productId: number) => {
    setActiveProductId(productId);
    setPage('productDetail');
  };
  
  const viewBlogPost = (postId: number) => {
    setActivePostId(postId);
    setPage('blogDetail');
  };

  const viewInfoPage = (pageId: string) => {
    setActiveInfoPageId(pageId);
    setPage('infoPage');
  };


  const performSearch = (query: string) => {
    setSearchQuery(query);
    const lowercasedQuery = query.toLowerCase();
    const results = products.filter(p => 
        p.name.toLowerCase().includes(lowercasedQuery) || 
        p.description.toLowerCase().includes(lowercasedQuery)
    );
    setSearchResults(results);
    setPage('searchResults');
  };


  return (
    <CartContext.Provider value={{ 
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      cartItems, 
      addToCart, 
      removeFromCart, 
      getCartTotal, 
      getCartItemCount,
      getCartItemQuantity,
      updateQuantity,
      clearCart,
      wishlistItems,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      orders,
      placeOrder,
      updateOrderStatus,
      reviews,
      addReview,
      getAnalytics,
      page,
      setPage,
      activeCategoryId,
      viewCategory,
      activeProductId,
      viewProduct,
      activePostId,
      viewBlogPost,
      activeInfoPageId,
      viewInfoPage,
      searchQuery,
      searchResults,
      performSearch,
      user,
      users,
      login,
      logout,
      register,
      updateUserRole,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
