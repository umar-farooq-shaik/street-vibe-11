
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Wishlist = () => {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-white-smoke">
      <Navbar />
      
      {/* Page Header */}
      <motion.div
        className="pt-24 pb-8 bg-gradient-dark"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My <span className="text-gradient-neon">Wishlist</span>
          </h1>
          <p className="text-xl text-gray-300">Your favorite products saved for later</p>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-8">
        {wishlist.length === 0 ? (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-6xl mb-4">💝</div>
            <h3 className="text-2xl font-bold text-soft-black mb-2">Your wishlist is empty</h3>
            <p className="text-gray-600 mb-6">Start adding products you love to your wishlist</p>
            <motion.button
              onClick={() => navigate('/shop')}
              className="bg-gradient-neon text-white px-6 py-3 rounded-lg font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Shopping
            </motion.button>
          </motion.div>
        ) : (
          <>
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-soft-black">
                {wishlist.length} {wishlist.length === 1 ? 'Item' : 'Items'} in your wishlist
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlist.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="relative cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                    <div className="aspect-square bg-gray-100 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    
                    {/* Remove from wishlist button */}
                    <motion.button
                      className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromWishlist(product.id);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-soft-black mb-2 group-hover:text-electric-indigo transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xl font-bold text-soft-black">${product.price}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-cyber-yellow fill-current" />
                        <span className="text-sm text-gray-600">{product.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <motion.button
                        className="flex-1 bg-gradient-neon text-white py-2 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('Added to cart:', product.name);
                        }}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Wishlist;
