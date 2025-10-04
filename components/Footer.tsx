import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { useApiCart } from '../contexts/ApiCartContext';

const Footer = () => {
  const { setPage } = useApiCart();

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/logo.png" 
                alt="Parampara Eats" 
                className="w-10 h-10 object-contain rounded-xl"
              />
              <h3 className="font-bold text-xl text-white">Parampara Eats</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Your trusted source for fresh, organic, and locally sourced food products.
              Quality you can taste, delivered with love.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-300 hover:scale-110 transform">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-300 hover:scale-110 transform">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-300 hover:scale-110 transform">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  onClick={() => setPage('about')}
                  className="text-gray-300 hover:text-green-400 transition-colors duration-300 hover:translate-x-1 transform"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPage('contact')}
                  className="text-gray-300 hover:text-green-400 transition-colors duration-300 hover:translate-x-1 transform"
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPage('blog')}
                  className="text-gray-300 hover:text-green-400 transition-colors duration-300 hover:translate-x-1 transform"
                >
                  Blog
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-green-400 transition-colors duration-300 hover:translate-x-1 transform">
                  FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Customer Service</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <button className="text-gray-300 hover:text-green-400 transition-colors duration-300 hover:translate-x-1 transform">
                  Shipping Info
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-green-400 transition-colors duration-300 hover:translate-x-1 transform">
                  Returns
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-green-400 transition-colors duration-300 hover:translate-x-1 transform">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-green-400 transition-colors duration-300 hover:translate-x-1 transform">
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 leading-relaxed">123 Organic Street, Fresh City, FC 12345</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-green-400 flex-shrink-0" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-green-400 flex-shrink-0" />
                <span className="text-gray-300">info@paramparaeats.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Parampara Eats. All rights reserved. Made with ❤️ for healthy living.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
