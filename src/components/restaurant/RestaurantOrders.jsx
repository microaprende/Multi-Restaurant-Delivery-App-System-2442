import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiClock, FiCheck, FiTruck, FiX } = FiIcons;

const RestaurantOrders = () => {
  const { orders, user, dispatch } = useApp();
  const [filter, setFilter] = useState('all');

  const restaurantOrders = orders.filter(order => order.restaurantId === user?.restaurantId);
  
  const filteredOrders = restaurantOrders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  const updateOrderStatus = (orderId, newStatus) => {
    dispatch({
      type: 'UPDATE_ORDER_STATUS',
      payload: { orderId, status: newStatus }
    });
    toast.success(`Pedido ${newStatus === 'preparing' ? 'en preparación' : 
                  newStatus === 'ready' ? 'listo para entrega' : 
                  newStatus === 'cancelled' ? 'cancelado' : 'actualizado'}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'preparing': return 'bg-blue-100 text-blue-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'delivery': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'preparing': return 'Preparando';
      case 'ready': return 'Listo';
      case 'delivery': return 'En entrega';
      case 'delivered': return 'Entregado';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const getActionButtons = (order) => {
    switch (order.status) {
      case 'pending':
        return (
          <div className="flex space-x-2">
            <button
              onClick={() => updateOrderStatus(order.id, 'preparing')}
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors flex items-center space-x-1"
            >
              <SafeIcon icon={FiClock} />
              <span>Preparar</span>
            </button>
            <button
              onClick={() => updateOrderStatus(order.id, 'cancelled')}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors flex items-center space-x-1"
            >
              <SafeIcon icon={FiX} />
              <span>Cancelar</span>
            </button>
          </div>
        );
      case 'preparing':
        return (
          <button
            onClick={() => updateOrderStatus(order.id, 'ready')}
            className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition-colors flex items-center space-x-1"
          >
            <SafeIcon icon={FiCheck} />
            <span>Marcar Listo</span>
          </button>
        );
      case 'ready':
        return (
          <button
            onClick={() => updateOrderStatus(order.id, 'delivery')}
            className="bg-purple-500 text-white px-3 py-1 rounded text-sm hover:bg-purple-600 transition-colors flex items-center space-x-1"
          >
            <SafeIcon icon={FiTruck} />
            <span>En Entrega</span>
          </button>
        );
      default:
        return <span className="text-sm text-gray-500">Sin acciones</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Pedidos del Restaurante</h1>
        <div className="text-sm text-gray-500">
          {filteredOrders.length} pedidos
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
        <div className="flex space-x-2 overflow-x-auto">
          {[
            { key: 'all', label: 'Todos' },
            { key: 'pending', label: 'Pendientes' },
            { key: 'preparing', label: 'Preparando' },
            { key: 'ready', label: 'Listos' },
            { key: 'delivery', label: 'En Entrega' },
            { key: 'delivered', label: 'Entregados' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                filter === tab.key
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredOrders.map((order) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">#{order.id}</h3>
                <p className="text-sm text-gray-500">
                  {format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm')}
                </p>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                {getStatusText(order.status)}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <p className="font-medium text-gray-900">{order.customerName}</p>
                <p className="text-sm text-gray-600">{order.phone}</p>
                <p className="text-sm text-gray-600">{order.deliveryAddress}</p>
              </div>

              <div className="border-t pt-3">
                <h4 className="font-medium text-gray-900 mb-2">Productos:</h4>
                <div className="space-y-1">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{item.quantity}x {item.name}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-3 flex justify-between items-center">
                <span className="font-semibold text-gray-900">Total:</span>
                <span className="text-lg font-bold text-primary-600">${order.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-center">
              {getActionButtons(order)}
            </div>
          </motion.div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <SafeIcon icon={FiClock} className="text-4xl text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay pedidos</h3>
          <p className="text-gray-600">
            {filter === 'all' ? 'No tienes pedidos aún' : `No hay pedidos con estado "${getStatusText(filter)}"`}
          </p>
        </div>
      )}
    </div>
  );
};

export default RestaurantOrders;