
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { useApp } from '../App';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { state, dispatch } = useApp();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2 group">
            <Logo className="h-10 group-hover:scale-105 transition-transform" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.path) ? 'text-green-500' : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {state.isAdmin ? (
              <div className="flex items-center space-x-4">
                <Link to="/admin" className="px-4 py-2 bg-green-500 text-black text-xs font-bold rounded uppercase hover:bg-green-400 transition-colors">
                  Dashboard
                </Link>
                <button 
                  onClick={() => dispatch({ type: 'LOGOUT' })}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link to="/contact" className="px-5 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:bg-green-500 hover:text-black transition-all">
                Quick Support
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-zinc-900 border-b border-white/10 py-4 px-4 space-y-2">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive(link.path) ? 'bg-green-500 text-black' : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          {state.isAdmin && (
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium bg-green-500 text-black"
            >
              Admin Dashboard
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
