
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Search, User, Heart, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(3);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Categories', path: '/shop' },
    { name: 'Trending', path: '/shop' },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-8 h-8 bg-gradient-neon rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold text-soft-black">StreetVibe</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => navigate(item.path)}
                className="text-soft-black hover:text-electric-indigo font-medium transition-colors relative"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {item.name}
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-neon-green origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <motion.button
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Search className="w-5 h-5 text-soft-black" />
            </motion.button>

            <motion.button
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className="w-5 h-5 text-soft-black" />
            </motion.button>

            <motion.button
              onClick={() => navigate('/auth')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <User className="w-5 h-5 text-soft-black" />
            </motion.button>

            <motion.button
              onClick={() => navigate('/cart')}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ShoppingCart className="w-5 h-5 text-soft-black" />
              {cartCount > 0 && (
                <motion.span
                  className="absolute -top-1 -right-1 bg-neon-green text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-soft-black" />
              ) : (
                <Menu className="w-5 h-5 text-soft-black" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: isMobileMenuOpen ? 1 : 0, 
            y: isMobileMenuOpen ? 0 : -20 
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="py-4 space-y-2 bg-white/90 backdrop-blur-md rounded-lg mt-2">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => {
                  navigate(item.path);
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-soft-black hover:text-electric-indigo hover:bg-gray-50 transition-colors"
                whileHover={{ x: 5 }}
              >
                {item.name}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
