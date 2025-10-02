import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, setPage } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-[60vh]">
        <div className="max-w-md mx-auto text-center">
          <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">
            Start shopping to add items to your cart
          </p>
          <Button onClick={() => setPage('home')}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {item.category}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-border rounded-lg">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="px-4 font-semibold">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <span className="font-bold text-lg text-primary">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-semibold">
                    {cartTotal >= 50 ? 'Free' : '$5.99'}
                  </span>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">
                      ${(cartTotal + (cartTotal >= 50 ? 0 : 5.99)).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              <Button className="w-full" size="lg" onClick={() => setPage('login')}>
                Proceed to Checkout
              </Button>
              <Button
                variant="outline"
                className="w-full mt-3"
                onClick={() => setPage('home')}
              >
                Continue Shopping
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

