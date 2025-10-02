import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiClient, FoodDto, CategoryDto, AuthResponse, OrderCreateDto, WishlistDto } from '../services/apiClient';
import { ApiCartItem, ApiUser, convertApiFood } from '../types/api';

interface ApiCartContextType {
  // Product State
  foods: FoodDto[];
  categories: CategoryDto[];
  loading: boolean;
  error: string | null;
  clearError: () => void;
  
  // Cart State
  cart: ApiCartItem[];
  wishlist: FoodDto[];
  cartTotal: number;
  
  // Auth State
  user: ApiUser | null;
  isAuthenticated: boolean;
  
  // Page State
  page: string;
  selectedCategory: string | null;
  selectedProduct: FoodDto | null;
  searchQuery: string;
  searchResults: FoodDto[];
  
  // API Methods
  loadFoods: (categoryId?: number) => Promise<void>;
  loadCategories: () => Promise<void>;
  searchFoods: (query: string) => void;
  
  // Cart Methods
  addToCart: (food: FoodDto) => void;
  removeFromCart: (foodId: number) => void;
  updateQuantity: (foodId: number, quantity: number) => void;
  clearCart: () => void;
  
  // Wishlist Methods
  addToWishlist: (food: FoodDto) => Promise<void>;
  removeFromWishlist: (foodId: number) => Promise<void>;
  loadWishlist: () => Promise<void>;
  
  // Auth Methods
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, address: string) => Promise<boolean>;
  logout: () => void;
  
  // Order Methods
  placeOrder: (deliveryAddress: string, customerNotes?: string) => Promise<boolean>;
  
  // Navigation Methods
  setPage: (page: string) => void;
  viewCategory: (categoryId: string) => void;
  viewProduct: (foodId: number) => void;
  performSearch: (query: string) => void;
}

const ApiCartContext = createContext<ApiCartContextType | undefined>(undefined);

export const ApiCartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State
  const [foods, setFoods] = useState<FoodDto[]>([]);
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [cart, setCart] = useState<ApiCartItem[]>([]);
  const [wishlist, setWishlist] = useState<FoodDto[]>([]);
  
  const [user, setUser] = useState<ApiUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [page, setPageState] = useState('home');
  
  // Custom setPage function that scrolls to top
  const setPage = (newPage: string) => {
    setPageState(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<FoodDto | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FoodDto[]>([]);

  // Computed values
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Load data on mount
  useEffect(() => {
    loadCategories();
    loadFoods();
    
    // Check if user is already authenticated
    if (apiClient.isAuthenticated()) {
      setIsAuthenticated(true);
      // You might want to load user profile here
    }
    
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    
    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // API Methods
  const loadFoods = async (categoryId?: number) => {
    try {
      setLoading(true);
      setError(null);
      const foodsData = await apiClient.getFoods(categoryId);
      setFoods(foodsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load foods');
      console.error('Error loading foods:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      setError(null);
      const categoriesData = await apiClient.getCategories();
      setCategories(categoriesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load categories');
      console.error('Error loading categories:', err);
    }
  };

  const searchFoods = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    const lowercaseQuery = query.toLowerCase();
    const results = foods.filter(food => 
      food.name.toLowerCase().includes(lowercaseQuery) ||
      food.description.toLowerCase().includes(lowercaseQuery) ||
      food.categoryName.toLowerCase().includes(lowercaseQuery)
    );
    setSearchResults(results);
  };

  // Cart Methods
  const addToCart = (food: FoodDto) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.foodId === food.foodId);
      if (existingItem) {
        return prevCart.map(item =>
          item.foodId === food.foodId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, convertApiFood(food)];
    });
  };

  const removeFromCart = (foodId: number) => {
    setCart(prevCart => prevCart.filter(item => item.foodId !== foodId));
  };

  const updateQuantity = (foodId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(foodId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.foodId === foodId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist Methods
  const loadWishlist = async () => {
    if (!isAuthenticated) {
      setWishlist([]);
      return;
    }

    try {
      const wishlistItems = await apiClient.getWishlist();
      const foods = wishlistItems.map(item => item.food!).filter(food => food !== undefined);
      setWishlist(foods);
    } catch (error) {
      console.error('Error loading wishlist:', error);
      setWishlist([]);
    }
  };

  const addToWishlist = async (food: FoodDto) => {
    if (!isAuthenticated) {
      setError('Please login to add items to wishlist');
      return;
    }

    try {
      await apiClient.addToWishlist(food.foodId);
      setWishlist(prevWishlist => {
        if (prevWishlist.find(item => item.foodId === food.foodId)) {
          return prevWishlist;
        }
        return [...prevWishlist, food];
      });
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      setError('Failed to add item to wishlist');
    }
  };

  const removeFromWishlist = async (foodId: number) => {
    if (!isAuthenticated) {
      return;
    }

    try {
      await apiClient.removeFromWishlist(foodId);
      setWishlist(prevWishlist => prevWishlist.filter(item => item.foodId !== foodId));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      setError('Failed to remove item from wishlist');
    }
  };

  // Auth Methods
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      const authResponse = await apiClient.login({ email, password });
      
      // Set user state (you might want to decode JWT to get user info)
      const newUser = {
        id: '1', // You'd get this from JWT token
        name: email.split('@')[0],
        fullName: email.split('@')[0],
        email,
        role: email.includes('admin') ? 'Admin' : 'User'
      };
      
      setUser(newUser);
      setIsAuthenticated(true);
      
      // Load user's wishlist after successful login
      await loadWishlist();
      
      // Don't set page here - let the LoginPage component handle redirect
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      console.error('Login error:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, address: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      await apiClient.register({
        email,
        password,
        fullName: name,
        address,
        role: 'User'
      });
      
      // Auto-login after registration
      return await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      console.error('Registration error:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const logout = () => {
    apiClient.clearAuth();
    setUser(null);
    setIsAuthenticated(false);
    setPage('home');
    clearCart(); // Optional: clear cart on logout
    setWishlist([]); // Clear wishlist on logout
  };

  // Order Methods
  const placeOrder = async (deliveryAddress: string, customerNotes?: string): Promise<boolean> => {
    if (!isAuthenticated) {
      setError('Please login to place an order');
      return false;
    }

    if (cart.length === 0) {
      setError('Cart is empty');
      return false;
    }

    try {
      setLoading(true);
      setError(null);

      const orderData: OrderCreateDto = {
        deliveryAddress,
        customerNotes,
        orderItems: cart.map(item => ({
          foodId: item.foodId,
          quantity: item.quantity
        }))
      };

      await apiClient.createOrder(orderData);
      clearCart();
      setPage('success');
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to place order');
      console.error('Order error:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Navigation Methods
  const viewCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setPage('category');
    
    // Scroll to top when navigating to category page
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Load foods for this category
    const numericCategoryId = parseInt(categoryId);
    if (!isNaN(numericCategoryId)) {
      loadFoods(numericCategoryId);
    } else {
      loadFoods(); // Load all foods if categoryId is not numeric
    }
  };

  const viewProduct = (foodId: number) => {
    const product = foods.find(f => f.foodId === foodId);
    if (product) {
      setSelectedProduct(product);
      setPage('productDetail');
      // Scroll to top when navigating to product detail page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const performSearch = (query: string) => {
    setSearchQuery(query);
    searchFoods(query);
    setPage('searchResults');
    // Scroll to top when navigating to search results page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const contextValue: ApiCartContextType = {
    // Product State
    foods,
    categories,
    loading,
    error,
    clearError,
    
    // Cart State
    cart,
    wishlist,
    cartTotal,
    
    // Auth State
    user,
    isAuthenticated,
    
    // Page State
    page,
    selectedCategory,
    selectedProduct,
    searchQuery,
    searchResults,
    
    // API Methods
    loadFoods,
    loadCategories,
    searchFoods,
    
    // Cart Methods
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    
    // Wishlist Methods
    addToWishlist,
    removeFromWishlist,
    loadWishlist,
    
    // Auth Methods
    login,
    register,
    logout,
    
    // Order Methods
    placeOrder,
    
    // Navigation Methods
    setPage,
    viewCategory,
    viewProduct,
    performSearch,
  };

  return (
    <ApiCartContext.Provider value={contextValue}>
      {children}
    </ApiCartContext.Provider>
  );
};

export const useApiCart = () => {
  const context = useContext(ApiCartContext);
  if (context === undefined) {
    throw new Error('useApiCart must be used within an ApiCartProvider');
  }
  return context;
};
