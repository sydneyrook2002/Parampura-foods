import React from 'react';
import { useApiCart } from '../contexts/ApiCartContext';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Star, Heart, ShoppingCart, Trash2 } from 'lucide-react';

const WishlistPage: React.FC = () => {
    const { wishlist, setPage, viewProduct, addToCart, removeFromWishlist } = useApiCart();

    return (
        <div className="container mx-auto px-4 py-12 min-h-screen">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">My Wishlist</h1>
                <nav className="text-sm text-muted-foreground">
                    <button onClick={() => setPage('home')} className="hover:text-primary">
                        Home
                    </button>
                    <span className="mx-2">/</span>
                    <span>My Wishlist</span>
                </nav>
            </div>

            {wishlist.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {wishlist.map((product) => (
                        <Card
                            key={product.foodId}
                            className="group cursor-pointer overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300"
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
                                
                                {/* Remove from Wishlist Button */}
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    className="absolute top-2 right-12 h-8 w-8 p-0"
                                    onClick={async (e) => {
                                        e.stopPropagation();
                                        await removeFromWishlist(product.foodId);
                                    }}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
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
                                        <ShoppingCart className="h-4 w-4 mr-1" />
                                        {product.isAvailable && product.stockQuantity > 0 ? 'Add' : 'Out'}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-4">Your Wishlist is Empty</h2>
                    <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                        Looks like you haven't added anything to your wishlist yet. Start browsing and add your favorite products!
                    </p>
                    <Button size="lg" onClick={() => setPage('home')}>
                        Start Shopping
                    </Button>
                </div>
            )}
        </div>
    );
};

export default WishlistPage;
