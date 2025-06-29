import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import DispatcherSidebar from './DispatcherSidebar';
import DispatcherOverview from './DispatcherOverview';
import AvailableOrders from './AvailableOrders';
import MyDeliveries from './MyDeliveries';

const DispatcherDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50">
      <DispatcherSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}
      >
        <div className="p-6 h-full overflow-auto">
          <Routes>
            <Route path="/" element={<DispatcherOverview />} />
            <Route path="/available" element={<AvailableOrders />} />
            <Route path="/deliveries" element={<MyDeliveries />} />
          </Routes>
        </div>
      </motion.div>
    </div>
  );
};

export default DispatcherDashboard;