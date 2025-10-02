import React from 'react';
import { BlogPost } from '../types';
import SectionTitle from './SectionTitle';
import { useCart } from '../contexts/CartContext';

interface BlogSectionProps {
  posts: BlogPost[];
}

const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => {
  const { viewBlogPost } = useCart();

  const handleReadMore = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    viewBlogPost(post.id);
  };

  return (
    <div className="bg-white rounded overflow-hidden shadow-md group">
      <a href="#" onClick={handleReadMore} className="block overflow-hidden">
        <img src={post.imageUrl} alt={post.title} className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300" />
      </a>
      <div className="p-6">
        <p className="text-sm text-brand-gray-400 mb-2">{post.date} / by {post.author}</p>
        <h3 className="font-bold text-xl text-brand-gray-600 mb-3 group-hover:text-brand-green transition-colors">
          <a href="#" onClick={handleReadMore}>{post.title}</a>
        </h3>
        <p className="text-brand-gray-500 mb-4">{post.excerpt}</p>
        <a href="#" onClick={handleReadMore} className="font-bold text-brand-green hover:text-brand-green-dark transition-colors">READ MORE</a>
      </div>
    </div>
  );
};

const BlogSection: React.FC<BlogSectionProps> = ({ posts }) => {
  return (
    <div className="container mx-auto px-4">
      <SectionTitle title="From Our Blog" subtitle="LATEST NEWS" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
