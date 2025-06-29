import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiHome, FiMenu, FiShoppingBag, FiLogOut, FiGrid } = FiIcons;

const RestaurantSidebar = ({ isOpen, onToggle }) => {
  const location = useLocation();
  const { logout, user } = useApp();

  const menuItems = [
    { path: '/restaurant', icon: FiHome, label: 'Dashboard', exact: true },
    { path: '/restaurant/menu', icon: FiGrid, label: 'Menú' },
    { path: '/restaurant/orders', icon: FiShoppingBag, label: 'Pedidos' }
  ];

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className={`fixed left-0 top-0 h-full bg-white shadow-lg z-50 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-16'
      }`}
    >
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className={`flex items-center ${isOpen ? '' : 'justify-center'}`}>
            <SafeIcon icon={FiShoppingBag} className="text-2xl text-primary-500" />
            {isOpen && (
              <div className="ml-3">
                <h1 className="text-lg font-bold text-gray-800">Restaurante</h1>
                <p className="text-sm text-gray-500">{user?.name}</p>
              </div>
            )}
          </div>
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <SafeIcon icon={FiMenu} className="text-gray-600" />
          </button>
        </div>
      </div>

      <nav className="mt-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-3 mx-2 rounded-lg transition-colors ${
              isActive(item.path, item.exact)
                ? 'bg-primary-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <SafeIcon icon={item.icon} className="text-xl" />
            {isOpen && <span className="ml-3 font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-4 left-0 right-0 px-2">
        <button
          onClick={logout}
          className="flex items-center w-full px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
        >
          <SafeIcon icon={FiLogOut} className="text-xl" />
          {isOpen && <span className="ml-3 font-medium">Cerrar Sesión</span>}
        </button>
      </div>
    </motion.div>
  );
};

export default RestaurantSidebar;