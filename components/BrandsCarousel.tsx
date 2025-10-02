
import React from 'react';
import { Brand } from '../types';
import SectionTitle from './SectionTitle';

interface BrandsCarouselProps {
  brands: Brand[];
}

const BrandsCarousel: React.FC<BrandsCarouselProps> = ({ brands }) => {
  // This is a simple static grid implementation of the carousel concept for clarity.
  // A full carousel would require more complex state management for sliding.
  return (
    <div className="container mx-auto px-4">
      <SectionTitle title="Our Brands" subtitle="BEST PARTNERS" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
        {brands.map((brand) => (
          <div key={brand.id} className="flex justify-center">
            <a href="#" title={brand.name}>
              <img 
                src={brand.imageUrl} 
                alt={brand.name} 
                className="max-h-16 w-auto filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandsCarousel;
