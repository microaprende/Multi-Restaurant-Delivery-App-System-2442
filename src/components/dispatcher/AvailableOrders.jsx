import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiPackage, FiMapPin, FiClock, FiDollarSign, FiTruck } = FiIcons;

const AvailableOrders = () => {
  const { orders, user, dispatch } = useApp();

  const availableOrders = orders.filter(order => order.status === 'ready' && !order.dispatcherId);

  const takeOrder = (orderId) => {
    dispatch({
      type: 'UPDATE_ORDER_STATUS',
      payload: { orderId, status: 'delivery' }
    });
    
    // In a real app, you'd also assign the dispatcher to the order
    toast.success('Pedido tomado exitosamente');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Pedidos Disponibles</h1>
        <div className="text-sm text-gray-500">
          {availableOrders.length} pedidos disponibles
        </div>
      </div>

      {availableOrders.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center"
        >
          <SafeIcon icon={FiPackage} className="text-4xl text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay pedidos disponibles</h3>
          <p className="text-gray-600">Todos los pedidos han sido asignados o no hay pedidos listos para entrega</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {availableOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">#{order.id}</h3>
                  <p className="text-sm text-gray-500">
                    {format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm')}
                  </p>
                </div>
                <span className="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800">
                  Listo para entrega
                </span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-start space-x-3">
                  <SafeIcon icon={FiPackage} className="text-gray-400 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">{order.restaurantName}</p>
                    <p className="text-sm text-gray-600">{order.items.length} productos</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <SafeIcon icon={FiMapPin} className="text-gray-400 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">{order.customerName}</p>
                    <p className="text-sm text-gray-600">{order.deliveryAddress}</p>
                    <p className="text-sm text-gray-500">{order.phone}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <SafeIcon icon={FiClock} className="text-gray-400" />
                      <span>~25 min</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <SafeIcon icon={FiDollarSign} className="text-gray-400" />
                      <span>Ganancia: $5.50</span>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-gray-900">${order.total.toFixed(2)}</p>
                </div>
              </div>

              <div className="space-y-2">
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

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => takeOrder(order.id)}
                className="w-full mt-6 bg-primary-500 text-white py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors flex items-center justify-center space-x-2"
              >
                <SafeIcon icon={FiTruck} />
                <span>Tomar Pedido</span>
              </motion.button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableOrders;