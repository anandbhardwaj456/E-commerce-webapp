import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';

dotenv.config();

// Dummy products data with realistic information
const dummyProducts = [
  // Electronics
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life. Perfect for music lovers and professionals.',
    price: 2999,
    category: 'Electronics',
    brand: 'SoundMax',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'],
    stock: 50,
    rating: 4.5,
    numReviews: 128,
    isActive: true,
  },
  {
    name: 'Smart Watch Pro',
    description: 'Advanced fitness tracking smartwatch with heart rate monitor, GPS, and 7-day battery life. Waterproof design.',
    price: 12999,
    category: 'Electronics',
    brand: 'TechWear',
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'],
    stock: 30,
    rating: 4.7,
    numReviews: 89,
    isActive: true,
  },
  {
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with precision tracking and long battery life. Perfect for office and gaming.',
    price: 899,
    category: 'Electronics',
    brand: 'ClickTech',
    images: ['https://images.unsplash.com/photo-1527814050087-3793815479db?w=500'],
    stock: 100,
    rating: 4.3,
    numReviews: 256,
    isActive: true,
  },
  {
    name: 'USB-C Fast Charger',
    description: '60W fast charging adapter with USB-C port. Compatible with all modern devices.',
    price: 1299,
    category: 'Electronics',
    brand: 'PowerUp',
    images: ['https://images.unsplash.com/photo-1583863788433-e0c4900b5c37?w=500'],
    stock: 75,
    rating: 4.4,
    numReviews: 192,
    isActive: true,
  },
  {
    name: 'Portable Bluetooth Speaker',
    description: 'Waterproof portable speaker with 360-degree sound and 20-hour battery. Perfect for outdoor adventures.',
    price: 2499,
    category: 'Electronics',
    brand: 'SoundMax',
    images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500'],
    stock: 40,
    rating: 4.6,
    numReviews: 145,
    isActive: true,
  },

  // Clothing
  {
    name: 'Cotton T-Shirt',
    description: '100% organic cotton t-shirt. Soft, breathable, and comfortable. Available in multiple colors.',
    price: 599,
    category: 'Clothing',
    brand: 'EcoWear',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'],
    stock: 200,
    rating: 4.2,
    numReviews: 312,
    isActive: true,
  },
  {
    name: 'Denim Jeans',
    description: 'Classic fit denim jeans with stretch comfort. Durable and stylish for everyday wear.',
    price: 1999,
    category: 'Clothing',
    brand: 'DenimCo',
    images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=500'],
    stock: 150,
    rating: 4.5,
    numReviews: 278,
    isActive: true,
  },
  {
    name: 'Winter Jacket',
    description: 'Warm and waterproof winter jacket with insulated lining. Perfect for cold weather.',
    price: 3999,
    category: 'Clothing',
    brand: 'WarmWear',
    images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500'],
    stock: 60,
    rating: 4.7,
    numReviews: 134,
    isActive: true,
  },
  {
    name: 'Running Shoes',
    description: 'Lightweight running shoes with cushioned sole and breathable mesh upper. Perfect for jogging and workouts.',
    price: 3499,
    category: 'Clothing',
    brand: 'RunFast',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'],
    stock: 80,
    rating: 4.6,
    numReviews: 201,
    isActive: true,
  },
  {
    name: 'Casual Sneakers',
    description: 'Comfortable everyday sneakers with modern design. Perfect for casual outings.',
    price: 2499,
    category: 'Clothing',
    brand: 'StepEasy',
    images: ['https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500'],
    stock: 120,
    rating: 4.4,
    numReviews: 189,
    isActive: true,
  },

  // Home & Kitchen
  {
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with thermal carafe. Makes 12 cups of perfect coffee every time.',
    price: 3499,
    category: 'Home & Kitchen',
    brand: 'BrewMaster',
    images: ['https://images.unsplash.com/photo-1517668808825-fdf3c0e0b6e3?w=500'],
    stock: 45,
    rating: 4.5,
    numReviews: 167,
    isActive: true,
  },
  {
    name: 'Non-Stick Cookware Set',
    description: '10-piece non-stick cookware set with heat-resistant handles. Perfect for everyday cooking.',
    price: 4999,
    category: 'Home & Kitchen',
    brand: 'CookPro',
    images: ['https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500'],
    stock: 35,
    rating: 4.6,
    numReviews: 98,
    isActive: true,
  },
  {
    name: 'Air Fryer',
    description: '5.5L capacity air fryer with digital display. Healthy cooking with less oil.',
    price: 5999,
    category: 'Home & Kitchen',
    brand: 'FrySmart',
    images: ['https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=500'],
    stock: 25,
    rating: 4.7,
    numReviews: 223,
    isActive: true,
  },
  {
    name: 'Bedding Set',
    description: 'Premium cotton bedding set with pillowcases and duvet cover. Soft and comfortable.',
    price: 2999,
    category: 'Home & Kitchen',
    brand: 'SleepWell',
    images: ['https://images.unsplash.com/photo-1586105251261-72a756497a11?w=500'],
    stock: 55,
    rating: 4.4,
    numReviews: 145,
    isActive: true,
  },
  {
    name: 'Vacuum Cleaner',
    description: 'Cordless vacuum cleaner with powerful suction and long battery life. Lightweight and easy to use.',
    price: 8999,
    category: 'Home & Kitchen',
    brand: 'CleanPro',
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500'],
    stock: 30,
    rating: 4.5,
    numReviews: 112,
    isActive: true,
  },

  // Books
  {
    name: 'The Complete Guide to Web Development',
    description: 'Comprehensive guide covering HTML, CSS, JavaScript, and modern frameworks. Perfect for beginners and professionals.',
    price: 899,
    category: 'Books',
    brand: 'TechBooks',
    images: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500'],
    stock: 100,
    rating: 4.6,
    numReviews: 89,
    isActive: true,
  },
  {
    name: 'JavaScript: The Definitive Guide',
    description: 'Master JavaScript with this comprehensive guide. Covers ES6+ features and modern development practices.',
    price: 1299,
    category: 'Books',
    brand: 'TechBooks',
    images: ['https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500'],
    stock: 75,
    rating: 4.8,
    numReviews: 156,
    isActive: true,
  },
  {
    name: 'React Development Handbook',
    description: 'Learn React from scratch with practical examples and real-world projects. Updated for latest version.',
    price: 1099,
    category: 'Books',
    brand: 'TechBooks',
    images: ['https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500'],
    stock: 60,
    rating: 4.7,
    numReviews: 134,
    isActive: true,
  },

  // Sports & Outdoors
  {
    name: 'Yoga Mat',
    description: 'Premium non-slip yoga mat with carrying strap. Thick and comfortable for all yoga practices.',
    price: 1299,
    category: 'Sports & Outdoors',
    brand: 'FitLife',
    images: ['https://images.unsplash.com/photo-1601925260368-ae2f83d1366f?w=500'],
    stock: 90,
    rating: 4.5,
    numReviews: 201,
    isActive: true,
  },
  {
    name: 'Dumbbell Set',
    description: 'Adjustable dumbbell set with weights from 5kg to 25kg. Perfect for home workouts.',
    price: 4999,
    category: 'Sports & Outdoors',
    brand: 'FitLife',
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500'],
    stock: 40,
    rating: 4.6,
    numReviews: 78,
    isActive: true,
  },
  {
    name: 'Water Bottle',
    description: 'Insulated stainless steel water bottle. Keeps drinks cold for 24 hours or hot for 12 hours.',
    price: 799,
    category: 'Sports & Outdoors',
    brand: 'Hydrate',
    images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500'],
    stock: 150,
    rating: 4.4,
    numReviews: 267,
    isActive: true,
  },
  {
    name: 'Backpack',
    description: 'Durable hiking backpack with multiple compartments and water-resistant material. Perfect for outdoor adventures.',
    price: 2999,
    category: 'Sports & Outdoors',
    brand: 'Adventure',
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'],
    stock: 65,
    rating: 4.5,
    numReviews: 123,
    isActive: true,
  },

  // Beauty & Personal Care
  {
    name: 'Face Moisturizer',
    description: 'Hydrating face moisturizer with SPF 30. Suitable for all skin types. Keeps skin soft and protected.',
    price: 899,
    category: 'Beauty & Personal Care',
    brand: 'Glow',
    images: ['https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500'],
    stock: 120,
    rating: 4.5,
    numReviews: 189,
    isActive: true,
  },
  {
    name: 'Shampoo & Conditioner Set',
    description: 'Natural shampoo and conditioner set for all hair types. Nourishes and strengthens hair.',
    price: 699,
    category: 'Beauty & Personal Care',
    brand: 'Glow',
    images: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500'],
    stock: 180,
    rating: 4.3,
    numReviews: 234,
    isActive: true,
  },
  {
    name: 'Electric Toothbrush',
    description: 'Rechargeable electric toothbrush with 3 cleaning modes and 2-week battery life.',
    price: 1999,
    category: 'Beauty & Personal Care',
    brand: 'CleanSmile',
    images: ['https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=500'],
    stock: 70,
    rating: 4.6,
    numReviews: 145,
    isActive: true,
  },

  // Toys & Games
  {
    name: 'Board Game Collection',
    description: 'Classic board game collection with 5 popular games. Perfect for family game nights.',
    price: 2499,
    category: 'Toys & Games',
    brand: 'FunGames',
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500'],
    stock: 50,
    rating: 4.7,
    numReviews: 98,
    isActive: true,
  },
  {
    name: 'Building Blocks Set',
    description: 'Educational building blocks set with 200 pieces. Encourages creativity and problem-solving.',
    price: 1299,
    category: 'Toys & Games',
    brand: 'BuildIt',
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500'],
    stock: 80,
    rating: 4.5,
    numReviews: 156,
    isActive: true,
  },
  {
    name: 'Remote Control Car',
    description: 'High-speed remote control car with 2.4GHz frequency. Perfect for kids and hobbyists.',
    price: 1999,
    category: 'Toys & Games',
    brand: 'SpeedRacer',
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500'],
    stock: 45,
    rating: 4.4,
    numReviews: 112,
    isActive: true,
  },
];

const seedProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
    console.log('✅ MongoDB connected');

    // Clear existing products (optional - comment out if you want to keep existing)
    const clearExisting = process.argv[2] === '--clear';
    if (clearExisting) {
      await Product.deleteMany({});
      console.log('🗑️  Existing products cleared');
    }

    // Check for existing products
    const existingCount = await Product.countDocuments();
    if (existingCount > 0 && !clearExisting) {
      console.log(`⚠️  Found ${existingCount} existing products. Use --clear flag to remove them first.`);
      console.log('Adding new products alongside existing ones...');
    }

    // Insert dummy products
    const products = await Product.insertMany(dummyProducts);
    console.log(`✅ Successfully seeded ${products.length} products!`);

    // Display summary by category
    const categories = {};
    products.forEach((product) => {
      categories[product.category] = (categories[product.category] || 0) + 1;
    });

    console.log('\n📊 Products by Category:');
    Object.entries(categories).forEach(([category, count]) => {
      console.log(`   ${category}: ${count} products`);
    });

    console.log('\n✨ Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();

