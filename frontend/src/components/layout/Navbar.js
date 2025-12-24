import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { FiShoppingCart, FiUser, FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const { getCartItemsCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const cartCount = getCartItemsCount();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-primary-500 to-primary-300 flex items-center justify-center shadow-sm">
              <span className="text-white text-lg font-bold">E</span>
            </div>
            <span className="text-2xl font-semibold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
              E‑Commerce
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/products"
              className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors"
            >
              Products
            </Link>
            <Link
              to="/cart"
              className="relative text-slate-600 hover:text-primary-600 transition-colors"
            >
              <FiShoppingCart className="text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] rounded-full h-5 min-w-[1.25rem] px-1 flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors"
                  >
                    Admin
                  </Link>
                )}
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-slate-700 hover:text-primary-600 transition-colors">
                    <div className="h-8 w-8 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 text-sm font-semibold">
                      {user?.name?.charAt(0)?.toUpperCase() || <FiUser />}
                    </div>
                    <span className="text-sm font-medium">{user?.name}</span>
                  </button>
                  <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-lg py-2 border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 origin-top-right">
                    <Link
                      to="/profile"
                      className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center justify-center rounded-full p-2 text-slate-700 hover:bg-slate-100"
          >
            {isOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-sm">
          <div className="px-4 pt-3 pb-4 space-y-1">
            <Link
              to="/products"
              className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/cart"
              className="flex items-center justify-between px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="inline-flex items-center justify-center rounded-full bg-rose-500 px-2 py-0.5 text-[11px] font-medium text-white">
                  {cartCount}
                </span>
              )}
            </Link>
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}
                <Link
                  to="/profile"
                  className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/orders"
                  className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Orders
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="pt-2 space-y-2">
                <Link
                  to="/login"
                  className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-full text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Create account
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

