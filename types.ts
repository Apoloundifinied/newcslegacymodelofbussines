
export type Category = 'HUD' | 'Skin Change' | 'Config' | 'Scripts';

export interface Product {
  id: string;
  name: string;
  category: Category;
  description: string;
  price: number;
  imageUrl: string;
  rating: number;
}

export interface User {
  username: string;
  email: string;
  purchasedItems: string[];
  role: 'user' | 'admin';
}

export type View = 'home' | 'shop' | 'profile' | 'auth' | 'admin';
