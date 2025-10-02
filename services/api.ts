import { Product, BlogPost, Testimonial, Brand, SiteInfo, NavLink, WelcomeContent, FooterData, User, Order, Review, ProductCategory, AboutPageContent, WhyChooseUsItem, TeamMember, ContactPageContent, InfoPageContent } from '../types';

export const siteInfo: SiteInfo = {
  phone: '+91 73587 54678',
  email: 'contact@paramparaeats.com',
  address: '123 Green Valley, Organica, 45678',
  instagram: '@paramparaeats',
  whatsapp: '+91 73587 54678',
  socials: {
    facebook: '#',
    twitter: '#',
    pinterest: '#',
    linkedin: '#',
  },
};

export const navLinks: NavLink[] = [
  { id: 'home', text: 'Home', href: '#', page: 'home' },
  { 
    id: 'shop', 
    text: 'Shop', 
    href: '#',
    submenu: [
      { id: 'vegetables', text: 'Vegetables', href: '#' },
      { id: 'fruits', text: 'Fruits', href: '#' },
      { id: 'dairy', text: 'Dairy Products', href: '#' },
      { id: 'grains', text: 'Grains', href: '#' },
    ]
  },
  { id: 'about', text: 'About Us', href: '#', page: 'about' },
  { id: 'blog', text: 'Blog', href: '#', page: 'blog' },
  { id: 'contact', text: 'Contact Us', href: '#', page: 'contact' },
  { id: 'pages', text: 'Pages', href: '#' },
];

export const welcomeContent: WelcomeContent = {
  title: 'Welcome To Parampara Eats',
  subtitle: 'Healthy, Delicious, and Traditional',
  paragraph1: 'Welcome to Parampara Eats, your one-stop shop for the freshest, highest-quality organic products. We believe in the power of nature to nourish and heal, which is why we partner with local farmers who share our commitment to sustainable and ethical agriculture.',
  paragraph2: 'From crisp vegetables and juicy fruits to wholesome grains and pantry staples, every item in our store is carefully selected to ensure it meets our rigorous standards for taste, purity, and nutritional value.',
  imageUrl: 'https://picsum.photos/600/450?random=10',
};

export const aboutPageContent: AboutPageContent = {
    title: 'Our Story',
    subtitle: 'Rooted in Tradition, Grown with Passion',
    paragraph1: 'Parampara Eats was born from a simple idea: to bring the pure, wholesome goodness of nature directly to your table. Our journey began with a small family farm and a deep-rooted belief in sustainable agriculture. We wanted to create a community where people could trust the food they eat, knowing it was grown with care, respect for the environment, and a commitment to quality.',
    paragraph2: 'Today, we partner with a network of local organic farmers who share our values. Together, we work to cultivate the freshest produce, free from harmful pesticides and chemicals. From our fields to your family, we are dedicated to providing food that is not only delicious but also nourishing for the body and soul.',
    imageUrl: 'https://picsum.photos/800/600?random=70',
};

export const contactPageContent: ContactPageContent = {
    title: 'Get In Touch',
    subtitle: 'We would love to hear from you. Whether you have a question about our products, our farm partners, or anything else, our team is ready to answer all your questions.',
    address: '123 Green Valley, Organica, 45678',
    phone: '+91 73587 54678',
    email: 'contact@paramparaeats.com',
    businessHours: [
        { days: 'Monday - Friday', hours: '9:00 AM - 7:00 PM' },
        { days: 'Saturday', hours: '10:00 AM - 5:00 PM' },
        { days: 'Sunday', hours: 'Closed' }
    ],
    mapUrl: 'https://picsum.photos/800/450?random=98&grayscale',
};

export const whyChooseUsItems: WhyChooseUsItem[] = [
    { id: 1, icon: 'leaf', title: '100% Organic', description: 'All our products are certified organic, ensuring they are free from synthetic pesticides and fertilizers.' },
    { id: 2, icon: 'truck', title: 'Fresh from Farm', description: 'We source directly from local farms to bring you the freshest produce possible, often harvested the same day.' },
    { id: 3, icon: 'heart', title: 'Health Focused', description: 'We believe healthy eating is the foundation of a happy life, and our products reflect that commitment.' },
    { id: 4, icon: 'headset', title: 'Customer Support', description: 'Our team is dedicated to providing you with the best shopping experience and support.' },
];

export const teamMembers: TeamMember[] = [
    { id: 1, name: 'Aarav Patel', role: 'Founder & CEO', imageUrl: 'https://picsum.photos/400/400?random=81' },
    { id: 2, name: 'Priya Singh', role: 'Head of Operations', imageUrl: 'https://picsum.photos/400/400?random=82' },
    { id: 3, name: 'Rohan Mehta', role: 'Farm Relations Manager', imageUrl: 'https://picsum.photos/400/400?random=83' },
];


export const productCategories: ProductCategory[] = [
  {
    id: 'vegetables',
    name: 'Vegetables',
    imageUrl: 'https://picsum.photos/400/300?random=61',
  },
  {
    id: 'fruits',
    name: 'Fruits',
    imageUrl: 'https://picsum.photos/400/300?random=62',
  },
  {
    id: 'dairy',
    name: 'Dairy Products',
    imageUrl: 'https://picsum.photos/400/300?random=63',
  },
  {
    id: 'grains',
    name: 'Grains & Nuts',
    imageUrl: 'https://picsum.photos/400/300?random=64',
  },
];


export const allProducts: Product[] = [
  { id: 1, name: 'Organic Carrots', price: 2.99, imageUrls: ['https://picsum.photos/600/600?random=11', 'https://picsum.photos/600/600?random=111', 'https://picsum.photos/600/600?random=211'], isNew: true, isSale: false, rating: 5, categoryId: 'vegetables', description: 'Our organic carrots are grown in nutrient-rich soil, ensuring they are packed with flavor and vitamins. They are perfect for snacking, roasting, or juicing.', specification: [{ key: 'Origin', value: 'Local Farm' }, { key: 'Certification', value: 'USDA Organic' }, { key: 'Shelf Life', value: '7-10 days' }], sku: 'VEG-CAR-01', brand: 'FarmFresh', availability: 'In Stock' },
  { id: 2, name: 'Fresh Strawberries', price: 4.50, oldPrice: 5.00, imageUrls: ['https://picsum.photos/600/600?random=12', 'https://picsum.photos/600/600?random=112', 'https://picsum.photos/600/600?random=212'], isNew: false, isSale: true, rating: 4, categoryId: 'fruits', description: 'Sweet, juicy, and bursting with flavor, our fresh strawberries are picked at the peak of ripeness. Enjoy them on their own, in salads, or as a dessert topping.', specification: [{ key: 'Origin', value: 'California' }, { key: 'Grade', value: 'A+' }, { key: 'Shelf Life', value: '3-5 days' }], sku: 'FRU-STR-01', brand: 'BerryBest', availability: 'In Stock' },
  { id: 3, name: 'Green Apples', price: 3.49, imageUrls: ['https://picsum.photos/600/600?random=13', 'https://picsum.photos/600/600?random=113'], isNew: false, isSale: false, rating: 5, categoryId: 'fruits', description: 'Crisp, tart, and refreshing, these green apples are a healthy and delicious snack. They are also excellent for baking pies and tarts.', specification: [{ key: 'Variety', value: 'Granny Smith' }, { key: 'Origin', value: 'Washington' }, { key: 'Weight', value: 'Approx. 1 lb' }], sku: 'FRU-APP-02', brand: 'OrchardChoice', availability: 'In Stock' },
  { id: 4, name: 'Organic Broccoli', price: 2.75, imageUrls: ['https://picsum.photos/600/600?random=14', 'https://picsum.photos/600/600?random=114', 'https://picsum.photos/600/600?random=214'], isNew: false, isSale: false, rating: 4, categoryId: 'vegetables', description: 'A nutritional powerhouse, our organic broccoli is fresh and tender. It is great steamed, roasted, or added to stir-fries.', specification: [{ key: 'Origin', value: 'Local Farm' }, { key: 'Certification', value: 'USDA Organic' }, { key: 'Unit', value: '1 bunch' }], sku: 'VEG-BRO-01', brand: 'FarmFresh', availability: 'In Stock' },
  { id: 5, name: 'Heirloom Tomatoes', price: 3.99, imageUrls: ['https://picsum.photos/600/600?random=21', 'https://picsum.photos/600/600?random=121', 'https://picsum.photos/600/600?random=221'], isNew: true, isSale: false, rating: 5, categoryId: 'vegetables', description: 'Experience the rich, complex flavors of our heirloom tomatoes. Each variety offers a unique taste and color, perfect for salads and sauces. They are vine-ripened for maximum flavor.', specification: [{ key: 'Origin', value: 'Local Greenhouse' }, { key: 'Type', value: 'Assorted Varieties' }, { key: 'Weight', value: 'Approx. 1 lb' }], sku: 'VEG-TOM-03', brand: 'SunRipe', availability: 'In Stock', tags: ["Organic", "Vine-Ripened", "Non-GMO"], ingredients: "100% Organic Heirloom Tomatoes", nutrition: { calories: 22, protein: 1, carbs: 5, fat: 0.2 }, allergens: "None" },
  { id: 6, name: 'Avocado', price: 1.99, imageUrls: ['https://picsum.photos/600/600?random=22', 'https://picsum.photos/600/600?random=122', 'https://picsum.photos/600/600?random=222'], isNew: true, isSale: false, rating: 5, categoryId: 'fruits', description: 'Creamy and rich in healthy fats, our avocados are perfect for toast, guacamole, or adding to salads and smoothies.', specification: [{ key: 'Variety', value: 'Hass' }, { key: 'Origin', value: 'Mexico' }, { key: 'Unit', value: '1 large avocado' }], sku: 'FRU-AVO-01', brand: 'MexiGold', availability: 'In Stock' },
  { id: 7, name: 'Organic Kale', price: 2.49, oldPrice: 3.00, imageUrls: ['https://picsum.photos/600/600?random=23'], isNew: true, isSale: true, rating: 4, categoryId: 'vegetables', description: 'Packed with vitamins and minerals, our organic kale is a versatile leafy green. Use it in salads, smoothies, or make crispy kale chips.', specification: [{ key: 'Origin', value: 'Local Farm' }, { key: 'Certification', value: 'USDA Organic' }, { key: 'Unit', value: '1 bunch' }], sku: 'VEG-KAL-01', brand: 'FarmFresh', availability: 'Out of Stock' },
  { id: 8, name: 'Sweet Corn', price: 0.99, imageUrls: ['https://picsum.photos/600/600?random=24', 'https://picsum.photos/600/600?random=124'], isNew: true, isSale: false, rating: 4, categoryId: 'vegetables', description: 'Enjoy the sweet taste of summer with our fresh sweet corn. Perfect for grilling, boiling, or roasting.', specification: [{ key: 'Origin', value: 'Local Farm' }, { key: 'Type', value: 'Non-GMO' }, { key: 'Unit', value: '1 ear' }], sku: 'VEG-COR-01', brand: 'SummerSweet', availability: 'In Stock' },
  { id: 9, name: 'Organic Milk', price: 3.20, imageUrls: ['https://picsum.photos/600/600?random=25', 'https://picsum.photos/600/600?random=125'], isNew: false, isSale: false, rating: 5, categoryId: 'dairy', description: 'Fresh and wholesome organic milk from grass-fed cows. It is rich in calcium and vitamin D.', specification: [{ key: 'Type', value: 'Whole Milk' }, { key: 'Size', value: 'Half Gallon' }, { key: 'Certification', value: 'USDA Organic' }], sku: 'DAI-MIL-01', brand: 'GreenPastures', availability: 'In Stock' },
  { id: 10, name: 'Cheddar Cheese', price: 5.50, imageUrls: ['https://picsum.photos/600/600?random=26'], isNew: false, isSale: true, oldPrice: 6.00, rating: 4, categoryId: 'dairy', description: 'A sharp and flavorful cheddar cheese block, aged for a minimum of 9 months. Perfect for slicing, shredding, or melting.', specification: [{ key: 'Type', value: 'Sharp Cheddar' }, { key: 'Weight', value: '8 oz' }, { key: 'Origin', value: 'Vermont' }], sku: 'DAI-CHE-02', brand: 'Artisan Dairy', availability: 'In Stock' },
  { id: 11, name: 'Whole Almonds', price: 8.99, imageUrls: ['https://picsum.photos/600/600?random=27', 'https://picsum.photos/600/600?random=127'], isNew: true, isSale: false, rating: 5, categoryId: 'grains', description: 'Raw, unsalted whole almonds are a perfect healthy snack. They are a great source of protein, fiber, and healthy fats.', specification: [{ key: 'Type', value: 'Raw, Unsalted' }, { key: 'Weight', value: '1 lb bag' }, { key: 'Origin', value: 'California' }], sku: 'GRA-ALM-01', brand: 'NutHouse', availability: 'In Stock' },
  { id: 12, name: 'Organic Spinach', price: 2.15, imageUrls: ['https://picsum.photos/600/600?random=28', 'https://picsum.photos/600/600?random=128'], isNew: false, isSale: false, rating: 4, categoryId: 'vegetables', description: 'Tender and flavorful organic baby spinach. It is pre-washed and ready to use in salads, smoothies, or sautéed dishes.', specification: [{ key: 'Origin', value: 'Local Farm' }, { key: 'Certification', value: 'USDA Organic' }, { key: 'Weight', value: '5 oz container' }], sku: 'VEG-SPI-01', brand: 'FarmFresh', availability: 'In Stock' },
];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    imageUrl: 'https://picsum.photos/600/400?random=31',
    date: '25 JUNE 2024',
    title: 'The Benefits of a Plant-Based Diet',
    excerpt: 'Discover how switching to a plant-based diet can improve your health, the environment, and your overall well-being...',
    author: 'Jane Doe',
    content: 'A plant-based diet, which focuses on foods primarily from plants, is becoming increasingly popular. This includes not only fruits and vegetables, but also nuts, seeds, oils, whole grains, legumes, and beans. For many, this is more than just a diet; it\'s a lifestyle choice with profound benefits for personal health and the planet. Research has shown that plant-based diets can lower the risk of heart disease, type 2 diabetes, certain types of cancer, and obesity. They are typically lower in saturated fat and cholesterol, and higher in fiber, vitamins, and minerals. Beyond health, adopting a plant-based diet is one of the most significant ways an individual can reduce their environmental footprint. It requires less land, water, and energy compared to a diet rich in animal products. Start small by incorporating one plant-based meal a day, or trying "Meatless Mondays". Every step towards a more plant-rich diet is a step towards a healthier you and a healthier planet.'
  },
  {
    id: 2,
    imageUrl: 'https://picsum.photos/600/400?random=32',
    date: '18 JUNE 2024',
    title: 'Top 10 Superfoods for a Healthy Lifestyle',
    excerpt: 'Incorporate these nutrient-packed superfoods into your meals to boost your energy and support your immune system...',
    author: 'John Smith',
    content: 'The term "superfood" is often used to describe foods with an exceptionally high nutrient density. While there\'s no official scientific definition, these foods are packed with vitamins, minerals, and antioxidants that are essential for good health. Here are our top 10 picks to incorporate into your diet: 1. **Berries**: Rich in antioxidants. 2. **Leafy Greens**: Like spinach and kale, full of vitamins. 3. **Salmon**: High in omega-3 fatty acids. 4. **Nuts and Seeds**: Great source of healthy fats and protein. 5. **Avocado**: Packed with monounsaturated fats. 6. **Legumes**: Excellent source of fiber and protein. 7. **Garlic**: Known for its immune-boosting properties. 8. **Green Tea**: Loaded with antioxidants. 9. **Turmeric**: A powerful anti-inflammatory spice. 10. **Dark Chocolate**: In moderation, a great source of antioxidants. Adding these to your regular meals can significantly enhance your nutritional intake.'
  },
  {
    id: 3,
    imageUrl: 'https://picsum.photos/600/400?random=33',
    date: '12 JUNE 2024',
    title: 'A Guide to Urban Gardening',
    excerpt: 'No backyard? No problem! Learn how to grow your own fresh herbs and vegetables in small spaces like balconies and windowsills...',
    author: 'Emily White',
    content: 'Urban gardening is the practice of growing plants in an urban environment. It\'s a fantastic way to produce your own fresh food, even if you don\'t have a traditional garden space. The key is to make the most of what you have. **Container Gardening**: Almost anything can be grown in a container, from herbs and salad greens to tomatoes and peppers. Make sure your pots have good drainage. **Vertical Gardening**: If you\'re short on floor space, think vertically! Wall-mounted planters, hanging baskets, and tiered shelving can maximize your growing area. **Sunlight**: Most vegetables and herbs need at least 6 hours of direct sunlight per day. Observe the light patterns on your balcony or windowsill before you start. **Start Simple**: If you\'re a beginner, start with easy-to-grow plants like lettuce, radishes, basil, mint, or cherry tomatoes. Urban gardening is not just about food; it\'s about connecting with nature and enjoying the satisfaction of eating something you\'ve grown yourself.'
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: 'The quality of the produce from Parampara Eats is unmatched. Everything is so fresh and flavorful. My family has never eaten healthier!',
    author: 'Sarah Johnson',
    role: 'Happy Customer',
    imageUrl: 'https://picsum.photos/100/100?random=41',
  },
  {
    id: 2,
    quote: 'I love the convenience and the wide selection of organic products. Their customer service is fantastic too. Highly recommended!',
    author: 'Michael Chen',
    role: 'Regular Shopper',
    imageUrl: 'https://picsum.photos/100/100?random=42',
  },
  {
    id: 3,
    quote: 'As a nutritionist, I am very particular about where I source my food. Parampara Eats meets all my criteria for quality, sustainability, and taste.',
    author: 'Dr. Emily Carter',
    role: 'Nutritionist',
    imageUrl: 'https://picsum.photos/100/100?random=43',
  },
];


export const brands: Brand[] = [
  { id: 1, name: 'Organic Valley', imageUrl: 'https://picsum.photos/200/100?random=51&grayscale' },
  { id: 2, name: 'Nature\'s Path', imageUrl: 'https://picsum.photos/200/100?random=52&grayscale' },
  { id: 3, name: 'Earthbound Farm', imageUrl: 'https://picsum.photos/200/100?random=53&grayscale' },
  { id: 4, name: 'Amy\'s Kitchen', imageUrl: 'https://picsum.photos/200/100?random=54&grayscale' },
  { id: 5, name: 'Stonyfield Organic', imageUrl: 'https://picsum.photos/200/100?random=55&grayscale' },
  { id: 6, name: 'Clif Bar', imageUrl: 'https://picsum.photos/200/100?random=56&grayscale' },
];

export const infoPageContents: InfoPageContent[] = [
    {
        id: 'delivery-information',
        title: 'Delivery Information',
        content: '<p>We are committed to bringing fresh organic produce right to your doorstep. We currently offer delivery within a 50-mile radius of our main distribution center in Organica. Deliveries are made between 9 AM and 5 PM, Monday through Saturday. Standard delivery is free for orders over $50. For orders under $50, a flat rate of $5.99 will be applied. We also offer same-day delivery for a small additional fee if the order is placed before 11 AM. All our products are carefully packaged in insulated, eco-friendly containers to ensure they arrive fresh and in perfect condition. You will receive a notification via email and SMS once your order has been dispatched and another upon delivery.</p>'
    },
    {
        id: 'privacy-policy',
        title: 'Privacy Policy',
        content: '<p>Your privacy is of utmost importance to us. This policy outlines how we collect, use, and protect your personal information. We collect information you provide during registration, checkout, and communication with us, such as your name, email, address, and phone number. This information is used to process your orders, personalize your shopping experience, and communicate with you about our products and promotions. We do not sell or rent your personal information to third parties. We use industry-standard security measures to protect your data from unauthorized access. By using our website, you consent to the terms of this privacy policy.</p>'
    },
    {
        id: 'terms-conditions',
        title: 'Terms & Conditions',
        content: '<p>Welcome to Parampara Eats. By accessing or using our website, you agree to be bound by these terms and conditions. All content on this site, including text, graphics, logos, and images, is the property of Parampara Eats and is protected by copyright laws. You may not use any of our content without our express written permission. We strive to provide accurate information about our products, but we do not warrant that product descriptions or other content is error-free. Prices and availability are subject to change without notice. We reserve the right to refuse service, terminate accounts, or cancel orders at our discretion. These terms are governed by the laws of the state of Organica.</p>'
    },
];


export const footerData: FooterData = {
  about: {
    title: 'About Parampara Eats',
    text: 'Your one-stop shop for the freshest, highest-quality organic products. We believe in the power of nature to nourish and heal.'
  },
  informationLinks: [
    { text: 'About Us', href: '#', page: 'about' },
    { text: 'Delivery Information', href: 'delivery-information', page: 'infoPage' },
    { text: 'Privacy Policy', href: 'privacy-policy', page: 'infoPage' },
    { text: 'Terms & Conditions', href: 'terms-conditions', page: 'infoPage' },
    { text: 'Contact Us', href: '#', page: 'contact' },
  ],
  accountLinks: [
    { text: 'My Account', href: '#', page: 'account' },
    { text: 'Order History', href: '#' }, // This is part of account page
    { text: 'Wish List', href: '#', page: 'wishlist' },
    { text: 'Newsletter', href: '#' },
    { text: 'Returns', href: '#' },
  ],
  newsletter: {
    title: 'Join Our Newsletter',
    text: 'Get E-mail updates about our latest shop and special offers.'
  }
};

// Dummy user database for simulation
export const initialUsers: User[] = [
    { id: 1, name: 'Admin User', email: 'admin@example.com', password: 'admin', role: 'admin' },
    { id: 2, name: 'John Doe', email: 'john@example.com', password: 'password', role: 'customer' }
];

// Dummy order database for analytics simulation
const now = new Date();
export const initialOrders: Order[] = [
    {
        id: 1001,
        userId: 2,
        userName: 'John Doe',
        items: [ { ...allProducts[0], quantity: 2 }, { ...allProducts[2], quantity: 1 } ],
        total: (2.99 * 2) + 3.49,
        date: new Date(now.getFullYear(), now.getMonth(), 2),
        status: 'Completed',
    },
    {
        id: 1002,
        userId: 2,
        userName: 'John Doe',
        items: [ { ...allProducts[1], quantity: 3 } ],
        total: 4.50 * 3,
        date: new Date(now.getFullYear(), now.getMonth(), 5),
        status: 'Shipped',
    },
     {
        id: 1003,
        userId: 2,
        userName: 'John Doe',
        items: [ { ...allProducts[4], quantity: 1 }, { ...allProducts[5], quantity: 5 } ],
        total: 3.99 + (1.99 * 5),
        date: new Date(now.getFullYear(), now.getMonth() - 1, 15), // Last month
        status: 'Completed',
    },
    {
        id: 1004,
        userId: 2,
        userName: 'John Doe',
        items: [ { ...allProducts[6], quantity: 2 }, { ...allProducts[7], quantity: 10 } ],
        total: (2.49 * 2) + (0.99 * 10),
        date: new Date(now.getFullYear(), now.getMonth() - 1, 28), // Last month
        status: 'Completed',
    },
    {
        id: 1005,
        userId: 2,
        userName: 'John Doe',
        items: [ { ...allProducts[0], quantity: 10 } ], // Carrots are popular
        total: 2.99 * 10,
        date: new Date(now.getFullYear() - 2, 10), // Two months ago
        status: 'Pending',
    },
    {
        id: 1006,
        userId: 2,
        userName: 'John Doe',
        items: [ { ...allProducts[3], quantity: 4 } ],
        total: 2.75 * 4,
        date: new Date(now.getFullYear() - 1, now.getMonth(), 10), // Last year
        status: 'Completed',
    }
];

// Dummy reviews database for simulation
export const initialReviews: Review[] = [
    {
        id: 1,
        productId: 1, // Organic Carrots
        userId: 2, // John Doe
        userName: 'John Doe',
        rating: 5,
        comment: 'These carrots are the best! So fresh and crunchy. My kids love them.',
        date: new Date(new Date().setDate(new Date().getDate() - 5)),
    },
    {
        id: 2,
        productId: 2, // Fresh Strawberries
        userId: 2,
        userName: 'John Doe',
        rating: 4,
        comment: 'Very sweet and juicy, but a few were a little bruised on arrival.',
        date: new Date(new Date().setDate(new Date().getDate() - 10)),
    },
    {
        id: 3,
        productId: 1, // Organic Carrots
        userId: 1, // Admin User (for variety)
        userName: 'Admin User',
        rating: 4,
        comment: 'Pretty good, a solid choice for organic carrots.',
        date: new Date(new Date().setDate(new Date().getDate() - 2)),
    },
    {
      id: 4,
      productId: 5, // Heirloom Tomatoes
      userId: 2,
      userName: "John Doe",
      rating: 5,
      comment: "Best tomatoes I've had outside of Italy! The flavor was perfectly balanced and incredibly fresh.",
      date: new Date(new Date().setDate(new Date().getDate() - 15))
    },
    {
      id: 5,
      productId: 5, // Heirloom Tomatoes
      userId: 1,
      userName: "Admin User",
      rating: 4,
      comment: "Delicious flavor, though a few were a bit bruised on arrival. Will definitely order again.",
      date: new Date(new Date().setDate(new Date().getDate() - 22))
    }
];
