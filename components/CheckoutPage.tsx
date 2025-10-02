import { useState } from 'react';
import { useApiCart } from '../contexts/ApiCartContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, CreditCard } from 'lucide-react';

const CheckoutPage = () => {
  const { cart, cartTotal, placeOrder, setPage, loading, error, isAuthenticated } = useApiCart();
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-screen">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Please Login</h2>
          <p className="text-muted-foreground mb-8">
            You need to be logged in to place an order
          </p>
          <Button onClick={() => setPage('login')}>Login</Button>
        </div>
      </div>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-screen">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">
            Add some items to your cart before checkout
          </p>
          <Button onClick={() => setPage('home')}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!deliveryAddress.trim()) {
      alert('Please enter a delivery address');
      return;
    }

    const success = await placeOrder(deliveryAddress.trim(), customerNotes.trim() || undefined);
    if (success) {
      // Order placed successfully, user will be redirected to success page
    }
  };

  const shippingCost = cartTotal >= 50 ? 0 : 5.99;
  const totalAmount = cartTotal + shippingCost;

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <Button
        variant="ghost"
        onClick={() => setPage('cart')}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Cart
      </Button>

      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Delivery Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Delivery Address *
                  </label>
                  <textarea
                    className="w-full p-3 border border-border rounded-lg resize-none"
                    rows={3}
                    placeholder="Enter your complete delivery address..."
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Special Instructions (Optional)
                  </label>
                  <textarea
                    className="w-full p-3 border border-border rounded-lg resize-none"
                    rows={2}
                    placeholder="Any special delivery instructions..."
                    value={customerNotes}
                    onChange={(e) => setCustomerNotes(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <CreditCard className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Cash on Delivery (COD) - Pay when your order arrives
                  </p>
                </div>
              </CardContent>
            </Card>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <Button 
              type="submit" 
              size="lg" 
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </Button>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.foodId} className="flex justify-between text-sm">
                    <span>{item.name} × {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-border pt-3 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-border pt-2">
                  <span>Total</span>
                  <span className="text-primary">${totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;