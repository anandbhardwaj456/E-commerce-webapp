# Setup Guide for New Features

## Quick Setup Checklist

### 1. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend  
cd ../frontend
npm install
```

### 2. Environment Variables

Add these to `backend/.env`:

```env
# Payment Gateway (Razorpay)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FRONTEND_URL=http://localhost:3000

# Twilio OTP (Optional)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
```

### 3. Get API Keys

#### Razorpay (Required for Payment)
1. Sign up: https://razorpay.com/
2. Go to Settings → API Keys
3. Generate test keys
4. Add to `.env`

#### Twilio (Required for OTP)
1. Sign up: https://www.twilio.com/
2. Get Account SID and Auth Token
3. Get a phone number
4. Add to `.env`

#### Google OAuth (Optional)
1. Go to: https://console.cloud.google.com/
2. Create project
3. Enable Google+ API
4. Create OAuth credentials
5. Add redirect URI: `http://localhost:5000/api/auth/google/callback`

### 4. Test Features

#### Payment Gateway
- Use test card: 4111 1111 1111 1111
- Any future expiry date
- Any CVV

#### OTP Login
- In development, OTP is returned in API response
- Check browser console or network tab

#### Reviews
- Login and go to any product
- Scroll to reviews section
- Add a review

## Features Summary

✅ **Payment Gateway** - Razorpay integration
✅ **Google Login** - OAuth authentication  
✅ **Phone Login** - OTP-based authentication
✅ **Reviews & Ratings** - Product reviews system
✅ **Admin Ads** - Already exists and working

## Troubleshooting

See `FEATURES_GUIDE.md` for detailed troubleshooting.


