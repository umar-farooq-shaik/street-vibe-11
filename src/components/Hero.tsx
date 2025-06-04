
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-dark">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 bg-neon-green/20 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              delay: i * 0.7,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-neon-green font-medium mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Star className="w-4 h-4 fill-current" />
              <span>Trending in Gen Z Fashion</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Level Up
              <br />
              <span className="text-gradient-neon">Your Style</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Discover the hottest streetwear trends. From casual cool to statement pieces that turn heads.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <motion.button
                onClick={() => navigate('/shop')}
                className="group bg-gradient-neon text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center gap-3 hover:shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(0, 255, 163, 0.4)",
                    "0 0 0 20px rgba(0, 255, 163, 0)",
                    "0 0 0 0 rgba(0, 255, 163, 0.4)"
                  ]
                }}
                transition={{
                  boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                Shop Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 backdrop-blur-md transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Collections
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex items-center justify-center lg:justify-start gap-8 mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-white">10K+</div>
                <div className="text-gray-400 text-sm">Happy Customers</div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-gray-400 text-sm">Products</div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">4.9</div>
                <div className="text-gray-400 text-sm">Rating</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image/Animation */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              {/* Main Product Showcase */}
              <motion.div
                className="w-80 h-80 mx-auto bg-gradient-to-br from-white/10 to-white/5 rounded-3xl backdrop-blur-md border border-white/20 flex items-center justify-center text-9xl"
                animate={{
                  y: [0, -20, 0],
                  rotateY: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                👕
              </motion.div>

              {/* Floating Elements */}
              {[
                { emoji: '👟', position: 'top-0 right-0', delay: 0 },
                { emoji: '🧥', position: 'bottom-0 left-0', delay: 1 },
                { emoji: '👖', position: 'top-1/2 -right-8', delay: 2 },
                { emoji: '🧢', position: 'bottom-1/4 -left-8', delay: 3 }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className={`absolute ${item.position} w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center text-3xl`}
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 5, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: item.delay,
                    ease: "easeInOut"
                  }}
                >
                  {item.emoji}
                </motion.div>
              ))}

              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-neon opacity-20 blur-3xl rounded-3xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-neon-green rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
