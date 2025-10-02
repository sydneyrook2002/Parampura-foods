// API Client for Parampara Foods Backend Integration
const API_BASE_URL = 'http://localhost:5123/api';
const STATIC_BASE_URL = 'http://localhost:5123';

// Types matching backend DTOs
export interface FoodDto {
  foodId: number;
  name: string;
  description: string;
  // Enhanced Pricing (in Indian Rupees ₹)
  mrp: number;
  salePrice?: number;
  price: number; // Computed property (SalePrice ?? MRP)
  discountPercentage?: number;
  isOnSale: boolean;
  savings: number;
  categoryId: number;
  categoryName: string;
  isAvailable: boolean;
  isOrganic: boolean;
  stockQuantity: number;
  imageUrl?: string;
  // Additional Details
  brand?: string;
  unit?: string;
  quantity: number;
  tags?: string;
  viewCount: number;
  rating: number;
  reviewCount: number;
  isLowStock: boolean;
}

export interface CategoryDto {
  categoryId: number;
  name: string;
  description?: string;
  isActive: boolean;
}

export interface CreateFoodDto {
  name: string;
  description: string;
  mrp: number;
  salePrice?: number;
  categoryId: number;
  isOrganic: boolean;
  stockQuantity: number;
  imageUrl?: string;
  brand?: string;
  unit?: string;
  quantity: number;
  tags?: string;
  minStockLevel: number;
}

export interface UpdateFoodDto {
  name: string;
  description: string;
  mrp: number;
  salePrice?: number;
  categoryId: number;
  isAvailable: boolean;
  isOrganic: boolean;
  stockQuantity: number;
  imageUrl?: string;
  brand?: string;
  unit?: string;
  quantity: number;
  tags?: string;
  minStockLevel: number;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  fullName: string;
  address: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  expiration: string;
}

export interface OrderCreateDto {
  deliveryAddress: string;
  customerNotes?: string;
  orderItems: OrderItemCreateDto[];
}

export interface OrderItemCreateDto {
  foodId: number;
  quantity: number;
}

export interface OrderDto {
  orderId: number;
  userId: string;
  userName: string;
  totalAmount: number;
  status: string;
  deliveryAddress: string;
  customerNotes?: string;
  orderDate: string;
  orderItems: OrderItemDto[];
}

export interface OrderItemDto {
  foodId: number;
  foodName: string;
  quantity: number;
  unitPrice: number;
}

export interface DashboardStatsDto {
  totalProducts: number;
  totalCategories: number;
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  lowStockProducts: number;
  organicProducts: number;
}

export interface UserDto {
  id: string;
  email: string;
  fullName: string;
  address: string;
  role: string;
}

export interface UpdateUserRoleDto {
  role: string;
}

export interface CreateUserDto {
  email: string;
  fullName: string;
  password: string;
  address: string;
  role: string;
}

export interface FeedbackDto {
  feedbackId: number;
  userId: string;
  userName: string;
  rating: number;
  comment?: string;
  createdAt: string;
  foodId?: number;
}

export interface CreateFeedbackDto {
  rating: number;
  comment?: string;
  foodId?: number;
}

export interface CreateCategoryDto {
  name: string;
  description?: string;
}

export interface WishlistDto {
  wishlistId: number;
  userId: string;
  foodId: number;
  createdAt: string;
  food?: FoodDto;
}

export interface CreateWishlistDto {
  foodId: number;
}

export interface OfferDto {
  offerId: number;
  title: string;
  description: string;
  type: OfferType;
  discountValue: number;
  minOrderAmount?: number;
  maxDiscountAmount?: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  maxUsageCount?: number;
  currentUsageCount: number;
  promoCode?: string;
  createdAt: string;
  updatedAt: string;
  productIds: number[];
  categoryIds: number[];
  productNames: string[];
  categoryNames: string[];
  isExpired: boolean;
  isUpcoming: boolean;
  isRunning: boolean;
  status: string;
}

export interface CreateOfferDto {
  title: string;
  description: string;
  type: OfferType;
  discountValue: number;
  minOrderAmount?: number;
  maxDiscountAmount?: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  maxUsageCount?: number;
  promoCode?: string;
  productIds: number[];
  categoryIds: number[];
}

export interface UpdateOfferDto {
  title: string;
  description: string;
  type: OfferType;
  discountValue: number;
  minOrderAmount?: number;
  maxDiscountAmount?: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  maxUsageCount?: number;
  promoCode?: string;
  productIds: number[];
  categoryIds: number[];
}

export enum OfferType {
  PercentageDiscount = 1,
  FixedDiscount = 2,
  BuyOneGetOne = 3,
  FreeShipping = 4
}

// API Client Class
class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    // Load token from localStorage on initialization
    this.token = localStorage.getItem('authToken');
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      if (response.status === 401) {
        // Token expired or invalid
        this.clearAuth();
        throw new Error('Authentication required');
      }
      
      const errorText = await response.text();
      
      // Parse user-friendly error messages for common scenarios
      if (response.status === 400) {
        if (errorText.includes('Invalid email or password') || errorText.includes('login')) {
          throw new Error('Invalid email or password. Please check your credentials and try again.');
        } else if (errorText.includes('validation')) {
          throw new Error('Please check your information and try again.');
        } else {
          throw new Error('Invalid request. Please check your information and try again.');
        }
      } else if (response.status === 403) {
        throw new Error('Access denied. You do not have permission to perform this action.');
      } else if (response.status === 404) {
        throw new Error('The requested resource was not found.');
      } else if (response.status === 409) {
        throw new Error('Conflict: This item already exists or there was a conflict with your request.');
      } else if (response.status >= 500) {
        throw new Error('Server error. Please try again later.');
      } else {
        throw new Error('Something went wrong. Please try again.');
      }
    }

    return response.json();
  }

  // Authentication Methods
  async login(loginData: LoginDto): Promise<AuthResponse> {
    const response = await fetch(`${this.baseUrl}/auth/login`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(loginData),
    });

    const authResponse = await this.handleResponse<AuthResponse>(response);
    
    // Store token
    this.token = authResponse.token;
    localStorage.setItem('authToken', authResponse.token);
    
    return authResponse;
  }

  async register(registerData: RegisterDto): Promise<string> {
    const response = await fetch(`${this.baseUrl}/auth/register`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(registerData),
    });

    // Handle registration response specially since backend returns plain text
    if (!response.ok) {
      if (response.status === 401) {
        this.clearAuth();
        throw new Error('Authentication required');
      }
      
      const errorText = await response.text();
      
      // Parse user-friendly error messages
      if (errorText.includes('DuplicateUserName') || errorText.includes('already taken')) {
        throw new Error('This email address is already registered. Please use a different email or try logging in.');
      } else if (errorText.includes('PasswordTooShort')) {
        throw new Error('Password must be at least 6 characters long.');
      } else if (errorText.includes('InvalidEmail')) {
        throw new Error('Please enter a valid email address.');
      } else if (errorText.includes('DuplicateEmail')) {
        throw new Error('This email address is already registered. Please use a different email or try logging in.');
      } else if (response.status === 400) {
        throw new Error('Please check your information and try again.');
      } else {
        throw new Error('Registration failed. Please try again later.');
      }
    }

    // For successful registration, return the plain text response
    return response.text();
  }

  clearAuth(): void {
    this.token = null;
    localStorage.removeItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  // Foods API Methods
  async getFoods(categoryId?: number): Promise<FoodDto[]> {
    const url = categoryId 
      ? `${this.baseUrl}/foods?categoryId=${categoryId}`
      : `${this.baseUrl}/foods`;
    
    const response = await fetch(url, {
      headers: this.getHeaders(),
    });

    const foods = await this.handleResponse<FoodDto[]>(response);
    
    // Convert relative image URLs to absolute URLs
    return foods.map(food => ({
      ...food,
      imageUrl: food.imageUrl?.startsWith('/') 
        ? `${STATIC_BASE_URL}${food.imageUrl}` 
        : food.imageUrl
    }));
  }

  async getFood(id: number): Promise<FoodDto> {
    const response = await fetch(`${this.baseUrl}/foods/${id}`, {
      headers: this.getHeaders(),
    });

    const food = await this.handleResponse<FoodDto>(response);
    
    // Convert relative image URL to absolute URL
    return {
      ...food,
      imageUrl: food.imageUrl?.startsWith('/') 
        ? `${STATIC_BASE_URL}${food.imageUrl}` 
        : food.imageUrl
    };
  }

  // Categories API Methods
  async getCategories(): Promise<CategoryDto[]> {
    const response = await fetch(`${this.baseUrl}/categories`, {
      headers: this.getHeaders(),
    });

    return this.handleResponse<CategoryDto[]>(response);
  }

  async getCategory(id: number): Promise<CategoryDto> {
    const response = await fetch(`${this.baseUrl}/categories/${id}`, {
      headers: this.getHeaders(),
    });

    return this.handleResponse<CategoryDto>(response);
  }

  // Product CRUD Methods
  async createFood(foodData: CreateFoodDto): Promise<FoodDto> {
    const response = await fetch(`${this.baseUrl}/foods`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(foodData),
    });

    const food = await this.handleResponse<FoodDto>(response);
    
    // Convert relative image URL to absolute URL
    return {
      ...food,
      imageUrl: food.imageUrl?.startsWith('/') 
        ? `${STATIC_BASE_URL}${food.imageUrl}` 
        : food.imageUrl
    };
  }

  async updateFood(id: number, foodData: UpdateFoodDto): Promise<FoodDto> {
    const response = await fetch(`${this.baseUrl}/foods/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(foodData),
    });

    const food = await this.handleResponse<FoodDto>(response);
    
    // Convert relative image URL to absolute URL
    return {
      ...food,
      imageUrl: food.imageUrl?.startsWith('/') 
        ? `${STATIC_BASE_URL}${food.imageUrl}` 
        : food.imageUrl
    };
  }

  async deleteFood(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/foods/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to delete food: ${response.statusText}`);
    }
  }

  // Orders API Methods
  async getOrders(): Promise<OrderDto[]> {
    const response = await fetch(`${this.baseUrl}/orders`, {
      headers: this.getHeaders(),
    });

    return this.handleResponse<OrderDto[]>(response);
  }

  async createOrder(orderData: OrderCreateDto): Promise<OrderDto> {
    const response = await fetch(`${this.baseUrl}/orders`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(orderData),
    });

    return this.handleResponse<OrderDto>(response);
  }

  async getOrder(id: number): Promise<OrderDto> {
    const response = await fetch(`${this.baseUrl}/orders/${id}`, {
      headers: this.getHeaders(),
    });

    return this.handleResponse<OrderDto>(response);
  }

  async updateOrderStatus(id: number, status: string, notes?: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/orders/${id}/status`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify({ status, notes }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update order status: ${response.statusText}`);
    }
  }

  async getUserOrders(): Promise<OrderDto[]> {
    // The backend automatically filters orders by user if not admin
    return this.getOrders();
  }

  // Dashboard Statistics Methods
  async getDashboardStats(): Promise<DashboardStatsDto> {
    // Since there's no dedicated dashboard endpoint, we'll calculate stats from existing data
    const [foods, categories, orders, users] = await Promise.all([
      this.getFoods(),
      this.getCategories(),
      this.getOrders(),
      this.getUsers().catch(() => []) // Fallback to empty array if users endpoint fails
    ]);

    const totalProducts = foods.length;
    const totalCategories = categories.length;
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const pendingOrders = orders.filter(order => order.status.toLowerCase() === 'pending').length;
    const lowStockProducts = foods.filter(food => food.isLowStock).length;
    const organicProducts = foods.filter(food => food.isOrganic).length;

    // Use real user count from API, fallback to unique user IDs from orders
    const totalUsers = users.length > 0 ? users.length : new Set(orders.map(order => order.userId)).size;

    return {
      totalProducts,
      totalCategories,
      totalUsers,
      totalOrders,
      totalRevenue,
      pendingOrders,
      lowStockProducts,
      organicProducts
    };
  }

  // Users API Methods
  async getUsers(): Promise<UserDto[]> {
    const response = await fetch(`${this.baseUrl}/users`, {
      headers: this.getHeaders(),
    });

    return this.handleResponse<UserDto[]>(response);
  }

  async getUser(id: string): Promise<UserDto> {
    const response = await fetch(`${this.baseUrl}/users/${id}`, {
      headers: this.getHeaders(),
    });

    return this.handleResponse<UserDto>(response);
  }

  async updateUserRole(id: string, role: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/users/${id}/role`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify({ role }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update user role: ${response.statusText}`);
    }
  }

  async createUser(userData: CreateUserDto): Promise<UserDto> {
    const response = await fetch(`${this.baseUrl}/users`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(userData),
    });

    return this.handleResponse<UserDto>(response);
  }

  async deleteUser(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/users/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to delete user: ${response.statusText}`);
    }
  }

  // Feedback API Methods
  async getFeedback(foodId?: number): Promise<FeedbackDto[]> {
    const url = foodId 
      ? `${this.baseUrl}/feedback?foodId=${foodId}`
      : `${this.baseUrl}/feedback`;
    const response = await fetch(url, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<FeedbackDto[]>(response);
  }

  async createFeedback(feedbackData: CreateFeedbackDto): Promise<FeedbackDto> {
    const response = await fetch(`${this.baseUrl}/feedback`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(feedbackData),
    });
    return this.handleResponse<FeedbackDto>(response);
  }

  async getAverageRating(foodId?: number): Promise<number> {
    const url = foodId 
      ? `${this.baseUrl}/feedback/average-rating?foodId=${foodId}`
      : `${this.baseUrl}/feedback/average-rating`;
    const response = await fetch(url, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<number>(response);
  }

  // Categories API Methods
  async createCategory(categoryData: CreateCategoryDto): Promise<CategoryDto> {
    const response = await fetch(`${this.baseUrl}/categories`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(categoryData),
    });
    return this.handleResponse<CategoryDto>(response);
  }

  async updateCategory(id: number, categoryData: CreateCategoryDto): Promise<void> {
    const response = await fetch(`${this.baseUrl}/categories/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(categoryData),
    });
    if (!response.ok) {
      throw new Error(`Failed to update category: ${response.statusText}`);
    }
  }

  async deleteCategory(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/categories/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Failed to delete category: ${response.statusText}`);
    }
  }

  // Wishlist API Methods
  async getWishlist(): Promise<WishlistDto[]> {
    const response = await fetch(`${this.baseUrl}/wishlist`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<WishlistDto[]>(response);
  }

  async addToWishlist(foodId: number): Promise<WishlistDto> {
    const response = await fetch(`${this.baseUrl}/wishlist`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ foodId }),
    });
    return this.handleResponse<WishlistDto>(response);
  }

  async removeFromWishlist(foodId: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/wishlist/${foodId}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Failed to remove from wishlist: ${response.statusText}`);
    }
  }

  async isInWishlist(foodId: number): Promise<boolean> {
    const response = await fetch(`${this.baseUrl}/wishlist/check/${foodId}`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<boolean>(response);
  }

  async clearWishlist(): Promise<void> {
    const response = await fetch(`${this.baseUrl}/wishlist/clear`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Failed to clear wishlist: ${response.statusText}`);
    }
  }

  // Offers API Methods
  async getOffers(): Promise<OfferDto[]> {
    const response = await fetch(`${this.baseUrl}/offers`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<OfferDto[]>(response);
  }

  async getActiveOffers(): Promise<OfferDto[]> {
    const response = await fetch(`${this.baseUrl}/offers/active`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<OfferDto[]>(response);
  }

  async getOffer(id: number): Promise<OfferDto> {
    const response = await fetch(`${this.baseUrl}/offers/${id}`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<OfferDto>(response);
  }

  async createOffer(offerData: CreateOfferDto): Promise<OfferDto> {
    const response = await fetch(`${this.baseUrl}/offers`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(offerData),
    });
    return this.handleResponse<OfferDto>(response);
  }

  async updateOffer(id: number, offerData: UpdateOfferDto): Promise<void> {
    const response = await fetch(`${this.baseUrl}/offers/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(offerData),
    });
    if (!response.ok) {
      throw new Error(`Failed to update offer: ${response.statusText}`);
    }
  }

  async deleteOffer(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/offers/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Failed to delete offer: ${response.statusText}`);
    }
  }

  async toggleOffer(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/offers/${id}/toggle`, {
      method: 'POST',
      headers: this.getHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Failed to toggle offer: ${response.statusText}`);
    }
  }
}

// Export singleton instance
export const apiClient = new ApiClient(API_BASE_URL);
export default apiClient;
