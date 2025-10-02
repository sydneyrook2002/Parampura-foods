import React from 'react';
import { useCart } from '../contexts/CartContext';
import Icon from './Icon';

const CartPage: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, setPage } = useCart();
  const cartTotal = getCartTotal();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-brand-gray-600 mb-4">Your Cart is Empty</h1>
        <p className="text-brand-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <button 
          onClick={() => setPage('home')}
          className="bg-brand-green text-white font-bold py-3 px-8 rounded hover:bg-brand-green-dark transition-colors"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="bg-brand-gray-100">
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-brand-gray-600 mb-2">Shopping Cart</h1>
            <p className="text-brand-gray-400 mb-8">Home / Shopping Cart</p>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Cart Items */}
                <div className="w-full lg:w-2/3">
                    <div className="bg-white shadow rounded">
                        <table className="w-full text-left">
                            <thead className="border-b border-brand-gray-200">
                                <tr>
                                    <th className="p-4 font-semibold text-brand-gray-500 hidden sm:table-cell">Product</th>
                                    <th className="p-4 font-semibold text-brand-gray-500"></th>
                                    <th className="p-4 font-semibold text-brand-gray-500">Price</th>
                                    <th className="p-4 font-semibold text-brand-gray-500">Quantity</th>
                                    <th className="p-4 font-semibold text-brand-gray-500">Total</th>
                                    <th className="p-4 font-semibold text-brand-gray-500"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map(item => (
                                    <tr key={item.id} className="border-b border-brand-gray-200">
                                        <td className="p-4 hidden sm:table-cell">
                                            <img src={item.imageUrls[0]} alt={item.name} className="w-20 h-20 object-cover rounded"/>
                                        </td>
                                        <td className="p-4 font-semibold text-brand-gray-600">
                                            <a href="#" className="hover:text-brand-green">{item.name}</a>
                                        </td>
                                        <td className="p-4 text-brand-gray-500">${item.price.toFixed(2)}</td>
                                        <td className="p-4">
                                            <div className="flex items-center border border-brand-gray-300 rounded w-28">
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 text-lg hover:bg-brand-gray-100">-</button>
                                                <span className="px-3 py-1 text-center flex-1">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 text-lg hover:bg-brand-gray-100">+</button>
                                            </div>
                                        </td>
                                        <td className="p-4 font-bold text-brand-gray-600">${(item.price * item.quantity).toFixed(2)}</td>
                                        <td className="p-4">
                                            <button onClick={() => removeFromCart(item.id)} className="text-brand-gray-400 hover:text-red-500" aria-label="Remove item">
                                                <Icon name="trash" className="w-5 h-5"/>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="p-4 flex justify-between items-center">
                            <button onClick={() => setPage('home')} className="bg-brand-gray-200 text-brand-gray-600 font-bold py-2 px-6 rounded hover:bg-brand-gray-300 transition-colors">
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>

                {/* Cart Totals */}
                <div className="w-full lg:w-1/3">
                    <div className="bg-white shadow rounded p-6">
                        <h2 className="text-xl font-bold text-brand-gray-600 mb-4 border-b pb-4">Cart Totals</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-brand-gray-500">Subtotal</span>
                                <span className="font-semibold text-brand-gray-600">${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-brand-gray-500">Shipping</span>
                                <span className="font-semibold text-brand-gray-600">Free</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg border-t pt-4 mt-2">
                                <span className="text-brand-gray-600">Total</span>
                                <span className="text-brand-green">${cartTotal.toFixed(2)}</span>
                            </div>
                        </div>
                        <button onClick={() => setPage('checkout')} className="w-full mt-6 bg-brand-green text-white font-bold py-3 rounded hover:bg-brand-green-dark transition-colors">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default CartPage;