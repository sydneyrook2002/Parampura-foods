import React, { useState, useEffect, useCallback } from 'react';
import { Testimonial } from '../types';
import SectionTitle from './SectionTitle';

interface TestimonialSliderProps {
  testimonials: Testimonial[];
}

const TestimonialSlider: React.FC<TestimonialSliderProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    const testimonialInterval = setInterval(nextTestimonial, 6000);
    return () => clearInterval(testimonialInterval);
  }, [nextTestimonial]);

  return (
    <section className="relative bg-cover bg-center bg-fixed py-20 text-white" style={{ backgroundImage: "url('https://picsum.photos/1920/1080?random=99')" }}>
      <div className="absolute inset-0 bg-brand-brown bg-opacity-70"></div>
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle title="Our Testimonials" subtitle="WHAT OUR CLIENTS SAY" />
        <div className="relative w-full max-w-3xl mx-auto text-center h-64">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
            >
              <img src={testimonial.imageUrl} alt={testimonial.author} className="w-24 h-24 rounded-full mb-4 border-4 border-brand-green" />
              <p className="text-lg italic mb-4">"{testimonial.quote}"</p>
              <h4 className="font-bold text-xl">{testimonial.author}</h4>
              <p className="text-brand-gray-300">{testimonial.role}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${currentIndex === index ? 'bg-brand-green' : 'bg-white bg-opacity-50'}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;