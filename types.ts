
export interface Product {
  id: string;
  name: string;
  category: 'mascotas' | 'belleza' | 'bienestar';
  price: number;
  description: string;
  image: string;
  isNew?: boolean;
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  slug: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
