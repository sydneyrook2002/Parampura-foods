import React from 'react';
import { useCart } from '../contexts/CartContext';

const OrderSuccessPage: React.FC = () => {
  const { setPage } = useCart();

  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <div className="max-w-md mx-auto">
        <svg className="w-24 h-24 mx-auto text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h1 className="text-3xl font-bold text-brand-gray-600 mt-4 mb-2">Thank You!</h1>
        <p className="text-lg text-brand-gray-500 mb-8">Your order has been placed successfully.</p>
        <p className="text-brand-gray-500 mb-8">
            We have sent you an email with the details of your order. You can check the status of your order in your account page.
        </p>
        <button 
          onClick={() => setPage('home')}
          className="bg-brand-green text-white font-bold py-3 px-8 rounded hover:bg-brand-green-dark transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
