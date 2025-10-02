
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
    <div className="container mx-auto px-4">
      <SectionTitle title={title} subtitle={subtitle} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
