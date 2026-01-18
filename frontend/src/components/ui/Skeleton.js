import React from 'react';

const Skeleton = ({ className = '', variant = 'default' }) => {
  const variants = {
    default: 'h-4 bg-slate-200 dark:bg-slate-700 rounded',
    text: 'h-4 bg-slate-200 dark:bg-slate-700 rounded',
    circular: 'rounded-full bg-slate-200 dark:bg-slate-700',
    rectangular: 'bg-slate-200 dark:bg-slate-700 rounded',
  };

  return (
    <div
      className={`${variants[variant]} animate-pulse ${className}`}
      aria-label="Loading..."
    />
  );
};

export default Skeleton;



