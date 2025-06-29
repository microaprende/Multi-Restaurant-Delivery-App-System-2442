import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import CustomerDetails from './CustomerDetails';

const { FiSearch, FiShoppingCart, FiMapPin, FiClock, FiStar, FiUser, FiHome, FiList, FiHeart } = FiIcons;

const CustomerMobileLayout = ({ onCartClick }) => {
  const { restaurants, cart, customerDetails, dispatch } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showProfile, setShowProfile] = useState(false);
  const [showDetailsForm, setShowDetailsForm] = useState(false);

  const activeRestaurants = restaurants.filter(r => r.isActive);
  const categories = ['all', ...new Set(activeRestaurants.map(r => r.category))];
  
  const filteredRestaurants = activeRestaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || restaurant.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (!customerDetails.name) {
      setShowDetailsForm(true);
    }
  }, [customerDetails.name]);

  const handleDetailsUpdate = () => {
    setShowDetailsForm(false);
  };

  if (showDetailsForm) {
    return (
      <div className="min-h-screen bg-white">
        <div className="p-4">
          <CustomerDetails onDetailsUpdate={handleDetailsUpdate} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white z-40 border-b border-gray-100">
        {/* Top Bar */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiMapPin} className="text-red-500 text-lg" />
            <div>
              <p className="text-sm font-medium text-gray-900">Entregar en</p>
              <p className="text-xs text-gray-500 truncate max-w-[200px]">
                {customerDetails.address || 'Agregar dirección'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowProfile(true)}
            className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center"
          >
            <SafeIcon icon={FiUser} className="text-gray-600" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-4">
          <div className="relative">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="¿Qué quieres comer?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-lg border-0 focus:ring-2 focus:ring-red-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="px-4 pb-4">
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category === 'all' ? 'Todos' : category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Restaurant List */}
      <div className="px-4 pb-20">
        {filteredRestaurants.length === 0 ? (
          <div className="text-center py-12">
            <SafeIcon icon={FiSearch} className="text-4xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron restaurantes</h3>
            <p className="text-gray-600">Intenta ajustar tu búsqueda</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRestaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/customer/restaurant/${restaurant.id}`}>
                  <div className="bg-white rounded-lg border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative">
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-full h-40 object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 shadow-md">
                        <div className="flex items-center space-x-1">
                          <SafeIcon icon={FiStar} className="text-yellow-400 text-xs" />
                          <span className="text-xs font-medium">{restaurant.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3">
                      <h3 className="font-semibold text-gray-900 mb-1">{restaurant.name}</h3>
                      <p className="text-xs text-gray-500 mb-2">{restaurant.category}</p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <div className="flex items-center space-x-1">
                          <SafeIcon icon={FiClock} className="text-gray-400" />
                          <span>{restaurant.deliveryTime}</span>
                        </div>
                        <span>Envío ${restaurant.deliveryFee}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex space-x-6">
            <button className="flex flex-col items-center space-y-1 p-2">
              <SafeIcon icon={FiHome} className="text-red-500 text-xl" />
              <span className="text-xs text-red-500 font-medium">Inicio</span>
            </button>
            
            <button className="flex flex-col items-center space-y-1 p-2">
              <SafeIcon icon={FiList} className="text-gray-400 text-xl" />
              <span className="text-xs text-gray-400">Pedidos</span>
            </button>
            
            <button className="flex flex-col items-center space-y-1 p-2">
              <SafeIcon icon={FiHeart} className="text-gray-400 text-xl" />
              <span className="text-xs text-gray-400">Favoritos</span>
            </button>
          </div>

          {/* Cart Button */}
          <button
            onClick={onCartClick}
            className="relative bg-red-500 text-white px-6 py-3 rounded-full flex items-center space-x-2 shadow-lg hover:bg-red-600 transition-colors"
          >
            <SafeIcon icon={FiShoppingCart} className="text-lg" />
            <span className="font-medium">Carrito</span>
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-red-500 text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="bg-white w-full rounded-t-xl p-6 max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Mi Perfil</h2>
              <button
                onClick={() => setShowProfile(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <CustomerDetails />

            <div className="mt-6 space-y-3">
              <button className="w-full bg-red-500 text-white py-3 rounded-lg font-medium">
                Mis Pedidos
              </button>
              <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium">
                Favoritos
              </button>
              <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium">
                Configuración
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CustomerMobileLayout;