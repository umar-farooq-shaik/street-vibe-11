
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart } from 'lucide-react';

const TrendingSection = () => {
  const products = [
    { id: 1, name: "Urban Streetwear Hoodie", price: 79, emoji: "👕", category: "Hoodies" },
    { id: 2, name: "Fresh Kicks Sneakers", price: 129, emoji: "👟", category: "Sneakers" },
    { id: 3, name: "Denim Jacket Classic", price: 99, emoji: "🧥", category: "Jackets" },
    { id: 4, name: "Street Style Pants", price: 69, emoji: "👖", category: "Pants" },
    { id: 5, name: "Casual Button Shirt", price: 59, emoji: "👔", category: "Shirts" },
    { id: 6, name: "Sport Cap Essential", price: 29, emoji: "🧢", category: "Accessories" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 bg-white-smoke">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-soft-black mb-4">
            Trending <span className="text-gradient-neon">Collections</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover what's hot right now. Our most popular pieces that everyone's talking about.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="group relative"
              variants={itemVariants}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="glass-morphism rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 group-hover:bg-white/20">
                {/* Product Image */}
                <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                  <motion.div
                    className="text-8xl"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {product.emoji}
                  </motion.div>
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <motion.button
                      className="p-3 bg-white rounded-full hover:bg-neon-green hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Heart className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      className="p-3 bg-white rounded-full hover:bg-electric-indigo hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-2">
                  <div className="text-sm text-electric-indigo font-medium">{product.category}</div>
                  <h3 className="font-semibold text-soft-black group-hover:text-electric-indigo transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-soft-black">${product.price}</span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-cyber-yellow text-sm">⭐</span>
                      ))}
                      <span className="text-sm text-gray-500 ml-1">(4.8)</span>
                    </div>
                  </div>
                </div>

                {/* Quick Add Button */}
                <motion.button
                  className="w-full mt-4 py-3 bg-gradient-neon text-white font-semibold rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Quick Add to Cart
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.button
            className="px-8 py-4 border-2 border-electric-indigo text-electric-indigo font-semibold rounded-full hover:bg-electric-indigo hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Products
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default TrendingSection;
