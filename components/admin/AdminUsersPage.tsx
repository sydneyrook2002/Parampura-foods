import React, { useState, useEffect } from 'react';
import { useApiCart } from '../../contexts/ApiCartContext';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useToast } from '../ui/use-toast';
import { apiClient, UserDto, CreateUserDto } from '../../services/apiClient';
import { User, Shield, Trash2, Edit, UserPlus } from 'lucide-react';

const AdminUsersPage: React.FC = () => {
    const { user, setPage } = useApiCart();
    const { toast } = useToast();
    const [users, setUsers] = useState<UserDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState<UserDto | null>(null);
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newRole, setNewRole] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [newUserData, setNewUserData] = useState<CreateUserDto>({
        email: '',
        fullName: '',
        password: '',
        address: '',
        role: 'User'
    });

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            setLoading(true);
            const usersData = await apiClient.getUsers();
            setUsers(usersData);
        } catch (error) {
            console.error('Error loading users:', error);
            toast({
                title: "Error",
                description: "Failed to load users. Please try again.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateRole = async () => {
        if (!selectedUser || !newRole) return;

        try {
            setIsUpdating(true);
            await apiClient.updateUserRole(selectedUser.id, newRole);
            
            toast({
                title: "Success",
                description: "User role updated successfully!",
            });

            // Refresh users list
            await loadUsers();
            
            // Close modal
            setShowRoleModal(false);
            setSelectedUser(null);
            setNewRole('');
        } catch (error) {
            console.error('Error updating user role:', error);
            toast({
                title: "Error",
                description: "Failed to update user role. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsUpdating(false);
        }
    };

    const handleCreateUser = async () => {
        if (!newUserData.email || !newUserData.fullName || !newUserData.password) {
            toast({
                title: "Error",
                description: "Please fill in all required fields.",
                variant: "destructive",
            });
            return;
        }

        try {
            setIsCreating(true);
            await apiClient.createUser(newUserData);
            
            toast({
                title: "Success",
                description: "User created successfully!",
            });

            // Refresh users list
            await loadUsers();
            
            // Close modal and reset form
            setShowCreateModal(false);
            setNewUserData({
                email: '',
                fullName: '',
                password: '',
                address: '',
                role: 'User'
            });
        } catch (error) {
            console.error('Error creating user:', error);
            toast({
                title: "Error",
                description: "Failed to create user. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsCreating(false);
        }
    };

    const handleDeleteUser = async (userId: string) => {
        if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            return;
        }

        try {
            await apiClient.deleteUser(userId);
            
            toast({
                title: "Success",
                description: "User deleted successfully!",
            });

            // Refresh users list
            await loadUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
            toast({
                title: "Error",
                description: "Failed to delete user. Please try again.",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Manage Users</h1>
                    <nav className="text-sm text-muted-foreground">
                        <Button variant="link" className="p-0 h-auto" onClick={() => setPage('adminDashboard')}>
                            Admin
                        </Button>
                        <span className="mx-2">/</span>
                        <span>Manage Users</span>
                    </nav>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setPage('adminDashboard')}>
                        Back to Dashboard
                    </Button>
                    <Button variant="outline" onClick={loadUsers} disabled={loading}>
                        {loading ? 'Refreshing...' : 'Refresh'}
                    </Button>
                    <Button onClick={() => setShowCreateModal(true)}>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add New User
                    </Button>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-8">
                    <p>Loading users...</p>
                </div>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5" />
                            All Users ({users.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {users.length === 0 ? (
                            <div className="text-center py-8">
                                <User className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                                <h3 className="text-lg font-semibold mb-2">No Users Found</h3>
                                <p className="text-muted-foreground">No users are registered in the system.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="border-b">
                                        <tr>
                                            <th className="p-4 font-semibold">#</th>
                                            <th className="p-4 font-semibold">Name</th>
                                            <th className="p-4 font-semibold">Email</th>
                                            <th className="p-4 font-semibold">Role</th>
                                            <th className="p-4 font-semibold">Address</th>
                                            <th className="p-4 font-semibold">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((userData, index) => (
                                            <tr key={userData.id} className="border-b hover:bg-muted/50">
                                                <td className="p-4 font-semibold">#{index + 1}</td>
                                                <td className="p-4 font-semibold">{userData.fullName}</td>
                                                <td className="p-4">{userData.email}</td>
                                                <td className="p-4">
                                                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                                                        userData.role === 'Admin' 
                                                            ? 'bg-red-100 text-red-800' 
                                                            : 'bg-blue-100 text-blue-800'
                                                    }`}>
                                                        {userData.role === 'Admin' ? <Shield className="h-3 w-3" /> : <User className="h-3 w-3" />}
                                                        {userData.role}
                                                    </div>
                                                </td>
                                                <td className="p-4 max-w-xs truncate" title={userData.address}>
                                                    {userData.address || 'No address provided'}
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex gap-2">
                                                        <Button 
                                                            size="sm" 
                                                            variant="outline"
                                                            onClick={() => {
                                                                setSelectedUser(userData);
                                                                setNewRole(userData.role);
                                                                setShowRoleModal(true);
                                                            }}
                                                        >
                                                            <Edit className="h-4 w-4 mr-1" />
                                                            Edit Role
                                                        </Button>
                                                        {userData.id !== user?.id && (
                                                            <Button 
                                                                size="sm" 
                                                                variant="destructive"
                                                                onClick={() => handleDeleteUser(userData.id)}
                                                            >
                                                                <Trash2 className="h-4 w-4 mr-1" />
                                                                Delete
                                                            </Button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}

            {/* Role Update Modal */}
            {showRoleModal && selectedUser && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <Card className="w-full max-w-md mx-4">
                        <CardHeader>
                            <CardTitle>Update User Role</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                {selectedUser.fullName} ({selectedUser.email})
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="role">Role</Label>
                                <select
                                    id="role"
                                    className="w-full px-3 py-2 border border-border rounded-md"
                                    value={newRole}
                                    onChange={(e) => setNewRole(e.target.value)}
                                >
                                    <option value="User">User</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>

                            <div className="flex gap-2 pt-4">
                                <Button
                                    onClick={handleUpdateRole}
                                    disabled={isUpdating || !newRole || newRole === selectedUser.role}
                                    className="flex-1"
                                >
                                    {isUpdating ? 'Updating...' : 'Update Role'}
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setShowRoleModal(false);
                                        setSelectedUser(null);
                                        setNewRole('');
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

            {/* Create User Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <Card className="w-full max-w-md mx-4">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <UserPlus className="h-5 w-5" />
                                Create New User
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Add a new user to the system with specified role
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="fullName">Full Name *</Label>
                                <Input
                                    id="fullName"
                                    placeholder="Enter full name"
                                    value={newUserData.fullName}
                                    onChange={(e) => setNewUserData(prev => ({ ...prev, fullName: e.target.value }))}
                                />
                            </div>

                            <div>
                                <Label htmlFor="email">Email Address *</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter email address"
                                    value={newUserData.email}
                                    onChange={(e) => setNewUserData(prev => ({ ...prev, email: e.target.value }))}
                                />
                            </div>

                            <div>
                                <Label htmlFor="password">Password *</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter password (must meet security requirements)"
                                    value={newUserData.password}
                                    onChange={(e) => setNewUserData(prev => ({ ...prev, password: e.target.value }))}
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                    Password must contain uppercase, lowercase, number, and special character
                                </p>
                            </div>

                            <div>
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    id="address"
                                    placeholder="Enter address (optional)"
                                    value={newUserData.address}
                                    onChange={(e) => setNewUserData(prev => ({ ...prev, address: e.target.value }))}
                                />
                            </div>
                            
                            <div>
                                <Label htmlFor="createRole">Role</Label>
                                <select
                                    id="createRole"
                                    className="w-full px-3 py-2 border border-border rounded-md"
                                    value={newUserData.role}
                                    onChange={(e) => setNewUserData(prev => ({ ...prev, role: e.target.value }))}
                                >
                                    <option value="User">User</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>

                            <div className="flex gap-2 pt-4">
                                <Button
                                    onClick={handleCreateUser}
                                    disabled={isCreating || !newUserData.email || !newUserData.fullName || !newUserData.password}
                                    className="flex-1"
                                >
                                    {isCreating ? 'Creating...' : 'Create User'}
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setShowCreateModal(false);
                                        setNewUserData({
                                            email: '',
                                            fullName: '',
                                            password: '',
                                            address: '',
                                            role: 'User'
                                        });
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
        </div>
    );
};

export default AdminUsersPage;