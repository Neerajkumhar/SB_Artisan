const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { errorHandler } = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config();

// Initialize Express App
const app = express();

// Middlewares
app.use(cors({
  origin: '*', // Allows all origins, or configure specific origin as needed
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Import Routes
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const subcategoryRoutes = require('./routes/subcategoryRoutes');
const productRoutes = require('./routes/productRoutes');
const blogRoutes = require('./routes/blogRoutes');
const projectRoutes = require('./routes/projectRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subcategoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/inquiries', inquiryRoutes);

// Root Health Check Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    message: 'SB Artisan Jodhpur Showroom API is operating normally.',
    timestamp: new Date()
  });
});

app.get('/', (req, res) => {
  res.send('SB Artisan Jodhpur Showroom API Backend.');
});

// 404 Route handler
app.use((req, res, next) => {
  res.status(404);
  next(new Error(`API Path Not Found - ${req.originalUrl}`));
});

// Central Error Handler
app.use(errorHandler);

// Listen to Port
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

module.exports = { app, server };
