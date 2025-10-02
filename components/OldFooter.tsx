import React, { useState } from 'react';
import { siteInfo, footerData } from '../services/api';
import { useCart } from '../contexts/CartContext';
import { Page } from '../types';

const Footer: React.FC = () => {
  const { setPage, viewInfoPage } = useCart();
  const [email, setEmail] = useState('');

  const handleFooterNav = (e: React.MouseEvent<HTMLAnchorElement>, link: { page?: Page, href: string }) => {
    e.preventDefault();
    if (link.page === 'infoPage') {
      viewInfoPage(link.href);
    } else if (link.page) {
      setPage(link.page);
    }
  };
  
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you for subscribing, ${email}!`);
      setEmail('');
    }
  };

  return (
    <footer className="bg-brand-green-dark text-brand-gray-200">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Us */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-white mb-4">{footerData.about.title}</h3>
            <p>{footerData.about.text}</p>
            <p><strong>Address:</strong> {siteInfo.address}</p>
            <p><strong>Phone:</strong> {siteInfo.phone}</p>
            <p><strong>Email:</strong> {siteInfo.email}</p>
          </div>

          {/* Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-white mb-4">Information</h3>
            <ul className="space-y-2">
              {footerData.informationLinks.map(link => (
                <li key={link.text}><a href={link.href} onClick={(e) => handleFooterNav(e, link)} className="hover:text-brand-cream transition-colors">{link.text}</a></li>
              ))}
            </ul>
          </div>

          {/* My Account */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-white mb-4">My Account</h3>
            <ul className="space-y-2">
              {footerData.accountLinks.map(link => (
                <li key={link.text}><a href={link.href} onClick={(e) => handleFooterNav(e, link)} className="hover:text-brand-cream transition-colors">{link.text}</a></li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-white mb-4">{footerData.newsletter.title}</h3>
            <p>{footerData.newsletter.text}</p>
            <form onSubmit={handleNewsletterSubmit} className="flex mt-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-brand-brown/50 text-white px-4 py-2 rounded-l-md focus:outline-none placeholder-brand-gray-300" 
              />
              <button type="submit" className="bg-brand-green text-white font-bold px-4 rounded-r-md hover:bg-opacity-80">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="bg-brand-green-dark border-t border-brand-green/50 py-4">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-sm">
          <p>&copy; 2024 Parampara Eats. All Rights Reserved.</p>
          <div className="mt-4 sm:mt-0">
             <img src="https://themepanthers.com/wp/vmarket/v1/wp-content/uploads/2023/10/payment.png" alt="Payment methods" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
