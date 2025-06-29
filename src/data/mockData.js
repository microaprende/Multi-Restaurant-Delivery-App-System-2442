export const mockData = {
  restaurants: [
    {
      id: 'rest1',
      name: 'Burger Palace',
      image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400',
      category: 'Hamburguesas',
      rating: 4.5,
      deliveryTime: '25-35 min',
      deliveryFee: 3.50,
      isActive: true,
      phone: '+1234567890',
      address: 'Calle Principal 123',
      menu: [
        {
          id: 'item1',
          name: 'Burger Clásica',
          description: 'Carne de res, lechuga, tomate, cebolla',
          price: 12.99,
          image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300',
          category: 'Hamburguesas'
        },
        {
          id: 'item2',
          name: 'Papas Fritas',
          description: 'Papas crujientes con sal marina',
          price: 4.99,
          image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=300',
          category: 'Acompañamientos'
        }
      ]
    },
    {
      id: 'rest2',
      name: 'Pizza Corner',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
      category: 'Pizza',
      rating: 4.7,
      deliveryTime: '30-40 min',
      deliveryFee: 2.99,
      isActive: true,
      phone: '+1234567891',
      address: 'Avenida Central 456',
      menu: [
        {
          id: 'item3',
          name: 'Pizza Margherita',
          description: 'Salsa de tomate, mozzarella, albahaca',
          price: 16.99,
          image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=300',
          category: 'Pizzas'
        }
      ]
    },
    {
      id: 'rest3',
      name: 'Taco Fiesta',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
      category: 'Mexicana',
      rating: 4.3,
      deliveryTime: '20-30 min',
      deliveryFee: 2.50,
      isActive: true,
      phone: '+1234567892',
      address: 'Plaza Central 789',
      menu: [
        {
          id: 'item4',
          name: 'Tacos de Carnitas',
          description: 'Tortillas de maíz con carnitas, cebolla y cilantro',
          price: 8.99,
          image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=300',
          category: 'Tacos'
        }
      ]
    }
  ],
  orders: [
    {
      id: 'order1',
      customerId: 'guest_customer',
      customerName: 'Juan Pérez',
      restaurantId: 'rest1',
      restaurantName: 'Burger Palace',
      items: [
        {
          id: 'item1',
          name: 'Burger Clásica',
          price: 12.99,
          quantity: 2
        }
      ],
      total: 29.48,
      status: 'pending',
      createdAt: new Date().toISOString(),
      deliveryAddress: 'Calle Secundaria 789',
      phone: '+1234567892',
      dispatcherId: null
    }
  ],
  dispatchers: [
    {
      id: 'disp1',
      name: 'Carlos Rodríguez',
      phone: '+1234567893',
      isActive: true,
      currentOrders: [],
      rating: 4.8,
      completedDeliveries: 156
    },
    {
      id: 'disp2',
      name: 'María González',
      phone: '+1234567894',
      isActive: true,
      currentOrders: [],
      rating: 4.9,
      completedDeliveries: 203
    }
  ],
  customers: [
    {
      id: 'guest_customer',
      name: 'Cliente Invitado',
      email: 'cliente@example.com',
      phone: '+1234567892',
      addresses: ['Calle Secundaria 789'],
      orderHistory: ['order1']
    }
  ],
  analytics: {
    totalOrders: 1247,
    totalRevenue: 28450.50,
    activeRestaurants: 3,
    activeDispatchers: 2,
    averageDeliveryTime: 32,
    customerSatisfaction: 4.6
  }
};