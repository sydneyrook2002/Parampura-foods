import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { ArrowLeft, Plus, Edit, Trash2, Users, Shield, CheckCircle, XCircle } from 'lucide-react';
import { useApiCart } from '../../contexts/ApiCartContext';
import { apiClient, RoleDto, CreateRoleDto, UpdateRoleDto } from '../../services/apiClient';

const AdminRolesPage: React.FC = () => {
  const { setPage } = useApiCart();
  const [roles, setRoles] = useState<RoleDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedRole, setSelectedRole] = useState<RoleDto | null>(null);
  const [formData, setFormData] = useState<CreateRoleDto>({
    name: '',
    description: '',
    isActive: true
  });

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const data = await apiClient.getRoles();
      setRoles(data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.createRole(formData);
      setShowCreateForm(false);
      setFormData({ name: '', description: '', isActive: true });
      fetchRoles();
    } catch (error) {
      console.error('Error creating role:', error);
      alert('Failed to create role');
    }
  };

  const handleEditRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;

    try {
      await apiClient.updateRole(selectedRole.roleId, formData);
      setShowEditForm(false);
      setSelectedRole(null);
      setFormData({ name: '', description: '', isActive: true });
      fetchRoles();
    } catch (error) {
      console.error('Error updating role:', error);
      alert('Failed to update role');
    }
  };

  const handleDeleteRole = async (roleId: number) => {
    if (!confirm('Are you sure you want to delete this role? This action cannot be undone.')) {
      return;
    }

    try {
      await apiClient.deleteRole(roleId);
      fetchRoles();
    } catch (error) {
      console.error('Error deleting role:', error);
      alert('Failed to delete role');
    }
  };

  const openEditForm = (role: RoleDto) => {
    setSelectedRole(role);
    setFormData({
      name: role.name,
      description: role.description || '',
      isActive: role.isActive
    });
    setShowEditForm(true);
  };

  const getRoleIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'admin':
        return <Shield className="h-4 w-4" />;
      case 'manager':
        return <Users className="h-4 w-4" />;
      case 'staff':
        return <Users className="h-4 w-4" />;
      case 'user':
        return <Users className="h-4 w-4" />;
      case 'guest':
        return <Users className="h-4 w-4" />;
      default:
        return <Shield className="h-4 w-4" />;
    }
  };

  const getRoleColor = (name: string) => {
    switch (name.toLowerCase()) {
      case 'admin':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'manager':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'staff':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'user':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'guest':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-3 sm:px-4 py-4 sm:py-6 lg:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading roles...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-3 sm:px-4 py-4 sm:py-6 lg:py-12">
      <div className="max-w-7xl mx-auto">
        {/* Back Button - Mobile Only */}
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

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 lg:mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Manage Roles
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Create and manage user roles and permissions
            </p>
          </div>
          <Button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center gap-2 flex-1 sm:flex-none"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Role</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>

        {/* Create Role Form */}
        {showCreateForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Create New Role
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateRole} className="space-y-4">
                <div>
                  <Label htmlFor="name">Role Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter role name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter role description (optional)"
                    rows={3}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor="isActive">Active</Label>
                </div>
                <div className="flex gap-2">
                  <Button type="submit">Create Role</Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowCreateForm(false);
                      setFormData({ name: '', description: '', isActive: true });
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Edit Role Form */}
        {showEditForm && selectedRole && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Edit className="h-5 w-5" />
                Edit Role: {selectedRole.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEditRole} className="space-y-4">
                <div>
                  <Label htmlFor="edit-name">Role Name *</Label>
                  <Input
                    id="edit-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter role name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter role description (optional)"
                    rows={3}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="edit-isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor="edit-isActive">Active</Label>
                </div>
                <div className="flex gap-2">
                  <Button type="submit">Update Role</Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowEditForm(false);
                      setSelectedRole(null);
                      setFormData({ name: '', description: '', isActive: true });
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Roles List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">
              All Roles ({roles.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {roles.length === 0 ? (
              <div className="text-center py-8">
                <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No roles found</h3>
                <p className="text-gray-600 mb-4">Get started by creating your first role.</p>
                <Button onClick={() => setShowCreateForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Role
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {roles.map((role) => (
                  <div
                    key={role.roleId}
                    className="border rounded-lg p-3 sm:p-4 bg-white hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getRoleIcon(role.name)}
                          <h3 className="font-semibold text-gray-900">{role.name}</h3>
                          <Badge className={`${getRoleColor(role.name)} text-xs`}>
                            {role.isActive ? (
                              <><CheckCircle className="h-3 w-3 mr-1" />Active</>
                            ) : (
                              <><XCircle className="h-3 w-3 mr-1" />Inactive</>
                            )}
                          </Badge>
                        </div>
                        {role.description && (
                          <p className="text-sm text-gray-600 mb-2">{role.description}</p>
                        )}
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {role.userCount} users
                          </span>
                          <span>Created: {new Date(role.createdAt).toLocaleDateString()}</span>
                          {role.updatedAt && (
                            <span>Updated: {new Date(role.updatedAt).toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditForm(role)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteRole(role.roleId)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                          disabled={role.userCount > 0}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminRolesPage;
