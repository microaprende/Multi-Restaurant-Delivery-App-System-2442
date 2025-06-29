import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiX, FiPlus, FiMinus, FiTrash2, FiShoppingBag } = FiIcons;

const Cart = ({ isOpen, onClose }) => {
  const { cart, dispatch, customerDetails } = useApp();

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
    } else {
      dispatch({
        type: 'UPDATE_CART_QUANTITY',
        payload: { id: itemId, quantity: newQuantity }
      });
    }
  };

  const removeFromCart = (itemId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
    toast.success('Producto eliminado del carrito');
  };

  const checkout = () => {
    if (cart.length === 0) {
      toast.error('El carrito está vacío');
      return;
    }

    if (!customerDetails.name || !customerDetails.phone || !customerDetails.address) {
      toast.error('Por favor completa tus datos personales antes de realizar el pedido');
      return;
    }

    // Group items by restaurant
    const restaurantGroups = cart.reduce((groups, item) => {
      const restaurantId = item.restaurantId;
      if (!groups[restaurantId]) {
        groups[restaurantId] = {
          restaurantId,
          restaurantName: item.restaurantName,
          items: []
        };
      }
      groups[restaurantId].items.push(item);
      return groups;
    }, {});

    // Create orders for each restaurant
    Object.values(restaurantGroups).forEach(group => {
      const total = group.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      const newOrder = {
        id: `order${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        customerId: 'guest_customer',
        customerName: customerDetails.name,
        restaurantId: group.restaurantId,
        restaurantName: group.restaurantName,
        items: group.items,
        total: total,
        status: 'pending',
        createdAt: new Date().toISOString(),
        deliveryAddress: customerDetails.address,
        phone: customerDetails.phone,
        additionalInfo: customerDetails.additionalInfo || ''
      };

      dispatch({ type: 'ADD_ORDER', payload: newOrder });
    });

    dispatch({ type: 'CLEAR_CART' });
    toast.success('¡Pedido realizado con éxito!');
    onClose();
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = cart.length > 0 ? 3.50 : 0;
  const total = subtotal + deliveryFee;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
          />

          {/* Cart Modal */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl z-50 max-h-[80vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">Mi Carrito</h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <SafeIcon icon={FiX} className="text-xl" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <SafeIcon icon={FiShoppingBag} className="text-4xl text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Tu carrito está vacío</h3>
                  <p className="text-gray-600">Agrega algunos productos para comenzar</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={`${item.id}-${item.restaurantId}`}
                      className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">{item.restaurantName}</p>
                        <p className="text-sm font-semibold text-red-500">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center"
                        >
                          <SafeIcon icon={FiMinus} className="text-sm" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center"
                        >
                          <SafeIcon icon={FiPlus} className="text-sm" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-gray-200 p-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Envío</span>
                    <span className="font-medium">${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total</span>
                    <span className="text-red-500">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={checkout}
                  className="w-full bg-red-500 text-white py-4 rounded-full font-bold text-lg hover:bg-red-600 transition-colors"
                >
                  Realizar Pedido
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;