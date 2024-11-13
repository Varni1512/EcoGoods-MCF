export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  amazonStock: number;
  category: string;
  image: string;
}

export interface Order {
  id: string;
  customerName: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
  total: number;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  shippingAddress: string;
  trackingNumber?: string;
}

export interface InventoryStats {
  totalProducts: number;
  lowStock: number;
  outOfStock: number;
  totalValue: number;
}