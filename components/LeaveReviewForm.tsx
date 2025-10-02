import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import Icon from './Icon';

interface LeaveReviewFormProps {
    product: Product;
    onClose: () => void;
}

const Star: React.FC<{ filled: boolean }> = ({ filled }) => (
    <svg className={`w-8 h-8 ${filled ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
    </svg>
);

const StarRatingInput: React.FC<{ rating: number; setRating: (rating: number) => void }> = ({ rating, setRating }) => (
    <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((starIndex) => (
            <button key={starIndex} type="button" onClick={() => setRating(starIndex)}>
                <Star filled={starIndex <= rating} />
            </button>
        ))}
    </div>
);

const LeaveReviewForm: React.FC<LeaveReviewFormProps> = ({ product, onClose }) => {
    const { addReview } = useCart();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (rating > 0 && comment.trim()) {
            addReview(product.id, rating, comment);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-brand-gray-600">Review: {product.name}</h2>
                    <button onClick={onClose} className="text-brand-gray-400 hover:text-brand-gray-600">
                        <Icon name="close" className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-brand-gray-500 mb-2">Your Rating</label>
                            <StarRatingInput rating={rating} setRating={setRating} />
                        </div>
                        <div>
                            <label htmlFor="comment" className="block text-sm font-medium text-brand-gray-500 mb-1">Your Review</label>
                            <textarea
                                id="comment"
                                rows={4}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                required
                                className="w-full border border-brand-gray-300 p-2 rounded focus:ring-brand-green focus:border-brand-green"
                                placeholder="Share your thoughts about this product..."
                            />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="bg-brand-gray-200 text-brand-gray-600 font-bold py-2 px-6 rounded hover:bg-brand-gray-300 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" className="bg-brand-green text-white font-bold py-2 px-6 rounded hover:bg-brand-green-dark disabled:bg-gray-400" disabled={rating === 0 || !comment.trim()}>
                            Submit Review
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LeaveReviewForm;