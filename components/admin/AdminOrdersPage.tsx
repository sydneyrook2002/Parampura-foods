import React, { useState, useEffect } from 'react';
import { useApiCart } from '../../contexts/ApiCartContext';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useToast } from '../ui/use-toast';
import { apiClient, OrderDto } from '../../services/apiClient';
import { Eye, Package, Truck, CheckCircle, XCircle, Clock } from 'lucide-react';

const AdminOrdersPage: React.FC = () => {
    const { setPage, user } = useApiCart();
    const { toast } = useToast();
    const [orders, setOrders] = useState<OrderDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState<OrderDto | null>(null);
    const [showStatusModal, setShowStatusModal] = useState(false);
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
        <div className="container mx-auto px-4 py-12 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Manage Orders</h1>
                    <nav className="text-sm text-muted-foreground">
                        <Button variant="link" className="p-0 h-auto" onClick={() => setPage('adminDashboard')}>
                            Admin
                        </Button>
                        <span className="mx-2">/</span>
                        <span>Manage Orders</span>
                    </nav>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setPage('adminDashboard')}>
                        Back to Dashboard
                    </Button>
                    <Button onClick={loadOrders} disabled={loading}>
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
                            <div className="overflow-x-auto">
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
                                                                // Could implement view details modal here
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
                        )}
                    </CardContent>
                </Card>
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