import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';

const RegisterPage: React.FC = () => {
    const { register, setPage } = useCart();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const success = register(name, email, password);
        if (!success) {
            setError('An account with this email already exists.');
        }
    };

    return (
        <div className="bg-brand-gray-100">
            <div className="container mx-auto px-4 py-20">
                <div className="max-w-md mx-auto bg-white shadow-md rounded p-8">
                    <h1 className="text-3xl font-bold text-brand-gray-600 mb-6 text-center">Create Account</h1>
                    {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-brand-gray-500 mb-1">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full border border-brand-gray-300 px-3 py-2 rounded focus:ring-brand-green focus:border-brand-green"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-brand-gray-500 mb-1">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full border border-brand-gray-300 px-3 py-2 rounded focus:ring-brand-green focus:border-brand-green"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-brand-gray-500 mb-1">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full border border-brand-gray-300 px-3 py-2 rounded focus:ring-brand-green focus:border-brand-green"
                            />
                        </div>
                        <button type="submit" className="w-full bg-brand-green text-white font-bold py-3 rounded hover:bg-brand-green-dark transition-colors">
                            Register
                        </button>
                    </form>
                    <p className="text-center text-sm text-brand-gray-500 mt-6">
                        Already have an account?{' '}
                        <a href="#" onClick={(e) => { e.preventDefault(); setPage('login'); }} className="text-brand-green font-semibold hover:underline">
                            Login here
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
