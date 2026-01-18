import React from 'react';

const PasswordStrength = ({ password }) => {
  const getStrength = (pwd) => {
    if (!pwd) return 0;
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (pwd.length >= 12) strength++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/\d/.test(pwd)) strength++;
    if (/[^a-zA-Z\d]/.test(pwd)) strength++;
    return Math.min(strength, 4);
  };

  const strength = getStrength(password);
  const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const colors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-blue-500',
    'bg-green-500',
  ];

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i < strength
                ? colors[strength - 1]
                : 'bg-slate-200 dark:bg-slate-700'
            }`}
          />
        ))}
      </div>
      <p
        className={`text-xs font-medium ${
          strength <= 1
            ? 'text-red-600 dark:text-red-400'
            : strength <= 2
            ? 'text-orange-600 dark:text-orange-400'
            : strength <= 3
            ? 'text-blue-600 dark:text-blue-400'
            : 'text-green-600 dark:text-green-400'
        }`}
      >
        {labels[strength]}
      </p>
    </div>
  );
};

export default PasswordStrength;

