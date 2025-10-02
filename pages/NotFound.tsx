import { Button } from '../components/ui/button';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Button onClick={() => window.location.href = '/'}>
          Go Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

