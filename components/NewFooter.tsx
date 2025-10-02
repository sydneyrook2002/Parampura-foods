import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Footer = () => {
  const { setPage } = useCart();

  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">Parampara Eats</h3>
            <p className="text-muted-foreground text-sm">
              Your trusted source for fresh, organic, and locally sourced food products.
              Quality you can taste.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => setPage('about')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPage('contact')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPage('blog')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Blog
                </button>
              </li>
              <li>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-bold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  Shipping Info
                </button>
              </li>
              <li>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  Returns
                </button>
              </li>
              <li>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <span className="text-muted-foreground">123 Organic Street, Fresh City, FC 12345</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">info@paramparaeats.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Parampara Eats. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

