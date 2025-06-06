
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TrendingSection from '../components/TrendingSection';
import CategoriesSection from '../components/CategoriesSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="px-4">
        <Hero />
      </div>
      <TrendingSection />
      <CategoriesSection />
      <Footer />
    </div>
  );
};

export default Index;
