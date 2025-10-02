export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  imageUrls: string[];
  isNew: boolean;
  isSale: boolean;
  rating: number;
  categoryId: string;
  description: string;
  specification: { key: string; value: string; }[];
  sku?: string;
  brand?: string;
  availability?: 'In Stock' | 'Out of Stock';
  tags?: string[];
  ingredients?: string;
  nutrition?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  allergens?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type Page = 
  | 'home' 
  | 'cart' 
  | 'checkout' 
  | 'success' 
  | 'login' 
  | 'register' 
  | 'account'
  | 'category'
  | 'productDetail'
  | 'about'
  | 'searchResults'
  | 'contact'
  | 'adminDashboard'
  | 'adminProducts'
  | 'adminUsers'
  | 'adminOrders'
  | 'adminAnalytics'
  | 'adminReviews'
  | 'wishlist'
  | 'blog'
  | 'blogDetail'
  | 'infoPage';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'customer' | 'admin';
}

export interface OrderItem extends Product {
  quantity: number;
}

export interface Order {
  id: number;
  userId: number;
  userName:string;
  items: OrderItem[];
  total: number;
  date: Date;
  status: 'Pending' | 'Shipped' | 'Completed';
}

export interface Review {
  id: number;
  productId: number;
  userId: number;
  userName: string;
  rating: number; // 1-5
  comment: string;
  date: Date;
}

export interface Slide {
  id: number;
  imageUrl: string;
  title: string;
  subtitle: string;
  buttonText: string;
}

export interface BlogPost {
  id: number;
  imageUrl: string;
  date: string;
  title: string;
  excerpt: string;
  author: string;
  content: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  imageUrl: string;
}

export interface Brand {
  id: number;
  name: string;
  imageUrl: string;
}

export interface NavLink {
  id: string;
  text: string;
  href: string;
  page?: Page;
  submenu?: { id: string; text: string; href: string; }[];
}

export interface SiteInfo {
  phone: string;
  email: string;
  address: string;
  instagram: string;
  whatsapp: string;
  socials: {
    facebook: string;
    twitter: string;
    pinterest: string;
    linkedin: string;
  };
}

export interface WelcomeContent {
  title: string;
  subtitle: string;
  paragraph1: string;
  paragraph2: string;
  imageUrl: string;
}

export interface FooterLink {
  text: string;
  href: string;
  page?: Page;
}

export interface FooterData {
  about: {
    title: string;
    text: string;
  };
  informationLinks: FooterLink[];
  accountLinks: FooterLink[];
  newsletter: {
    title: string;
    text: string;
  };
}

export interface ProductCategory {
  id: string;
  name: string;
  imageUrl: string;
}

export interface AboutPageContent {
    title: string;
    subtitle: string;
    paragraph1: string;
    paragraph2: string;
    imageUrl: string;
}

export interface WhyChooseUsItem {
    id: number;
    icon: string;
    title: string;
    description: string;
}

export interface TeamMember {
    id: number;
    name: string;
    role: string;
    imageUrl: string;
}

export interface ContactPageContent {
    title: string;
    subtitle: string;
    address: string;
    phone: string;
    email: string;
    businessHours: {
        days: string;
        hours: string;
    }[];
    mapUrl: string;
}

export interface InfoPageContent {
  id: string;
  title: string;
  content: string;
}
