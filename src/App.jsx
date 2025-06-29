import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { AppProvider } from './context/AppContext';
import Login from './components/auth/Login';
import MasterDashboard from './components/master/MasterDashboard';
import RestaurantDashboard from './components/restaurant/RestaurantDashboard';
import CustomerApp from './components/customer/CustomerApp';
import DispatcherDashboard from './components/dispatcher/DispatcherDashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route 
              path="/master/*" 
              element={
                <ProtectedRoute allowedRoles={['master']}>
                  <MasterDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/restaurant/*" 
              element={
                <ProtectedRoute allowedRoles={['restaurant']}>
                  <RestaurantDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/customer/*" 
              element={<CustomerApp />}
            />
            <Route 
              path="/dispatcher/*" 
              element={
                <ProtectedRoute allowedRoles={['dispatcher']}>
                  <DispatcherDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;