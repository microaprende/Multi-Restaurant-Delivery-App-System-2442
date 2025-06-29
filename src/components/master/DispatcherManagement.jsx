import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiPlus, FiEdit, FiTrash2, FiToggleLeft, FiToggleRight, FiPhone, FiStar, FiTruck } = FiIcons;

const DispatcherManagement = () => {
  const { dispatchers } = useApp();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Despachadores</h1>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowModal(true)}
          className="bg-primary-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors flex items-center space-x-2"
        >
          <SafeIcon icon={FiPlus} />
          <span>Agregar Despachador</span>
        </motion.button>
      </div>

      {/* Dispatchers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dispatchers.map((dispatcher) => (
          <motion.div
            key={dispatcher.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                  <SafeIcon icon={FiTruck} className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{dispatcher.name}</h3>
                  <div className="flex items-center space-x-1">
                    <SafeIcon icon={FiStar} className="text-yellow-400 text-sm" />
                    <span className="text-sm text-gray-600">{dispatcher.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className={`p-2 rounded-full ${
                  dispatcher.isActive ? 'bg-green-500' : 'bg-gray-400'
                } text-white`}>
                  <SafeIcon icon={dispatcher.isActive ? FiToggleRight : FiToggleLeft} />
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <SafeIcon icon={FiPhone} className="text-gray-400" />
                <span>{dispatcher.phone}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Entregas realizadas</span>
                  <p className="font-semibold text-gray-900">{dispatcher.completedDeliveries}</p>
                </div>
                <div>
                  <span className="text-gray-500">Estado</span>
                  <p className={`font-semibold ${
                    dispatcher.isActive ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    {dispatcher.isActive ? 'Activo' : 'Inactivo'}
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-2 pt-4">
                <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-1">
                  <SafeIcon icon={FiEdit} />
                  <span>Editar</span>
                </button>
                <button className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center space-x-1">
                  <SafeIcon icon={FiTrash2} />
                  <span>Eliminar</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Dispatcher Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-md"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Agregar Despachador</h2>
            
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Nombre completo"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
              
              <input
                type="tel"
                placeholder="Teléfono"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
              
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-400 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary-500 text-white py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors"
                >
                  Agregar
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DispatcherManagement;