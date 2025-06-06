
import React from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const NotFound = () => {
  const navigate = useNavigate();

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
          <div className="text-9xl mb-6">🔍</div>
          <h1 className="text-6xl font-bold text-soft-black mb-4">404</h1>
          <h2 className="text-3xl font-bold text-soft-black mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Oops! The page you're looking for doesn't exist.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </motion.button>
            
            <motion.button
              onClick={() => navigate('/')}
              className="flex items-center justify-center gap-2 bg-gradient-neon text-white px-8 py-3 rounded-lg font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home className="w-5 h-5" />
              Go Home
            </motion.button>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
