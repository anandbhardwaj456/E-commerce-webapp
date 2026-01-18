import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Countdown = ({ targetDate, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (onComplete) onComplete();
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  const TimeUnit = ({ value, label }) => (
    <motion.div
      className="flex flex-col items-center"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-gradient-to-br from-red-500 to-pink-600 text-white rounded-lg px-3 py-2 min-w-[3rem] text-center shadow-lg">
        <span className="text-2xl font-bold tabular-nums">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">
        {label}
      </span>
    </motion.div>
  );

  return (
    <div className="flex items-center gap-2 sm:gap-4">
      <TimeUnit value={timeLeft.days} label="Days" />
      <span className="text-red-500 font-bold text-xl">:</span>
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <span className="text-red-500 font-bold text-xl">:</span>
      <TimeUnit value={timeLeft.minutes} label="Mins" />
      <span className="text-red-500 font-bold text-xl">:</span>
      <TimeUnit value={timeLeft.seconds} label="Secs" />
    </div>
  );
};

export default Countdown;

