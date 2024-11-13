import React from 'react';
import { 
  Package, 
  AlertTriangle, 
  TrendingUp, 
  DollarSign,
  Leaf,
  Droplet,
  Wind,
  TreePine
} from 'lucide-react';
import { format } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const stats = {
  totalProducts: 156,
  lowStock: 12,
  pendingOrders: 8,
  monthlyRevenue: 24650,
  carbonOffset: 1250, // kg CO2
  waterSaved: 5000, // liters
  energySaved: 750, // kWh
  treesPlanted: 45
};

const sustainabilityData = [
  { month: 'Jan', carbon: 1200, water: 4500, energy: 680 },
  { month: 'Feb', carbon: 1100, water: 4800, energy: 720 },
  { month: 'Mar', carbon: 1250, water: 5000, energy: 750 },
  { month: 'Apr', carbon: 1180, water: 4900, energy: 730 },
  { month: 'May', carbon: 1300, water: 5200, energy: 780 },
  { month: 'Jun', carbon: 1250, water: 5000, energy: 750 }
];

const recentOrders = [
  {
    id: '1',
    customer: 'Sarah Johnson',
    status: 'Processing',
    amount: 89.99,
    date: new Date(2024, 2, 15),
    ecoScore: 85
  },
  {
    id: '2',
    customer: 'Mike Peters',
    status: 'Shipped',
    amount: 145.50,
    date: new Date(2024, 2, 14),
    ecoScore: 92
  },
  {
    id: '3',
    customer: 'Emma Davis',
    status: 'Delivered',
    amount: 76.25,
    date: new Date(2024, 2, 13),
    ecoScore: 78
  }
];

const Dashboard = () => {
  return (
    <div className="flex-1 p-8 bg-gray-50">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Sustainability Dashboard</h1>
        <p className="text-gray-600">Monitor your business and environmental impact</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Carbon Offset"
          value={`${stats.carbonOffset} kg`}
          subtitle="CO₂ Equivalent"
          icon={<Leaf className="w-6 h-6" />}
          color="bg-green-500"
        />
        <StatCard 
          title="Water Saved"
          value={`${stats.waterSaved}L`}
          subtitle="Through Optimization"
          icon={<Droplet className="w-6 h-6" />}
          color="bg-blue-500"
        />
        <StatCard 
          title="Energy Saved"
          value={`${stats.energySaved} kWh`}
          subtitle="Renewable Energy"
          icon={<Wind className="w-6 h-6" />}
          color="bg-yellow-500"
        />
        <StatCard 
          title="Trees Planted"
          value={stats.treesPlanted}
          subtitle="Carbon Offset Program"
          icon={<TreePine className="w-6 h-6" />}
          color="bg-emerald-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Sustainability Metrics</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sustainabilityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="carbon" stroke="#10B981" name="Carbon Offset (kg)" />
                <Line type="monotone" dataKey="water" stroke="#3B82F6" name="Water Saved (L)" />
                <Line type="monotone" dataKey="energy" stroke="#F59E0B" name="Energy Saved (kWh)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Recent Orders</h2>
            <button className="text-green-600 hover:text-green-700">View all</button>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{order.customer}</p>
                  <p className="text-sm text-gray-500">
                    {format(order.date, 'MMM dd, yyyy')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${order.amount}</p>
                  <div className="flex items-center gap-2">
                    <OrderStatus status={order.status} />
                    <EcoScore score={order.ecoScore} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ 
  title, 
  value, 
  subtitle,
  icon, 
  color 
}: { 
  title: string; 
  value: string | number; 
  subtitle: string;
  icon: React.ReactNode; 
  color: string;
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-4">
        <div className={`${color} text-white p-3 rounded-lg`}>
          {icon}
        </div>
        <div>
          <p className="text-gray-600 text-sm">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

const OrderStatus = ({ status }: { status: string }) => {
  const getStatusStyle = () => {
    switch (status) {
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle()}`}>
      {status}
    </span>
  );
};

const EcoScore = ({ score }: { score: number }) => {
  const getScoreColor = () => {
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor()}`}>
      Eco Score: {score}
    </span>
  );
};

export default Dashboard;