import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const LoginPage = () => {
  const { login, setPage } = useCart();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <button
                onClick={() => setPage('register')}
                className="text-primary hover:underline"
              >
                Sign up
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

export default LoginPage;

