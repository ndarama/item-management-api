const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Items Management API',
        description: 'API for managing products and orders'
    },
    host: 'localhost:3000',
    schemes: ['http'],
    definitions: {
        Product: {
            name: 'Laptop',
            price: 1200,
            stock: 10,
            category: 'Electronics',
            supplier: 'Tech Corp'
        },
        Order: {
            customerName: 'John Doe',
            products: [
                {
                    productId: '63fc8e90e3b8ad001f8a6b72',
                    quantity: 2
                }
            ],
            totalAmount: 2400,
            status: 'Pending'
        }
    }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/productRoutes.js', './routes/orderRoutes.js'];

// Generate Swagger documentation
swaggerAutogen(outputFile, endpointsFiles, doc);
