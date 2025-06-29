import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiUser, FiPhone, FiMapPin, FiSave, FiEdit } = FiIcons;

const CustomerDetails = ({ onDetailsUpdate }) => {
  const { customerDetails, dispatch } = useApp();
  const [isEditing, setIsEditing] = useState(!customerDetails.name);
  const [formData, setFormData] = useState({
    name: customerDetails.name || '',
    phone: customerDetails.phone || '',
    address: customerDetails.address || '',
    additionalInfo: customerDetails.additionalInfo || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) {
      toast.error('Por favor completa todos los campos obligatorios');
      return;
    }

    dispatch({
      type: 'UPDATE_CUSTOMER_DETAILS',
      payload: formData
    });

    setIsEditing(false);
    toast.success('Datos actualizados correctamente');
    
    if (onDetailsUpdate) {
      onDetailsUpdate(formData);
    }
  };

  if (!isEditing && customerDetails.name) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Mis Datos</h3>
          <button
            onClick={() => setIsEditing(true)}
            className="text-primary-600 hover:text-primary-700 flex items-center space-x-1"
          >
            <SafeIcon icon={FiEdit} />
            <span>Editar</span>
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <SafeIcon icon={FiUser} className="text-gray-400" />
            <div>
              <p className="font-medium text-gray-900">{customerDetails.name}</p>
              <p className="text-sm text-gray-500">Nombre completo</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <SafeIcon icon={FiPhone} className="text-gray-400" />
            <div>
              <p className="font-medium text-gray-900">{customerDetails.phone}</p>
              <p className="text-sm text-gray-500">Teléfono</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <SafeIcon icon={FiMapPin} className="text-gray-400 mt-1" />
            <div>
              <p className="font-medium text-gray-900">{customerDetails.address}</p>
              <p className="text-sm text-gray-500">Dirección de entrega</p>
              {customerDetails.additionalInfo && (
                <p className="text-sm text-gray-600 mt-1">{customerDetails.additionalInfo}</p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {customerDetails.name ? 'Editar Datos' : 'Completa tus datos'}
        </h3>
        <p className="text-gray-600">
          {customerDetails.name 
            ? 'Actualiza tu información personal' 
            : 'Necesitamos algunos datos para procesar tu pedido'
          }
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre completo *
          </label>
          <div className="relative">
            <SafeIcon icon={FiUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Tu nombre completo"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Número de teléfono *
          </label>
          <div className="relative">
            <SafeIcon icon={FiPhone} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Tu número de teléfono"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dirección de entrega *
          </label>
          <div className="relative">
            <SafeIcon icon={FiMapPin} className="absolute left-3 top-3 text-gray-400" />
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Dirección completa para la entrega"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows="2"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Información adicional (opcional)
          </label>
          <textarea
            value={formData.additionalInfo}
            onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
            placeholder="Referencias, instrucciones especiales, etc."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            rows="2"
          />
        </div>

        <div className="flex space-x-3 pt-4">
          {customerDetails.name && (
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setFormData({
                  name: customerDetails.name,
                  phone: customerDetails.phone,
                  address: customerDetails.address,
                  additionalInfo: customerDetails.additionalInfo || ''
                });
              }}
              className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-400 transition-colors"
            >
              Cancelar
            </button>
          )}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="flex-1 bg-primary-500 text-white py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors flex items-center justify-center space-x-2"
          >
            <SafeIcon icon={FiSave} />
            <span>{customerDetails.name ? 'Actualizar' : 'Guardar'}</span>
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default CustomerDetails;