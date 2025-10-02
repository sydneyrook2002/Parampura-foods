import React, { useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { infoPageContents } from '../services/api';

const InfoPage: React.FC = () => {
    const { activeInfoPageId, setPage } = useCart();
    
    const pageContent = infoPageContents.find(p => p.id === activeInfoPageId);

    useEffect(() => {
        if (!pageContent) {
            setPage('home');
        }
    }, [pageContent, setPage]);

    if (!pageContent) {
        return null;
    }

    return (
        <div className="bg-white py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <p className="text-brand-gray-400 mb-4">
                    <button onClick={() => setPage('home')} className="hover:text-brand-green">Home</button> / {pageContent.title}
                </p>
                <h1 className="text-4xl font-bold text-brand-gray-600 mb-8 border-b pb-4">{pageContent.title}</h1>
                
                <div 
                    className="prose lg:prose-lg max-w-none text-brand-gray-600"
                    dangerouslySetInnerHTML={{ __html: pageContent.content }}
                >
                </div>
            </div>
        </div>
    );
};

export default InfoPage;
