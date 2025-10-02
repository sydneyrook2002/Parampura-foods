import React from 'react';
import { ProductCategory } from '../types';
import SectionTitle from './SectionTitle';
import { useCart } from '../contexts/CartContext';

interface CategoryGridProps {
  categories: ProductCategory[];
}

const CategoryCard: React.FC<{ category: ProductCategory; onClick: () => void }> = ({ category, onClick }) => (
  <div 
    onClick={onClick}
    className="relative rounded-lg overflow-hidden group cursor-pointer aspect-w-4 aspect-h-3"
  >
    <img 
      src={category.imageUrl} 
      alt={category.name} 
      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300" 
    />
    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <h3 className="text-2xl font-extrabold text-white uppercase tracking-wider">{category.name}</h3>
    </div>
  </div>
);

const CategoryGrid: React.FC<CategoryGridProps> = ({ categories }) => {
  const { viewCategory } = useCart();

  return (
    <div className="container mx-auto px-4">
      <SectionTitle title="Shop By Category" subtitle="OUR PRODUCTS" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category) => (
          <CategoryCard 
            key={category.id} 
            category={category} 
            onClick={() => viewCategory(category.id)} 
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
