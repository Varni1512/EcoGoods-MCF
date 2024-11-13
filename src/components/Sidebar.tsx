import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  Settings,
  Leaf
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Sidebar = ({ currentPage, onPageChange }: SidebarProps) => {
  return (
    <div className="bg-green-800 text-white w-64 min-h-screen p-4">
      <div className="flex items-center gap-2 mb-8">
        <Leaf className="w-8 h-8" />
        <span className="text-xl font-bold">EcoGoods MCF</span>
      </div>
      
      <nav>
        <SidebarLink 
          icon={<LayoutDashboard />} 
          text="Dashboard" 
          active={currentPage === 'dashboard'}
          onClick={() => onPageChange('dashboard')}
        />
        <SidebarLink 
          icon={<Package />} 
          text="Inventory" 
          active={currentPage === 'inventory'}
          onClick={() => onPageChange('inventory')}
        />
        <SidebarLink 
          icon={<ShoppingCart />} 
          text="Orders" 
          active={currentPage === 'orders'}
          onClick={() => onPageChange('orders')}
        />
        <SidebarLink 
          icon={<BarChart3 />} 
          text="Analytics" 
          active={currentPage === 'analytics'}
          onClick={() => onPageChange('analytics')}
        />
        <SidebarLink 
          icon={<Settings />} 
          text="Settings" 
          active={currentPage === 'settings'}
          onClick={() => onPageChange('settings')}
        />
      </nav>
    </div>
  );
};

const SidebarLink = ({ 
  icon, 
  text, 
  active = false,
  onClick
}: { 
  icon: React.ReactNode; 
  text: string; 
  active?: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors w-full text-left
        ${active 
          ? 'bg-green-700 text-white' 
          : 'text-green-100 hover:bg-green-700/50'
        }`}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
};

export default Sidebar;