
import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { toast } from '../hooks/use-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Trending = () => {
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // First 20 products from shop page with updated order
  const trendingProducts = [
    { id: 1, name: "Urban Streetwear Hoodie", price: 79, category: "hoodies", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop&crop=center", rating: 4.8, reviews: 124 },
    { id: 12, name: "Embroidered Hoodie", price: 115, category: "hoodies", image: "https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?w=500&h=500&fit=crop&crop=center", rating: 4.8, reviews: 189 },
    { id: 42, name: "Leather Biker Jacket", price: 249, category: "jackets", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop&crop=center", rating: 4.9, reviews: 289 },
    { id: 64, name: "Cropped Jeans", price: 79, category: "jeans", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=500&fit=crop&crop=center", rating: 4.4, reviews: 134 },
    { id: 67, name: "Casual Button Shirt", price: 59, category: "shirts", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&h=500&fit=crop&crop=center", rating: 4.8, reviews: 67 },
    { id: 6, name: "Minimalist White Hoodie", price: 85, category: "hoodies", image: "https://images.unsplash.com/photo-1618677603286-0ec56cb6e1b5?w=500&h=500&fit=crop&crop=center", rating: 4.6, reviews: 87 },
    { id: 37, name: "Denim Jacket Classic", price: 99, category: "jackets", image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=500&h=500&fit=crop&crop=center", rating: 4.7, reviews: 156 },
    { id: 8, name: "Neon Green Hoodie", price: 88, category: "hoodies", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&h=500&fit=crop&crop=center", rating: 4.5, reviews: 78 },
    { id: 9, name: "Tie-Dye Hoodie", price: 105, category: "hoodies", image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&h=500&fit=crop&crop=center", rating: 4.9, reviews: 167 },
    { id: 11, name: "Gothic Black Hoodie", price: 89, category: "hoodies", image: "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=500&h=500&fit=crop&crop=center", rating: 4.6, reviews: 98 },
    { id: 13, name: "Japanese Text Hoodie", price: 94, category: "hoodies", image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=500&h=500&fit=crop&crop=center", rating: 4.5, reviews: 76 },
    { id: 202, name: "Designer High-Top Sneakers", price: 249, category: "sneakers", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=500&fit=crop&crop=center", rating: 4.9, reviews: 456 },
    { id: 14, name: "Chrome Hearts Hoodie", price: 125, category: "hoodies", image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=500&h=500&fit=crop&crop=center", rating: 4.9, reviews: 234 },
    { id: 15, name: "Mesh Panel Hoodie", price: 108, category: "hoodies", image: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=500&h=500&fit=crop&crop=center", rating: 4.7, reviews: 156 },
    { id: 16, name: "Cropped Hoodie", price: 75, category: "hoodies", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop&crop=center", rating: 4.6, reviews: 123 },
    { id: 17, name: "Color Block Hoodie", price: 99, category: "hoodies", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=500&fit=crop&crop=center", rating: 4.8, reviews: 167 },
    { id: 18, name: "Reflective Hoodie", price: 135, category: "hoodies", image: "https://images.unsplash.com/photo-1622445275576-721325763afe?w=500&h=500&fit=crop&crop=center", rating: 4.9, reviews: 198 },
    { id: 19, name: "White Leather Sneakers", price: 149, category: "sneakers", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop&crop=center", rating: 4.8, reviews: 203 },
    { id: 201, name: "Premium Leather Aviator Jacket", price: 299, category: "jackets", image: "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=500&h=500&fit=crop&crop=center", rating: 4.9, reviews: 312 },
    { id: 204, name: "Limited Edition Basketball Shoes", price: 199, category: "sneakers", image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&h=500&fit=crop&crop=center", rating: 4.9, reviews: 523 },
  ];

  const handleWishlistToggle = (product: any) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
    
    toast({
      title: "Added to Cart",
      description: `${product.name} added to your cart`,
    });
  };

  return (
    <div className="min-h-screen bg-white-smoke">
      <Navbar />
      
      {/* Page Header */}
      <motion.div
        className="pt-20 pb-12 bg-gradient-dark"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Trending <span className="text-gradient-neon">Products</span>
          </h1>
          <p className="text-xl text-gray-300">The hottest items everyone's talking about</p>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-12">
        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {trendingProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="relative">
                <div className="aspect-square bg-gray-100 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                
                {/* Quick Actions */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <motion.button
                    className={`p-2 bg-white rounded-full shadow-lg transition-colors ${
                      isInWishlist(product.id) 
                        ? 'bg-neon-pink text-white' 
                        : 'hover:bg-neon-pink hover:text-white'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWishlistToggle(product);
                    }}
                  >
                    <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                  </motion.button>
                  <motion.button
                    className="p-2 bg-white rounded-full shadow-lg hover:bg-electric-indigo hover:text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Trending Badge */}
                <div className="absolute top-4 left-4 bg-neon-green text-white px-3 py-1 rounded-full text-xs font-bold">
                  🔥 TRENDING
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-soft-black mb-2 group-hover:text-electric-indigo transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-soft-black">${product.price}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-cyber-yellow">⭐</span>
                    <span className="text-sm text-gray-600">{product.rating} ({product.reviews})</span>
                  </div>
                </div>
                
                <motion.button
                  className="w-full py-2 bg-gradient-neon text-white font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                >
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <h2 className="text-3xl font-bold text-soft-black mb-4">Want to see more?</h2>
          <p className="text-gray-600 mb-8">Explore our complete collection with hundreds of products</p>
          <motion.button
            onClick={() => navigate('/shop')}
            className="bg-gradient-neon text-white px-8 py-3 rounded-lg font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Browse All Products
          </motion.button>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Trending;
