import React, { useState } from 'react';
import { Save, Check } from 'lucide-react';

interface SettingsState {
  mcf: {
    sellerId: string;
    accessKey: string;
    secretKey: string;
  };
  notifications: {
    lowStock: boolean;
    newOrders: boolean;
    shipmentUpdates: boolean;
  };
  warehouse: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
}

const Settings = () => {
  const [settings, setSettings] = useState<SettingsState>({
    mcf: {
      sellerId: '',
      accessKey: '',
      secretKey: ''
    },
    notifications: {
      lowStock: true,
      newOrders: true,
      shipmentUpdates: false
    },
    warehouse: {
      name: '',
      address: '',
      city: '',
      state: '',
      zip: ''
    }
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleMcfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      mcf: {
        ...settings.mcf,
        [e.target.name]: e.target.value
      }
    });
  };

  const handleNotificationChange = (key: keyof typeof settings.notifications) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: !settings.notifications[key]
      }
    });
  };

  const handleWarehouseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      warehouse: {
        ...settings.warehouse,
        [e.target.name]: e.target.value
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the settings to your backend
    console.log('Saving settings:', settings);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="flex-1 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Configure your Amazon MCF integration</p>
      </header>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Amazon MCF Credentials</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Seller ID
              </label>
              <input
                type="text"
                name="sellerId"
                value={settings.mcf.sellerId}
                onChange={handleMcfChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your Amazon Seller ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Access Key
              </label>
              <input
                type="password"
                name="accessKey"
                value={settings.mcf.accessKey}
                onChange={handleMcfChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your Access Key"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Secret Key
              </label>
              <input
                type="password"
                name="secretKey"
                value={settings.mcf.secretKey}
                onChange={handleMcfChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your Secret Key"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Warehouse Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Warehouse Name
              </label>
              <input
                type="text"
                name="name"
                value={settings.warehouse.name}
                onChange={handleWarehouseChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter warehouse name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street Address
              </label>
              <input
                type="text"
                name="address"
                value={settings.warehouse.address}
                onChange={handleWarehouseChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter street address"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={settings.warehouse.city}
                  onChange={handleWarehouseChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter city"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={settings.warehouse.state}
                  onChange={handleWarehouseChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter state"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ZIP Code
              </label>
              <input
                type="text"
                name="zip"
                value={settings.warehouse.zip}
                onChange={handleWarehouseChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter ZIP code"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Low Stock Alerts</h3>
                <p className="text-sm text-gray-500">Get notified when inventory is running low</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.notifications.lowStock}
                  onChange={() => handleNotificationChange('lowStock')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">New Order Notifications</h3>
                <p className="text-sm text-gray-500">Receive notifications for new orders</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.notifications.newOrders}
                  onChange={() => handleNotificationChange('newOrders')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Shipment Updates</h3>
                <p className="text-sm text-gray-500">Get notifications for shipment status changes</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.notifications.shipmentUpdates}
                  onChange={() => handleNotificationChange('shipmentUpdates')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button type="submit" className="btn btn-primary flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Settings
          </button>
          
          {showSuccess && (
            <div className="flex items-center gap-2 text-green-600">
              <Check className="w-5 h-5" />
              <span>Settings saved successfully</span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Settings;