import React from 'react';
import HeroSection from './HeroSection';
import ProductGrid from './ProductGrid';
import BlogSection from './BlogSection';
import TestimonialSlider from './TestimonialSlider';
import BrandsCarousel from './BrandsCarousel';
import { useCart } from '../contexts/CartContext';
import CategoryGrid from './CategoryGrid';
import { 
  blogPosts, 
  testimonials, 
  brands,
  welcomeContent,
  productCategories
} from '../services/api';

const HomePage: React.FC = () => {
  const { products, setPage } = useCart();
  
  // Dynamically filter products from the global state
  const featured = products.filter(p => p.isSale).slice(0, 4);
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);

  return (
    <>
      <HeroSection />

      <div className="py-16 bg-brand-cream">
        <CategoryGrid categories={productCategories} />
      </div>

      <div className="py-16 bg-brand-gray-100">
        <ProductGrid title="Featured Products" subtitle="FOR YOUR HEALTH" products={featured} />
      </div>

      <section className="bg-brand-cream">
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-wrap items-center -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
              <img src={welcomeContent.imageUrl} alt="Organic farming" className="rounded" />
            </div>
            <div className="w-full md:w-1/2 px-4">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-brand-brown mb-4">{welcomeContent.title}</h2>
              <p className="text-brand-green text-lg font-semibold mb-4">{welcomeContent.subtitle}</p>
              <p className="mb-4 text-brand-gray-500 leading-relaxed">
                {welcomeContent.paragraph1}
              </p>
              <p className="text-brand-gray-500 leading-relaxed">
                {welcomeContent.paragraph2}
              </p>
              <button 
                onClick={() => setPage('about')}
                className="mt-6 bg-brand-green text-white font-bold py-3 px-6 rounded hover:bg-brand-green-dark transition-colors duration-300"
              >
                READ MORE
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <div className="py-16 bg-brand-gray-100">
        <ProductGrid title="What's New" subtitle="FRESH FROM OUR FARM" products={newArrivals} />
      </div>

      <TestimonialSlider testimonials={testimonials} />
      
      <div className="py-16 bg-brand-cream">
        <BlogSection posts={blogPosts} />
      </div>

      <div className="py-16 bg-brand-gray-100 border-t border-brand-gray-200">
        <BrandsCarousel brands={brands} />
      </div>
    </>
  );
};

export default HomePage;
