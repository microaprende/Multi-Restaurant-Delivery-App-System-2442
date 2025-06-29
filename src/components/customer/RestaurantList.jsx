import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiSearch, FiFilter, FiStar, FiClock, FiDollarSign } = FiIcons;

const RestaurantList = () => {
  const { restaurants } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const activeRestaurants = restaurants.filter(r => r.isActive);
  
  const filteredRestaurants = activeRestaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || restaurant.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(activeRestaurants.map(r => r.category))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          ¿Qué quieres comer hoy?
        </h1>
        <p className="text-xl text-gray-600">
          Descubre los mejores restaurantes de tu ciudad
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar restaurantes o comida..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiFilter} className="text-gray-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">Todas las categorías</option>
              {categories.slice(1).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Restaurant Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRestaurants.map((restaurant, index) => (
          <motion.div
            key={restaurant.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group"
          >
            <Link to={`/customer/restaurant/${restaurant.id}`}>
              <div className="relative">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
                  <div className="flex items-center space-x-1">
                    <SafeIcon icon={FiStar} className="text-yellow-400 text-sm" />
                    <span className="text-sm font-medium">{restaurant.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {restaurant.name}
                  </h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {restaurant.category}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <SafeIcon icon={FiClock} className="text-gray-400" />
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <SafeIcon icon={FiDollarSign} className="text-gray-400" />
                    <span>Envío ${restaurant.deliveryFee}</span>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <span className="text-primary-600 font-medium group-hover:text-primary-700 transition-colors">
                    Ver menú →
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {filteredRestaurants.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <SafeIcon icon={FiSearch} className="text-4xl text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron restaurantes</h3>
          <p className="text-gray-600">
            Intenta ajustar tu búsqueda o filtros
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default RestaurantList;