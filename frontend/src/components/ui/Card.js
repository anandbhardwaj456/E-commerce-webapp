import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  hover = false,
  onClick,
  ...props
}) => {
  const baseStyles =
    'bg-white dark:bg-slate-800 rounded-xl shadow-soft border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-300';

  return (
    <motion.div
      className={`${baseStyles} ${hover ? 'hover:shadow-soft-lg hover:-translate-y-1' : ''} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : {}}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;



