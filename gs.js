import React, { useState } from 'react';
import { LayoutDashboard, Menu, X, Search } from 'lucide-react';

const PowerBIDashboardGUI = () => {
  // Configure your dashboards here
  const dashboards = [
    {
      id: 1,
      name: 'Sales Dashboard',
      embedUrl: '', // Add your Power BI embed URL here
      category: 'Sales'
    },
    {
      id: 2,
      name: 'Marketing Analytics',
      embedUrl: '', // Add your Power BI embed URL here
      category: 'Marketing'
    },
    {
      id: 3,
      name: 'Financial Overview',
      embedUrl: '', // Add your Power BI embed URL here
      category: 'Finance'
    },
    {
      id: 4,
      name: 'Operations Dashboard',
      embedUrl: '', // Add your Power BI embed URL here
      category: 'Operations'
    },
    // Add more dashboards as needed
  ];

  const [selectedDashboard, setSelectedDashboard] = useState(dashboards[0]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDashboards = dashboards.filter(dashboard =>
    dashboard.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dashboard.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedDashboards = filteredDashboards.reduce((acc, dashboard) => {
    if (!acc[dashboard.category]) {
      acc[dashboard.category] = [];
    }
    acc[dashboard.category].push(dashboard);
    return acc;
  }, {});

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-gray-900 text-white transition-all duration-300 overflow-hidden flex flex-col`}>
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <LayoutDashboard size={24} />
              <h1 className="text-xl font-bold">Dashboards</h1>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden hover:bg-gray-800 p-1 rounded"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search dashboards..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Dashboard List */}
        <div className="flex-1 overflow-y-auto p-4">
          {Object.keys(groupedDashboards).length === 0 ? (
            <p className="text-gray-400 text-sm text-center mt-4">No dashboards found</p>
          ) : (
            Object.entries(groupedDashboards).map(([category, items]) => (
              <div key={category} className="mb-6">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  {category}
                </h3>
                <div className="space-y-1">
                  {items.map((dashboard) => (
                    <button
                      key={dashboard.id}
                      onClick={() => setSelectedDashboard(dashboard)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedDashboard.id === dashboard.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-300 hover:bg-gray-800'
                      }`}
                    >
                      {dashboard.name}
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm p-4 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hover:bg-gray-100 p-2 rounded-lg transition-colors"
          >
            <Menu size={24} />
          </button>
          <h2 className="text-xl font-semibold text-gray-800">
            {selectedDashboard.name}
          </h2>
          <span className="ml-auto text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {selectedDashboard.category}
          </span>
        </div>

        {/* Dashboard Container */}
        <div className="flex-1 p-4">
          <div className="bg-white rounded-lg shadow-lg h-full overflow-hidden">
            {selectedDashboard.embedUrl ? (
              <iframe
                src={selectedDashboard.embedUrl}
                className="w-full h-full border-0"
                title={selectedDashboard.name}
                allowFullScreen
              />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <LayoutDashboard size={64} className="mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">No embed URL configured</p>
                  <p className="text-sm mt-2">Add your Power BI embed URL to the dashboard configuration</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PowerBIDashboardGUI;