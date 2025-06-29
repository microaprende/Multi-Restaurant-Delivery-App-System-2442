import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiMail, FiLock, FiTruck, FiUser, FiSettings, FiShoppingBag } = FiIcons;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('customer');
  const { login } = useApp();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (userType === 'customer') {
      // Redirigir directamente a la interfaz del cliente sin autenticación
      navigate('/customer');
      return;
    }

    const user = login(email, password, userType);
    if (user) {
      toast.success(`¡Bienvenido ${user.name}!`);
      navigate(`/${user.role}`);
    } else {
      toast.error('Credenciales incorrectas o acceso no autorizado');
    }
  };

  const goToCustomerApp = () => {
    navigate('/customer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <SafeIcon icon={FiTruck} className="text-4xl text-primary-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800">DeliveryApp</h1>
          <p className="text-gray-600 mt-2">Sistema Multi-Restaurante</p>
        </div>

        {/* Customer Access Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={goToCustomerApp}
          className="w-full bg-green-500 text-white py-4 rounded-lg font-semibold hover:bg-green-600 transition-colors mb-6 flex items-center justify-center space-x-2"
        >
          <SafeIcon icon={FiUser} className="text-xl" />
          <span>Acceso Cliente - Sin Registro</span>
        </motion.button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">O acceso administrativo</span>
          </div>
        </div>

        {/* User Type Selection */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setUserType('master')}
            className={`p-3 border-2 rounded-lg transition-colors ${
              userType === 'master' 
                ? 'border-primary-500 bg-primary-50' 
                : 'border-gray-200 hover:border-primary-500'
            }`}
          >
            <SafeIcon icon={FiSettings} className="text-xl mx-auto mb-1 text-gray-500" />
            <p className="text-xs font-medium text-gray-700">Master</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setUserType('restaurant')}
            className={`p-3 border-2 rounded-lg transition-colors ${
              userType === 'restaurant' 
                ? 'border-primary-500 bg-primary-50' 
                : 'border-gray-200 hover:border-primary-500'
            }`}
          >
            <SafeIcon icon={FiShoppingBag} className="text-xl mx-auto mb-1 text-gray-500" />
            <p className="text-xs font-medium text-gray-700">Restaurante</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setUserType('dispatcher')}
            className={`p-3 border-2 rounded-lg transition-colors ${
              userType === 'dispatcher' 
                ? 'border-primary-500 bg-primary-50' 
                : 'border-gray-200 hover:border-primary-500'
            }`}
          >
            <SafeIcon icon={FiTruck} className="text-xl mx-auto mb-1 text-gray-500" />
            <p className="text-xs font-medium text-gray-700">Despachador</p>
          </motion.button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <div className="relative">
              <SafeIcon icon={FiMail} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <SafeIcon icon={FiLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-primary-500 text-white py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
          >
            Iniciar Sesión
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 mb-2">Credenciales de demo:</p>
          <div className="text-xs text-gray-400 space-y-1">
            <p>Master: master@app.com / master123</p>
            <p>Restaurante: rest1@app.com / rest123</p>
            <p>Despachador: disp1@app.com / disp123</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;