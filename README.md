# PureLine Backend API

Production-ready Node.js/Express backend for PureLine water purification e-commerce website.

## 🚀 Features

- ✅ RESTful API with Express.js
- ✅ MongoDB database with Mongoose ODM
- ✅ JWT authentication
- ✅ Admin role-based access control
- ✅ Password hashing with bcrypt
- ✅ CORS enabled
- ✅ Error handling middleware
- ✅ Guest checkout support
- ✅ Order management system
- ✅ Product CRUD operations

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**:
```bash
git clone https://github.com/YOUR_USERNAME/pureline-backend.git
cd pureline-backend
```

2. **Install dependencies**:
```bash
npm install
```

3. **Create `.env` file**:
```bash
cp .env.example .env
```

4. **Configure environment variables** in `.env`:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key_min_32_chars
FRONTEND_URL=http://localhost:3000
```

5. **Start the server**:
```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

6. **Seed the database** (optional):
```bash
npm run seed
```

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── authController.js     # Authentication logic
│   ├── productController.js  # Product CRUD
│   └── orderController.js    # Order management
├── middleware/
│   ├── authMiddleware.js     # JWT verification
│   ├── adminMiddleware.js    # Admin check
│   └── errorMiddleware.js    # Error handling
├── models/
│   ├── User.js              # User schema
│   ├── Product.js           # Product schema
│   └── Order.js             # Order schema
├── routes/
│   ├── authRoutes.js        # Auth endpoints
│   ├── productRoutes.js     # Product endpoints
│   └── orderRoutes.js       # Order endpoints
├── utils/
│   ├── generateToken.js     # JWT generator
│   └── seedProducts.js      # Database seeder
├── .env.example             # Environment template
├── .gitignore
├── package.json
└── server.js                # Entry point
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)
- `GET /api/products/categories/list` - Get all categories

### Orders
- `POST /api/orders` - Create order (guest checkout)
- `GET /api/orders` - Get all orders (admin)
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/status` - Update order status (admin)
- `GET /api/orders/stats/summary` - Get order statistics (admin)

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication.

**Login to get token**:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@pureline.com","password":"admin123"}'
```

**Use token in requests**:
```bash
curl http://localhost:5000/api/orders \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 👤 Default Users

After running `npm run seed`:

**Admin**:
- Email: `admin@pureline.com`
- Password: `admin123`

**Test User**:
- Email: `user@test.com`
- Password: `password123`

## 🗄️ Database Models

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (user/admin)
}
```

### Product
```javascript
{
  name: String,
  category: String,
  price: Number,
  image: String,
  description: String,
  specs: Object,
  stock: Number
}
```

### Order
```javascript
{
  user: ObjectId (optional),
  customer: {
    name, email, phone, address, city, state, zipCode, notes
  },
  items: [{
    product: ObjectId,
    name, price, quantity, image, category
  }],
  subtotal: Number,
  shipping: Number,
  total: Number,
  status: String (pending/processing/completed/cancelled)
}
```

## 🧪 Testing

**Test health endpoint**:
```bash
curl http://localhost:5000/health
```

**Test products endpoint**:
```bash
curl http://localhost:5000/api/products
```

## 🚀 Deployment

### Render
1. Push code to GitHub
2. Create new Web Service on Render
3. Connect repository
4. Set environment variables
5. Deploy

### Railway
1. Push code to GitHub
2. Create new project on Railway
3. Connect repository
4. Add environment variables
5. Deploy

See [Deployment Guide](../deployment_guide.md) for detailed instructions.

## 📚 Documentation

- [MongoDB Setup Guide](../mongodb_setup_guide.md)
- [API Documentation](../api_documentation.md)
- [Frontend Integration Guide](../frontend_integration_guide.md)
- [Deployment Guide](../deployment_guide.md)

## 🛡️ Security

- Passwords hashed with bcrypt (10 rounds)
- JWT tokens expire in 30 days
- CORS configured for frontend origin
- MongoDB injection prevention via Mongoose
- Input validation on all endpoints

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` or `production` |
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for JWT | Min 32 characters |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` |

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

MIT License

## 👨‍💻 Author

PureLine Team

## 🙏 Acknowledgments

- Express.js
- MongoDB & Mongoose
- JWT
- bcrypt.js
