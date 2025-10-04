import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useApiCart } from '../contexts/ApiCartContext';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, setPage } = useApiCart();

  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="relative mb-8">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center shadow-lg">
                <ShoppingBag className="h-16 w-16 text-green-600" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">0</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Discover our fresh organic products and start building your cart
            </p>
            <Button 
              onClick={() => setPage('home')}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Start Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Shopping Cart</h1>
          <p className="text-gray-600 text-lg">{cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.foodId} className="bg-white shadow-lg border-0 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex gap-4 sm:gap-6">
                    {/* Product Image */}
                    <div className="relative">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl shadow-md"
                        />
                      ) : (
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center shadow-md">
                          <span className="text-green-600 text-xs font-medium text-center px-2">{item.name}</span>
                        </div>
                      )}
                      <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                        {item.quantity}
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-800 mb-1 text-base sm:text-lg line-clamp-2">{item.name}</h3>
                      <p className="text-green-600 text-sm font-medium mb-3">{item.categoryName}</p>
                      
                      {/* Price and Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center bg-gray-100 rounded-xl">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => updateQuantity(item.foodId, item.quantity - 1)}
                              className="h-8 w-8 hover:bg-gray-200 rounded-l-xl"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="px-3 font-bold text-gray-800 min-w-[2rem] text-center">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => updateQuantity(item.foodId, item.quantity + 1)}
                              className="h-8 w-8 hover:bg-gray-200 rounded-r-xl"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="font-bold text-lg text-green-600">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </div>
                            <div className="text-xs text-gray-500">
                              ₹{item.price.toFixed(2)} each
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeFromCart(item.foodId)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8 w-8 rounded-xl"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20 sm:top-24 bg-white shadow-xl border-0 rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-base">Subtotal</span>
                    <span className="font-semibold text-lg text-gray-800">₹{cartTotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-base">Shipping</span>
                    <span className="font-semibold text-lg">
                      {cartTotal >= 500 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        <span className="text-gray-800">₹50</span>
                      )}
                    </span>
                  </div>
                  
                  {cartTotal < 500 && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                      <p className="text-green-700 text-sm font-medium">
                        Add ₹{(500 - cartTotal).toFixed(2)} more for free shipping!
                      </p>
                    </div>
                  )}
                  
                  <div className="border-t-2 border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-800">Total</span>
                      <span className="text-2xl font-bold text-green-600">
                        ₹{(cartTotal + (cartTotal >= 500 ? 0 : 50)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-lg"
                    onClick={() => setPage('checkout')}
                  >
                    Proceed to Checkout
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full border-2 border-gray-300 hover:border-green-500 hover:bg-green-50 text-gray-700 hover:text-green-600 font-semibold py-3 rounded-xl transition-all duration-300"
                    onClick={() => setPage('home')}
                  >
                    Continue Shopping
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
