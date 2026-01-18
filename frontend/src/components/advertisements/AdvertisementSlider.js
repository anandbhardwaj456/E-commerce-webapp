import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Button from '../ui/Button';

// Custom arrow components for better styling
const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white dark:hover:bg-slate-700 transition-all hover:scale-110"
    aria-label="Previous slide"
  >
    <FiChevronLeft className="text-2xl text-slate-700 dark:text-slate-300" />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white dark:hover:bg-slate-700 transition-all hover:scale-110"
    aria-label="Next slide"
  >
    <FiChevronRight className="text-2xl text-slate-700 dark:text-slate-300" />
  </button>
);

const AdvertisementSlider = ({ advertisements }) => {
  if (!advertisements || advertisements.length === 0) return null;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    fade: true,
    cssEase: 'linear',
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    customPaging: (i) => (
      <div className="w-2 h-2 rounded-full bg-white/50 hover:bg-white transition-colors" />
    ),
    dotsClass: 'slick-dots !bottom-6',
  };

  const getImageUrl = (image) => {
    if (!image) return '';
    if (image.startsWith('http') || image.startsWith('data:')) return image;
    const baseUrl = process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5000';
    return `${baseUrl}${image}`;
  };

  return (
    <section className="relative py-8 sm:py-12 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Slider {...sliderSettings} className="advertisement-slider">
          {advertisements.map((ad, index) => (
            <div key={ad._id || index}>
              <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden group shadow-2xl"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={getImageUrl(ad.image)}
                    alt={ad.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 dark:from-black/70 dark:via-black/50 dark:to-black/30"></div>
                  {/* Animated gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Content */}
                <div className="relative h-full flex items-center">
                  <div className="px-6 sm:px-8 md:px-12 lg:px-16 text-white max-w-3xl">
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                    >
                      {ad.title && (
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                          {ad.title}
                        </h2>
                      )}
                      {ad.description && (
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 sm:mb-8 leading-relaxed max-w-2xl">
                          {ad.description}
                        </p>
                      )}
                      {ad.link && (
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Link to={ad.link}>
                            <Button
                              size="lg"
                              className="bg-white text-primary-700 hover:bg-primary-50 shadow-xl text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
                            >
                              Shop Now
                              <FiArrowRight className="ml-2" />
                            </Button>
                          </Link>
                        </motion.div>
                      )}
                    </motion.div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-8 right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-8 left-8 w-24 h-24 bg-primary-500/20 rounded-full blur-xl"></div>
              </motion.div>
            </div>
          ))}
        </Slider>
      </div>

      <style>{`
        .advertisement-slider .slick-dots {
          bottom: 1.5rem;
        }
        .advertisement-slider .slick-dots li {
          width: 12px;
          height: 12px;
        }
        .advertisement-slider .slick-dots li button {
          width: 12px;
          height: 12px;
          padding: 0;
        }
        .advertisement-slider .slick-dots li button:before {
          content: '';
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
        }
        .advertisement-slider .slick-dots li.slick-active button:before {
          background: white;
          opacity: 1;
        }
        .advertisement-slider .slick-dots li button:hover:before {
          background: white;
        }
      `}</style>
    </section>
  );
};

export default AdvertisementSlider;

