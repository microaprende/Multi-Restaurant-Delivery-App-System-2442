import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { mockData } from '../data/mockData';

const AppContext = createContext();

const initialState = {
  user: null,
  restaurants: mockData.restaurants,
  orders: mockData.orders,
  dispatchers: mockData.dispatchers,
  customers: mockData.customers,
  analytics: mockData.analytics,
  cart: [],
  customerDetails: {
    name: '',
    phone: '',
    address: '',
    additionalInfo: ''
  },
  loading: false
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    
    case 'LOGOUT':
      return { ...state, user: null, cart: [] };
    
    case 'UPDATE_CUSTOMER_DETAILS':
      return { 
        ...state, 
        customerDetails: { ...state.customerDetails, ...action.payload } 
      };
    
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      };
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };
    
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [action.payload, ...state.orders]
      };
    
    case 'UPDATE_ORDER_STATUS':
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.orderId
            ? { ...order, status: action.payload.status }
            : order
        )
      };
    
    case 'UPDATE_RESTAURANT':
      return {
        ...state,
        restaurants: state.restaurants.map(restaurant =>
          restaurant.id === action.payload.id
            ? { ...restaurant, ...action.payload }
            : restaurant
        )
      };
    
    case 'ADD_RESTAURANT':
      return {
        ...state,
        restaurants: [...state.restaurants, action.payload]
      };
    
    case 'DELETE_RESTAURANT':
      return {
        ...state,
        restaurants: state.restaurants.filter(r => r.id !== action.payload)
      };
    
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const savedUser = localStorage.getItem('deliveryApp_user');
    const savedCustomerDetails = localStorage.getItem('deliveryApp_customerDetails');
    
    if (savedUser) {
      dispatch({ type: 'SET_USER', payload: JSON.parse(savedUser) });
    }
    
    if (savedCustomerDetails) {
      dispatch({ 
        type: 'UPDATE_CUSTOMER_DETAILS', 
        payload: JSON.parse(savedCustomerDetails) 
      });
    }
  }, []);

  // Save customer details to localStorage when they change
  useEffect(() => {
    if (state.customerDetails.name) {
      localStorage.setItem('deliveryApp_customerDetails', JSON.stringify(state.customerDetails));
    }
  }, [state.customerDetails]);

  const login = (email, password, userType) => {
    // Specific restaurant access
    const restaurantUsers = state.restaurants.map(restaurant => ({
      id: restaurant.id,
      email: `${restaurant.id}@app.com`,
      password: 'rest123',
      role: 'restaurant',
      name: restaurant.name,
      restaurantId: restaurant.id
    }));

    // Specific dispatcher access
    const dispatcherUsers = state.dispatchers.map(dispatcher => ({
      id: dispatcher.id,
      email: `${dispatcher.id}@app.com`,
      password: 'disp123',
      role: 'dispatcher',
      name: dispatcher.name
    }));

    const allUsers = [
      {
        id: 'master1',
        email: 'master@app.com',
        password: 'master123',
        role: 'master',
        name: 'Administrador Master'
      },
      ...restaurantUsers,
      ...dispatcherUsers
    ];

    const user = allUsers.find(u => 
      u.email === email && 
      u.password === password && 
      u.role === userType
    );

    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      dispatch({ type: 'SET_USER', payload: userWithoutPassword });
      localStorage.setItem('deliveryApp_user', JSON.stringify(userWithoutPassword));
      return userWithoutPassword;
    }
    
    return null;
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('deliveryApp_user');
  };

  const value = {
    ...state,
    dispatch,
    login,
    logout
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};