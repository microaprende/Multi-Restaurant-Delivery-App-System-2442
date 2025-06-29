import React from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import { useApp } from '../../context/AppContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiTrendingUp, FiDollarSign, FiClock, FiUsers } = FiIcons;

const Analytics = () => {
  const { analytics, orders, restaurants } = useApp();

  const revenueChartOptions = {
    title: {
      text: 'Ingresos por Mes',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '${value}'
      }
    },
    series: [{
      data: [4200, 4800, 5200, 4900, 5800, 6200],
      type: 'line',
      smooth: true,
      itemStyle: {
        color: '#f97316'
      }
    }]
  };

  const ordersChartOptions = {
    title: {
      text: 'Pedidos por Estado',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    series: [{
      type: 'pie',
      radius: '50%',
      data: [
        { value: 35, name: 'Entregado' },
        { value: 15, name: 'En entrega' },
        { value: 10, name: 'Preparando' },
        { value: 5, name: 'Pendiente' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  };

  const restaurantPerformanceOptions = {
    title: {
      text: 'Rendimiento por Restaurante',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: restaurants.map(r => r.name)
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [850, 720, 640, 580],
      type: 'bar',
      itemStyle: {
        color: '#f97316'
      }
    }]
  };

  const metrics = [
    {
      title: 'Ingresos Hoy',
      value: '$1,247',
      change: '+12.5%',
      icon: FiDollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Pedidos Hoy',
      value: '89',
      change: '+8.2%',
      icon: FiTrendingUp,
      color: 'text-blue-600'
    },
    {
      title: 'Tiempo Promedio',
      value: '32 min',
      change: '-2.1%',
      icon: FiClock,
      color: 'text-purple-600'
    },
    {
      title: 'Clientes Activos',
      value: '1,234',
      change: '+15.3%',
      icon: FiUsers,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Analytics y Reportes</h1>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                <p className={`text-sm mt-1 ${metric.color}`}>{metric.change}</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-lg">
                <SafeIcon icon={metric.icon} className="text-xl text-gray-600" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <ReactECharts option={revenueChartOptions} style={{ height: '300px' }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <ReactECharts option={ordersChartOptions} style={{ height: '300px' }} />
        </motion.div>
      </div>

      {/* Restaurant Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
      >
        <ReactECharts option={restaurantPerformanceOptions} style={{ height: '400px' }} />
      </motion.div>

      {/* Summary Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Resumen por Restaurante</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Restaurante
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pedidos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ingresos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {restaurants.map((restaurant) => (
                <tr key={restaurant.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={restaurant.image}
                        alt={restaurant.name}
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{restaurant.name}</div>
                        <div className="text-sm text-gray-500">{restaurant.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {Math.floor(Math.random() * 50) + 10}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${(Math.random() * 5000 + 1000).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {restaurant.rating}/5.0
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      restaurant.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {restaurant.isActive ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;