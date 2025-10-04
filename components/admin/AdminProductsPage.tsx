import React, { useState } from 'react';
import { useApiCart } from '../../contexts/ApiCartContext';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useToast } from '../ui/use-toast';
import { apiClient, CreateFoodDto, UpdateFoodDto, FoodDto } from '../../services/apiClient';
import { Plus, Edit, Trash2, Save, X, ArrowLeft } from 'lucide-react';

const AdminProductsPage: React.FC = () => {
    const { foods, categories, setPage, loading, loadFoods } = useApiCart();
    const { toast } = useToast();
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<FoodDto | null>(null);
    const [formData, setFormData] = useState<Partial<CreateFoodDto | UpdateFoodDto>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const resetForm = () => {
        setFormData({});
        setShowAddForm(false);
        setEditingProduct(null);
    };

    const handleInputChange = (field: string, value: string | number | boolean) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (editingProduct) {
                // Update existing product
                const updateData: UpdateFoodDto = {
                    name: formData.name || editingProduct.name,
                    description: formData.description || editingProduct.description,
                    mrp: Number(formData.mrp) || editingProduct.mrp,
                    salePrice: formData.salePrice ? Number(formData.salePrice) : editingProduct.salePrice,
                    categoryId: Number(formData.categoryId) || editingProduct.categoryId,
                    isAvailable: formData.isAvailable !== undefined ? formData.isAvailable : editingProduct.isAvailable,
                    isOrganic: formData.isOrganic !== undefined ? formData.isOrganic : editingProduct.isOrganic,
                    stockQuantity: Number(formData.stockQuantity) || editingProduct.stockQuantity,
                    imageUrl: formData.imageUrl || editingProduct.imageUrl,
                    brand: formData.brand || editingProduct.brand,
                    unit: formData.unit || editingProduct.unit || 'kg',
                    quantity: Number(formData.quantity) || editingProduct.quantity,
                    tags: formData.tags || editingProduct.tags,
                    minStockLevel: Number(formData.minStockLevel) || 5,
                };

                await apiClient.updateFood(editingProduct.foodId, updateData);
                toast({
                    title: "Success",
                    description: "Product updated successfully!",
                });
            } else {
                // Create new product
                const createData: CreateFoodDto = {
                    name: formData.name as string,
                    description: formData.description as string,
                    mrp: Number(formData.mrp),
                    salePrice: formData.salePrice ? Number(formData.salePrice) : undefined,
                    categoryId: Number(formData.categoryId),
                    isOrganic: formData.isOrganic as boolean || false,
                    stockQuantity: Number(formData.stockQuantity) || 0,
                    imageUrl: formData.imageUrl as string,
                    brand: formData.brand as string,
                    unit: formData.unit as string || 'kg',
                    quantity: Number(formData.quantity) || 1,
                    tags: formData.tags as string,
                    minStockLevel: Number(formData.minStockLevel) || 5,
                };

                await apiClient.createFood(createData);
                toast({
                    title: "Success",
                    description: "Product created successfully!",
                });
            }

            resetForm();
            await loadFoods(); // Refresh the products list
        } catch (error) {
            toast({
                title: "Error",
                description: `Failed to ${editingProduct ? 'update' : 'create'} product. Please try again.`,
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (productId: number, productName: string) => {
        if (!confirm(`Are you sure you want to delete "${productName}"? This action cannot be undone.`)) {
            return;
        }

        try {
            await apiClient.deleteFood(productId);
            toast({
                title: "Success",
                description: "Product deleted successfully!",
            });
            await loadFoods(); // Refresh the products list
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete product. Please try again.",
                variant: "destructive",
            });
        }
    };

    const startEdit = (product: FoodDto) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            description: product.description,
            mrp: product.mrp,
            salePrice: product.salePrice,
            categoryId: product.categoryId,
            isAvailable: product.isAvailable,
            isOrganic: product.isOrganic,
            stockQuantity: product.stockQuantity,
            imageUrl: product.imageUrl,
            brand: product.brand,
            unit: product.unit,
            quantity: product.quantity,
            tags: product.tags,
        });
        setShowAddForm(true);
    };

    return (
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-12 min-h-screen">
            {/* Mobile Back Button - Full Width */}
            <div className="lg:hidden mb-4">
                <Button 
                    variant="outline" 
                            onClick={() => setPage('adminDashboard')}
                    className="flex items-center gap-2 w-full"
                        >
                    <ArrowLeft className="h-4 w-4" />
                            Back to Dashboard
                </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 lg:mb-8 gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Manage Products</h1>
                    <nav className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                        <Button variant="link" className="p-0 h-auto" onClick={() => setPage('adminDashboard')}>
                            Admin
                        </Button>
                        <span className="mx-2">/</span>
                        <span>Manage Products</span>
                    </nav>
                </div>
                <div className="flex gap-2 sm:gap-4">
                    <Button onClick={() => setShowAddForm(true)} className="flex-1 sm:flex-none">
                        <Plus className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Add New Product</span>
                        <span className="sm:hidden">Add Product</span>
                    </Button>
                    </div>
                </div>

            {/* Add/Edit Form */}
            {showAddForm && (
                <Card className="mb-4 sm:mb-6 lg:mb-8">
                    <CardHeader>
                        <CardTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="name">Product Name *</Label>
                                <Input
                                    id="name"
                                    value={formData.name || ''}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="categoryId">Category *</Label>
                                <select
                                    id="categoryId"
                                    className="w-full px-3 py-2 border border-border rounded-md"
                                    value={formData.categoryId || ''}
                                    onChange={(e) => handleInputChange('categoryId', Number(e.target.value))}
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(category => (
                                        <option key={category.categoryId} value={category.categoryId}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <Label htmlFor="mrp">MRP (₹) *</Label>
                                <Input
                                    id="mrp"
                                    type="number"
                                    step="0.01"
                                    value={formData.mrp || ''}
                                    onChange={(e) => handleInputChange('mrp', Number(e.target.value))}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="salePrice">Sale Price (₹)</Label>
                                <Input
                                    id="salePrice"
                                    type="number"
                                    step="0.01"
                                    value={formData.salePrice || ''}
                                    onChange={(e) => handleInputChange('salePrice', Number(e.target.value))}
                                />
                            </div>

                            <div>
                                <Label htmlFor="stockQuantity">Stock Quantity *</Label>
                                <Input
                                    id="stockQuantity"
                                    type="number"
                                    value={formData.stockQuantity || ''}
                                    onChange={(e) => handleInputChange('stockQuantity', Number(e.target.value))}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="brand">Brand</Label>
                                <Input
                                    id="brand"
                                    value={formData.brand || ''}
                                    onChange={(e) => handleInputChange('brand', e.target.value)}
                                />
                            </div>

                            <div>
                                <Label htmlFor="unit">Unit</Label>
                                <select
                                    id="unit"
                                    className="w-full px-3 py-2 border border-border rounded-md"
                                    value={formData.unit || 'kg'}
                                    onChange={(e) => handleInputChange('unit', e.target.value)}
                                >
                                    <option value="kg">kg</option>
                                    <option value="grams">grams</option>
                                    <option value="pieces">pieces</option>
                                    <option value="liters">liters</option>
                                    <option value="ml">ml</option>
                                    <option value="pack">pack</option>
                                </select>
                            </div>

                            <div>
                                <Label htmlFor="quantity">Quantity</Label>
                                <Input
                                    id="quantity"
                                    type="number"
                                    step="0.1"
                                    value={formData.quantity || ''}
                                    onChange={(e) => handleInputChange('quantity', Number(e.target.value))}
                                />
                            </div>

                            <div className="md:col-span-2">
                                <Label htmlFor="description">Description *</Label>
                                <textarea
                                    id="description"
                                    className="w-full px-3 py-2 border border-border rounded-md"
                                    rows={3}
                                    value={formData.description || ''}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="imageUrl">Image URL</Label>
                                <Input
                                    id="imageUrl"
                                    value={formData.imageUrl || ''}
                                    onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                                />
                            </div>

                            <div>
                                <Label htmlFor="tags">Tags (comma-separated)</Label>
                                <Input
                                    id="tags"
                                    value={formData.tags || ''}
                                    onChange={(e) => handleInputChange('tags', e.target.value)}
                                    placeholder="organic, fresh, local"
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.isOrganic || false}
                                        onChange={(e) => handleInputChange('isOrganic', e.target.checked)}
                                    />
                                    Organic
                                </label>
                                {editingProduct && (
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={formData.isAvailable !== undefined ? formData.isAvailable : true}
                                            onChange={(e) => handleInputChange('isAvailable', e.target.checked)}
                                        />
                                        Available
                                    </label>
                                )}
                            </div>

                            <div className="md:col-span-2 flex gap-4">
                                <Button type="submit" disabled={isSubmitting}>
                                    <Save className="h-4 w-4 mr-2" />
                                    {isSubmitting ? 'Saving...' : (editingProduct ? 'Update Product' : 'Create Product')}
                                </Button>
                                <Button type="button" variant="outline" onClick={resetForm}>
                                    <X className="h-4 w-4 mr-2" />
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Products Table */}
            {loading ? (
                <div className="text-center py-8">
                    <p>Loading products...</p>
                </div>
            ) : (
                <Card>
                    <CardHeader className="pb-3 sm:pb-6">
                        <CardTitle className="text-lg sm:text-xl">Products ({foods.length})</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 sm:p-6">
                        {/* Desktop Table View */}
                        <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full text-left">
                                <thead className="border-b">
                                    <tr>
                                        <th className="p-4 font-semibold">Image</th>
                                        <th className="p-4 font-semibold">Name</th>
                                        <th className="p-4 font-semibold">Category</th>
                                        <th className="p-4 font-semibold">MRP</th>
                                        <th className="p-4 font-semibold">Sale Price</th>
                                        <th className="p-4 font-semibold">Stock</th>
                                        <th className="p-4 font-semibold">Status</th>
                                        <th className="p-4 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                                    {foods.map(product => (
                                        <tr key={product.foodId} className="border-b hover:bg-muted/50">
                                            <td className="p-4">
                                                {product.imageUrl ? (
                                                    <img 
                                                        src={product.imageUrl} 
                                                        alt={product.name} 
                                                        className="w-12 h-12 object-cover rounded"
                                                    />
                                                ) : (
                                                    <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-400 rounded flex items-center justify-center">
                                                        <span className="text-gray-600 text-xs font-medium">{product.name.charAt(0)}</span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                <div>
                                                    <div className="font-semibold">{product.name}</div>
                                                    <div className="text-sm text-muted-foreground">{product.brand}</div>
                                                </div>
                                            </td>
                                            <td className="p-4">{product.categoryName}</td>
                                            <td className="p-4">₹{product.mrp.toFixed(2)}</td>
                                            <td className="p-4">
                                                {product.salePrice ? (
                                                    <div>
                                                        <div className="font-semibold text-green-600">₹{product.salePrice.toFixed(2)}</div>
                                                        <div className="text-xs text-red-600">{product.discountPercentage}% OFF</div>
                                                    </div>
                                                ) : (
                                                    <span className="text-muted-foreground">-</span>
                                                )}
                                            </td>
                                    <td className="p-4">
                                                <span className={product.isLowStock ? 'text-red-600 font-semibold' : ''}>
                                                    {product.stockQuantity}
                                                </span>
                                    </td>
                                    <td className="p-4">
                                                <div className="flex flex-col gap-1">
                                                    {product.isAvailable ? (
                                                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                                            Available
                                                        </span>
                                                    ) : (
                                                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                                                            Unavailable
                                                        </span>
                                                    )}
                                                    {product.isOrganic && (
                                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                                            Organic
                                                        </span>
                                                    )}
                                                    {product.isOnSale && (
                                                        <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                                                            On Sale
                                                        </span>
                                                    )}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                                    <Button 
                                                        size="sm" 
                                                        variant="outline"
                                                        onClick={() => startEdit(product)}
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button 
                                                        size="sm" 
                                                        variant="destructive"
                                                        onClick={() => handleDelete(product.foodId, product.name)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                        {/* Mobile Card View - Bigger Cards */}
                        <div className="lg:hidden space-y-3">
                            {foods.map(product => (
                                <div key={product.foodId} className="border rounded-xl p-3 bg-white shadow-sm">
                                    {/* Header with Image and Basic Info */}
                                    <div className="flex items-start gap-4 mb-3">
                                        {/* Product Image - Bigger */}
                                        <div className="flex-shrink-0">
                                            {product.imageUrl ? (
                                                <img 
                                                    src={product.imageUrl} 
                                                    alt={product.name} 
                                                    className="w-20 h-20 object-cover rounded-lg"
                                                />
                                            ) : (
                                                <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-400 rounded-lg flex items-center justify-center">
                                                    <span className="text-gray-600 text-lg font-medium">{product.name.charAt(0)}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Product Basic Info */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-base mb-1 line-clamp-2">{product.name}</h3>
                                            <p className="text-sm text-muted-foreground mb-1">{product.brand}</p>
                                            <p className="text-sm text-muted-foreground">{product.categoryName}</p>
                                        </div>
                                        
                                        {/* Actions */}
                                        <div className="flex flex-col gap-2">
                                            <Button 
                                                size="sm" 
                                                variant="outline"
                                                onClick={() => startEdit(product)}
                                                className="h-9 w-9 p-0"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button 
                                                size="sm" 
                                                variant="destructive"
                                                onClick={() => handleDelete(product.foodId, product.name)}
                                                className="h-9 w-9 p-0"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Pricing Section */}
                                    <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold">₹{product.mrp.toFixed(2)}</span>
                                                {product.salePrice && (
                                                    <>
                                                        <span className="text-sm text-green-600 font-semibold">₹{product.salePrice.toFixed(2)}</span>
                                                        <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full font-medium">
                                                            {product.discountPercentage}% OFF
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                            <span className={`text-sm font-medium ${product.isLowStock ? 'text-red-600' : 'text-muted-foreground'}`}>
                                                Stock: {product.stockQuantity}
                                            </span>
                </div>
            </div>

                                    {/* Status Tags - Better Layout */}
                                    <div className="flex flex-wrap gap-2">
                                        {product.isAvailable ? (
                                            <span className="bg-green-100 text-green-800 text-sm px-3 py-1.5 rounded-full font-medium">
                                                Available
                                            </span>
                                        ) : (
                                            <span className="bg-red-100 text-red-800 text-sm px-3 py-1.5 rounded-full font-medium">
                                                Unavailable
                                            </span>
                                        )}
                                        {product.isOrganic && (
                                            <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1.5 rounded-full font-medium">
                                                Organic
                                            </span>
                                        )}
                                        {product.isOnSale && (
                                            <span className="bg-orange-100 text-orange-800 text-sm px-3 py-1.5 rounded-full font-medium">
                                                On Sale
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default AdminProductsPage;