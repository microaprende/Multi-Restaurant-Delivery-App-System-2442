import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiPlus, FiEdit, FiTrash2 } = FiIcons;

const MenuManagement = () => {
  const { restaurants, user, dispatch } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const restaurant = restaurants.find(r => r.id === user?.restaurantId);
  const menu = restaurant?.menu || [];

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    image: ''
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: 0,
      category: '',
      image: ''
    });
    setEditingItem(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingItem) {
      const updatedMenu = menu.map(item =>
        item.id === editingItem.id ? { ...item, ...formData } : item
      );
      dispatch({
        type: 'UPDATE_RESTAURANT',
        payload: { ...restaurant, menu: updatedMenu }
      });
      toast.success('Producto actualizado');
    } else {
      const newItem = {
        id: `item${Date.now()}`,
        ...formData,
        price: parseFloat(formData.price)
      };
      dispatch({
        type: 'UPDATE_RESTAURANT',
        payload: { ...restaurant, menu: [...menu, newItem] }
      });
      toast.success('Producto agregado');
    }
    
    setShowModal(false);
    resetForm();
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      image: item.image
    });
    setShowModal(true);
  };

  const handleDelete = (itemId) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      const updatedMenu = menu.filter(item => item.id !== itemId);
      dispatch({
        type: 'UPDATE_RESTAURANT',
        payload: { ...restaurant, menu: updatedMenu }
      });
      toast.success('Producto eliminado');
    }
  };

  const categories = [...new Set(menu.map(item => item.category))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Gestión del Menú</h1>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowModal(true)}
          className="bg-primary-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors flex items-center space-x-2"
        >
          <SafeIcon icon={FiPlus} />
          <span>Agregar Producto</span>
        </motion.button>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {menu
                  .filter(item => item.category === category)
                  .map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-lg font-bold text-primary-600">
                            ${item.price.toFixed(2)}
                          </span>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(item)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                            >
                              <SafeIcon icon={FiEdit} />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded"
                            >
                              <SafeIcon icon={FiTrash2} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {menu.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <SafeIcon icon={FiPlus} className="text-4xl text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay productos en el menú</h3>
          <p className="text-gray-600 mb-4">Comienza agregando tu primer producto al menú</p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors"
          >
            Agregar Producto
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-md"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editingItem ? 'Editar Producto' : 'Agregar Producto'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Nombre del producto"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
              
              <textarea
                placeholder="Descripción"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows="3"
                required
              />
              
              <input
                type="number"
                placeholder="Precio"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                step="0.01"
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
                type="url"
                placeholder="URL de imagen"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
              
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
                  {editingItem ? 'Actualizar' : 'Agregar'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MenuManagement;