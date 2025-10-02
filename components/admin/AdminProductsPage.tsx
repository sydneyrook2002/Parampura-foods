import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import Icon from '../Icon';
import ProductForm from './ProductForm';
import { Product } from '../../types';

const AdminProductsPage: React.FC = () => {
    const { products, deleteProduct, setPage } = useCart();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState<Product | null>(null);

    const handleEdit = (product: Product) => {
        setProductToEdit(product);
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        setProductToEdit(null);
        setIsModalOpen(true);
    };

    const handleDelete = (productId: number) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            deleteProduct(productId);
        }
    };

    return (
        <div className="bg-brand-gray-100 min-h-screen">
            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-brand-gray-600">Manage Products</h1>
                        <p className="text-brand-gray-400">
                          <button onClick={() => setPage('adminDashboard')} className="text-brand-green hover:underline">Admin</button> / Manage Products
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <button 
                            onClick={() => setPage('adminDashboard')}
                            className="bg-brand-gray-200 text-brand-gray-600 font-bold py-2 px-4 rounded hover:bg-brand-gray-300 transition-colors"
                        >
                            Back to Dashboard
                        </button>
                        <button 
                            onClick={handleAddNew}
                            className="flex items-center gap-2 bg-brand-green text-white font-bold py-2 px-4 rounded hover:bg-brand-green-dark transition-colors"
                        >
                            <Icon name="plus-circle" className="w-5 h-5" />
                            Add New Product
                        </button>
                    </div>
                </div>

                <div className="bg-white shadow rounded overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b border-brand-gray-200 bg-brand-gray-100">
                            <tr>
                                <th className="p-4 font-semibold text-brand-gray-500">ID</th>
                                <th className="p-4 font-semibold text-brand-gray-500">Image</th>
                                <th className="p-4 font-semibold text-brand-gray-500">Name</th>
                                <th className="p-4 font-semibold text-brand-gray-500">Price</th>
                                <th className="p-4 font-semibold text-brand-gray-500">Status</th>
                                <th className="p-4 font-semibold text-brand-gray-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id} className="border-b border-brand-gray-200 hover:bg-brand-gray-100">
                                    <td className="p-4 text-brand-gray-500">{product.id}</td>
                                    <td className="p-4">
                                        <img src={product.imageUrls[0]} alt={product.name} className="w-12 h-12 object-cover rounded"/>
                                    </td>
                                    <td className="p-4 font-semibold text-brand-gray-600">{product.name}</td>
                                    <td className="p-4 text-brand-gray-500">${product.price.toFixed(2)}</td>
                                    <td className="p-4">
                                        <div className="flex flex-col gap-1 text-xs">
                                          {product.isNew && <span className="bg-blue-500 text-white font-bold px-2 py-0.5 rounded-full inline-block text-center">NEW</span>}
                                          {product.isSale && <span className="bg-red-500 text-white font-bold px-2 py-0.5 rounded-full inline-block text-center">SALE</span>}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            <button onClick={() => handleEdit(product)} className="text-blue-500 hover:text-blue-700" title="Edit">
                                                <Icon name="edit" className="w-5 h-5"/>
                                            </button>
                                            <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:text-red-700" title="Delete">
                                                <Icon name="trash" className="w-5 h-5"/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <ProductForm
                    productToEdit={productToEdit}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default AdminProductsPage;