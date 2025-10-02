import React, { useState, useEffect } from 'react';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import Icon from '../Icon';
import { productCategories } from '../../services/api';

interface ProductFormProps {
    productToEdit: Product | null;
    onClose: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ productToEdit, onClose }) => {
    const { addProduct, updateProduct } = useCart();
    
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        oldPrice: '',
        imageUrl: '', // This will manage the primary image URL
        isNew: false,
        isSale: false,
        categoryId: productCategories[0]?.id || '',
    });

    useEffect(() => {
        if (productToEdit) {
            setFormData({
                name: productToEdit.name,
                price: productToEdit.price.toString(),
                oldPrice: productToEdit.oldPrice?.toString() || '',
                imageUrl: productToEdit.imageUrls[0] || '', // Load the first image
                isNew: productToEdit.isNew,
                isSale: productToEdit.isSale,
                categoryId: productToEdit.categoryId,
            });
        }
    }, [productToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Construct the product data with the new `imageUrls` array structure
        const productData = {
            name: formData.name,
            price: parseFloat(formData.price),
            oldPrice: formData.oldPrice ? parseFloat(formData.oldPrice) : undefined,
            // For simplicity, form manages one URL, but we save it as an array
            imageUrls: [formData.imageUrl || `https://picsum.photos/600/600?random=${Date.now()}`],
            isNew: formData.isNew,
            isSale: formData.isSale,
            categoryId: formData.categoryId,
            // Add sensible defaults for new fields, which can be edited later if a more advanced form is built
            description: productToEdit?.description || 'A newly added delicious product.',
            specification: productToEdit?.specification || [],
            sku: productToEdit?.sku || `SKU-${Date.now()}`,
            brand: productToEdit?.brand || 'Parampara',
            availability: productToEdit?.availability || 'In Stock',
        };

        if (productToEdit) {
            updateProduct({ ...productToEdit, ...productData });
        } else {
            // The call to addProduct now uses the correct type
            addProduct(productData as Omit<Product, 'id' | 'rating'>);
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg max-h-screen overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-brand-gray-600">
                        {productToEdit ? 'Edit Product' : 'Add New Product'}
                    </h2>
                    <button onClick={onClose} className="text-brand-gray-400 hover:text-brand-gray-600">
                        <Icon name="close" className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-brand-gray-500 mb-1">Product Name</label>
                            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="w-full border border-brand-gray-300 px-3 py-2 rounded focus:ring-brand-green focus:border-brand-green"/>
                        </div>
                        <div>
                            <label htmlFor="categoryId" className="block text-sm font-medium text-brand-gray-500 mb-1">Category</label>
                            <select
                                name="categoryId"
                                id="categoryId"
                                value={formData.categoryId}
                                onChange={handleChange}
                                required
                                className="w-full border border-brand-gray-300 px-3 py-2 rounded focus:ring-brand-green focus:border-brand-green bg-white"
                            >
                                {productCategories.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-brand-gray-500 mb-1">Price</label>
                                <input type="number" name="price" id="price" step="0.01" value={formData.price} onChange={handleChange} required className="w-full border border-brand-gray-300 px-3 py-2 rounded focus:ring-brand-green focus:border-brand-green"/>
                            </div>
                            <div>
                                <label htmlFor="oldPrice" className="block text-sm font-medium text-brand-gray-500 mb-1">Old Price (Optional)</label>
                                <input type="number" name="oldPrice" id="oldPrice" step="0.01" value={formData.oldPrice} onChange={handleChange} className="w-full border border-brand-gray-300 px-3 py-2 rounded focus:ring-brand-green focus:border-brand-green"/>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="imageUrl" className="block text-sm font-medium text-brand-gray-500 mb-1">Primary Image URL</label>
                            <input type="text" name="imageUrl" id="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Leave blank for random image" className="w-full border border-brand-gray-300 px-3 py-2 rounded focus:ring-brand-green focus:border-brand-green"/>
                        </div>
                        <div className="flex items-center gap-8">
                           <label className="flex items-center gap-2">
                                <input type="checkbox" name="isNew" checked={formData.isNew} onChange={handleChange} className="h-4 w-4 text-brand-green rounded border-gray-300 focus:ring-brand-green"/>
                                <span className="text-sm font-medium text-brand-gray-500">New Arrival</span>
                           </label>
                           <label className="flex items-center gap-2">
                                <input type="checkbox" name="isSale" checked={formData.isSale} onChange={handleChange} className="h-4 w-4 text-brand-green rounded border-gray-300 focus:ring-brand-green"/>
                                <span className="text-sm font-medium text-brand-gray-500">On Sale</span>
                           </label>
                        </div>
                    </div>
                    <div className="mt-8 flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="bg-brand-gray-200 text-brand-gray-600 font-bold py-2 px-6 rounded hover:bg-brand-gray-300 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" className="bg-brand-green text-white font-bold py-2 px-6 rounded hover:bg-brand-green-dark transition-colors">
                            Save Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;