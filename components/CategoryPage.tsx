import { Star } from 'lucide-react';
import { useApiCart } from '../contexts/ApiCartContext';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

const CategoryPage = () => {
  const { selectedCategory, viewProduct, addToCart, foods, categories, loading } = useApiCart();

  const filteredProducts = selectedCategory
    ? foods.filter((p) => p.categoryId.toString() === selectedCategory)
    : foods;

  const categoryName = selectedCategory 
    ? categories.find(c => c.categoryId.toString() === selectedCategory)?.name || 'Category'
    : 'All Products';

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {categoryName}
        </h1>
        <p className="text-muted-foreground">
          Showing {filteredProducts.length} products
        </p>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.foodId}
              className="group cursor-pointer border-none shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div
                className="relative h-48 overflow-hidden rounded-t-lg bg-muted"
                onClick={() => {
                  viewProduct(product.foodId);
                }}
              >
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <span className="text-gray-600 text-lg font-medium">{product.name}</span>
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-semibold">{product.rating}</span>
                </div>
                {product.isOnSale && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    {product.discountPercentage}% OFF
                  </div>
                )}
                {product.isOrganic && !product.isOnSale && (
                  <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    Organic
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2 line-clamp-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    {product.isOnSale ? (
                      <>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-primary">
                            ₹{product.salePrice?.toFixed(2)}
                          </span>
                          <span className="text-sm text-muted-foreground line-through">
                            ₹{product.mrp.toFixed(2)}
                          </span>
                        </div>
                        <span className="text-xs text-green-600 font-medium">
                          Save ₹{product.savings.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="text-lg font-bold text-primary">
                        ₹{product.mrp.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    disabled={!product.isAvailable || product.stockQuantity === 0}
                  >
                    {product.isAvailable && product.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
