// API Types matching backend DTOs

export interface ApiFood {
  foodId: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  categoryName: string;
  isAvailable: boolean;
  isOrganic: boolean;
  stockQuantity: number;
  imageUrl?: string;
}

export interface ApiCategory {
  categoryId: number;
  name: string;
  description?: string;
  isActive: boolean;
}

export interface ApiUser {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'User';
}

export interface ApiCartItem {
  foodId: number;
  name: string;
  price: number;
  imageUrl?: string;
  categoryId: number;
  categoryName: string;
  description: string;
  isOrganic: boolean;
  stockQuantity: number;
  quantity: number;
}

// Convert API types to frontend types
export function convertApiFood(apiFood: any): ApiCartItem {
  return {
    foodId: apiFood.foodId,
    name: apiFood.name,
    price: apiFood.salePrice || apiFood.mrp, // Use sale price if available, otherwise MRP
    imageUrl: apiFood.imageUrl,
    categoryId: apiFood.categoryId,
    categoryName: apiFood.categoryName,
    description: apiFood.description,
    isOrganic: apiFood.isOrganic,
    stockQuantity: apiFood.stockQuantity,
    quantity: 1, // Default quantity when adding to cart
  };
}

export function convertApiCategory(apiCategory: ApiCategory) {
  return {
    id: apiCategory.categoryId.toString(),
    name: apiCategory.name,
    description: apiCategory.description || '',
  };
}

