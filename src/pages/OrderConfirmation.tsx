
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Order } from '../contexts/CartContext';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);

  useEffect(() => {
    // Get the latest order from localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    if (orders.length > 0) {
      setLatestOrder(orders[0]); // Get the most recent order
    }
  }, []);

  // If no order found, show default message
  if (!latestOrder) {
    return (
      <div className="min-h-screen bg-white-smoke">
        <Navbar />
        
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-soft-black mb-4">
                No Order Found
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Please place an order first.
              </p>
              <button
                onClick={() => navigate('/shop')}
                className="bg-gradient-neon text-white px-8 py-3 rounded-lg font-semibold"
              >
                Start Shopping
              </button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  const estimatedDelivery = new Date(latestOrder.deliveryDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-white-smoke">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Success Animation */}
            <motion.div
              className="mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-24 h-24 bg-neon-green rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl font-bold text-soft-black mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Order <span className="text-gradient-neon">Confirmed!</span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Thank you for your purchase! Your order has been successfully placed.
            </motion.p>

            {/* Order Details */}
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-lg mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <Package className="w-8 h-8 text-electric-indigo mx-auto mb-2" />
                  <h3 className="font-semibold text-soft-black mb-1">Order Number</h3>
                  <p className="text-gray-600">{latestOrder.id}</p>
                </div>
                
                <div className="text-center">
                  <Calendar className="w-8 h-8 text-neon-green mx-auto mb-2" />
                  <h3 className="font-semibold text-soft-black mb-1">Estimated Delivery</h3>
                  <p className="text-gray-600">{estimatedDelivery}</p>
                </div>
                
                <div className="text-center">
                  <div className="w-8 h-8 bg-cyber-yellow rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold">$</span>
                  </div>
                  <h3 className="font-semibold text-soft-black mb-1">Total Amount</h3>
                  <p className="text-gray-600">${latestOrder.total}</p>
                </div>
              </div>

              {/* Order Items */}
              <div className="border-t pt-6">
                <h3 className="font-semibold text-soft-black mb-4">Order Summary</h3>
                <div className="space-y-4">
                  {latestOrder.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-soft-black">{item.name}</h4>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-semibold text-soft-black">${item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.button
                onClick={() => navigate('/shop')}
                className="bg-gradient-neon text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Continue Shopping
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              className="mt-12 p-6 bg-gradient-to-r from-electric-indigo/10 to-neon-green/10 rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <h3 className="font-semibold text-soft-black mb-2">What happens next?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We'll send you an email confirmation shortly. Your order will be processed within 24 hours,
                and you'll receive shipping updates via email and SMS. If you have any questions,
                feel free to contact our support team.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OrderConfirmation;
