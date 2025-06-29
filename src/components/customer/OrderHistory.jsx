import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { format } from 'date-fns';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiClock, FiCheck, FiTruck, FiPackage, FiX } = FiIcons;

const OrderHistory = () => {
  const { orders, user } = useApp();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const userOrders = orders.filter(order => order.customerId === user?.id);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return FiClock;
      case 'preparing': return FiPackage;
      case 'delivery': return FiTruck;
      case 'delivered': return FiCheck;
      case 'cancelled': return FiX;
      default: return FiClock;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'preparing': return 'bg-blue-100 text-blue-800';
      case 'delivery': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'preparing': return 'Preparando';
      case 'delivery': return 'En camino';
      case 'delivered': return 'Entregado';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mis Pedidos</h1>
        <p className="text-gray-600">Revisa el estado de tus pedidos</p>
      </motion.div>

      {userOrders.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center"
        >
          <SafeIcon icon={FiPackage} className="text-4xl text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tienes pedidos aún</h3>
          <p className="text-gray-600 mb-4">¡Haz tu primer pedido y disfruta de deliciosa comida!</p>
          <a
            href="/customer"
            className="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            Explorar Restaurantes
          </a>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {userOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">#{order.id}</h3>
                  <p className="text-sm text-gray-600">
                    {format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm')}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(order.status)}`}>
                    <SafeIcon icon={getStatusIcon(order.status)} className="mr-1" />
                    {getStatusText(order.status)}
                  </span>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                  >
                    Ver detalles
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{order.restaurantName}</h4>
                  <span className="text-lg font-bold text-gray-900">${order.total.toFixed(2)}</span>
                </div>
                
                <div className="text-sm text-gray-600">
                  <p>{order.items.length} productos</p>
                  <p>Entrega: {order.deliveryAddress}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Pedido #{selectedOrder.id}</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <SafeIcon icon={FiX} className="text-xl" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Estado del Pedido</h3>
                <div className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-full ${getStatusColor(selectedOrder.status)}`}>
                  <SafeIcon icon={getStatusIcon(selectedOrder.status)} className="mr-2" />
                  {getStatusText(selectedOrder.status)}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Restaurante</h3>
                <p className="text-gray-700">{selectedOrder.restaurantName}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Dirección de Entrega</h3>
                <p className="text-gray-700">{selectedOrder.deliveryAddress}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Productos</h3>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total:</span>
                  <span className="text-lg font-bold text-primary-600">${selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="text-sm text-gray-500">
                <p>Pedido realizado el {format(new Date(selectedOrder.createdAt), 'dd/MM/yyyy HH:mm')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;