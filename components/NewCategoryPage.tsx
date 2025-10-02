import { Star } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { products } from '../services/data';

const CategoryPage = () => {
  const { selectedCategory, setSelectedProduct, setPage, addToCart } = useCart();

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {selectedCategory ? selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1) : 'All Products'}
        </h1>
        <p className="text-muted-foreground">
          Showing {filteredProducts.length} products
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className="group cursor-pointer border-none shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div
              className="relative h-48 overflow-hidden rounded-t-lg bg-muted"
              onClick={() => {
                setSelectedProduct(product);
                setPage('productDetail');
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {product.rating && (
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-semibold">{product.rating}</span>
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2 line-clamp-1">{product.name}</h3>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {product.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary">
                  ${product.price.toFixed(2)}
                </span>
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                >
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;

