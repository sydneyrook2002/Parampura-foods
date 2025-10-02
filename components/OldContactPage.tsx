import React from 'react';
import { useCart } from '../contexts/CartContext';
import { contactPageContent } from '../services/api';
import Icon from './Icon';

const ContactPage: React.FC = () => {
    const { setPage } = useCart();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Thank you for your message! We will get back to you shortly.");
        // In a real app, you would handle form submission here
    };

    return (
        <div className="bg-white">
            {/* Page Header */}
            <div className="bg-brand-gray-100 py-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold text-brand-gray-600">Contact Us</h1>
                    <p className="text-brand-gray-400 mt-2">
                        <button onClick={() => setPage('home')} className="hover:text-brand-green">Home</button> / Contact Us
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-20">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-brand-gray-600 mb-4">{contactPageContent.title}</h2>
                    <p className="text-brand-gray-500 leading-relaxed">{contactPageContent.subtitle}</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Contact Form */}
                    <div className="w-full lg:w-2/3 bg-brand-gray-100 p-8 rounded-lg">
                        <h3 className="text-2xl font-bold text-brand-gray-600 mb-6">Send Us A Message</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="sr-only">Name</label>
                                    <input type="text" id="name" placeholder="Your Name*" required className="w-full border border-brand-gray-300 px-4 py-3 rounded focus:ring-brand-green focus:border-brand-green"/>
                                </div>
                                <div>
                                    <label htmlFor="email" className="sr-only">Email</label>
                                    <input type="email" id="email" placeholder="Your Email*" required className="w-full border border-brand-gray-300 px-4 py-3 rounded focus:ring-brand-green focus:border-brand-green"/>
                                </div>
                            </div>
                             <div>
                                <label htmlFor="subject" className="sr-only">Subject</label>
                                <input type="text" id="subject" placeholder="Subject" className="w-full border border-brand-gray-300 px-4 py-3 rounded focus:ring-brand-green focus:border-brand-green"/>
                            </div>
                            <div>
                                <label htmlFor="message" className="sr-only">Message</label>
                                <textarea id="message" rows={5} placeholder="Your Message*" required className="w-full border border-brand-gray-300 px-4 py-3 rounded focus:ring-brand-green focus:border-brand-green"></textarea>
                            </div>
                            <button type="submit" className="bg-brand-green text-white font-bold py-3 px-6 rounded hover:bg-brand-green-dark transition-colors">
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="w-full lg:w-1/3">
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-bold text-xl mb-2 flex items-center gap-2"><Icon name="phone" className="w-5 h-5 text-brand-green"/> Address</h4>
                                <p className="text-brand-gray-500">{contactPageContent.address}</p>
                            </div>
                             <div>
                                <h4 className="font-bold text-xl mb-2 flex items-center gap-2"><Icon name="email" className="w-5 h-5 text-brand-green"/> Contact Info</h4>
                                <p className="text-brand-gray-500">Phone: {contactPageContent.phone}</p>
                                <p className="text-brand-gray-500">Email: {contactPageContent.email}</p>
                            </div>
                             <div>
                                <h4 className="font-bold text-xl mb-2 flex items-center gap-2"><Icon name="cart" className="w-5 h-5 text-brand-green"/> Business Hours</h4>
                                {contactPageContent.businessHours.map(bh => (
                                    <p key={bh.days} className="text-brand-gray-500"><strong>{bh.days}:</strong> {bh.hours}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Map Section */}
            <div>
                 <img src={contactPageContent.mapUrl} alt="Location map" className="w-full h-96 object-cover" />
            </div>
        </div>
    );
};

export default ContactPage;