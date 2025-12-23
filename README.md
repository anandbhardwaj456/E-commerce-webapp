# E-Commerce MERN Stack Application

A full-stack e-commerce application built with MongoDB, Express.js, React.js, and Node.js (MERN stack) with Tailwind CSS for styling.

## Features

### User Features
- User registration and authentication (JWT-based)
- Browse products with search and filter functionality
- Product detail pages with image gallery
- Shopping cart management
- Checkout process with address selection
- Order placement and tracking
- Address management
- Profile management

### Admin Features
- Admin dashboard with statistics
- Product management (CRUD operations)
- Order management with status updates
- User management (view and block/unblock users)
- Advertisement management (banners and sliders)
- Image upload functionality

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for authentication
- Multer for file uploads
- bcryptjs for password hashing

### Frontend
- React.js
- React Router for navigation
- Tailwind CSS for styling
- Axios for API calls
- React Context API for state management
- React Slick for carousel/slider
- React Toastify for notifications

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

4. Start the backend server:
```bash
npm run dev
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory (optional):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the frontend development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

### Running Both Servers

From the root directory, you can run both servers concurrently:
```bash
npm install
npm run dev
```

## Project Structure

```
e-com/
├── backend/
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   ├── uploads/         # Uploaded images
│   └── server.js        # Entry point
├── frontend/
│   ├── public/          # Public assets
│   └── src/
│       ├── components/  # React components
│       ├── pages/       # Page components
│       ├── context/     # Context providers
│       ├── utils/       # Utility functions
│       └── App.js       # Main app component
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `GET /api/products/categories/list` - Get all categories

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/myorders` - Get user orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/pay` - Update order payment

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/addresses` - Get user addresses
- `POST /api/users/addresses` - Add address
- `PUT /api/users/addresses/:id` - Update address
- `DELETE /api/users/addresses/:id` - Delete address

### Admin
- `GET /api/admin/stats` - Get dashboard statistics
- `GET /api/admin/products` - Get all products (admin)
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product
- `GET /api/admin/orders` - Get all orders
- `PUT /api/admin/orders/:id/status` - Update order status
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/block` - Block/unblock user

### Advertisements
- `GET /api/advertisements` - Get active advertisements
- `GET /api/advertisements/all` - Get all (admin)
- `POST /api/advertisements` - Create advertisement
- `PUT /api/advertisements/:id` - Update advertisement
- `DELETE /api/advertisements/:id` - Delete advertisement

## Default Admin Account

To create an admin account, you can either:
1. Manually update the user role in MongoDB to 'admin'
2. Register a user and update the role in the database

## Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Environment (development/production)

### Frontend (.env)
- `REACT_APP_API_URL` - Backend API URL (default: http://localhost:5000/api)

## Features Implementation

- ✅ User authentication and authorization
- ✅ Product catalog with search and filters
- ✅ Shopping cart functionality
- ✅ Order management
- ✅ Address management
- ✅ Admin dashboard
- ✅ Product management (CRUD)
- ✅ Order status management
- ✅ User management
- ✅ Advertisement management (banners and sliders)
- ✅ Image uploads
- ✅ Responsive design

## Future Enhancements

- Product reviews and ratings
- AI-based product recommendations
- Coupon and discount system
- Email and SMS notifications
- Multi-vendor marketplace support
- Payment gateway integration (Razorpay, Stripe, etc.)

## License

This project is open source and available under the MIT License.

