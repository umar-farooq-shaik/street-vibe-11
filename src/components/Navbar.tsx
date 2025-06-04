
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Search, User, Heart, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import ProfileSidebar from './ProfileSidebar';

const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState(false);
  const { wishlist } = useWishlist();
  const { getTotalItems } = useCart();

  // Authentication state - get from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check for existing user session on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const handleProfileClick = () => {
    if (isAuthenticated) {
      setIsProfileSidebarOpen(true);
    } else {
      navigate('/auth');
    }
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('user');
    setIsProfileSidebarOpen(false);
    console.log('User signed out');
  };

  // Reordered navigation items: Home, Shop, Trending, Contact
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Trending', path: '/shop' },
    { name: 'Contact', path: '/contact' },
  ];

  const cartCount = getTotalItems();

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg' 
            : 'bg-white/10 backdrop-blur-md'
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
              <span className={`text-xl font-bold ${isScrolled ? 'text-soft-black' : 'text-white'}`}>StreetVibe</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className={`font-medium transition-colors relative ${
                    isScrolled 
                      ? 'text-soft-black hover:text-electric-indigo' 
                      : 'text-white hover:text-neon-green'
                  }`}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.name}
                  <motion.div
                    className={`absolute bottom-0 left-0 w-full h-0.5 origin-left ${
                      isScrolled ? 'bg-neon-green' : 'bg-white'
                    }`}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
            </div>

            {/* Right Section - Reordered: Search, Wishlist, Cart, User */}
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={() => navigate('/shop')}
                className={`p-2 rounded-full transition-colors ${
                  isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/20'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Search className={`w-5 h-5 ${isScrolled ? 'text-soft-black' : 'text-white'}`} />
              </motion.button>

              <motion.button
                onClick={() => navigate('/wishlist')}
                className={`relative p-2 rounded-full transition-colors ${
                  isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/20'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart className={`w-5 h-5 ${isScrolled ? 'text-soft-black' : 'text-white'}`} />
                {wishlist.length > 0 && (
                  <motion.span
                    className="absolute -top-1 -right-1 bg-neon-pink text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {wishlist.length}
                  </motion.span>
                )}
              </motion.button>

              <motion.button
                onClick={() => navigate('/cart')}
                className={`relative p-2 rounded-full transition-colors ${
                  isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/20'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ShoppingCart className={`w-5 h-5 ${isScrolled ? 'text-soft-black' : 'text-white'}`} />
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

              <motion.button
                onClick={handleProfileClick}
                className={`relative p-2 rounded-full transition-colors ${
                  isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/20'
                } ${isAuthenticated ? 'ring-2 ring-neon-green' : ''}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isAuthenticated && user?.picture ? (
                  <img
                    src={user.picture}
                    alt="Profile"
                    className="w-5 h-5 rounded-full"
                  />
                ) : (
                  <User className={`w-5 h-5 ${isScrolled ? 'text-soft-black' : 'text-white'}`} />
                )}
                {isAuthenticated && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-neon-green rounded-full border-2 border-white"></div>
                )}
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden p-2 rounded-full transition-colors ${
                  isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/20'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isMobileMenuOpen ? (
                  <X className={`w-5 h-5 ${isScrolled ? 'text-soft-black' : 'text-white'}`} />
                ) : (
                  <Menu className={`w-5 h-5 ${isScrolled ? 'text-soft-black' : 'text-white'}`} />
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

      {/* Profile Sidebar */}
      <AnimatePresence>
        {isProfileSidebarOpen && (
          <ProfileSidebar
            isOpen={isProfileSidebarOpen}
            onClose={() => setIsProfileSidebarOpen(false)}
            user={user}
            onSignOut={handleSignOut}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
