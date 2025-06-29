import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiPlus, FiEdit, FiTrash2, FiToggleLeft, FiToggleRight, FiPhone, FiMapPin } = FiIcons;

const RestaurantManagement = () => {
  const { restaurants, dispatch } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    phone: '',
    address: '',
    image: '',
    deliveryFee: 0,
    deliveryTime: ''
  });

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      phone: '',
      address: '',
      image: '',
      deliveryFee: 0,
      deliveryTime: ''
    });
    setEditingRestaurant(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingRestaurant) {
      dispatch({
        type: 'UPDATE_RESTAURANT',
        payload: { ...editingRestaurant, ...formData }
      });
      toast.success('Restaurante actualizado');
    } else {
      const newRestaurant = {
        id: `rest${Date.now()}`,
        ...formData,
        rating: 0,
        isActive: true,
        menu: []
      };
      dispatch({ type: 'ADD_RESTAURANT', payload: newRestaurant });
      toast.success('Restaurante agregado');
    }
    
    setShowModal(false);
    resetForm();
  };

  const handleEdit = (restaurant) => {
    setEditingRestaurant(restaurant);
    setFormData({
      name: restaurant.name,
      category: restaurant.category,
      phone: restaurant.phone,
      address: restaurant.address,
      image: restaurant.image,
      deliveryFee: restaurant.deliveryFee,
      deliveryTime: restaurant.deliveryTime
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este restaurante?')) {
      dispatch({ type: 'DELETE_RESTAURANT', payload: id });
      toast.success('Restaurante eliminado');
    }
  };

  const toggleActive = (restaurant) => {
    dispatch({
      type: 'UPDATE_RESTAURANT',
      payload: { ...restaurant, isActive: !restaurant.isActive }
    });
    toast.success(`Restaurante ${restaurant.isActive ? 'desactivado' : 'activado'}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Restaurantes</h1>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowModal(true)}
          className="bg-primary-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors flex items-center space-x-2"
        >
          <SafeIcon icon={FiPlus} />
          <span>Agregar Restaurante</span>
        </motion.button>
      </div>

      {/* Restaurants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <motion.div
            key={restaurant.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="relative">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2">
                <button
                  onClick={() => toggleActive(restaurant)}
                  className={`p-2 rounded-full ${
                    restaurant.isActive ? 'bg-green-500' : 'bg-gray-400'
                  } text-white`}
                >
                  <SafeIcon icon={restaurant.isActive ? FiToggleRight : FiToggleLeft} />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{restaurant.name}</h3>
                <span className="text-sm text-gray-500">{restaurant.category}</span>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiPhone} className="text-gray-400" />
                  <span>{restaurant.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiMapPin} className="text-gray-400" />
                  <span>{restaurant.address}</span>
                </div>
                <div className="flex justify-between">
                  <span>Entrega: {restaurant.deliveryTime}</span>
                  <span>Costo: ${restaurant.deliveryFee}</span>
                </div>
              </div>
              
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => handleEdit(restaurant)}
                  className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-1"
                >
                  <SafeIcon icon={FiEdit} />
                  <span>Editar</span>
                </button>
                <button
                  onClick={() => handleDelete(restaurant.id)}
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center space-x-1"
                >
                  <SafeIcon icon={FiTrash2} />
                  <span>Eliminar</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-md"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editingRestaurant ? 'Editar Restaurante' : 'Agregar Restaurante'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Nombre del restaurante"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
              
              <input
                type="text"
                placeholder="Categoría"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
              
              <input
                type="tel"
                placeholder="Teléfono"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
              
              <input
                type="text"
                placeholder="Dirección"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
              
              <input
                type="url"
                placeholder="URL de imagen"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
              
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Costo de entrega"
                  value={formData.deliveryFee}
                  onChange={(e) => setFormData({ ...formData, deliveryFee: parseFloat(e.target.value) })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  step="0.01"
                  required
                />
                
                <input
                  type="text"
                  placeholder="Tiempo entrega"
                  value={formData.deliveryTime}
                  onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-400 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary-500 text-white py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors"
                >
                  {editingRestaurant ? 'Actualizar' : 'Agregar'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default RestaurantManagement;