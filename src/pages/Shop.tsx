import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List, Heart, ShoppingCart } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { toast } from '../hooks/use-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Shop = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Update category when URL params change and scroll to products
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
      // Scroll to products section after a short delay
      setTimeout(() => {
        const productsSection = document.getElementById('products-section');
        if (productsSection) {
          productsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [searchParams]);

  // 100 new products with diverse categories and real fashion images
  const products = [
    // 5 New Premium Products at the top
    { id: 201, name: "Premium Leather Aviator Jacket", price: 299, category: "jackets", image: "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=500&h=500&fit=crop&crop=center", rating: 4.9, reviews: 312 },
    { id: 202, name: "Designer High-Top Sneakers", price: 249, category: "sneakers", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=500&fit=crop&crop=center", rating: 4.9, reviews: 456 },
    
    // 3rd card - Denim Jacket Classic
    { id: 37, name: "Denim Jacket Classic", price: 99, category: "jackets", image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=500&h=500&fit=crop&crop=center", rating: 4.7, reviews: 156 },
    
    // 4th card - Cropped Jeans  
    { id: 64, name: "Cropped Jeans", price: 79, category: "jeans", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=500&fit=crop&crop=center", rating: 4.4, reviews: 134 },
    
    // 5th card - Casual Button Shirt
    { id: 67, name: "Casual Button Shirt", price: 59, category: "shirts", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&h=500&fit=crop&crop=center", rating: 4.8, reviews: 67 },

    // Continue with remaining products (excluding the removed ones)
    { id: 204, name: "Limited Edition Basketball Shoes", price: 199, category: "sneakers", image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&h=500&fit=crop&crop=center", rating: 4.9, reviews: 523 },

    // Hoodies (13 products - removed pastel pink hoodie)
    { id: 1, name: "Urban Streetwear Hoodie", price: 79, category: "hoodies", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop&crop=center", rating: 4.8, reviews: 124 },
    { id: 6, name: "Minimalist White Hoodie", price: 85, category: "hoodies", image: "https://images.unsplash.com/photo-1618677603286-0ec56cb6e1b5?w=500&h=500&fit=crop&crop=center", rating: 4.6, reviews: 87 },
    { id: 8, name: "Neon Green Hoodie", price: 88, category: "hoodies", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&h=500&fit=crop&crop=center", rating: 4.5, reviews: 78 },
    { id: 9, name: "Tie-Dye Hoodie", price: 105, category: "hoodies", image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&h=500&fit=crop&crop=center", rating: 4.9, reviews: 167 },
    { id: 11, name: "Gothic Black Hoodie", price: 89, category: "hoodies", image: "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=500&h=500&fit=crop&crop=center", rating: 4.6, reviews: 98 },
    { id: 12, name: "Embroidered Hoodie", price: 115, category: "hoodies", image: "https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?w=500&h=500&fit=crop&crop=center", rating: 4.8, reviews: 189 },
    { id: 13, name: "Japanese Text Hoodie", price: 94, category: "hoodies", image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=500&h=500&fit=crop&crop=center", rating: 4.5, reviews: 76 },
    { id: 14, name: "Chrome Hearts Hoodie", price: 125, category: "hoodies", image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=500&h=500&fit=crop&crop=center", rating: 4.9, reviews: 234 },
    { id: 15, name: "Mesh Panel Hoodie", price: 108, category: "hoodies", image: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=500&h=500&fit=crop&crop=center", rating: 4.7, reviews: 156 },
    { id: 16, name: "Cropped Hoodie", price: 75, category: "hoodies", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop&crop=center", rating: 4.6, reviews: 123 },
    { id: 17, name: "Color Block Hoodie", price: 99, category: "hoodies", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=500&fit=crop&crop=center", rating: 4.8, reviews: 167 },
    { id: 18, name: "Reflective Hoodie", price: 135, category: "hoodies", image: "https://images.unsplash.com/photo-1622445275576-721325763afe?w=500&h=500&fit=crop&crop=center", rating: 4.9, reviews: 198 },

    // Sneakers (13 products - removed neon running shoes and led light sneakers)
    { id: 19, name: "White Leather Sneakers", price: 149, category: "sneakers", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop&crop=center", rating: 4.8, reviews: 203 },
    { id: 21, name: "High-Top Canvas Sneakers", price: 89, category: "sneakers", image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&h=500&fit=crop&crop=center", rating: 4.6, reviews: 145 },
    { id: 22, name: "Black Athletic Sneakers", price: 159, category: "sneakers", image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500&h=500&fit=crop&crop=center", rating: 4.9, reviews: 234 },
    { id: 23, name: "Colorful Street Sneakers", price: 119, category: "sneakers", image: "https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=500&h=500&fit=crop&crop=center", rating: 4.5, reviews: 92 },
    { id: 24, name: "Retro Basketball Shoes", price: 169, category: "sneakers", image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&h=500&fit=crop&crop=center", rating: 4.8, reviews: 256 },
    { id: 25, name: "Minimalist White Sneakers", price: 129, category: "sneakers", image: "https://images.unsplash.com/photo-1520256862855-398228c41684?w=500&h=500&fit=crop&crop=center", rating: 4.7, reviews: 178 },
    { id: 27, name: "Platform Sneakers", price: 139, category: "sneakers", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=500&fit=crop&crop=center", rating: 4.6, reviews: 134 },
    { id: 29, name: "Vintage Suede Sneakers", price: 119, category: "sneakers", image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&h=500&fit=crop&crop=center", rating: 4.7, reviews: 167 },
    { id: 30, name: "Chunky Dad Sneakers", price: 179, category: "sneakers", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop&crop=center", rating: 4.8, reviews: 198 },
    { id: 32, name: "Metallic Sneakers", price: 159, category: "sneakers", image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&h=500&fit=crop&crop=center", rating: 4.6, reviews: 145 },
    { id: 33, name: "Eco-Friendly Sneakers", price: 139, category: "sneakers", image: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=500&h=500&fit=crop&crop=center", rating: 4.9, reviews: 223 },
    { id: 34, name: "Sock Sneakers", price: 99, category: "sneakers", image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=500&h=500&fit=crop&crop=center", rating: 4.4, reviews: 87 },
    { id: 36, name: "Designer Collaboration Sneakers", price: 299, category: "sneakers", image: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=500&h=500&fit=crop&crop=center", rating: 4.9, reviews: 312 },

    // Jackets (13 products - removed luxury wool peacoat and sherpa jacket)
    { id: 39, name: "Fleece Zip-Up Jacket", price: 79, category: "jackets", image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&h=500&fit=crop&crop=center", rating: 4.6, reviews: 89 },
    { id: 40, name: "Military Style Jacket", price: 129, category: "jackets", image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=500&fit=crop&crop=center", rating: 4.8, reviews: 198 },
    { id: 42, name: "Leather Biker Jacket", price: 249, category: "jackets", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop&crop=center", rating: 4.9, reviews: 289 },
    { id: 45, name: "Corduroy Jacket", price: 109, category: "jackets", image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=500&h=500&fit=crop&crop=center", rating: 4.6, reviews: 145 },
    { id: 46, name: "Trucker Jacket", price: 89, category: "jackets", image: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=500&h=500&fit=crop&crop=center", rating: 4.5, reviews: 123 },
    { id: 47, name: "Bomber Jacket", price: 139, category: "jackets", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop&crop=center", rating: 4.8, reviews: 198 },
    { id: 48, name: "Rain Jacket", price: 99, category: "jackets", image: "https://images.unsplash.com/photo-1562572159-4efc207f5aff?w=500&h=500&fit=crop&crop=center", rating: 4.4, reviews: 89 },
    { id: 50, name: "Utility Vest", price: 79, category: "jackets", image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=500&fit=crop&crop=center", rating: 4.5, reviews: 134 },
    { id: 51, name: "Blazer Jacket", price: 189, category: "jackets", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&crop=center", rating: 4.8, reviews: 234 },

    // Jeans (14 products)
    { id: 52, name: "Street Style Pants", price: 69, category: "jeans", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=500&fit=crop&crop=center", rating: 4.6, reviews: 98 },
    { id: 53, name: "Skinny Fit Jeans", price: 89, category: "jeans", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop&crop=center", rating: 4.5, reviews: 178 },
    { id: 54, name: "Ripped Distressed Jeans", price: 95, category: "jeans", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&h=500&fit=crop&crop=center", rating: 4.7, reviews: 145 },
    { id: 55, name: "High-Waisted Jeans", price: 99, category: "jeans", image: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=500&h=500&fit=crop&crop=center", rating: 4.8, reviews: 234 },
    { id: 57, name: "Black Cargo Pants", price: 109, category: "jeans", image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=500&h=500&fit=crop&crop=center", rating: 4.4, reviews: 98 },
    { id: 58, name: "Wide Leg Jeans", price: 119, category: "jeans", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop&crop=center", rating: 4.7, reviews: 189 },
    { id: 59, name: "Flare Jeans", price: 89, category: "jeans", image: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=500&h=500&fit=crop&crop=center", rating: 4.5, reviews: 156 },
    { id: 60, name: "Vintage Washed Jeans", price: 129, category: "jeans", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=500&fit=crop&crop=center", rating: 4.8, reviews: 198 },
    { id: 61, name: "Boyfriend Jeans", price: 95, category: "jeans", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&h=500&fit=crop&crop=center", rating: 4.6, reviews: 145 },
    { id: 63, name: "Acid Wash Jeans", price: 99, category: "jeans", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop&crop=center", rating: 4.7, reviews: 167 },
    { id: 65, name: "Raw Denim Jeans", price: 149, category: "jeans", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop&crop=center", rating: 4.8, reviews: 234 },
    { id: 66, name: "Embroidered Jeans", price: 139, category: "jeans", image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=500&h=500&fit=crop&crop=center", rating: 4.9, reviews: 198 },

    // Shirts (24 products)
    { id: 68, name: "Premium Tech Tee", price: 45, category: "shirts", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop&crop=center", rating: 4.7, reviews: 123 },
    { id: 70, name: "Oversized T-Shirt", price: 39, category: "shirts", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=500&fit=crop&crop=center", rating: 4.6, reviews: 156 },
    { id: 71, name: "Striped Long Sleeve", price: 55, category: "shirts", image: "https://images.unsplash.com/photo-1622445275576-721325763afe?w=500&h=500&fit=crop&crop=center", rating: 4.7, reviews: 89 },
    { id: 72, name: "Flannel Shirt", price: 75, category: "shirts", image: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=500&h=500&fit=crop&crop=center", rating: 4.8, reviews: 198 },
    { id: 73, name: "Polo Shirt", price: 49, category: "shirts", image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=500&h=500&fit=crop&crop=center", rating: 4.5, reviews: 134 },
    { id: 74, name: "Crop Top", price: 29, category: "shirts", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop&crop=center", rating: 4.6, reviews: 167 },
    { id: 76, name: "Tie-Dye T-Shirt", price: 38, category: "shirts", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=500&fit=crop&crop=center", rating: 4.5, reviews: 145 },
    { id: 77, name: "Henley Shirt", price: 52, category: "shirts", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&h=500&fit=crop&center", rating: 4.6, reviews: 123 },
    { id: 78, name: "Tank Top", price: 25, category: "shirts", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop&crop=center", rating: 4.4, reviews: 98 },
    { id: 79, name: "Mesh T-Shirt", price: 48, category: "shirts", image: "https://images.unsplash.com/photo-1622445275576-721325763afe?w=500&h=500&fit=crop&crop=center", rating: 4.7, reviews: 156 },
    { id: 81, name: "Linen Shirt", price: 79, category: "shirts", image: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=500&h=500&fit=crop&crop=center", rating: 4.6, reviews: 167 },
    { id: 82, name: "Muscle Tee", price: 32, category: "shirts", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop&crop=center", rating: 4.5, reviews: 134 },
    { id: 83, name: "Cuban Collar Shirt", price: 68, category: "shirts", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&h=500&fit=crop&crop=center", rating: 4.7, reviews: 189 },
    { id: 84, name: "Thermal Long Sleeve", price: 45, category: "shirts", image: "https://images.unsplash.com/photo-1622445275576-721325763afe?w=500&h=500&fit=crop&crop=center", rating: 4.6, reviews: 145 },
    { id: 85, name: "Turtleneck", price: 59, category: "shirts", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=500&fit=crop&crop=center", rating: 4.8, reviews: 198 },
    { id: 87, name: "Baseball Jersey", price: 72, category: "shirts", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop&crop=center", rating: 4.7, reviews: 156 },
    { id: 88, name: "Sweatshirt", price: 65, category: "shirts", image: "https://images.unsplash.com/photo-1622445275576-721325763afe?w=500&h=500&fit=crop&crop=center", rating: 4.6, reviews: 178 },
    { id: 89, name: "V-Neck T-Shirt", price: 29, category: "shirts", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=500&fit=crop&crop=center", rating: 4.4, reviews: 145 },
    { id: 90, name: "Cardigan", price: 89, category: "shirts", image: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=500&h=500&fit=crop&crop=center", rating: 4.8, reviews: 234 },

    // Accessories (29 products)
    { id: 92, name: "Sport Cap Essential", price: 29, category: "accessories", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&h=500&fit=crop&crop=center", rating: 4.5, reviews: 234 },
    { id: 93, name: "Designer Backpack", price: 89, category: "accessories", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop&crop=center", rating: 4.9, reviews: 45 },
    { id: 94, name: "Bucket Hat", price: 35, category: "accessories", image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=500&h=500&fit=crop&crop=center", rating: 4.4, reviews: 89 },
    { id: 95, name: "Chain Necklace", price: 45, category: "accessories", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop&crop=center", rating: 4.7, reviews: 156 },
    { id: 96, name: "Sunglasses", price: 79, category: "accessories", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop&crop=center", rating: 4.6, reviews: 123 },
    { id: 97, name: "Leather Belt", price: 59, category: "accessories", image: "https://images.unsplash.com/photo-1553456558-aff63285bdd1?w=500&h=500&fit=crop&crop=center", rating: 4.8, reviews: 234 },
    { id: 98, name: "Canvas Tote Bag", price: 39, category: "accessories", image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&h=500&fit=crop&crop=center", rating: 4.5, reviews: 78 },
    { id: 99, name: "Beanie Hat", price: 25, category: "accessories", image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500&h=500&fit=crop&crop=center", rating: 4.3, reviews: 145 },
    { id: 100, name: "Watch", price: 159, category: "accessories", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=500&fit=crop&crop=center", rating: 4.9, reviews: 267 },
    { id: 101, name: "Cross Body Bag", price: 69, category: "accessories", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop&crop=center", rating: 4.7, reviews: 198 },
    { id: 103, name: "Fanny Pack", price: 49, category: "accessories", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop&crop=center", rating: 4.6, reviews: 156 },
    { id: 104, name: "Choker Necklace", price: 25, category: "accessories", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop&crop=center", rating: 4.5, reviews: 134 },
    { id: 105, name: "Baseball Cap", price: 35, category: "accessories", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&h=500&fit=crop&crop=center", rating: 4.6, reviews: 189 },
    { id: 106, name: "Scarf", price: 42, category: "accessories", image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500&h=500&fit=crop&crop=center", rating: 4.7, reviews: 145 },
    { id: 107, name: "Ring Set", price: 38, category: "accessories", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop&crop=center", rating: 4.8, reviews: 198 },
    { id: 108, name: "Earbuds Case", price: 29, category: "accessories", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop&crop=center", rating: 4.5, reviews: 123 },
    { id: 109, name: "Phone Case", price: 35, category: "accessories", image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&h=500&fit=crop&crop=center", rating: 4.6, reviews: 167 },
    { id: 110, name: "Wallet", price: 65, category: "accessories", image: "https://images.unsplash.com/photo-1553456558-aff63285bdd1?w=500&h=500&fit=crop&crop=center", rating: 4.8, reviews: 234 },
    { id: 111, name: "Hair Clips", price: 22, category: "accessories", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop&crop=center", rating: 4.4, reviews: 98 },
    { id: 112, name: "Bandana", price: 18, category: "accessories", image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500&h=500&fit=crop&crop=center", rating: 4.3, reviews: 87 },
    { id: 114, name: "Bracelet", price: 35, category: "accessories", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop&crop=center", rating: 4.6, reviews: 156 },
    { id: 115, name: "Keychain", price: 15, category: "accessories", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop&crop=center", rating: 4.2, reviews: 89 },
    { id: 116, name: "Hair Tie Set", price: 12, category: "accessories", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop&crop=center", rating: 4.3, reviews: 67 },
    { id: 117, name: "Pin Collection", price: 25, category: "accessories", image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&h=500&fit=crop&crop=center", rating: 4.5, reviews: 123 },
    { id: 118, name: "Laptop Sleeve", price: 45, category: "accessories", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop&crop=center", rating: 4.7, reviews: 178 },
    { id: 119, name: "Gym Bag", price: 59, category: "accessories", image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&h=500&fit=crop&crop=center", rating: 4.6, reviews: 189 },
    { id: 120, name: "Travel Organizer", price: 39, category: "accessories", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop&crop=center", rating: 4.5, reviews: 134 }
  ];

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'hoodies', name: 'Hoodies' },
    { id: 'sneakers', name: 'Sneakers' },
    { id: 'jackets', name: 'Jackets' },
    { id: 'jeans', name: 'Jeans' },
    { id: 'shirts', name: 'Shirts' },
    { id: 'accessories', name: 'Accessories' },
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

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // newest - keep original order
        break;
    }

    return filtered;
  }, [searchTerm, selectedCategory, priceRange, sortBy]);

  return (
    <div className="min-h-screen bg-white-smoke">
      <Navbar />
      
      {/* Page Header - increased padding */}
      <motion.div
        className="pt-20 pb-12 bg-gradient-dark"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Shop <span className="text-gradient-neon">Collection</span>
          </h1>
          <p className="text-xl text-gray-300">Discover your perfect style</p>
        </div>
      </motion.div>

      <div id="products-section" className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div
            className="lg:w-1/4"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-soft-black mb-6 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters
              </h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-neon-green focus:border-transparent"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category.id} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category.id}
                        checked={selectedCategory === category.id}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="mr-2 text-neon-green focus:ring-neon-green"
                      />
                      {category.name}
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Products Section */}
          <div className="lg:w-3/4">
            {/* Controls */}
            <motion.div
              className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-4">
                <span className="text-gray-600">{filteredProducts.length} products found</span>
              </div>
              
              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-neon-green"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
                
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-neon-green text-white' : 'bg-white text-gray-600'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-neon-green text-white' : 'bg-white text-gray-600'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Products Grid */}
            <motion.div
              className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {filteredProducts.map((product, index) => (
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

            {/* No products found */}
            {filteredProducts.length === 0 && (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-6xl mb-4">😔</div>
                <h3 className="text-2xl font-bold text-soft-black mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
                <motion.button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setPriceRange([0, 500]);
                  }}
                  className="bg-gradient-neon text-white px-6 py-3 rounded-lg font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear Filters
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Shop;
