import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../utils/api';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import {
  FiShoppingCart,
  FiStar,
  FiArrowRight,
  FiTrendingUp,
  FiZap,
  FiAward,
} from 'react-icons/fi';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Skeleton from '../components/ui/Skeleton';
import ProductCard from '../components/ui/ProductCard';
import Countdown from '../components/ui/Countdown';
import AdvertisementSlider from '../components/advertisements/AdvertisementSlider';
import AdvertisementBanner from '../components/advertisements/AdvertisementBanner';

const Home = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdvertisements();
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchAdvertisements = async () => {
    try {
      const res = await api.get('/advertisements');
      setAdvertisements(res.data);
    } catch (error) {
      console.error('Error fetching advertisements:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products?limit=8');
      setProducts(res.data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get('/products/categories/list');
      setCategories(res.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };


  const handleAddToCart = (product) => {
    if (product.stock > 0) {
      addToCart(product, 1);
      toast.success('Product added to cart!');
    } else {
      toast.error('Product is out of stock');
    }
  };

  const categoryIcons = [
    FiTrendingUp,
    FiZap,
    FiAward,
    FiShoppingCart,
    FiTrendingUp,
    FiZap,
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              Discover Amazing
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Products
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl sm:text-2xl text-primary-100 mb-8 max-w-2xl mx-auto"
            >
              Shop the latest trends and find everything you need in one place
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                onClick={() => navigate('/products')}
                className="bg-white text-primary-700 hover:bg-primary-50 shadow-xl"
              >
                Shop Now
                <FiArrowRight className="ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/products')}
                className="border-2 border-white text-white hover:bg-white/10"
              >
                Explore Collection
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Hero Slider - Modern Advertisement Slider */}
      <AdvertisementSlider
        advertisements={advertisements.filter((ad) => ad.type === 'slider' && ad.isActive)}
      />

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="py-16 bg-slate-50 dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Shop by Category
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                Browse our wide range of product categories
              </p>
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
              {categories.slice(0, 6).map((category, index) => {
                const Icon = categoryIcons[index % categoryIcons.length];
                return (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    whileHover={{ y: -8 }}
                  >
                    <Link to={`/products?category=${category}`}>
                      <Card hover className="text-center p-6 h-full">
                        <div className="flex flex-col items-center">
                          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mb-4 shadow-lg">
                            <Icon className="text-2xl text-white" />
                          </div>
                          <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                            {category}
                          </h3>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Banners - Modern Advertisement Banners */}
      <AdvertisementBanner
        advertisements={advertisements
          .filter((ad) => ad.type === 'banner' && ad.isActive)
          .slice(0, 6)}
      />

      {/* Flash Sale Section */}
      <section className="py-16 bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-600 text-white text-sm font-bold rounded-full">
                    FLASH SALE
                  </span>
                  <Countdown
                    targetDate={new Date(Date.now() + 24 * 60 * 60 * 1000)}
                  />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">
                  Limited Time Offers
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  Don't miss out on these amazing deals
                </p>
              </div>
              <Link
                to="/products?sort=-createdAt"
                className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold hover:gap-3 transition-all"
              >
                View All Deals
                <FiArrowRight />
              </Link>
            </div>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i}>
                  <Skeleton className="h-48 w-full mb-4" variant="rectangular" />
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <Skeleton className="h-10 w-full" />
                </Card>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(0, 4).map((product, index) => (
                <ProductCard key={product._id} product={product} index={index} />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-between items-center mb-12"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                Featured Products
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Handpicked products just for you
              </p>
            </div>
            <Link
              to="/products"
              className="hidden sm:flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold hover:gap-3 transition-all"
            >
              View All
              <FiArrowRight />
            </Link>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i}>
                  <Skeleton className="h-48 w-full mb-4" variant="rectangular" />
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <Skeleton className="h-10 w-full" />
                </Card>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <ProductCard key={product._id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                No products available at the moment
              </p>
            </div>
          )}

          <div className="text-center mt-8 sm:hidden">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold"
            >
              View All Products
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-16 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Special Offer: Up to 50% Off
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Don't miss out on our biggest sale of the year. Shop now and save!
            </p>
            <Button
              size="lg"
              onClick={() => navigate('/products')}
              className="bg-white text-primary-700 hover:bg-primary-50 shadow-xl"
            >
              Shop Now
              <FiArrowRight className="ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
