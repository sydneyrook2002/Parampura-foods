import { useState, useEffect } from 'react';
import { useApiCart } from '../contexts/ApiCartContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useToast } from './ui/use-toast';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Mail, Lock, Phone, Smartphone, User, MapPin, ArrowLeft, Loader2 } from 'lucide-react';

// Google OAuth Component for Registration
const GoogleRegisterButton = ({ onGoogleRegister }: { onGoogleRegister: (googleData: any) => void }) => {
  const handleGoogleRegister = () => {
    // In a real implementation, you would use Google's OAuth library
    // For now, we'll simulate the Google OAuth flow
    const mockGoogleData = {
      googleId: 'mock_google_id_123',
      email: 'newuser@gmail.com',
      name: 'New Google User',
      picture: 'https://via.placeholder.com/150'
    };
    
    onGoogleRegister(mockGoogleData);
  };

  return (
    <Button
      variant="outline"
      className="w-full flex items-center gap-3 h-12 text-base font-medium"
      onClick={handleGoogleRegister}
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      Sign up with Google
    </Button>
  );
};

// Phone Registration Component
const PhoneRegisterForm = ({ onPhoneRegister }: { onPhoneRegister: (phoneNumber: string, fullName: string) => void }) => {
  const { sendPhoneVerificationCode, verifyPhoneCode, loading } = useApiCart();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [step, setStep] = useState<'details' | 'verify'>('details');
  const [countdown, setCountdown] = useState(0);

  const handleSendCode = async () => {
    if (!phoneNumber.trim() || !fullName.trim()) return;
    
    const response = await sendPhoneVerificationCode(phoneNumber);
    if (response) {
      setSessionId(response.sessionId);
      setStep('verify');
      setCountdown(60);
      
      // Start countdown
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode.trim() || !sessionId) return;
    
    const success = await verifyPhoneCode(phoneNumber, verificationCode, sessionId);
    if (success) {
      onPhoneRegister(phoneNumber, fullName);
    }
  };

  const handleResendCode = () => {
    if (countdown === 0) {
      handleSendCode();
    }
  };

  if (step === 'details') {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Button 
          onClick={handleSendCode} 
          disabled={loading || !phoneNumber.trim() || !fullName.trim()}
          className="w-full"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Smartphone className="w-4 h-4" />}
          Send Verification Code
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-sm text-gray-600">
          We sent a verification code to <strong>{phoneNumber}</strong>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Name: {fullName}
        </p>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Verification Code</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Enter 6-digit code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className="pl-10"
            maxLength={6}
          />
        </div>
      </div>
      
      <Button 
        onClick={handleVerifyCode} 
        disabled={loading || verificationCode.length !== 6}
        className="w-full"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Account'}
      </Button>
      
      <div className="text-center">
        {countdown > 0 ? (
          <p className="text-sm text-gray-500">
            Resend code in {countdown}s
          </p>
        ) : (
          <Button variant="link" onClick={handleResendCode} className="text-sm">
            Resend Code
          </Button>
        )}
      </div>
      
      <Button 
        variant="ghost" 
        onClick={() => setStep('details')}
        className="w-full"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Details
      </Button>
    </div>
  );
};

const EnhancedRegisterPage = () => {
  const { register, googleLogin, setPage, loading, error, clearError } = useApiCart();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    address: ''
  });
  const [activeTab, setActiveTab] = useState('email');

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

  const handleEmailRegister = async (e: React.FormEvent) => {
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
      formData.address || undefined
    );
    
    if (success) {
      toast({
        title: "Registration Successful",
        description: "Welcome to Parampara Foods!",
      });
      
      setTimeout(() => {
        setPage('home');
      }, 100);
    } else {
      toast({
        title: "Registration Failed",
        description: error || "Failed to create account",
        variant: "destructive",
      });
    }
  };

  const handleGoogleRegister = async (googleData: any) => {
    const success = await googleLogin(googleData);
    if (success) {
      toast({
        title: "Registration Successful",
        description: "Welcome to Parampara Foods! You've been signed up with Google.",
      });
      
      setTimeout(() => {
        setPage('home');
      }, 100);
    } else {
      toast({
        title: "Google Registration Failed",
        description: error || "Failed to create account with Google",
        variant: "destructive",
      });
    }
  };

  const handlePhoneRegister = async (phoneNumber: string, fullName: string) => {
    toast({
      title: "Registration Successful",
      description: "Welcome to Parampara Foods! You've been signed up with your phone.",
    });
    
    setTimeout(() => {
      setPage('home');
    }, 100);
  };

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">Create Account</CardTitle>
          <p className="text-gray-600 mt-2">Join Parampara Foods today</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Sign In Link - Moved to top for mobile convenience */}
          <div className="text-center pb-2">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Button 
                variant="link" 
                onClick={() => setPage('login')}
                className="p-0 h-auto text-green-600 hover:text-green-700"
              >
                Sign in here
              </Button>
            </p>
          </div>

          {/* Google OAuth Button */}
          <GoogleRegisterButton onGoogleRegister={handleGoogleRegister} />
          
          <div className="relative">
            <Separator />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-white px-4 text-sm text-gray-500">or sign up with</span>
            </div>
          </div>

          {/* Registration Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </TabsTrigger>
              <TabsTrigger value="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="email" className="space-y-4 mt-6">
              <form onSubmit={handleEmailRegister} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      name="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="password"
                      name="password"
                      placeholder="Create a password (min 6 characters)"
                      value={formData.password}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Address (Optional)</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      name="address"
                      placeholder="Enter your address (optional)"
                      value={formData.address}
                      onChange={handleChange}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Account'}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="phone" className="space-y-4 mt-6">
              <PhoneRegisterForm onPhoneRegister={handlePhoneRegister} />
            </TabsContent>
          </Tabs>

          {/* Error Display */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedRegisterPage;
