import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Mail, Phone, MapPin, Edit2, Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Account = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock user data - replace with real data from your auth system
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Street Fashion Ave, Style City, SC 12345'
  });

  const [editForm, setEditForm] = useState(userInfo);

  const handleSave = () => {
    setUserInfo(editForm);
    setIsEditing(false);
    console.log('Saving user info:', editForm);
    // Add API call to save user info here
  };

  const handleCancel = () => {
    setEditForm(userInfo);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-white-smoke relative">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <motion.button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-electric-indigo mb-6"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          whileHover={{ x: -5 }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </motion.button>

        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-neon rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-soft-black">Account Info</h1>
                  <p className="text-gray-600">Manage your personal information</p>
                </div>
              </div>
              
              {!isEditing ? (
                <motion.button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-neon text-white rounded-lg font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </motion.button>
              ) : (
                <div className="flex gap-2">
                  <motion.button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg font-semibold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </motion.button>
                  <motion.button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg font-semibold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </motion.button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4" />
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-neon-green focus:border-transparent"
                  />
                ) : (
                  <p className="text-lg text-soft-black bg-gray-50 px-4 py-3 rounded-lg">{userInfo.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-neon-green focus:border-transparent"
                  />
                ) : (
                  <p className="text-lg text-soft-black bg-gray-50 px-4 py-3 rounded-lg">{userInfo.email}</p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-neon-green focus:border-transparent"
                  />
                ) : (
                  <p className="text-lg text-soft-black bg-gray-50 px-4 py-3 rounded-lg">{userInfo.phone}</p>
                )}
              </div>

              {/* Address Field */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4" />
                  Address
                </label>
                {isEditing ? (
                  <textarea
                    value={editForm.address}
                    onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-neon-green focus:border-transparent resize-none"
                  />
                ) : (
                  <p className="text-lg text-soft-black bg-gray-50 px-4 py-3 rounded-lg">{userInfo.address}</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Account;
