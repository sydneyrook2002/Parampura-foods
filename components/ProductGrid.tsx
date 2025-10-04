
import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import SectionTitle from './SectionTitle';

interface ProductGridProps {
  title: string;
  subtitle: string;
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ title, subtitle, products }) => {
  return (
    <div className="container mx-auto px-3 sm:px-4 lg:px-6">
      <SectionTitle title={title} subtitle={subtitle} />
      <div 
        className="grid gap-3 sm:gap-4 lg:gap-6"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '0.75rem'
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
