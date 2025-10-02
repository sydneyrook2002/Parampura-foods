import { useApiCart } from '../contexts/ApiCartContext';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { CheckCircle, Home, ShoppingBag } from 'lucide-react';

const OrderSuccessPage = () => {
  const { setPage } = useApiCart();

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      <div className="max-w-md mx-auto text-center">
        <Card>
          <CardContent className="p-8">
            <div className="mb-6">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-green-600 mb-2">
                Order Placed Successfully!
              </h1>
              <p className="text-muted-foreground">
                Thank you for your order. We'll start preparing your fresh organic foods right away.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="p-4 bg-muted rounded-lg text-left">
                <h3 className="font-semibold mb-2">What happens next?</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• We'll confirm your order and start preparation</li>
                  <li>• Your fresh organic foods will be carefully packed</li>
                  <li>• Our delivery team will bring your order to your doorstep</li>
                  <li>• Pay conveniently with Cash on Delivery (COD)</li>
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={() => setPage('home')} 
                className="w-full"
                size="lg"
              >
                <Home className="h-5 w-5 mr-2" />
                Continue Shopping
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setPage('account')} 
                className="w-full"
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                View My Orders
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderSuccessPage;