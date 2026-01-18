import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiExternalLink } from 'react-icons/fi';
import Card from '../ui/Card';

const AdvertisementCard = ({ advertisement, onEdit, onDelete, isAdmin = false }) => {
  const getImageUrl = (image) => {
    if (!image) return '';
    if (image.startsWith('http') || image.startsWith('data:')) return image;
    const baseUrl = process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5000';
    return `${baseUrl}${image}`;
  };

  const imageUrl = getImageUrl(advertisement.image);

  if (isAdmin) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -4 }}
        className="group"
      >
        <Card className="overflow-hidden">
          <div className="relative h-48 bg-slate-100 dark:bg-slate-800">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={advertisement.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-600">
                <span>No Image</span>
              </div>
            )}
            <div className="absolute top-2 right-2 flex gap-2">
              {advertisement.isActive ? (
                <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  Active
                </span>
              ) : (
                <span className="bg-slate-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  Inactive
                </span>
              )}
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100 line-clamp-2">
                {advertisement.title}
              </h3>
              <span className="text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-2 py-1 rounded capitalize">
                {advertisement.type}
              </span>
            </div>
            {advertisement.description && (
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                {advertisement.description}
              </p>
            )}
            <div className="flex items-center justify-between">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Order: {advertisement.order || 0}
              </div>
              <div className="flex gap-2">
                {onEdit && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onEdit(advertisement)}
                    className="p-2 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                    aria-label="Edit"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </motion.button>
                )}
                {onDelete && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onDelete(advertisement._id)}
                    className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    aria-label="Delete"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
    >
      <Link to={advertisement.link || '/products'}>
        <Card hover className="relative h-64 sm:h-80 overflow-hidden group">
          <div className="absolute inset-0">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={advertisement.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                <span className="text-white text-xl font-bold">
                  {advertisement.title}
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20 group-hover:from-black/70 group-hover:via-black/40 group-hover:to-black/10 transition-all duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>

          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {advertisement.title && (
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3 group-hover:text-primary-200 transition-colors">
                  {advertisement.title}
                </h3>
              )}
              {advertisement.description && (
                <p className="text-sm sm:text-base text-white/90 mb-4 sm:mb-6 line-clamp-2">
                  {advertisement.description}
                </p>
              )}
              <motion.div
                whileHover={{ x: 5 }}
                className="inline-flex items-center gap-2 text-white font-semibold text-sm sm:text-base group-hover:text-primary-200 transition-colors"
              >
                Shop Now
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </motion.div>
          </div>

          {advertisement.isActive && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-primary-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              New
            </div>
          )}
        </Card>
      </Link>
    </motion.div>
  );
};

export default AdvertisementCard;

