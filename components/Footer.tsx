import React from 'react';
import { Phone, MapPin, Mail, Facebook, Twitter, Instagram, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-950 border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/">
              <Logo className="h-12" />
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Premium computer repair and IT support services. Bringing speed and reliability back to your digital life at North West University, Mafikeng.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors"><Instagram className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-widest text-green-500/80">Navigation</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-widest text-green-500/80">Expertise</h4>
            <ul className="space-y-3 text-sm">
              <li className="text-gray-400">Windows Installation</li>
              <li className="text-gray-400">Hardware Upgrades</li>
              <li className="text-gray-400">Software Activation</li>
              <li className="text-gray-400">Remote Troubleshooting</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-widest text-green-500/80">Connect</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3 text-gray-400">
                <MapPin className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span>North West University, Mafikeng</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Phone className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span>073 981 4050</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400 group">
                <MessageCircle className="h-5 w-5 text-green-500 flex-shrink-0 group-hover:animate-pulse" />
                <a href="https://wa.me/27720103533" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
                  072 010 3533 (WhatsApp)
                </a>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Mail className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="break-all">obakengkobuane16@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} Obby's PC Solutions. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link to="/login" className="hover:text-white transition-colors">Admin Login</Link>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;