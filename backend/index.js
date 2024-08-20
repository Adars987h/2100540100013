const express = require('express');
const app = express();

// Use JSON middleware
app.use(express.json());

// Import and use routes
const productRoutes = require('./controller/productController');
app.use('/categories', productRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
