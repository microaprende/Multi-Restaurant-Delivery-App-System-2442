import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import CustomerMobileLayout from './CustomerMobileLayout';
import RestaurantDetail from './RestaurantDetail';
import Cart from './Cart';

const CustomerApp = () => {
  const [showCart, setShowCart] = useState(false);
  const { customerDetails } = useApp();

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={
          <CustomerMobileLayout 
            onCartClick={() => setShowCart(true)}
          />
        } />
        <Route path="/restaurant/:id" element={<RestaurantDetail />} />
      </Routes>

      {/* Cart Sidebar */}
      {showCart && (
        <Cart 
          isOpen={showCart} 
          onClose={() => setShowCart(false)} 
        />
      )}
    </div>
  );
};

export default CustomerApp;