import React, { useEffect } from 'react';
import { useCart } from '../contexts/CartContext';

const CheckoutPage: React.FC = () => {
    const { cartItems, getCartTotal, placeOrder, setPage, user } = useCart();
    const cartTotal = getCartTotal();

    useEffect(() => {
        if (!user) {
            setPage('login');
        } else if (cartItems.length === 0) {
            setPage('home');
        }
    }, [cartItems, user, setPage]);

    const handlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault();
        placeOrder();
        setPage('success');
    };

    if (cartItems.length === 0 || !user) {
        return null; // or a loading spinner while redirecting
    }

    return (
        <div className="bg-brand-gray-100">
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold text-brand-gray-600 mb-2">Checkout</h1>
                <p className="text-brand-gray-400 mb-8">Home / Cart / Checkout</p>

                <form onSubmit={handlePlaceOrder} className="flex flex-col lg:flex-row gap-8">
                    {/* Billing Details */}
                    <div className="w-full lg:w-2/3 bg-white shadow rounded p-6">
                        <h2 className="text-xl font-bold text-brand-gray-600 mb-6">Billing Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-brand-gray-500 mb-1">First Name</label>
                                <input type="text" id="firstName" required defaultValue={user.name.split(' ')[0]} className="w-full border border-brand-gray-300 px-3 py-2 rounded focus:ring-brand-green focus:border-brand-green"/>
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-brand-gray-500 mb-1">Last Name</label>
                                <input type="text" id="lastName" required defaultValue={user.name.split(' ')[1] || ''} className="w-full border border-brand-gray-300 px-3 py-2 rounded focus:ring-brand-green focus:border-brand-green"/>
                            </div>
                            <div className="md:col-span-2">
                                <label htmlFor="email" className="block text-sm font-medium text-brand-gray-500 mb-1">Email Address</label>
                                <input type="email" id="email" required defaultValue={user.email} className="w-full border border-brand-gray-300 px-3 py-2 rounded focus:ring-brand-green focus:border-brand-green"/>
                            </div>
                             <div className="md:col-span-2">
                                <label htmlFor="address" className="block text-sm font-medium text-brand-gray-500 mb-1">Street Address</label>
                                <input type="text" id="address" required className="w-full border border-brand-gray-300 px-3 py-2 rounded focus:ring-brand-green focus:border-brand-green"/>
                            </div>
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-brand-gray-500 mb-1">Town / City</label>
                                <input type="text" id="city" required className="w-full border border-brand-gray-300 px-3 py-2 rounded focus:ring-brand-green focus:border-brand-green"/>
                            </div>
                            <div>
                                <label htmlFor="zip" className="block text-sm font-medium text-brand-gray-500 mb-1">Postcode / ZIP</label>
                                <input type="text" id="zip" required className="w-full border border-brand-gray-300 px-3 py-2 rounded focus:ring-brand-green focus:border-brand-green"/>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="w-full lg:w-1/3">
                        <div className="bg-white shadow rounded p-6">
                            <h2 className="text-xl font-bold text-brand-gray-600 mb-4 border-b pb-4">Your Order</h2>
                            <div className="space-y-3 mb-4">
                                {cartItems.map(item => (
                                    <div key={item.id} className="flex justify-between items-center text-sm">
                                        <span className="text-brand-gray-500">{item.name} x {item.quantity}</span>
                                        <span className="font-semibold text-brand-gray-600">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-3 border-t pt-4">
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
                             <button type="submit" className="w-full mt-6 bg-brand-green text-white font-bold py-3 rounded hover:bg-brand-green-dark transition-colors">
                                Place Order
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckoutPage;