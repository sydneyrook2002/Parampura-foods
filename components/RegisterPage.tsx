import { useState, useEffect } from 'react';
import { useApiCart } from '../contexts/ApiCartContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useToast } from './ui/use-toast';

const RegisterPage = () => {
  const { register, setPage, loading, error, clearError } = useApiCart();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    address: ''
  });

  // Clear any existing errors when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    const success = await register(
      formData.fullName,
      formData.email,
      formData.password,
      formData.address
    );
    
    if (success) {
      toast({
        title: "Registration Successful",
        description: "Welcome to Parampara Eats!",
      });
      
      // Redirect to home after successful registration
      setPage('home');
    } else {
      toast({
        title: "Registration Failed",
        description: error || "Failed to create account. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Create Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Input
                type="password"
                name="password"
                placeholder="Password (min 6 characters)"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>
            <div>
              <Input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <button
                onClick={() => setPage('login')}
                className="text-primary hover:underline"
              >
                Sign in
              </button>
            </p>
          </div>
          <div className="mt-4 text-center">
            <Button
              variant="outline"
              onClick={() => setPage('home')}
              className="w-full"
            >
              Continue as Guest
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;