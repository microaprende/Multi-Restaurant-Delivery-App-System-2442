import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import MasterSidebar from './MasterSidebar';
import MasterOverview from './MasterOverview';
import RestaurantManagement from './RestaurantManagement';
import OrderManagement from './OrderManagement';
import DispatcherManagement from './DispatcherManagement';
import Analytics from './Analytics';

const MasterDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50">
      <MasterSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}
      >
        <div className="p-6 h-full overflow-auto">
          <Routes>
            <Route path="/" element={<MasterOverview />} />
            <Route path="/restaurants" element={<RestaurantManagement />} />
            <Route path="/orders" element={<OrderManagement />} />
            <Route path="/dispatchers" element={<DispatcherManagement />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </div>
      </motion.div>
    </div>
  );
};

export default MasterDashboard;