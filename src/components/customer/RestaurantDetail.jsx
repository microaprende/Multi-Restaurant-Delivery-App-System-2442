import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiArrowLeft, FiStar, FiClock, FiDollarSign, FiPlus, FiMinus, FiShoppingCart } = FiIcons;

const RestaurantDetail = () => {
  const { id } = useParams();
  const { restaurants, cart, dispatch } = useApp();
  const [quantities, setQuantities] = useState({});

  const restaurant = restaurants.find(r => r.id === id);

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-900">Restaurante no encontrado</h1>
          <Link to="/customer" className="text-red-500 hover:text-red-700 mt-2 inline-block">
            Volver a restaurantes
          </Link>
        </div>
      </div>
    );
  }

  const menu = restaurant.menu || [];
  const categories = [...new Set(menu.map(item => item.category))];
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const getQuantity = (itemId) => quantities[itemId] || 0;

  const updateQuantity = (itemId, newQuantity) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(0, newQuantity)
    }));
  };

  const addToCart = (item) => {
    const quantity = getQuantity(item.id) || 1;
    for (let i = 0; i < quantity; i++) {
      dispatch({
        type: 'ADD_TO_CART',
        payload: {
          ...item,
          restaurantId: restaurant.id,
          restaurantName: restaurant.name
        }
      });
    }
    toast.success(`${item.name} agregado al carrito`);
    setQuantities(prev => ({
      ...prev,
      [item.id]: 0
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white z-40 border-b border-gray-100">
        <div className="flex items-center justify-between p-4">
          <Link to="/customer" className="p-2 -ml-2">
            <SafeIcon icon={FiArrowLeft} className="text-xl text-gray-700" />
          </Link>
          <h1 className="font-semibold text-gray-900 truncate mx-4">{restaurant.name}</h1>
          <div className="w-8" />
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="relative">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute bottom-4 left-4 text-white">
          <h2 className="text-2xl font-bold mb-2">{restaurant.name}</h2>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <SafeIcon icon={FiStar} className="text-yellow-400" />
              <span>{restaurant.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <SafeIcon icon={FiClock} />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <SafeIcon icon={FiDollarSign} />
              <span>Envío ${restaurant.deliveryFee}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="px-4 py-6 pb-24">
        {categories.length > 0 ? (
          <div className="space-y-6">
            {categories.map((category) => (
              <div key={category}>
                <h3 className="text-lg font-bold text-gray-900 mb-4">{category}</h3>
                <div className="space-y-4">
                  {menu
                    .filter(item => item.category === category)
                    .map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white border border-gray-100 rounded-lg p-4"
                      >
                        <div className="flex space-x-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{item.name}</h4>
                            <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                            <p className="text-lg font-bold text-red-500 mb-3">
                              ${item.price.toFixed(2)}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              {getQuantity(item.id) > 0 ? (
                                <div className="flex items-center space-x-3">
                                  <div className="flex items-center space-x-2">
                                    <button
                                      onClick={() => updateQuantity(item.id, getQuantity(item.id) - 1)}
                                      className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                                    >
                                      <SafeIcon icon={FiMinus} className="text-sm" />
                                    </button>
                                    <span className="w-8 text-center font-medium">{getQuantity(item.id)}</span>
                                    <button
                                      onClick={() => updateQuantity(item.id, getQuantity(item.id) + 1)}
                                      className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center"
                                    >
                                      <SafeIcon icon={FiPlus} className="text-sm" />
                                    </button>
                                  </div>
                                  <button
                                    onClick={() => addToCart(item)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium"
                                  >
                                    Agregar
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-1"
                                >
                                  <SafeIcon icon={FiPlus} className="text-sm" />
                                  <span>Agregar</span>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <SafeIcon icon={FiShoppingCart} className="text-4xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Menú no disponible</h3>
            <p className="text-gray-600">Este restaurante aún no ha configurado su menú</p>
          </div>
        )}
      </div>

      {/* Floating Cart Button */}
      {cartItemsCount > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-50">
          <Link to="/customer">
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              className="bg-red-500 text-white rounded-full px-6 py-4 flex items-center justify-between shadow-lg"
            >
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiShoppingCart} className="text-xl" />
                <span className="font-medium">{cartItemsCount} productos</span>
              </div>
              <span className="font-bold">Ver carrito</span>
            </motion.div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetail;