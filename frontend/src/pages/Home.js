import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import api from '../utils/api';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { FiShoppingCart, FiStar } from 'react-icons/fi';

const Home = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchAdvertisements();
    fetchProducts();
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
      setProducts(res.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  const handleAddToCart = (product) => {
    if (product.stock > 0) {
      addToCart(product, 1);
      toast.success('Product added to cart!');
    } else {
      toast.error('Product is out of stock');
    }
  };

  return (
    <div>
      {/* Hero Slider */}
      {advertisements.filter((ad) => ad.type === 'slider').length > 0 && (
        <div className="mb-8">
          <Slider {...sliderSettings}>
            {advertisements
              .filter((ad) => ad.type === 'slider')
              .map((ad) => (
                <div key={ad._id}>
                  <div className="relative h-96">
                    <img
                      src={`http://localhost:5000${ad.image}`}
                      alt={ad.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                      <div className="text-center text-white px-4">
                        <h2 className="text-4xl font-bold mb-4">{ad.title}</h2>
                        {ad.description && (
                          <p className="text-xl">{ad.description}</p>
                        )}
                        {ad.link && (
                          <Link
                            to={ad.link}
                            className="mt-4 inline-block bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors"
                          >
                            Shop Now
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </Slider>
        </div>
      )}

      {/* Banners */}
      {advertisements.filter((ad) => ad.type === 'banner').length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {advertisements
              .filter((ad) => ad.type === 'banner')
              .slice(0, 2)
              .map((ad) => (
                <Link
                  key={ad._id}
                  to={ad.link || '/products'}
                  className="relative h-64 rounded-lg overflow-hidden group"
                >
                  <img
                    src={`http://localhost:5000${ad.image}`}
                    alt={ad.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all">
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-2xl font-bold">{ad.title}</h3>
                      {ad.description && (
                        <p className="text-sm mt-1">{ad.description}</p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      )}

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
          <Link
            to="/products"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            View All →
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <Link to={`/products/${product._id}`}>
                  <div className="relative h-48 bg-gray-200">
                    <img
                      src={`http://localhost:5000${product.images[0]}`}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {product.stock === 0 && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
                        Out of Stock
                      </div>
                    )}
                  </div>
                </Link>
                <div className="p-4">
                  <Link to={`/products/${product._id}`}>
                    <h3 className="font-semibold text-lg mb-2 hover:text-primary-600">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      <FiStar className="text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">
                        {product.rating.toFixed(1)} ({product.numReviews})
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary-600">
                      ₹{product.price.toLocaleString()}
                    </span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                      className="bg-primary-600 text-white p-2 rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <FiShoppingCart />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

