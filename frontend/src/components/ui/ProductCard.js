import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiStar, FiHeart } from 'react-icons/fi';
import Card from './Card';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-toastify';

const ProductCard = ({ product, index = 0 }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const inWishlist = isInWishlist(product._id);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product._id);
      toast.info('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist');
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock > 0) {
      addToCart(product, 1);
      toast.success('Product added to cart!');
    } else {
      toast.error('Product is out of stock');
    }
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const imageUrl = product.images?.[0]
    ? product.images[0].startsWith('http') || product.images[0].startsWith('data:')
      ? product.images[0]
      : `${process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5000'}${product.images[0]}`
    : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Card hover className="group overflow-hidden h-full flex flex-col">
        <Link to={`/products/${product._id}`} className="relative block">
          <div className="relative h-48 sm:h-56 bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {product.stock === 0 && (
              <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
                Out of Stock
              </div>
            )}
            {discount > 0 && (
              <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                -{discount}%
              </div>
            )}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleWishlistToggle}
              className={`absolute top-2 right-2 p-2 rounded-full shadow-lg transition-colors ${
                inWishlist
                  ? 'bg-red-500 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-slate-700'
              }`}
              aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <FiHeart className={inWishlist ? 'fill-current' : ''} />
            </motion.button>
          </div>
        </Link>

        <div className="p-4 flex-1 flex flex-col">
          <Link to={`/products/${product._id}`}>
            <h3 className="font-semibold text-base sm:text-lg text-slate-900 dark:text-slate-100 mb-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors line-clamp-2 min-h-[3rem]">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center">
              <FiStar className="text-yellow-400 fill-current text-sm" />
              <span className="ml-1 text-sm text-slate-600 dark:text-slate-400 font-medium">
                {product.rating?.toFixed(1) || '0.0'}
              </span>
            </div>
            <span className="text-slate-400 dark:text-slate-500 text-sm">
              ({product.numReviews || 0})
            </span>
          </div>

          <div className="mt-auto">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl sm:text-2xl font-bold text-primary-600 dark:text-primary-400">
                ₹{product.price?.toLocaleString() || '0'}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-slate-400 dark:text-slate-500 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-semibold hover:from-primary-700 hover:to-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
            >
              <FiShoppingCart />
              <span>Add to Cart</span>
            </motion.button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProductCard;

