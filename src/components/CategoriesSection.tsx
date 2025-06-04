
import React from 'react';
import { motion } from 'framer-motion';
import { Truck, RotateCcw, Headphones, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CategoriesSection = () => {
  const navigate = useNavigate();

  const categories = [
    { id: 'shirts', name: 'Shirts', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=300&fit=crop&crop=center', count: 120 },
    { id: 'jackets', name: 'Jackets', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop&crop=center', count: 85 },
    { id: 'sneakers', name: 'Sneakers', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop&crop=center', count: 95 },
    { id: 'accessories', name: 'Accessories', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=300&fit=crop&crop=center', count: 150 },
    { id: 'jeans', name: 'Jeans', image: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=300&h=300&fit=crop&crop=center', count: 70 },
    { id: 'hoodies', name: 'Hoodies', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop&crop=center', count: 60 },
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
                <div className="bg-white rounded-2xl p-4 shadow-lg group-hover:shadow-2xl transition-all duration-300 mb-4">
                  <div className="aspect-square rounded-xl overflow-hidden mb-4">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
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
      </div>
    </section>
  );
};

export default CategoriesSection;
