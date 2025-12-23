# Admin Account Creation Guide

There are several ways to create an admin account. Choose the method that works best for you.

## Method 1: Using the Admin Creation Script (Recommended)

This is the easiest method. The script will create an admin user for you.

### Step 1: Navigate to backend directory
```bash
cd backend
```

### Step 2: Run the script

**Option A: Use default credentials**
```bash
npm run create-admin
```
This creates an admin with:
- Email: `admin@example.com`
- Password: `admin123`
- Name: `Admin User`

**Option B: Custom credentials**
```bash
npm run create-admin "Your Name" "your-email@example.com" "your-password"
```

Example:
```bash
npm run create-admin "John Admin" "admin@mystore.com" "SecurePassword123"
```

### Step 3: Login
Go to `http://localhost:3000/login` and use the admin credentials.

---

## Method 2: Using MongoDB Compass (GUI)

1. Open MongoDB Compass
2. Connect to your database
3. Navigate to the `ecommerce` database
4. Open the `users` collection
5. Click "Insert Document"
6. Add this document:
```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "$2a$10$YourHashedPasswordHere",
  "role": "admin",
  "isBlocked": false,
  "addresses": [],
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Note:** You need to hash the password. Use the script in Method 1, or use an online bcrypt generator.

---

## Method 3: Using MongoDB Shell

1. Connect to your MongoDB database
2. Run these commands:

```javascript
use ecommerce

// First, register a user normally through the app, then update:
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

Or create directly (requires password hashing):
```javascript
use ecommerce

db.users.insertOne({
  name: "Admin User",
  email: "admin@example.com",
  password: "$2a$10$...", // Hashed password
  role: "admin",
  isBlocked: false,
  addresses: [],
  createdAt: new Date(),
  updatedAt: new Date()
})
```

---

## Method 4: Convert Existing User to Admin

If you've already registered a user account:

### Using MongoDB Compass:
1. Find your user document
2. Change the `role` field from `"user"` to `"admin"`
3. Save the document

### Using MongoDB Shell:
```javascript
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

### Using the Script:
```bash
cd backend
npm run create-admin "Your Name" "your-existing-email@example.com" "your-password"
```

---

## Method 5: Temporary Admin Registration Route

You can temporarily add an admin registration route. Add this to `backend/routes/auth.js`:

```javascript
// Temporary admin registration (remove in production!)
router.post('/register-admin', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      password,
      role: 'admin',
    });
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
```

Then use Postman or curl:
```bash
curl -X POST http://localhost:5000/api/auth/register-admin \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin","email":"admin@example.com","password":"admin123"}'
```

**Remember to remove this route before deploying to production!**

---

## Verify Admin Account

After creating the admin account:

1. Logout if you're logged in
2. Login with admin credentials
3. You should see an "Admin" link in the navbar
4. Click it to access the admin dashboard

---

## Troubleshooting

### "Admin user already exists"
- The email is already registered. Use Method 4 to convert the existing user.

### "MongoDB connection error"
- Make sure your `.env` file has the correct `MONGODB_URI`
- Check if MongoDB is running

### "Cannot find module"
- Make sure you're in the `backend` directory
- Run `npm install` if you haven't already

### Admin link not showing
- Logout and login again
- Check browser console for errors
- Verify the user role is "admin" in the database

---

## Security Note

⚠️ **Important:** Change the default admin password immediately after first login!

For production:
1. Use strong passwords
2. Remove any temporary admin creation routes
3. Limit admin account creation to secure methods only
4. Consider implementing 2FA for admin accounts


