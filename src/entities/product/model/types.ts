export interface Product {
  id: number;
  title: string;
  price: number;
  brand: string;
  category: string;
  thumbnail: string;
  rating: number;
  stock: number;
}

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
