import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import Card from '../ui/Card';

const AdvertisementBanner = ({ advertisements }) => {
  if (!advertisements || advertisements.length === 0) return null;

  const getImageUrl = (image) => {
    if (!image) return '';
    if (image.startsWith('http') || image.startsWith('data:')) return image;
    const baseUrl = process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5000';
    return `${baseUrl}${image}`;
  };

  return (
    <section className="py-12 sm:py-16 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Special Offers
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Don't miss out on these amazing deals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {advertisements.map((ad, index) => (
            <motion.div
              key={ad._id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
            >
              <Link to={ad.link || '/products'}>
                <Card hover className="relative h-64 sm:h-80 overflow-hidden group">
                  {/* Image */}
                  <div className="absolute inset-0">
                    <img
                      src={getImageUrl(ad.image)}
                      alt={ad.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20 group-hover:from-black/70 group-hover:via-black/40 group-hover:to-black/10 transition-all duration-500"></div>
                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      {ad.title && (
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3 group-hover:text-primary-200 transition-colors">
                          {ad.title}
                        </h3>
                      )}
                      {ad.description && (
                        <p className="text-sm sm:text-base text-white/90 mb-4 sm:mb-6 line-clamp-2">
                          {ad.description}
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

                  {/* Badge */}
                  {ad.isActive && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-primary-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      Active
                    </div>
                  )}
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvertisementBanner;

