require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

(async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Check if an admin already exists
        const existingAdmin = await User.findOne({ role: 'admin' });
        if (existingAdmin) {
            console.log('Admin already exists:', existingAdmin);
            process.exit();
        }

        // Create a new admin user
        const adminUser = new User({
            username: 'admin',
            email: 'admin@example.com',
            password: 'SecureAdminPass123',  // Change this before deploying
            role: 'admin'
        });

        await adminUser.save();
        console.log('Admin user created successfully!');
        process.exit();
    } catch (error) {
        console.error('Error creating admin user:', error);
        process.exit(1);
    }
})();
