
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, CreditCard, Truck, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Checkout = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'cod'
  });

  const steps = [
    { id: 1, title: 'Address', icon: MapPin },
    { id: 2, title: 'Payment', icon: CreditCard },
    { id: 3, title: 'Review', icon: Check }
  ];

  const cartItems = [
    { id: 1, name: "Urban Streetwear Hoodie", price: 79, quantity: 2, image: "👕" },
    { id: 2, name: "Fresh Kicks Sneakers", price: 129, quantity: 1, image: "👟" }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 10;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleStepSubmit = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Place order
      navigate('/order-confirmation');
    }
  };

  return (
    <div className="min-h-screen bg-white-smoke">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Progress Steps */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex items-center">
                  <motion.div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                      isCompleted
                        ? 'bg-neon-green border-neon-green text-white'
                        : isActive
                        ? 'border-neon-green text-neon-green bg-white'
                        : 'border-gray-300 text-gray-400 bg-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {isCompleted ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </motion.div>
                  <span className={`ml-3 font-medium ${isActive ? 'text-neon-green' : 'text-gray-500'}`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-8 ${isCompleted ? 'bg-neon-green' : 'bg-gray-300'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-8"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Step 1: Address */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-soft-black mb-6">Shipping Address</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-neon-green focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-neon-green focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-neon-green focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-neon-green focus:border-transparent"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-neon-green focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-neon-green focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-neon-green focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Payment */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-soft-black mb-6">Payment Method</h2>
                  <div className="space-y-4">
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleInputChange}
                        className="mr-4 text-neon-green focus:ring-neon-green"
                      />
                      <div className="flex items-center">
                        <div className="text-3xl mr-4">💰</div>
                        <div>
                          <div className="font-semibold">Cash on Delivery</div>
                          <div className="text-sm text-gray-600">Pay when you receive your order</div>
                        </div>
                      </div>
                    </label>
                    
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleInputChange}
                        className="mr-4 text-neon-green focus:ring-neon-green"
                      />
                      <div className="flex items-center">
                        <div className="text-3xl mr-4">💳</div>
                        <div>
                          <div className="font-semibold">Credit/Debit Card</div>
                          <div className="text-sm text-gray-600">Secure payment via Razorpay</div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-2xl font-bold text-soft-black mb-6">Review Your Order</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-2">Shipping Address</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p>{formData.firstName} {formData.lastName}</p>
                        <p>{formData.address}</p>
                        <p>{formData.city}, {formData.zipCode}</p>
                        <p>{formData.phone}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-2">Payment Method</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p>{formData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit/Debit Card'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <motion.button
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  className={`px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors ${
                    currentStep === 1 ? 'invisible' : ''
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Back
                </motion.button>
                
                <motion.button
                  onClick={handleStepSubmit}
                  className="px-8 py-3 bg-gradient-neon text-white rounded-lg font-semibold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {currentStep === 3 ? 'Place Order' : 'Continue'}
                </motion.button>
              </div>
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
              
              {/* Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl">{item.image}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-medium">${item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">${shipping}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="mt-6 p-3 bg-green-50 rounded-lg">
                <div className="flex items-center text-green-700 text-sm">
                  <span className="mr-2">🔒</span>
                  Your order is secured with 256-bit SSL encryption
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
