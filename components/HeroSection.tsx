import React from 'react';
import { siteInfo } from '../services/api';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-brand-cream">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row min-h-[500px] lg:min-h-[600px]">
          {/* Left Panel - Illustration */}
          <div className="w-full md:w-1/2 bg-brand-green-dark flex items-center justify-center p-8 relative overflow-hidden">
            <div className="text-center text-white/10 font-bold text-6xl md:text-8xl absolute inset-0 flex items-center justify-center leading-none select-none whitespace-nowrap" style={{ transform: 'rotate(-15deg) scale(1.2)' }}>
              <p>WE PROMISE IT WILL BE WORTH THE WAIT</p>
            </div>
            <img 
              src="https://storage.googleapis.com/aistudio-hosting/chef-illustration-2.png" 
              alt="Chef cooking"
              className="relative z-10 w-3/4 max-w-sm"
            />
          </div>
          {/* Right Panel - Brand Info */}
          <div className="w-full md:w-1/2 flex items-center justify-center p-8 text-center">
            <div className="max-w-md">
              <div className="mb-8">
                <img src="https://storage.googleapis.com/aistudio-hosting/parampara-eats-logo-2.png" alt="Parampara Eats Logo" className="mx-auto h-48 w-auto"/>
              </div>
              <h1 className="font-serif text-5xl md:text-6xl text-brand-brown mb-8 leading-tight">
                SOMETHING IS COOKING......
              </h1>
              <div className="mt-8">
                <p className="uppercase text-brand-gray-500 font-bold tracking-widest mb-4">Contact Us</p>
                <div className="flex justify-center items-center gap-6">
                  <a href={`https://instagram.com/${siteInfo.instagram.substring(1)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-brand-brown hover:text-brand-green transition-colors">
                    <img src="https://storage.googleapis.com/aistudio-hosting/instagram-icon.png" alt="Instagram" className="w-6 h-6"/>
                    <span className="font-semibold">{siteInfo.instagram}</span>
                  </a>
                   <a href={`https://wa.me/${siteInfo.whatsapp.replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-brand-brown hover:text-brand-green transition-colors">
                    <img src="https://storage.googleapis.com/aistudio-hosting/whatsapp-icon.png" alt="WhatsApp" className="w-6 h-6"/>
                    <span className="font-semibold">{siteInfo.whatsapp}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
