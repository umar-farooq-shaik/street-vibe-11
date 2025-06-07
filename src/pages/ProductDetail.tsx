import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, ArrowLeft, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { toast } from '../hooks/use-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Black');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();

  // Product data - this should match the data from Shop.tsx
  const products = {
    201: {
      id: 201,
      name: "Premium Leather Aviator Jacket",
      price: 299,
      category: "jackets",
      images: [
        "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&h=800&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=800&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1618677603286-0ec56cb6e1b5?w=800&h=800&fit=crop&crop=center"
      ],
      rating: 4.9,
      reviews: 312,
      description: "Experience the perfect blend of style and functionality with our Premium Leather Aviator Jacket. Crafted from genuine leather with meticulous attention to detail, this jacket features a classic aviator design that never goes out of style.",
      features: [
        "100% Genuine Leather Construction",
        "Soft Fleece Lining for Comfort",
        "Multiple Interior Pockets",
        "Adjustable Belt Waist",
        "Classic Aviator Design",
        "Premium YKK Zippers"
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'Brown', 'Cognac'],
      inStock: true
    },
    12: {
      id: 12,
      name: "Embroidered Hoodie",
      price: 115,
      category: "hoodies",
      images: [
        "https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?w=800&h=800&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1618677603286-0ec56cb6e1b5?w=800&h=800&fit=crop&crop=center"
      ],
      rating: 4.8,
      reviews: 189,
      description: "Elevate your streetwear game with our premium Embroidered Hoodie. Made from ultra-soft cotton blend fabric with intricate embroidered details that showcase your unique style.",
      features: [
        "Premium Cotton Blend Fabric",
        "Intricate Embroidered Design",
        "Kangaroo Front Pocket",
        "Adjustable Drawstring Hood",
        "Ribbed Cuffs and Hem",
        "Pre-Shrunk for Perfect Fit"
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'Grey', 'Navy', 'Olive'],
      inStock: true
    }
  };

  const product = products[id] || products[201]; // Fallback to first product if ID not found

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast({
        title: "Removed from Wishlist",
        description: `${product.name} removed from your wishlist`,
      });
    } else {
      addToWishlist(product);
      toast({
        title: "Added to Wishlist",
        description: `${product.name} added to your wishlist`,
      });
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: quantity,
      size: selectedSize
    });
    
    toast({
      title: "Added to Cart",
      description: `${product.name} added to your cart`,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-20">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center space-x-2 text-sm text-gray-600">
            <button onClick={() => navigate('/')} className="hover:text-electric-indigo">Home</button>
            <span>/</span>
            <button onClick={() => navigate('/shop')} className="hover:text-electric-indigo">Shop</button>
            <span>/</span>
            <span className="text-soft-black capitalize">{product.category}</span>
            <span>/</span>
            <span className="text-soft-black truncate">{product.name}</span>
          </div>
        </div>

        <div className="container mx-auto px-4 py-4 sm:py-8">
          <motion.button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-electric-indigo mb-6 sm:mb-8"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </motion.button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-4">
                <div className="aspect-square bg-gray-100 rounded-lg sm:rounded-2xl overflow-hidden">
                  <img 
                    src={product.images[activeImageIndex]} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                  {product.images.map((image, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 ${
                        activeImageIndex === index ? 'border-neon-green' : 'border-transparent'
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <img 
                        src={image} 
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              className="space-y-4 sm:space-y-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-soft-black mb-4">
                  {product.name}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 sm:w-5 sm:h-5 ${i < Math.floor(product.rating) ? 'text-cyber-yellow fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                    <span className="text-gray-600 ml-2 text-sm sm:text-base">({product.reviews} reviews)</span>
                  </div>
                </div>
                
                <div className="text-2xl sm:text-3xl font-bold text-soft-black mb-4 sm:mb-6">
                  ${product.price}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {product.description}
                </p>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-soft-black mb-3">Size</h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {product.sizes.map((size) => (
                    <motion.button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-2 sm:px-4 sm:py-2 border-2 rounded-lg font-medium text-sm sm:text-base ${
                        selectedSize === size
                          ? 'border-neon-green bg-neon-green text-white'
                          : 'border-gray-300 text-gray-700 hover:border-neon-green'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-soft-black mb-3">Color</h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {product.colors.map((color) => (
                    <motion.button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-2 sm:px-4 sm:py-2 border-2 rounded-lg font-medium text-sm sm:text-base ${
                        selectedColor === color
                          ? 'border-neon-green bg-neon-green text-white'
                          : 'border-gray-300 text-gray-700 hover:border-neon-green'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {color}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-soft-black mb-3">Quantity</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-gray-600 hover:text-electric-indigo"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-gray-600 hover:text-electric-indigo"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-gray-600 text-sm sm:text-base">
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 sm:space-y-4">
                <motion.button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="w-full bg-gradient-neon text-white py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: product.inStock ? 1.02 : 1 }}
                  whileTap={{ scale: product.inStock ? 0.98 : 1 }}
                >
                  <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
                  Add to Cart
                </motion.button>
                
                <motion.button
                  onClick={handleWishlistToggle}
                  className={`w-full py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg border-2 ${
                    isInWishlist(product.id)
                      ? 'border-neon-pink bg-neon-pink text-white'
                      : 'border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-white'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Heart className={`w-4 h-4 sm:w-5 sm:h-5 inline mr-2 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                  {isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </motion.button>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-soft-black mb-3">Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
                      <span className="w-2 h-2 bg-neon-green rounded-full flex-shrink-0"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Shipping Info */}
              <div className="border-t pt-4 sm:pt-6 space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3 text-gray-600 text-sm sm:text-base">
                  <Truck className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span>Free shipping on orders over $100</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 text-sm sm:text-base">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span>1 year warranty included</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 text-sm sm:text-base">
                  <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span>30-day return policy</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
