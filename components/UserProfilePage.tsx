import React, { useState, useEffect } from 'react';
import { useApiCart } from '../contexts/ApiCartContext';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useToast } from './ui/use-toast';
import { apiClient, OrderDto } from '../services/apiClient';
import { User, ShoppingBag, Heart, MapPin, Mail, Phone, Edit, LogOut, Package, Clock, Truck, CheckCircle, XCircle } from 'lucide-react';

const UserProfilePage: React.FC = () => {
  const { user, setPage, logout, cart, wishlist } = useApiCart();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  if (!user) {
    setPage('login');
    return null;
  }

  // Load user orders when orders tab is active
  useEffect(() => {
    if (activeTab === 'orders' && user) {
      loadUserOrders();
    }
  }, [activeTab, user]);

  const loadUserOrders = async () => {
    try {
      setLoadingOrders(true);
      const userOrders = await apiClient.getUserOrders();
      setOrders(userOrders);
    } catch (error) {
      console.error('Error loading user orders:', error);
      toast({
        title: "Error",
        description: "Failed to load your orders. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleLogout = () => {
    logout();
    setPage('home');
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'processing': return <Package className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Account</h1>
          <p className="text-muted-foreground">Manage your profile and preferences</p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
            <Button
              variant={activeTab === 'profile' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('profile')}
              className="flex items-center gap-2"
            >
              <User className="h-4 w-4" />
              Profile
            </Button>
            <Button
              variant={activeTab === 'orders' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('orders')}
              className="flex items-center gap-2"
            >
              <Package className="h-4 w-4" />
              My Orders
            </Button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Information */}
            <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={user.fullName || user.name}
                      readOnly
                      className="bg-muted"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={user.email}
                      readOnly
                      className="bg-muted"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="role">Account Type</Label>
                  <Input
                    id="role"
                    value={user.role}
                    readOnly
                    className="bg-muted"
                  />
                </div>
                <Button variant="outline" className="w-full md:w-auto">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Address Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Address Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address">Delivery Address</Label>
                  <Input
                    id="address"
                    placeholder="Enter your delivery address"
                    className="bg-muted"
                  />
                </div>
                <Button variant="outline" className="w-full md:w-auto">
                  <Edit className="h-4 w-4 mr-2" />
                  Update Address
                </Button>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="Enter your phone number"
                    className="bg-muted"
                  />
                </div>
                <Button variant="outline" className="w-full md:w-auto">
                  <Edit className="h-4 w-4 mr-2" />
                  Update Contact
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Account Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Cart Items</span>
                  </div>
                  <span className="font-semibold">{cart?.length || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Wishlist Items</span>
                  </div>
                  <span className="font-semibold">{wishlist?.length || 0}</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setPage('cart')}
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  View Cart
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setPage('wishlist')}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  View Wishlist
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setPage('home')}
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Button>
              </CardContent>
            </Card>

            {/* Logout */}
            <Card>
              <CardContent className="pt-6">
                <Button 
                  variant="destructive" 
                  className="w-full"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        ) : (
          /* Orders Tab */
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Orders</h2>
              <Button 
                variant="outline" 
                onClick={loadUserOrders}
                disabled={loadingOrders}
              >
                {loadingOrders ? 'Refreshing...' : 'Refresh'}
              </Button>
            </div>

            {loadingOrders ? (
              <div className="text-center py-8">
                <p>Loading your orders...</p>
              </div>
            ) : orders.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Orders Yet</h3>
                  <p className="text-muted-foreground mb-6">
                    You haven't placed any orders yet. Start shopping to see your orders here!
                  </p>
                  <Button onClick={() => setPage('home')}>
                    Start Shopping
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.orderId}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">Order #{order.orderId}</h3>
                          <p className="text-sm text-muted-foreground">
                            Placed on {formatDate(order.orderDate)}
                          </p>
                        </div>
                        <div className="flex flex-col items-end mt-2 md:mt-0">
                          <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            {order.status}
                          </div>
                          <p className="text-lg font-bold mt-1">₹{order.totalAmount.toFixed(2)}</p>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <h4 className="font-medium mb-2">Items Ordered:</h4>
                        <div className="space-y-2">
                          {order.orderItems.map((item, index) => (
                            <div key={index} className="flex justify-between items-center text-sm">
                              <span>{item.quantity}x {item.foodName}</span>
                              <span>₹{item.unitPrice.toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between items-center text-sm text-muted-foreground">
                          <span>Delivery Address:</span>
                          <span className="text-right max-w-xs truncate">{order.deliveryAddress}</span>
                        </div>
                        {order.customerNotes && (
                          <div className="flex justify-between items-center text-sm text-muted-foreground mt-1">
                            <span>Notes:</span>
                            <span className="text-right max-w-xs truncate">{order.customerNotes}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
