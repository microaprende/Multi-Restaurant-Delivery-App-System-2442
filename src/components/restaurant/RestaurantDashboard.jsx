import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import RestaurantSidebar from './RestaurantSidebar';
import RestaurantOverview from './RestaurantOverview';
import MenuManagement from './MenuManagement';
import RestaurantOrders from './RestaurantOrders';

const RestaurantDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50">
      <RestaurantSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}
      >
        <div className="p-6 h-full overflow-auto">
          <Routes>
            <Route path="/" element={<RestaurantOverview />} />
            <Route path="/menu" element={<MenuManagement />} />
            <Route path="/orders" element={<RestaurantOrders />} />
          </Routes>
        </div>
      </motion.div>
    </div>
  );
};

export default RestaurantDashboard;