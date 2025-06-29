import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiShoppingCart, FiUser, FiClock } = FiIcons;

const CustomerHeader = ({ onCartClick, onProfileClick }) => {
  const { cart, customerDetails } = useApp();
  const location = useLocation();
  
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 bg-white shadow-sm z-40 border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/customer" className="flex items-center space-x-2">
            <SafeIcon icon={FiShoppingCart} className="text-2xl text-primary-500" />
            <span className="text-xl font-bold text-gray-900">DeliveryApp</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/customer"
              className={`font-medium transition-colors ${
                location.pathname === '/customer' 
                  ? 'text-primary-600' 
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Restaurantes
            </Link>
            <Link
              to="/customer/orders"
              className={`font-medium transition-colors ${
                location.pathname === '/customer/orders' 
                  ? 'text-primary-600' 
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Mis Pedidos
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <SafeIcon icon={FiShoppingCart} className="text-xl" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            <button
              onClick={onProfileClick}
              className="flex items-center space-x-2 p-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <SafeIcon icon={FiUser} />
              <span className="text-sm font-medium text-gray-700 hidden md:block">
                {customerDetails.name || 'Cliente'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default CustomerHeader;