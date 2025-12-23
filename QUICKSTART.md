# Quick Start Guide

## Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (recommended) or local MongoDB
- npm or yarn

## Step 1: Clone and Install

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## Step 2: Backend Configuration

1. Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

2. Replace `MONGODB_URI` with your MongoDB connection string
3. Replace `JWT_SECRET` with a secure random string

## Step 3: Frontend Configuration (Optional)

Create a `.env` file in the `frontend` directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Step 4: Start the Application

### Option 1: Run Both Servers Together (Recommended)

From the root directory:
```bash
npm run dev
```

This will start both backend (port 5000) and frontend (port 3000) servers.

### Option 2: Run Servers Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

## Step 5: Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## Step 6: Create Admin Account

1. Register a new user through the frontend
2. In MongoDB, find the user document and update the `role` field to `"admin"`
3. Logout and login again to access admin features

Alternatively, you can use MongoDB Compass or mongo shell:
```javascript
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

## Step 7: Test the Application

1. **As a User:**
   - Register/Login
   - Browse products
   - Add products to cart
   - Add delivery address
   - Place an order

2. **As an Admin:**
   - Login with admin account
   - Go to Admin Dashboard
   - Add products
   - Manage orders
   - Manage users
   - Add advertisements (banners/sliders)

## Troubleshooting

### MongoDB Connection Issues
- Verify your MongoDB URI is correct
- Check if your IP is whitelisted in MongoDB Atlas
- Ensure MongoDB is running (if using local MongoDB)

### Port Already in Use
- Change the PORT in backend `.env` file
- Update REACT_APP_API_URL in frontend `.env` accordingly

### Image Upload Issues
- Ensure `backend/uploads` directory exists and has write permissions
- Check file size limits (currently 5MB per image)

### CORS Issues
- Verify backend CORS is configured correctly
- Check if API URL in frontend matches backend URL

## Next Steps

1. Integrate a real payment gateway (Razorpay, Stripe, etc.)
2. Add email notifications
3. Implement product reviews and ratings
4. Add search functionality enhancements
5. Deploy to production (Render, Vercel, etc.)

## Support

For issues or questions, refer to the main README.md file or check the code comments.

