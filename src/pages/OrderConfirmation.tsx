
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Package, Truck, Home, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  
  const orderDetails = {
    id: 'ORD-2024-001',
    date: new Date().toLocaleDateString(),
    estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    total: 297,
    items: [
      { name: "Urban Streetwear Hoodie", quantity: 2, price: 79 },
      { name: "Fresh Kicks Sneakers", quantity: 1, price: 129 }
    ]
  };

  return (
    <div className="min-h-screen bg-white-smoke">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Success Animation */}
        <motion.div
          className="text-center mb-12"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
          <motion.div
            className="w-24 h-24 bg-neon-green rounded-full flex items-center justify-center mx-auto mb-6"
            animate={{
              scale: [1, 1.2, 1],
              boxShadow: [
                "0 0 0 0 rgba(0, 255, 163, 0.7)",
                "0 0 0 20px rgba(0, 255, 163, 0)",
                "0 0 0 0 rgba(0, 255, 163, 0)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Check className="w-12 h-12 text-white" />
          </motion.div>
          
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-soft-black mb-4"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Order Confirmed! 🎉
          </motion.h1>
          
          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Thank you for your purchase! Your order has been successfully placed and is being prepared for shipment.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Order Details */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-soft-black mb-6">Order Details</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID</span>
                <span className="font-mono font-medium">{orderDetails.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Order Date</span>
                <span className="font-medium">{orderDetails.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Delivery</span>
                <span className="font-medium text-neon-green">{orderDetails.estimatedDelivery}</span>
              </div>
            </div>

            {/* Items */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-semibold text-gray-700 mb-4">Items Ordered</h3>
              <div className="space-y-3">
                {orderDetails.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-gray-600 ml-2">× {item.quantity}</span>
                    </div>
                    <span className="font-medium">${item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 mt-4 pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${orderDetails.total}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tracking Progress */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-soft-black mb-6">Order Progress</h2>
            
            <div className="space-y-6">
              {[
                { icon: Check, label: "Order Placed", status: "completed", time: "Just now" },
                { icon: Package, label: "Processing", status: "current", time: "1-2 hours" },
                { icon: Truck, label: "Shipped", status: "pending", time: "2-3 days" },
                { icon: Home, label: "Delivered", status: "pending", time: "5-7 days" }
              ].map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={index}
                    className="flex items-center"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      step.status === 'completed'
                        ? 'bg-neon-green border-neon-green text-white'
                        : step.status === 'current'
                        ? 'border-electric-indigo text-electric-indigo bg-white'
                        : 'border-gray-300 text-gray-400 bg-white'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className={`font-medium ${
                        step.status === 'completed' || step.status === 'current'
                          ? 'text-soft-black'
                          : 'text-gray-400'
                      }`}>
                        {step.label}
                      </div>
                      <div className="text-sm text-gray-500">{step.time}</div>
                    </div>
                    {step.status === 'completed' && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className="text-neon-green"
                      >
                        ✓
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.button
            onClick={() => navigate('/order-tracking')}
            className="bg-gradient-neon text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Track Your Order
            <ArrowRight className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            onClick={() => navigate('/shop')}
            className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Continue Shopping
          </motion.button>
        </motion.div>

        {/* Contact Support */}
        <motion.div
          className="text-center mt-12 p-6 bg-blue-50 rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <h3 className="font-semibold text-soft-black mb-2">Need Help?</h3>
          <p className="text-gray-600 mb-4">
            If you have any questions about your order, our customer support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <span className="flex items-center justify-center gap-2 text-soft-black">
              📞 <strong>+1 (555) 123-4567</strong>
            </span>
            <span className="flex items-center justify-center gap-2 text-soft-black">
              📧 <strong>support@streetvibe.com</strong>
            </span>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default OrderConfirmation;
