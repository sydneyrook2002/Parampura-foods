import { ArrowRight, Leaf, Truck, Shield, Star } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { products, categories } from '../services/data';

const HomePage = () => {
  const { setPage, setSelectedCategory, setSelectedProduct, addToCart } = useCart();

  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/placeholder.svg')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Fresh & Organic Foods Delivered to Your Door
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Experience the finest selection of organic produce, sourced directly from local farms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => setPage('category')}
                className="bg-primary hover:bg-primary/90"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setPage('about')}
                className="bg-white/10 border-white text-white hover:bg-white/20"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-none shadow-sm">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">100% Organic</h3>
                <p className="text-muted-foreground">
                  All our products are certified organic and pesticide-free
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-sm">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-bold text-lg mb-2">Fast Delivery</h3>
                <p className="text-muted-foreground">
                  Free delivery on orders over $50, right to your doorstep
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-sm">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Quality Guarantee</h3>
                <p className="text-muted-foreground">
                  100% satisfaction guaranteed or your money back
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse our wide selection of fresh, organic products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.slice(0, 3).map((category) => (
              <Card
                key={category.id}
                className="group cursor-pointer overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300"
                onClick={() => {
                  setSelectedCategory(category.id);
                  setPage('category');
                }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="/placeholder.svg"
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <CardContent className="text-white p-6 w-full">
                      <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                      <p className="text-gray-200">{category.description}</p>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our most popular organic products, loved by our customers
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
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

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              onClick={() => setPage('category')}
            >
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Your Healthy Journey Today
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of satisfied customers who trust Parampara Eats for their organic food needs.
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => setPage('category')}
          >
            Shop Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

