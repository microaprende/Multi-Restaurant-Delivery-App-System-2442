import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiTruck, FiCheck, FiMapPin, FiPhone, FiClock } = FiIcons;

const MyDeliveries = () => {
  const { orders, user, dispatch } = useApp();
  const [filter, setFilter] = useState('active');

  // In a real app, orders would have dispatcherId field
  const myOrders = orders.filter(order => 
    order.status === 'delivery' || 
    (order.status === 'delivered' && filter === 'completed')
  );

  const activeDeliveries = myOrders.filter(order => order.status === 'delivery');
  const completedDeliveries = myOrders.filter(order => order.status === 'delivered');

  const markAsDelivered = (orderId) => {
    dispatch({
      type: 'UPDATE_ORDER_STATUS',
      payload: { orderId, status: 'delivered' }
    });
    toast.success('Pedido marcado como entregado');
  };

  const filteredOrders = filter === 'active' ? activeDeliveries : completedDeliveries;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Mis Entregas</h1>
        <div className="text-sm text-gray-500">
          {filteredOrders.length} {filter === 'active' ? 'entregas activas' : 'entregas completadas'}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'active'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Activas ({activeDeliveries.length})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'completed'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Completadas ({completedDeliveries.length})
          </button>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center"
        >
          <SafeIcon icon={filter === 'active' ? FiTruck : FiCheck} className="text-4xl text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {filter === 'active' ? 'No tienes entregas activas' : 'No tienes entregas completadas'}
          </h3>
          <p className="text-gray-600">
            {filter === 'active' 
              ? 'Toma algunos pedidos disponibles para comenzar' 
              : 'Las entregas completadas aparecerán aquí'
            }
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">#{order.id}</h3>
                  <p className="text-sm text-gray-500">
                    {format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm')}
                  </p>
                </div>
                <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
                  order.status === 'delivery' 
                    ? 'bg-purple-100 text-purple-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {order.status === 'delivery' ? 'En camino' : 'Entregado'}
                </span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-start space-x-3">
                  <SafeIcon icon={FiMapPin} className="text-gray-400 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">{order.customerName}</p>
                    <p className="text-sm text-gray-600">{order.deliveryAddress}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiPhone} className="text-gray-400" />
                  <p className="text-sm text-gray-600">{order.phone}</p>
                </div>

                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiTruck} className="text-gray-400" />
                  <p className="text-sm text-gray-600">{order.restaurantName}</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <SafeIcon icon={FiClock} className="text-gray-400" />
                    <span>Ganancia: $5.50</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">${order.total.toFixed(2)}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <h4 className="font-medium text-gray-900">Productos:</h4>
                <div className="max-h-20 overflow-y-auto">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm text-gray-600">
                      <span>{item.quantity}x {item.name}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {order.status === 'delivery' && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => markAsDelivered(order.id)}
                  className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <SafeIcon icon={FiCheck} />
                  <span>Marcar como Entregado</span>
                </motion.button>
              )}

              {order.status === 'delivered' && (
                <div className="w-full bg-gray-100 text-gray-600 py-3 rounded-lg font-semibold text-center">
                  Entregado exitosamente
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyDeliveries;