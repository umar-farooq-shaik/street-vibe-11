
import React from 'react';
import { motion } from 'framer-motion';
import { User, ShoppingBag, Heart, LogOut, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user: any; // Replace with proper user type when auth is implemented
}

const ProfileSidebar = ({ isOpen, onClose, user }: ProfileSidebarProps) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: Heart,
      label: 'Your Wishlist',
      path: '/wishlist',
      color: 'text-neon-pink'
    },
    {
      icon: ShoppingBag,
      label: 'Your Orders',
      path: '/orders',
      color: 'text-electric-indigo'
    },
    {
      icon: User,
      label: 'Account Info',
      path: '/account',
      color: 'text-neon-green'
    }
  ];

  const handleItemClick = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleSignOut = () => {
    console.log('Signing out...');
    // Add sign out logic here
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/50 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <motion.div
        className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-soft-black">Profile</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Info */}
          <div className="flex items-center gap-4 mb-8 p-4 bg-gradient-to-r from-neon-green/10 to-electric-indigo/10 rounded-lg">
            <div className="w-12 h-12 bg-gradient-neon rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-soft-black">
                {user?.name || 'Guest User'}
              </h3>
              <p className="text-sm text-gray-600">
                {user?.email || 'guest@example.com'}
              </p>
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-2 mb-8">
            {menuItems.map((item) => (
              <motion.button
                key={item.label}
                onClick={() => handleItemClick(item.path)}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <span className="font-medium text-soft-black">{item.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Sign Out Button */}
          <motion.button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 p-3 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </motion.button>
        </div>
      </motion.div>
    </>
  );
};

export default ProfileSidebar;
