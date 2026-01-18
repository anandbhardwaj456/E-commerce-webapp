# Database Seeding Scripts

This directory contains scripts to seed the database with initial data.

## Available Scripts

### 1. Create Admin User
Creates an admin user for the application.

```bash
npm run create-admin
```

Or with custom credentials:
```bash
npm run create-admin "Admin Name" "admin@example.com" "password123"
```

### 2. Seed Products
Adds dummy products to the database.

**Add products (keeps existing):**
```bash
npm run seed-products
```

**Clear existing products and add new ones:**
```bash
npm run seed-products:clear
```

## Products Included

The seed script adds **30 dummy products** across multiple categories:

- **Electronics** (5 products): Headphones, Smart Watch, Mouse, Charger, Speaker
- **Clothing** (5 products): T-Shirt, Jeans, Jacket, Running Shoes, Sneakers
- **Home & Kitchen** (5 products): Coffee Maker, Cookware, Air Fryer, Bedding, Vacuum
- **Books** (3 products): Web Development guides
- **Sports & Outdoors** (4 products): Yoga Mat, Dumbbells, Water Bottle, Backpack
- **Beauty & Personal Care** (3 products): Moisturizer, Shampoo, Toothbrush
- **Toys & Games** (3 products): Board Games, Building Blocks, RC Car

## Product Features

Each product includes:
- ✅ Realistic name and description
- ✅ Price in Indian Rupees (₹)
- ✅ Category classification
- ✅ Brand name
- ✅ Stock quantity
- ✅ Rating (4.2 - 4.8 stars)
- ✅ Number of reviews
- ✅ Placeholder images from Unsplash
- ✅ Active status

## Notes

- Products use placeholder images from Unsplash
- All products are set as `isActive: true` by default
- Prices range from ₹599 to ₹12,999
- Stock quantities vary from 25 to 200 units
- Ratings are realistic (4.2 - 4.8 stars)

## Environment Variables

Make sure your `.env` file has:
```
MONGODB_URI=your_mongodb_connection_string
```

## Troubleshooting

If you encounter errors:
1. Ensure MongoDB is running and accessible
2. Check your `MONGODB_URI` in `.env`
3. Verify you have write permissions to the database
4. Run with `--clear` flag if you want to start fresh

