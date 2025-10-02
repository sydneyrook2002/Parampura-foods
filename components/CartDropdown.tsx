import React from 'react';
import { useCart } from '../contexts/CartContext';
import Icon from './Icon';

const CartDropdown: React.FC = () => {
  const { cartItems, removeFromCart, getCartTotal, setPage } = useCart();

  return (
    <div className="absolute top-full right-0 bg-white border border-brand-gray-200 shadow-lg p-5 w-80 hidden group-hover:block z-50 rounded-md">
      {cartItems.length === 0 ? (
        <p className="text-center text-brand-gray-500 py-4">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4 max-h-64 overflow-y-auto pr-2">
            {cartItems.map(item => (
              <li key={item.id} className="flex items-start gap-4">
                <img src={item.imageUrls[0]} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div className="flex-1">
                  <p className="font-bold text-sm text-brand-gray-600 hover:text-brand-green"><a href="#">{item.name}</a></p>
                  <p className="text-sm text-brand-gray-500">{item.quantity} x ${item.price.toFixed(2)}</p>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-brand-gray-400 hover:text-red-500" aria-label={`Remove ${item.name} from cart`}>
                  <Icon name="close" className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
          <div className="border-t border-brand-gray-200 my-4"></div>
          <div className="flex justify-between font-bold text-lg text-brand-gray-600">
            <span>Subtotal:</span>
            <span className="text-brand-green">${getCartTotal().toFixed(2)}</span>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <button onClick={() => setPage('cart')} className="w-full bg-brand-gray-600 text-white font-bold py-2 rounded hover:bg-brand-gray-500 transition-colors uppercase text-sm">View Cart</button>
            <button onClick={() => setPage('checkout')} className="w-full bg-brand-green text-white font-bold py-2 rounded hover:bg-brand-green-dark transition-colors uppercase text-sm">Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartDropdown;