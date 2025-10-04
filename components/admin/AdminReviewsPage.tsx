import React, { useState, useEffect } from 'react';
import { useApiCart } from '../../contexts/ApiCartContext';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useToast } from '../ui/use-toast';
import { apiClient, FeedbackDto } from '../../services/apiClient';
import { ArrowLeft } from 'lucide-react';

const AdminReviewsPage: React.FC = () => {
    const { setPage, foods } = useApiCart();
    const { toast } = useToast();
    const [reviews, setReviews] = useState<FeedbackDto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadReviews();
    }, []);

    const loadReviews = async () => {
        try {
            setLoading(true);
            const feedbackData = await apiClient.getFeedback();
            setReviews(feedbackData);
        } catch (error) {
            console.error('Error loading reviews:', error);
            toast({
                title: "Error",
                description: "Failed to load reviews. Please try again.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const getProductName = (foodId?: number) => {
        if (!foodId) return 'General Review';
        const product = foods.find(f => f.foodId === foodId);
        return product?.name || `Product #${foodId}`;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>
                ⭐
            </span>
        ));
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
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Manage Reviews</h1>
                    <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                        <Button variant="link" className="p-0 h-auto" onClick={() => setPage('adminDashboard')}>
                            Admin
                        </Button> / Manage Reviews
                    </p>
                </div>
                <div className="flex gap-2 sm:gap-4">
                    <Button variant="outline" onClick={loadReviews} disabled={loading} className="flex-1 sm:flex-none">
                        {loading ? 'Refreshing...' : 'Refresh'}
                    </Button>
                </div>
            </div>

{loading ? (
                <div className="text-center py-8">
                    <p>Loading reviews...</p>
                </div>
            ) : (
                <Card>
                    <CardHeader className="pb-3 sm:pb-6">
                        <CardTitle className="text-lg sm:text-xl">Customer Reviews ({reviews.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {reviews.length === 0 ? (
                            <div className="text-center py-8">
                                <div className="text-6xl mb-4">⭐</div>
                                <h3 className="text-lg font-semibold mb-2">No Reviews Yet</h3>
                                <p className="text-muted-foreground">Customer reviews will appear here once they start leaving feedback.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {reviews.map(review => (
                                    <Card key={review.feedbackId} className="border-l-4 border-l-primary">
                                        <CardContent className="p-4">
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <h3 className="font-semibold">{review.userName}</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        Review for: <span className="font-medium">{getProductName(review.foodId)}</span>
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <div className="flex">{renderStars(review.rating)}</div>
                                                        <span className="text-sm text-muted-foreground">
                                                            {review.rating}/5
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                                                        Published
                                                    </span>
                                                    <p className="text-sm text-muted-foreground mt-1">
                                                        {formatDate(review.createdAt)}
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            {review.comment && (
                                                <p className="text-sm mb-4 bg-muted p-3 rounded">
                                                    "{review.comment}"
                                                </p>
                                            )}
                                            
                                            <div className="flex gap-2">
                                                <Button size="sm" variant="outline">
                                                    Reply
                                                </Button>
                                                <Button size="sm" variant="destructive">
                                                    Delete
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default AdminReviewsPage;