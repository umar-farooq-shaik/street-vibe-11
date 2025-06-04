
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Cart = () => {
  const navigate = useNavigate();
  
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Urban Streetwear Hoodie", price: 79, quantity: 2, size: "M", image: "👕" },
    { id: 2, name: "Fresh Kicks Sneakers", price: 129, quantity: 1, size: "42", image: "👟" },
    { id: 3, name: "Denim Jacket Classic", price: 99, quantity: 1, size: "L", image: "🧥" },
  ]);

  const [couponCode, setCouponCode] = useState('');

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const discount = couponCode === 'SAVE10' ? subtotal * 0.1 : 0;
  const total = subtotal + shipping - discount;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white-smoke">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-16">
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-8xl mb-6">🛒</div>
            <h2 className="text-3xl font-bold text-soft-black mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <motion.button
              onClick={() => navigate('/shop')}
              className="bg-gradient-neon text-white px-8 py-3 rounded-lg font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Shopping
            </motion.button>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white-smoke">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-soft-black mb-8 flex items-center gap-3">
            <ShoppingBag className="w-8 h-8" />
            Shopping Cart ({cartItems.length})
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <motion.div
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="flex items-center gap-4 p-6 border-b border-gray-100 last:border-b-0"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  layout
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-3xl">{item.image}</span>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-soft-black mb-1">{item.name}</h3>
                    <p className="text-gray-600 text-sm">Size: {item.size}</p>
                    <p className="text-lg font-bold text-soft-black mt-2">${item.price}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <motion.button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-neon-green"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Minus className="w-4 h-4" />
                    </motion.button>
                    
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    
                    <motion.button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-neon-green"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Plus className="w-4 h-4" />
                    </motion.button>
                  </div>

                  {/* Remove Button */}
                  <motion.button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Trash2 className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Order Summary */}
          <motion.div
            className="lg:col-span-1"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-soft-black mb-6">Order Summary</h3>

              {/* Coupon Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Coupon Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-neon-green focus:border-transparent"
                  />
                  <motion.button
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Apply
                  </motion.button>
                </div>
                {couponCode === 'SAVE10' && (
                  <p className="text-green-600 text-sm mt-1">✓ 10% discount applied!</p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <hr className="border-gray-200" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Free Shipping Notice */}
              {shipping > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
                  <p className="text-sm text-yellow-800">
                    Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                </div>
              )}

              {/* Checkout Button */}
              <motion.button
                onClick={() => navigate('/checkout')}
                className="w-full bg-gradient-neon text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <motion.button
                onClick={() => navigate('/shop')}
                className="w-full mt-3 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Continue Shopping
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
