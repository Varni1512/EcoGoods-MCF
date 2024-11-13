import React, { useState } from 'react';
import { Search, Filter, Plus, X } from 'lucide-react';
import { Product } from '../types';

const mockProducts = [
  {
    id: '1',
    name: 'Bamboo Toothbrush',
    sku: 'BTB001',
    price: 4.99,
    stock: 245,
    amazonStock: 150,
    category: 'Personal Care',
    image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=200'
  },
  {
    id: '2',
    name: 'Reusable Water Bottle',
    sku: 'RWB002',
    price: 24.99,
    stock: 122,
    amazonStock: 80,
    category: 'Kitchen',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=200'
  },
  {
    id: '3',
    name: 'Organic Cotton Bags',
    sku: 'OCB003',
    price: 12.99,
    stock: 89,
    amazonStock: 60,
    category: 'Shopping',
    image: 'https://imgs.search.brave.com/ArR1nBOPMitlLHILWq58QCW7O0Xv8NGcIs0aH-OuXV8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/b3JnYW5pY2NvdHRv/bm1hcnQuY29tL2Nk/bi9zaG9wL3Byb2R1/Y3RzL09yZ2FuaWMt/Q290dG9uLUNhbnZh/cy1Ub3RlLUdyb2Nl/cnktQmFnc18xOTQ2/eC5qcGc_dj0xNzA2/Nzc5NjEx'
  }
];

const categories = [
  'All Categories',
  'Personal Care',
  'Kitchen',
  'Shopping',
  'Home Decor',
  'Cleaning'
];

const Inventory = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [newProduct, setNewProduct] = useState({
    name: '',
    sku: '',
    price: '',
    stock: '',
    amazonStock: '',
    category: '',
    image: ''
  });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const product = {
      id: (products.length + 1).toString(),
      name: newProduct.name,
      sku: newProduct.sku,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      amazonStock: parseInt(newProduct.amazonStock),
      category: newProduct.category,
      image: newProduct.image
    };
    setProducts([...products, product]);
    setShowAddModal(false);
    setNewProduct({
      name: '',
      sku: '',
      price: '',
      stock: '',
      amazonStock: '',
      category: '',
      image: ''
    });
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex-1 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
        <p className="text-gray-600">Manage your products across all channels</p>
      </header>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            className="btn btn-secondary flex items-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
        <button 
          className="btn btn-primary flex items-center gap-2"
          onClick={() => setShowAddModal(true)}
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {showFilters && (
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-medium mb-2">Filter by Category</h3>
          <div className="flex gap-2 flex-wrap">
            {categories.map(category => (
              <button
                key={category}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedCategory === category
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amazon MCF</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                    <span className="ml-4 font-medium">{product.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{product.sku}</td>
                <td className="px-6 py-4">${product.price}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    product.stock < 100 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {product.stock}
                  </span>
                </td>
                <td className="px-6 py-4">{product.amazonStock}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                    {product.category}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Product</h2>
              <button onClick={() => setShowAddModal(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleAddProduct}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SKU
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={newProduct.sku}
                    onChange={(e) => setNewProduct({...newProduct, sku: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock
                  </label>
                  <input
                    type="number"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amazon MCF Stock
                  </label>
                  <input
                    type="number"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={newProduct.amazonStock}
                    onChange={(e) => setNewProduct({...newProduct, amazonStock: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  >
                    <option value="">Select a category</option>
                    {categories.filter(cat => cat !== 'All Categories').map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;