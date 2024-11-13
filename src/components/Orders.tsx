import React, { useState } from 'react';
import { Search, Filter, Calendar, X } from 'lucide-react';
import { format } from 'date-fns';
import { Order } from '../types';

const mockOrders = [
  {
    id: 'ORD-001',
    customerName: 'Sarah Johnson',
    status: 'processing',
    items: [
      { productId: '1', quantity: 2, price: 29.99 },
      { productId: '2', quantity: 1, price: 30.01 }
    ],
    total: 89.99,
    date: '2024-03-15',
    shippingAddress: '123 Green St, Portland, OR'
  },
  {
    id: 'ORD-002',
    customerName: 'Mike Peters',
    status: 'shipped',
    items: [
      { productId: '2', quantity: 3, price: 48.50 }
    ],
    total: 145.50,
    date: '2024-03-14',
    shippingAddress: '456 Eco Ave, Seattle, WA',
    trackingNumber: 'MCF123456789'
  },
  {
    id: 'ORD-003',
    customerName: 'Emma Davis',
    status: 'delivered',
    items: [
      { productId: '3', quantity: 1, price: 76.25 }
    ],
    total: 76.25,
    date: '2024-03-13',
    shippingAddress: '789 Earth Blvd, Austin, TX',
    trackingNumber: 'MCF987654321'
  }
];

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    
    const matchesDate = !dateRange.start || !dateRange.end || 
      (order.date >= dateRange.start && order.date <= dateRange.end);

    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleDateRangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDatePicker(false);
  };

  return (
    <div className="flex-1 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-600">Track and manage your orders across all channels</p>
      </header>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search orders..."
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
          <button 
            className="btn btn-secondary flex items-center gap-2"
            onClick={() => setShowDatePicker(!showDatePicker)}
          >
            <Calendar className="w-4 h-4" />
            Date Range
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-medium mb-2">Filter by Status</h3>
          <div className="flex gap-2 flex-wrap">
            {['all', 'pending', 'processing', 'shipped', 'delivered'].map(status => (
              <button
                key={status}
                className={`px-3 py-1 rounded-full text-sm capitalize ${
                  selectedStatus === status
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedStatus(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      )}

      {showDatePicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Select Date Range</h2>
              <button onClick={() => setShowDatePicker(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleDateRangeSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDatePicker(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Apply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tracking</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{order.id}</td>
                <td className="px-6 py-4">{order.customerName}</td>
                <td className="px-6 py-4">
                  <OrderStatus status={order.status} />
                </td>
                <td className="px-6 py-4">${order.total.toFixed(2)}</td>
                <td className="px-6 py-4">{format(new Date(order.date), 'MMM dd, yyyy')}</td>
                <td className="px-6 py-4">
                  {order.trackingNumber ? (
                    <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
                      {order.trackingNumber}
                    </span>
                  ) : (
                    <span className="text-gray-400">Not available</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const OrderStatus = ({ status }: { status: string }) => {
  const getStatusStyle = () => {
    switch (status) {
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusStyle()}`}>
      {status}
    </span>
  );
};

export default Orders;