import React, { useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { blogPosts } from '../services/api';

const BlogDetailPage: React.FC = () => {
    const { activePostId, setPage } = useCart();
    
    const post = blogPosts.find(p => p.id === activePostId);

    useEffect(() => {
        if (!post) {
            setPage('blog');
        }
    }, [post, setPage]);

    if (!post) {
        return null;
    }

    return (
        <div className="bg-white py-12">
            <div className="container mx-auto px-4 max-w-3xl">
                <p className="text-brand-gray-400 mb-4">
                    <button onClick={() => setPage('home')} className="hover:text-brand-green">Home</button> / 
                    <button onClick={() => setPage('blog')} className="hover:text-brand-green"> Blog</button> / {post.title}
                </p>
                <h1 className="text-4xl font-bold text-brand-gray-600 mb-4">{post.title}</h1>
                <p className="text-sm text-brand-gray-500 mb-6">{post.date} / by {post.author}</p>
                
                <img src={post.imageUrl} alt={post.title} className="w-full rounded-lg shadow-lg mb-8" />
                
                <div 
                    className="prose lg:prose-xl max-w-none text-brand-gray-600"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                >
                </div>
            </div>
        </div>
    );
};

export default BlogDetailPage;
