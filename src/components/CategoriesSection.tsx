
import React from 'react';
import { motion } from 'framer-motion';
import { Truck, RotateCcw, Headphones, Shield, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CategoriesSection = () => {
  const navigate = useNavigate();

  const categories = [
    { id: 'shirts', name: 'Shirts', icon: '👕', count: 120 },
    { id: 'jackets', name: 'Jackets', icon: '🧥', count: 85 },
    { id: 'sneakers', name: 'Sneakers', icon: '👟', count: 95 },
    { id: 'accessories', name: 'Accessories', icon: '🧢', count: 150 },
    { id: 'jeans', name: 'Jeans', icon: '👖', count: 70 },
    { id: 'hoodies', name: 'Hoodies', icon: '🧷', count: 60 },
  ];

  const features = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Free delivery on orders above $50',
      color: 'neon-green'
    },
    {
      icon: RotateCcw,
      title: 'Easy Returns',
      description: '30-day hassle-free returns',
      color: 'electric-indigo'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Round the clock customer support',
      color: 'neon-pink'
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: 'Your payments are safe with us',
      color: 'cyber-yellow'
    },
  ];

  return (
    <section className="py-20 bg-white-smoke">
      <div className="container mx-auto px-4">
        {/* Categories */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-soft-black mb-4">
              Shop by <span className="text-gradient-neon">Category</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find exactly what you're looking for in our curated collections
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                className="group text-center cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                onClick={() => navigate(`/shop?category=${category.id}`)}
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg group-hover:shadow-2xl transition-all duration-300 mb-4">
                  <div className="text-6xl mb-4">{category.icon}</div>
                  <h3 className="font-semibold text-soft-black mb-2 group-hover:text-electric-indigo transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{category.count} items</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-soft-black mb-4">
              Why Choose <span className="text-gradient-neon">StreetVibe?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best shopping experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className={`w-16 h-16 bg-${feature.color}/10 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className={`w-8 h-8 text-${feature.color}`} />
                  </div>
                  <h3 className="font-semibold text-soft-black mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Newsletter */}
        <motion.div
          className="mt-20 bg-gradient-dark rounded-3xl p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated with <span className="text-gradient-neon">Latest Drops</span>
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Be the first to know about new arrivals, exclusive deals, and style tips
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-green backdrop-blur-md"
            />
            <motion.button
              className="bg-gradient-neon text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesSection;
