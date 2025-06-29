import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiTruck, FiDollarSign, FiClock, FiStar, FiTrendingUp, FiPackage } = FiIcons;

const DispatcherOverview = () => {
  const { orders, user } = useApp();

  // Filter orders for this dispatcher
  const myOrders = orders.filter(order => order.dispatcherId === user?.id);
  const todayOrders = myOrders.filter(order => {
    const orderDate = new Date(order.createdAt);
    const today = new Date();
    return orderDate.toDateString() === today.toDateString();
  });

  const availableOrders = orders.filter(order => order.status === 'ready' && !order.dispatcherId);

  const stats = [
    {
      label: 'Entregas Hoy',
      value: todayOrders.filter(o => o.status === 'delivered').length,
      icon: FiTruck,
      color: 'bg-blue-500',
      change: '+3'
    },
    {
      label: 'Ganancias Hoy',
      value: `$${(todayOrders.length * 5.50).toFixed(2)}`,
      icon: FiDollarSign,
      color: 'bg-green-500',
      change: '+$16.50'
    },
    {
      label: 'Tiempo Promedio',
      value: '25 min',
      icon: FiClock,
      color: 'bg-purple-500',
      change: '-3 min'
    },
    {
      label: 'Rating',
      value: '4.8',
      icon: FiStar,
      color: 'bg-yellow-500',
      change: '+0.1'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard del Despachador</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <SafeIcon icon={FiClock} />
          <span>Última actualización: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <SafeIcon icon={FiTrendingUp} className="text-green-500 text-sm mr-1" />
                  <span className="text-sm text-green-500 font-medium">{stat.change}</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <SafeIcon icon={stat.icon} className="text-white text-xl" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions & Available Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Available Orders */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Pedidos Disponibles</h3>
            <span className="bg-primary-100 text-primary-800 text-sm font-medium px-2 py-1 rounded">
              {availableOrders.length}
            </span>
          </div>
          
          <div className="space-y-3">
            {availableOrders.slice(0, 3).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">#{order.id}</p>
                  <p className="text-sm text-gray-600">{order.restaurantName}</p>
                  <p className="text-sm text-gray-500">${order.total.toFixed(2)}</p>
                </div>
                <button className="bg-primary-500 text-white px-3 py-1 rounded text-sm hover:bg-primary-600 transition-colors">
                  Tomar
                </button>
              </div>
            ))}
            
            {availableOrders.length === 0 && (
              <div className="text-center py-8">
                <SafeIcon icon={FiPackage} className="text-3xl text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">No hay pedidos disponibles</p>
              </div>
            )}
          </div>
          
          {availableOrders.length > 3 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <a
                href="/dispatcher/available"
                className="text-primary-600 hover:text-primary-700 font-medium text-sm"
              >
                Ver todos los pedidos disponibles →
              </a>
            </div>
          )}
        </motion.div>

        {/* My Current Deliveries */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Mis Entregas Actuales</h3>
          
          <div className="space-y-3">
            {myOrders.filter(o => o.status === 'delivery').slice(0, 3).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">#{order.id}</p>
                  <p className="text-sm text-gray-600">{order.customerName}</p>
                  <p className="text-sm text-gray-500">{order.deliveryAddress}</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                    En camino
                  </span>
                </div>
              </div>
            ))}
            
            {myOrders.filter(o => o.status === 'delivery').length === 0 && (
              <div className="text-center py-8">
                <SafeIcon icon={FiTruck} className="text-3xl text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">No tienes entregas en curso</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Performance Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen de Rendimiento</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">156</p>
            <p className="text-sm text-gray-600">Entregas Totales</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">98%</p>
            <p className="text-sm text-gray-600">Tasa de Éxito</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">23 min</p>
            <p className="text-sm text-gray-600">Tiempo Promedio</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">4.8/5</p>
            <p className="text-sm text-gray-600">Rating Cliente</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DispatcherOverview;