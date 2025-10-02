import { useState, useEffect } from 'react';
import { useApiCart } from '../contexts/ApiCartContext';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useToast } from './ui/use-toast';
import { Star, Heart, ShoppingCart, ArrowLeft, Plus, Minus, Truck, Shield, Leaf, Award, MessageCircle, User } from 'lucide-react';
import { apiClient, FeedbackDto, CreateFeedbackDto } from '../services/apiClient';

const ApiProductDetailPage = () => {
  const { selectedProduct, addToCart, addToWishlist, setPage, user } = useApiCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState<FeedbackDto[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');
  const [reviewForm, setReviewForm] = useState<CreateFeedbackDto>({
    rating: 5,
    comment: '',
    foodId: selectedProduct.foodId
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadReviews();
  }, [selectedProduct.foodId]);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const [reviewsData, avgRating] = await Promise.all([
        apiClient.getFeedback(selectedProduct.foodId),
        apiClient.getAverageRating(selectedProduct.foodId)
      ]);
      setReviews(reviewsData);
      setAverageRating(avgRating);
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to submit a review.",
        variant: "destructive",
      });
      setPage('login');
      return;
    }

    if (!reviewForm.comment?.trim()) {
      toast({
        title: "Comment Required",
        description: "Please add a comment to your review.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await apiClient.createFeedback({
        ...reviewForm,
        foodId: selectedProduct.foodId
      });
      
      toast({
        title: "Success",
        description: "Your review has been submitted successfully!",
      });

      // Reset form and reload reviews
      setReviewForm({
        rating: 5,
        comment: '',
        foodId: selectedProduct.foodId
      });
      await loadReviews();
      setActiveTab('reviews');
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-gray-300'
        } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
        onClick={interactive && onRatingChange ? () => onRatingChange(i + 1) : undefined}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (!selectedProduct) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Button onClick={() => setPage('home')}>Go Home</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(selectedProduct);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <Button
        variant="ghost"
        onClick={() => setPage('home')}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Products
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-muted relative">
            {selectedProduct.imageUrl ? (
              <img
                src={selectedProduct.imageUrl}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center">
                <span className="text-gray-600 text-2xl font-medium">{selectedProduct.name}</span>
              </div>
            )}
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {selectedProduct.isOnSale && (
                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {selectedProduct.discountPercentage}% OFF
                </div>
              )}
              {selectedProduct.isOrganic && (
                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <Leaf className="h-3 w-3" />
                  Organic
                </div>
              )}
            </div>

            {/* Rating Badge */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold">{averageRating.toFixed(1)}</span>
              <span className="text-xs text-muted-foreground">({reviews.length})</span>
            </div>
          </div>

          {/* Thumbnail Gallery Placeholder */}
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-muted rounded-lg opacity-50 flex items-center justify-center">
                <span className="text-xs text-muted-foreground">+{i}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-muted-foreground">{selectedProduct.categoryName}</span>
              {selectedProduct.brand && (
                <>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{selectedProduct.brand}</span>
                </>
              )}
            </div>
            
            <h1 className="text-3xl font-bold mb-4">{selectedProduct.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                <div className="flex">{renderStars(Math.round(averageRating))}</div>
                <span className="font-semibold">{averageRating.toFixed(1)}</span>
                <span className="text-muted-foreground">({reviews.length} reviews)</span>
              </div>
            </div>

            {/* Pricing */}
            <div className="mb-6">
              {selectedProduct.isOnSale ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl font-bold text-primary">
                      ₹{selectedProduct.salePrice?.toFixed(2)}
                    </span>
                    <span className="text-xl text-muted-foreground line-through">
                      ₹{selectedProduct.mrp.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 font-semibold">
                      You save ₹{selectedProduct.savings.toFixed(2)} ({selectedProduct.discountPercentage}% off)
                    </span>
                  </div>
                </div>
              ) : (
                <span className="text-4xl font-bold text-primary">
                  ₹{selectedProduct.mrp.toFixed(2)}
                </span>
              )}
              {selectedProduct.unit && selectedProduct.quantity && (
                <p className="text-sm text-muted-foreground mt-1">
                  Price per {selectedProduct.quantity} {selectedProduct.unit}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-3">About this product</h3>
            <p className="text-muted-foreground leading-relaxed">
              {selectedProduct.description}
            </p>
            
            {selectedProduct.tags && (
              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.tags.split(',').map((tag, index) => (
                    <span key={index} className="bg-muted px-2 py-1 rounded-full text-xs">
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-border rounded-lg">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 font-semibold">{quantity}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= selectedProduct.stockQuantity}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <span className="text-sm text-muted-foreground">
                {selectedProduct.stockQuantity > 0 ? `${selectedProduct.stockQuantity} in stock` : 'Out of stock'}
              </span>
            </div>

            <div className="flex gap-3">
              <Button
                size="lg"
                onClick={handleAddToCart}
                className="flex-1"
                disabled={!selectedProduct.isAvailable || selectedProduct.stockQuantity === 0}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {selectedProduct.isAvailable && selectedProduct.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={async () => await addToWishlist(selectedProduct)}
              >
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Product Features */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Truck className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Free Delivery</h4>
                <p className="text-xs text-muted-foreground">On orders over ₹500</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Quality Guarantee</h4>
                <p className="text-xs text-muted-foreground">100% fresh products</p>
              </CardContent>
            </Card>
            
            {selectedProduct.isOrganic && (
              <Card>
                <CardContent className="p-4 text-center">
                  <Leaf className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h4 className="font-semibold mb-1">Certified Organic</h4>
                  <p className="text-xs text-muted-foreground">Pesticide-free</p>
                </CardContent>
              </Card>
            )}
            
            <Card>
              <CardContent className="p-4 text-center">
                <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Premium Quality</h4>
                <p className="text-xs text-muted-foreground">Hand-picked selection</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl font-bold">Customer Reviews</h2>
          <div className="flex items-center gap-2">
            <div className="flex">{renderStars(Math.round(averageRating))}</div>
            <span className="text-muted-foreground">
              {averageRating.toFixed(1)} ({reviews.length} reviews)
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border mb-8">
          <nav className="flex gap-8">
            <button
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'description'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'reviews'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setActiveTab('reviews')}
            >
              <MessageCircle className="h-4 w-4 mr-2 inline" />
              Reviews ({reviews.length})
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                {selectedProduct.description}
              </p>
              
              {/* Additional product details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div>
                  <h3 className="font-semibold mb-4">Product Details</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><span className="font-medium text-foreground">Brand:</span> {selectedProduct.brand || 'Parampara Eats'}</li>
                    <li><span className="font-medium text-foreground">Unit:</span> {selectedProduct.unit || 'Per piece'}</li>
                    <li><span className="font-medium text-foreground">Quantity:</span> {selectedProduct.quantity}</li>
                    <li><span className="font-medium text-foreground">Stock:</span> {selectedProduct.stockQuantity} available</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Quality Assurance</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>✓ Fresh and organic produce</li>
                    <li>✓ No harmful pesticides</li>
                    <li>✓ Sustainably sourced</li>
                    <li>✓ Quality guaranteed</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              {loading ? (
                <div className="text-center py-8">
                  <p>Loading reviews...</p>
                </div>
              ) : (
                <>
                  {/* Existing Reviews */}
                  {reviews.length > 0 ? (
                    <div className="space-y-6 mb-12">
                      {reviews.map((review) => (
                        <Card key={review.feedbackId}>
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                <User className="h-5 w-5 text-primary" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-semibold">{review.userName}</h4>
                                  <span className="text-sm text-muted-foreground">
                                    {formatDate(review.createdAt)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 mb-3">
                                  <div className="flex">{renderStars(review.rating)}</div>
                                  <span className="text-sm text-muted-foreground">
                                    {review.rating}/5
                                  </span>
                                </div>
                                {review.comment && (
                                  <p className="text-muted-foreground">{review.comment}</p>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No Reviews Yet</h3>
                      <p className="text-muted-foreground">Be the first to review this product!</p>
                    </div>
                  )}

                  {/* Review Form */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Write a Review</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Share your experience with this product
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="rating">Your Rating</Label>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex">
                            {renderStars(reviewForm.rating, true, (rating) => 
                              setReviewForm(prev => ({ ...prev, rating }))
                            )}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {reviewForm.rating}/5
                          </span>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="comment">Your Review</Label>
                        <textarea
                          id="comment"
                          className="w-full mt-2 p-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary min-h-[100px] resize-none"
                          placeholder="Share your experience with this product..."
                          value={reviewForm.comment || ''}
                          onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                        />
                      </div>

                      <Button
                        onClick={handleSubmitReview}
                        disabled={isSubmitting || !reviewForm.comment?.trim()}
                        className="w-full"
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Review'}
                      </Button>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApiProductDetailPage;
