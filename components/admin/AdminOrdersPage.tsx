import React, { useState, useEffect } from 'react';
import { useApiCart } from '../../contexts/ApiCartContext';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useToast } from '../ui/use-toast';
import { apiClient, OrderDto } from '../../services/apiClient';
import { Eye, Package, Truck, CheckCircle, XCircle, Clock, ArrowLeft } from 'lucide-react';

const AdminOrdersPage: React.FC = () => {
    const { setPage, user } = useApiCart();
    const { toast } = useToast();
    const [orders, setOrders] = useState<OrderDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState<OrderDto | null>(null);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [newStatus, setNewStatus] = useState('');
    const [statusNotes, setStatusNotes] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    // Load orders on component mount
    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            setLoading(true);
            const ordersData = await apiClient.getOrders();
            setOrders(ordersData);
        } catch (error) {
            console.error('Error loading orders:', error);
            toast({
                title: "Error",
                description: "Failed to load orders. Please try again.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async () => {
        if (!selectedOrder || !newStatus) return;

        try {
            setIsUpdating(true);
            await apiClient.updateOrderStatus(selectedOrder.orderId, newStatus, statusNotes);
            
            toast({
                title: "Success",
                description: "Order status updated successfully!",
            });

            // Refresh orders list
            await loadOrders();
            
            // Close modal
            setShowStatusModal(false);
            setSelectedOrder(null);
            setNewStatus('');
            setStatusNotes('');
        } catch (error) {
            console.error('Error updating order status:', error);
            toast({
                title: "Error",
                description: "Failed to update order status. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsUpdating(false);
        }
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
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-12 min-h-screen">
            {/* Mobile Back Button - Full Width */}
            <div className="lg:hidden mb-4">
                <Button 
                    variant="outline" 
                        onClick={() => setPage('adminDashboard')}
                    className="flex items-center gap-2 w-full"
                    >
                    <ArrowLeft className="h-4 w-4" />
                        Back to Dashboard
                </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 lg:mb-8 gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Manage Orders</h1>
                    <nav className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                        <Button variant="link" className="p-0 h-auto" onClick={() => setPage('adminDashboard')}>
                            Admin
                        </Button>
                        <span className="mx-2">/</span>
                        <span>Manage Orders</span>
                    </nav>
                </div>
                <div className="flex gap-2 sm:gap-4">
                    <Button onClick={loadOrders} disabled={loading} className="flex-1 sm:flex-none">
                        {loading ? 'Refreshing...' : 'Refresh'}
                    </Button>
                </div>
                </div>

            {loading ? (
                <div className="text-center py-8">
                    <p>Loading orders...</p>
                </div>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>Orders ({orders.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {orders.length === 0 ? (
                            <div className="text-center py-8">
                                <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                                <h3 className="text-lg font-semibold mb-2">No Orders Found</h3>
                                <p className="text-muted-foreground">No orders have been placed yet.</p>
                            </div>
                        ) : (
                            <>
                                {/* Desktop Table View */}
                                <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full text-left">
                                        <thead className="border-b">
                                            <tr>
                                                <th className="p-4 font-semibold">Order ID</th>
                                                <th className="p-4 font-semibold">Customer</th>
                                                <th className="p-4 font-semibold">Date</th>
                                                <th className="p-4 font-semibold">Total</th>
                                                <th className="p-4 font-semibold">Status</th>
                                                <th className="p-4 font-semibold">Items</th>
                                                <th className="p-4 font-semibold">Address</th>
                                                <th className="p-4 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                                            {orders.map(order => (
                                                <tr key={order.orderId} className="border-b hover:bg-muted/50">
                                                    <td className="p-4 font-semibold">#{order.orderId}</td>
                                                    <td className="p-4">
                                                        <div>
                                                            <div className="font-medium">{order.userName}</div>
                                                            <div className="text-sm text-muted-foreground">{order.userName ? 'Customer' : 'Guest'}</div>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 text-sm">{formatDate(order.orderDate)}</td>
                                                    <td className="p-4 font-semibold">₹{order.totalAmount.toFixed(2)}</td>
                                    <td className="p-4">
                                                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                                                            {getStatusIcon(order.status)}
                                            {order.status}
                                                        </div>
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="text-sm max-w-xs">
                                                            {order.orderItems.slice(0, 2).map((item, index) => (
                                                                <div key={index} className="truncate">
                                                                    {item.quantity}x {item.foodName}
                                                                </div>
                                                            ))}
                                                            {order.orderItems.length > 2 && (
                                                                <div className="text-muted-foreground">
                                                                    +{order.orderItems.length - 2} more items
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="text-sm max-w-xs truncate" title={order.deliveryAddress}>
                                                            {order.deliveryAddress}
                                                        </div>
                                    </td>
                                    <td className="p-4">
                                                        <div className="flex gap-2">
                                                            <Button 
                                                                size="sm" 
                                                                variant="outline"
                                                                onClick={() => {
                                                                    setSelectedOrder(order);
                                                                    setShowViewModal(true);
                                                                }}
                                                            >
                                                                <Eye className="h-4 w-4 mr-1" />
                                                                View
                                                            </Button>
                                                            <Button 
                                                                size="sm"
                                                                onClick={() => {
                                                                    setSelectedOrder(order);
                                                                    setNewStatus(order.status);
                                                                    setShowStatusModal(true);
                                                                }}
                                                            >
                                                                Update Status
                                                            </Button>
                                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                                {/* Mobile Card View */}
                                <div className="lg:hidden space-y-3">
                                    {orders.map(order => (
                                        <div key={order.orderId} className="border rounded-lg p-3 bg-white">
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-semibold text-sm">#{order.orderId}</h3>
                                                    <p className="text-xs text-muted-foreground">{order.userName || 'Guest'}</p>
                                                    <p className="text-xs text-muted-foreground">{formatDate(order.orderDate)}</p>
                                                </div>
                                                
                                                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                                                    {getStatusIcon(order.status)}
                                                    {order.status}
                                                </div>
                                            </div>

                                            <div className="mb-2">
                                                <div className="text-sm font-semibold">₹{order.totalAmount.toFixed(2)}</div>
                                                <div className="text-xs text-muted-foreground">
                                                    {order.orderItems.length} item{order.orderItems.length !== 1 ? 's' : ''}
                                                </div>
                                            </div>

                                            <div className="mb-2">
                                                <div className="text-xs text-muted-foreground line-clamp-2" title={order.deliveryAddress}>
                                                    {order.deliveryAddress}
                                                </div>
                                            </div>

                                            <div className="flex gap-2">
                                                <Button 
                                                    size="sm" 
                                                    variant="outline"
                                                    onClick={() => {
                                                        setSelectedOrder(order);
                                                        setShowViewModal(true);
                                                    }}
                                                    className="flex-1 h-8 text-xs"
                                                >
                                                    <Eye className="h-3 w-3 mr-1" />
                                                    View
                                                </Button>
                                                <Button 
                                                    size="sm"
                                                    onClick={() => {
                                                        setSelectedOrder(order);
                                                        setNewStatus(order.status);
                                                        setShowStatusModal(true);
                                                    }}
                                                    className="flex-1 h-8 text-xs"
                                                >
                                                    Update
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            )}

            {/* View Order Details Modal */}
            {showViewModal && selectedOrder && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Order Details</CardTitle>
                                    <p className="text-sm text-muted-foreground">
                                        Order #{selectedOrder.orderId} - {selectedOrder.userName}
                                    </p>
                                </div>
                                <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${getStatusColor(selectedOrder.status)}`}>
                                    {getStatusIcon(selectedOrder.status)}
                                    {selectedOrder.status}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Order Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-semibold mb-2">Order Information</h4>
                                    <div className="space-y-1 text-sm">
                                        <div><span className="font-medium">Order ID:</span> #{selectedOrder.orderId}</div>
                                        <div><span className="font-medium">Customer:</span> {selectedOrder.userName}</div>
                                        <div><span className="font-medium">Order Date:</span> {formatDate(selectedOrder.orderDate)}</div>
                                        <div><span className="font-medium">Total Amount:</span> ₹{selectedOrder.totalAmount.toFixed(2)}</div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">Delivery Information</h4>
                                    <div className="space-y-1 text-sm">
                                        <div><span className="font-medium">Address:</span></div>
                                        <div className="text-muted-foreground pl-2">{selectedOrder.deliveryAddress}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div>
                                <h4 className="font-semibold mb-3">Order Items ({selectedOrder.orderItems.length})</h4>
                                <div className="space-y-3">
                                    {selectedOrder.orderItems.map((item, index) => (
                                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                                <Package className="h-6 w-6 text-gray-500" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-medium">{item.foodName}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    Quantity: {item.quantity} × ₹{item.unitPrice.toFixed(2)}
                                                </div>
                                            </div>
                                            <div className="font-semibold">
                                                ₹{(item.quantity * item.unitPrice).toFixed(2)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="border-t pt-4">
                                <h4 className="font-semibold mb-3">Order Summary</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>Subtotal:</span>
                                        <span>₹{selectedOrder.orderItems.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping:</span>
                                        <span>₹50.00</span>
                                    </div>
                                    <div className="flex justify-between font-semibold text-base border-t pt-2">
                                        <span>Total:</span>
                                        <span>₹{selectedOrder.totalAmount.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2 pt-4 border-t">
                                <Button
                                    onClick={() => {
                                        setShowViewModal(false);
                                        setSelectedOrder(null);
                                    }}
                                    className="flex-1"
                                >
                                    Close
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setShowViewModal(false);
                                        setSelectedOrder(selectedOrder);
                                        setNewStatus(selectedOrder.status);
                                        setShowStatusModal(true);
                                    }}
                                    className="flex-1"
                                >
                                    Update Status
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Status Update Modal */}
            {showStatusModal && selectedOrder && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <Card className="w-full max-w-md mx-4">
                        <CardHeader>
                            <CardTitle>Update Order Status</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Order #{selectedOrder.orderId} - {selectedOrder.userName}
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="status">Status</Label>
                                <select
                                    id="status"
                                    className="w-full px-3 py-2 border border-border rounded-md"
                                    value={newStatus}
                                    onChange={(e) => setNewStatus(e.target.value)}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>
                            
                            <div>
                                <Label htmlFor="notes">Notes (Optional)</Label>
                                <Input
                                    id="notes"
                                    placeholder="Add notes about this status update..."
                                    value={statusNotes}
                                    onChange={(e) => setStatusNotes(e.target.value)}
                                />
            </div>

                            <div className="flex gap-2 pt-4">
                                <Button
                                    onClick={handleUpdateStatus}
                                    disabled={isUpdating || !newStatus}
                                    className="flex-1"
                                >
                                    {isUpdating ? 'Updating...' : 'Update Status'}
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setShowStatusModal(false);
                                        setSelectedOrder(null);
                                        setNewStatus('');
                                        setStatusNotes('');
                                    }}
                                    disabled={isUpdating}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default AdminOrdersPage;