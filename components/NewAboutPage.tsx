import { Leaf, Heart, Users, Award } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Parampara Eats</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're passionate about bringing you the freshest, highest-quality organic foods 
            while supporting sustainable farming practices and local communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="border-none shadow-lg">
            <CardContent className="p-8 text-center">
              <Leaf className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">100% Organic</h3>
              <p className="text-muted-foreground">
                All our products are certified organic, grown without harmful pesticides 
                or synthetic fertilizers, ensuring the purest taste and nutrition.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardContent className="p-8 text-center">
              <Heart className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Made with Love</h3>
              <p className="text-muted-foreground">
                Every product is carefully selected and handled with care, from farm to your table, 
                because we believe good food brings people together.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardContent className="p-8 text-center">
              <Users className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Community First</h3>
              <p className="text-muted-foreground">
                We work directly with local farmers and producers, supporting sustainable 
                agriculture and strengthening our community connections.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardContent className="p-8 text-center">
              <Award className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Quality Guaranteed</h3>
              <p className="text-muted-foreground">
                We stand behind every product we sell with our 100% satisfaction guarantee. 
                If you're not happy, we'll make it right.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-muted/50 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            To make organic, sustainable, and nutritious food accessible to everyone while 
            supporting local farmers and protecting our environment for future generations. 
            We believe that good food is a right, not a privilege, and we're committed to 
            making healthy eating both affordable and convenient.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

