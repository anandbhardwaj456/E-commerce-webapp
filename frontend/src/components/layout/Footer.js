import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="mt-auto bg-slate-900 text-slate-100 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-xl font-semibold mb-3 tracking-tight">E‑Commerce</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              A modern shopping experience with curated products, secure checkout,
              and fast delivery to your doorstep.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3 text-slate-200 uppercase tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/products" className="text-slate-400 hover:text-white">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-slate-400 hover:text-white">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3 text-slate-200 uppercase tracking-wide">
              Account
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/login" className="text-slate-400 hover:text-white">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-slate-400 hover:text-white">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3 text-slate-200 uppercase tracking-wide">
              Stay Connected
            </h4>
            <p className="text-sm text-slate-400 mb-3">
              Email: support@ecommerce.com
              <br />
              Phone: +1 234 567 890
            </p>
            <div className="flex items-center gap-3 text-slate-400">
              <button className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 hover:text-white transition-colors">
                <FiFacebook />
              </button>
              <button className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 hover:text-white transition-colors">
                <FiInstagram />
              </button>
              <button className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 hover:text-white transition-colors">
                <FiTwitter />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} E‑Commerce. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

