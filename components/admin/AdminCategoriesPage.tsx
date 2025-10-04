import React, { useState, useEffect } from 'react';
import { useApiCart } from '../../contexts/ApiCartContext';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useToast } from '../ui/use-toast';
import { apiClient, CategoryDto, CreateCategoryDto } from '../../services/apiClient';
import { FolderOpen, Plus, Edit, Trash2, ArrowLeft } from 'lucide-react';

const AdminCategoriesPage: React.FC = () => {
    const { categories, setPage, loadCategories } = useApiCart();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<CategoryDto | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [newCategoryData, setNewCategoryData] = useState<CreateCategoryDto>({
        name: '',
        description: ''
    });

    const handleCreateCategory = async () => {
        if (!newCategoryData.name.trim()) {
            toast({
                title: "Error",
                description: "Category name is required.",
                variant: "destructive",
            });
            return;
        }

        try {
            setIsCreating(true);
            await apiClient.createCategory(newCategoryData);
            
            toast({
                title: "Success",
                description: "Category created successfully!",
            });

            await loadCategories();
            setShowCreateModal(false);
            setNewCategoryData({ name: '', description: '' });
        } catch (error) {
            console.error('Error creating category:', error);
            toast({
                title: "Error",
                description: "Failed to create category. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsCreating(false);
        }
    };

    const handleUpdateCategory = async () => {
        if (!selectedCategory || !newCategoryData.name.trim()) return;

        try {
            setIsUpdating(true);
            await apiClient.updateCategory(selectedCategory.categoryId, newCategoryData);
            
            toast({
                title: "Success",
                description: "Category updated successfully!",
            });

            await loadCategories();
            setShowEditModal(false);
            setSelectedCategory(null);
            setNewCategoryData({ name: '', description: '' });
        } catch (error) {
            console.error('Error updating category:', error);
            toast({
                title: "Error",
                description: "Failed to update category. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDeleteCategory = async (categoryId: number, categoryName: string) => {
        if (!confirm(`Are you sure you want to delete the category "${categoryName}"? This action cannot be undone.`)) {
            return;
        }

        try {
            await apiClient.deleteCategory(categoryId);
            
            toast({
                title: "Success",
                description: "Category deleted successfully!",
            });

            await loadCategories();
        } catch (error) {
            console.error('Error deleting category:', error);
            toast({
                title: "Error",
                description: "Failed to delete category. Please try again.",
                variant: "destructive",
            });
        }
    };

    const openEditModal = (category: CategoryDto) => {
        setSelectedCategory(category);
        setNewCategoryData({
            name: category.name,
            description: category.description || ''
        });
        setShowEditModal(true);
    };

    const refreshCategories = async () => {
        setLoading(true);
        await loadCategories();
        setLoading(false);
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
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Manage Categories</h1>
                    <nav className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                        <Button variant="link" className="p-0 h-auto" onClick={() => setPage('adminDashboard')}>
                            Admin
                        </Button>
                        <span className="mx-2">/</span>
                        <span>Manage Categories</span>
                    </nav>
                </div>
                <div className="flex gap-2 sm:gap-4">
                    <Button variant="outline" onClick={refreshCategories} disabled={loading} className="flex-1 sm:flex-none">
                        {loading ? 'Refreshing...' : 'Refresh'}
                    </Button>
                    <Button onClick={() => setShowCreateModal(true)} className="flex-1 sm:flex-none">
                        <Plus className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Add New Category</span>
                        <span className="sm:hidden">Add Category</span>
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader className="pb-3 sm:pb-6">
                    <CardTitle className="text-lg sm:text-xl">All Categories ({categories.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    {categories.length === 0 ? (
                        <div className="text-center py-8">
                            <FolderOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No Categories Found</h3>
                            <p className="text-muted-foreground">Create your first category to organize your products.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {categories.map((category, index) => (
                                <Card key={category.categoryId} className="border-l-4 border-l-primary">
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-lg">{category.name}</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    ID: #{index + 1}
                                                </p>
                                            </div>
                                            <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                                                Active
                                            </span>
                                        </div>
                                        
                                        {category.description && (
                                            <p className="text-sm mb-4 text-muted-foreground">
                                                {category.description}
                                            </p>
                                        )}
                                        
                                        <div className="flex gap-2">
                                            <Button 
                                                size="sm" 
                                                variant="outline"
                                                onClick={() => openEditModal(category)}
                                            >
                                                <Edit className="h-4 w-4 mr-1" />
                                                Edit
                                            </Button>
                                            <Button 
                                                size="sm" 
                                                variant="destructive"
                                                onClick={() => handleDeleteCategory(category.categoryId, category.name)}
                                            >
                                                <Trash2 className="h-4 w-4 mr-1" />
                                                Delete
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Create Category Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <Card className="w-full max-w-md mx-4">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Plus className="h-5 w-5" />
                                Create New Category
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Add a new category to organize your products
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="categoryName">Category Name *</Label>
                                <Input
                                    id="categoryName"
                                    placeholder="Enter category name"
                                    value={newCategoryData.name}
                                    onChange={(e) => setNewCategoryData(prev => ({ ...prev, name: e.target.value }))}
                                />
                            </div>

                            <div>
                                <Label htmlFor="categoryDescription">Description</Label>
                                <Input
                                    id="categoryDescription"
                                    placeholder="Enter category description (optional)"
                                    value={newCategoryData.description}
                                    onChange={(e) => setNewCategoryData(prev => ({ ...prev, description: e.target.value }))}
                                />
                            </div>

                            <div className="flex gap-2 pt-4">
                                <Button
                                    onClick={handleCreateCategory}
                                    disabled={isCreating || !newCategoryData.name.trim()}
                                    className="flex-1"
                                >
                                    {isCreating ? 'Creating...' : 'Create Category'}
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setShowCreateModal(false);
                                        setNewCategoryData({ name: '', description: '' });
                                    }}
                                    disabled={isCreating}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Edit Category Modal */}
            {showEditModal && selectedCategory && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <Card className="w-full max-w-md mx-4">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Edit className="h-5 w-5" />
                                Edit Category
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Update category information
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="editCategoryName">Category Name *</Label>
                                <Input
                                    id="editCategoryName"
                                    placeholder="Enter category name"
                                    value={newCategoryData.name}
                                    onChange={(e) => setNewCategoryData(prev => ({ ...prev, name: e.target.value }))}
                                />
                            </div>

                            <div>
                                <Label htmlFor="editCategoryDescription">Description</Label>
                                <Input
                                    id="editCategoryDescription"
                                    placeholder="Enter category description (optional)"
                                    value={newCategoryData.description}
                                    onChange={(e) => setNewCategoryData(prev => ({ ...prev, description: e.target.value }))}
                                />
                            </div>

                            <div className="flex gap-2 pt-4">
                                <Button
                                    onClick={handleUpdateCategory}
                                    disabled={isUpdating || !newCategoryData.name.trim()}
                                    className="flex-1"
                                >
                                    {isUpdating ? 'Updating...' : 'Update Category'}
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setShowEditModal(false);
                                        setSelectedCategory(null);
                                        setNewCategoryData({ name: '', description: '' });
                                    }}
                                    disabled={isUpdating}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default AdminCategoriesPage;

