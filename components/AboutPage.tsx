import React from 'react';
import { useCart } from '../contexts/CartContext';
import { aboutPageContent, whyChooseUsItems, teamMembers } from '../services/api';
import SectionTitle from './SectionTitle';
import Icon from './Icon';
import { Testimonial } from '../types';
import { testimonials } from '../services/api';
import TestimonialSlider from './TestimonialSlider';

const AboutPage: React.FC = () => {
    const { setPage } = useCart();
    
    return (
        <div className="bg-white">
            {/* Page Header */}
            <div className="bg-brand-gray-100 py-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold text-brand-gray-600">About Us</h1>
                    <p className="text-brand-gray-400 mt-2">
                        <button onClick={() => setPage('home')} className="hover:text-brand-green">Home</button> / About Us
                    </p>
                </div>
            </div>

            {/* Our Story Section */}
            <section className="container mx-auto px-4 py-20">
              <div className="flex flex-wrap items-center -mx-4">
                <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
                  <img src={aboutPageContent.imageUrl} alt="Organic farming" className="rounded-lg shadow-lg" />
                </div>
                <div className="w-full md:w-1/2 px-4">
                  <h2 className="text-3xl font-bold text-brand-gray-600 mb-4">{aboutPageContent.title}</h2>
                  <p className="text-brand-green text-lg font-semibold mb-4">{aboutPageContent.subtitle}</p>
                  <p className="mb-4 text-brand-gray-500 leading-relaxed">
                    {aboutPageContent.paragraph1}
                  </p>
                  <p className="text-brand-gray-500 leading-relaxed">
                    {aboutPageContent.paragraph2}
                  </p>
                </div>
              </div>
            </section>
            
            {/* Why Choose Us Section */}
            <section className="bg-brand-gray-100 py-20">
                <div className="container mx-auto px-4">
                    <SectionTitle title="Why Choose Us" subtitle="OUR PROMISE" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {whyChooseUsItems.map(item => (
                            <div key={item.id} className="text-center bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                                <div className="bg-brand-green/10 p-4 rounded-full inline-block mb-4">
                                    <Icon name={item.icon} className="w-10 h-10 text-brand-green" />
                                </div>
                                <h3 className="text-xl font-bold text-brand-gray-600 mb-2">{item.title}</h3>
                                <p className="text-brand-gray-500">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Meet the Team Section */}
             <section className="container mx-auto px-4 py-20">
                <SectionTitle title="Meet Our Team" subtitle="THE PEOPLE BEHIND THE HARVEST" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teamMembers.map(member => (
                        <div key={member.id} className="text-center">
                            <div className="relative inline-block mb-4">
                                <img src={member.imageUrl} alt={member.name} className="w-48 h-48 rounded-full shadow-lg" />
                            </div>
                            <h3 className="text-xl font-bold text-brand-gray-600">{member.name}</h3>
                            <p className="text-brand-green font-semibold">{member.role}</p>
                        </div>
                    ))}
                </div>
            </section>
            
            {/* Testimonials */}
            <TestimonialSlider testimonials={testimonials} />

        </div>
    );
};

export default AboutPage;
