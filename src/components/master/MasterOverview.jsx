import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiDollarSign, FiShoppingBag, FiTruck, FiUsers, FiTrendingUp, FiClock } = FiIcons;

const MasterOverview = () => {
  const { analytics, restaurants, orders, dispatchers } = useApp();

  const stats = [
    {
      label: 'Ingresos Totales',
      value: `$${analytics.totalRevenue.toLocaleString()}`,
      icon: FiDollarSign,
      color: 'bg-green-500',
      change: '+12.5%'
    },
    {
      label: 'Pedidos Totales',
      value: analytics.totalOrders.toLocaleString(),
      icon: FiShoppingBag,
      color: 'bg-blue-500',
      change: '+8.2%'
    },
    {
      label: 'Restaurantes Activos',
      value: restaurants.filter(r => r.isActive).length,
      icon: FiTruck,
      color: 'bg-purple-500',
      change: '+2'
    },
    {
      label: 'Despachadores',
      value: dispatchers.filter(d => d.isActive).length,
      icon: FiUsers,
      color: 'bg-orange-500',
      change: '+1'
    }
  ];

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Master</h1>
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

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pedidos Recientes</h3>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">#{order.id}</p>
                  <p className="text-sm text-gray-600">{order.customerName}</p>
                  <p className="text-sm text-gray-500">{order.restaurantName}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${order.total}</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'preparing' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'delivery' ? 'bg-purple-100 text-purple-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Métricas de Rendimiento</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Tiempo promedio de entrega</span>
              <span className="font-semibold">{analytics.averageDeliveryTime} min</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Satisfacción del cliente</span>
              <span className="font-semibold">{analytics.customerSatisfaction}/5.0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Restaurantes activos</span>
              <span className="font-semibold">{restaurants.filter(r => r.isActive).length}/{restaurants.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Despachadores disponibles</span>
              <span className="font-semibold">{dispatchers.filter(d => d.isActive).length}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MasterOverview;