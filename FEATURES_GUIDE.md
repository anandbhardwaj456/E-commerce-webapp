# New Features Guide

This document explains the newly added features to the E-Commerce application.

## 1. Payment Gateway Integration (Razorpay)

### Setup
1. Sign up at [Razorpay](https://razorpay.com/)
2. Get your API keys from the dashboard
3. Add to `backend/.env`:
```env
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```

### Features
- Secure payment processing for card and UPI
- Payment verification
- Order status updates after successful payment
- COD (Cash on Delivery) option still available

### Usage
- Select payment method (Card/UPI or COD) during checkout
- For online payments, Razorpay checkout will open
- Complete payment securely
- Order is automatically updated after successful payment

---

## 2. Google OAuth Login

### Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:5000/api/auth/google/callback`
6. Add to `backend/.env`:
```env
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
FRONTEND_URL=http://localhost:3000
```

### Features
- One-click login with Google account
- Automatic user creation
- Seamless authentication flow

### Usage
- Click "Google" button on login page
- Authorize the application
- Automatically logged in

**Note:** Full Google OAuth implementation requires passport-google-oauth20 setup. The current implementation provides the structure.

---

## 3. Mobile Number Login with OTP

### Setup
1. Sign up at [Twilio](https://www.twilio.com/)
2. Get your credentials
3. Add to `backend/.env`:
```env
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
```

### Features
- Phone number-based authentication
- OTP sent via SMS
- 10-minute OTP validity
- Automatic user creation for new numbers

### Usage
1. Go to `/phone-login`
2. Enter phone number
3. Receive OTP via SMS
4. Enter OTP to login

**Development Mode:** OTP is also returned in API response for testing (remove in production)

---

## 4. Reviews and Ratings

### Features
- Users can rate products (1-5 stars)
- Write detailed reviews
- View all reviews for a product
- Average rating calculation
- Review count display
- One review per user per product

### Usage
- Go to any product detail page
- Scroll to "Reviews & Ratings" section
- Logged-in users can write reviews
- View existing reviews from other users

### API Endpoints
- `POST /api/reviews` - Create review
- `GET /api/reviews/product/:productId` - Get product reviews
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

---

## 5. Admin Advertisement Management

### Features (Already Exists - Enhanced)
- Add banners and sliders
- Upload images
- Set display order
- Activate/deactivate ads
- Link ads to specific pages
- Manage from admin dashboard

### Usage
1. Login as admin
2. Go to Admin Dashboard → Advertisements
3. Click "Add Advertisement"
4. Fill in details:
   - Title and description
   - Type (Banner or Slider)
   - Upload image
   - Set link (optional)
   - Set display order
   - Activate/deactivate
5. Save and view on homepage

---

## Environment Variables Summary

Add these to your `backend/.env`:

```env
# Existing
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
NODE_ENV=development

# Payment Gateway
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FRONTEND_URL=http://localhost:3000

# Twilio (OTP)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
```

---

## Installation

After adding new features, install dependencies:

```bash
cd backend
npm install

cd ../frontend
npm install
```

---

## Testing

### Payment Gateway
1. Use Razorpay test credentials
2. Test with test card: 4111 1111 1111 1111
3. Use any future expiry date and CVV

### OTP Login
- In development, OTP is shown in API response
- Use Twilio test credentials for SMS

### Google Login
- Requires proper OAuth setup
- Test with Google test accounts

---

## Security Notes

1. **Payment Gateway:**
   - Never expose Razorpay key secret in frontend
   - Always verify payments on backend
   - Use HTTPS in production

2. **OTP:**
   - Remove OTP from API response in production
   - Set appropriate expiry times
   - Rate limit OTP requests

3. **Google OAuth:**
   - Keep client secret secure
   - Validate redirect URIs
   - Handle token expiration

4. **Reviews:**
   - Implement spam detection
   - Add moderation for reviews
   - Rate limit review submissions

---

## Troubleshooting

### Payment Gateway Not Working
- Check Razorpay keys in .env
- Verify Razorpay script is loaded
- Check browser console for errors

### OTP Not Sending
- Verify Twilio credentials
- Check phone number format
- Ensure sufficient Twilio balance

### Google Login Not Working
- Verify OAuth credentials
- Check redirect URI matches
- Ensure Google+ API is enabled

### Reviews Not Showing
- Check if user is logged in
- Verify product ID is correct
- Check API endpoint responses

---

## Future Enhancements

- [ ] Email notifications for orders
- [ ] SMS notifications for OTP and orders
- [ ] Social media login (Facebook, Twitter)
- [ ] Review moderation system
- [ ] Product recommendations based on reviews
- [ ] Review helpfulness voting
- [ ] Photo reviews
- [ ] Multiple payment gateways support


