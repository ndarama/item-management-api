require('dotenv').config();
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

const connectDB = require('./db/connection');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');
require('./passportConfig');

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
(async () => {
    try {
        await connectDB();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);  
    }
})();

// Middleware setup
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:4000/auth/auth/github', 
    credentials: true                 
}));
app.use(session({
    secret: process.env.SESSION_SECRET || 'defaultsecret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Swagger API Documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Item Management API!');
});
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/auth', authRoutes);

// Handle invalid routes (404)
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Internal server error'
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
