const express = require('express');
const ecommerceService = require('../services/ecommerceService');
const { v4: uuidv4 } = require('uuid');


const router = express.Router();

// Controller for sorting products
const sortProducts = (products, sortBy, order) => {
    return products.sort((a, b) => {
        if (sortBy === 'price') {
            return order === 'asc' ? a.price - b.price : b.price - a.price;
        } else if (sortBy === 'rating') {
            return order === 'asc' ? a.rating - b.rating : b.rating - a.rating;
        } else if (sortBy === 'discount') {
            return order === 'asc' ? a.discount - b.discount : b.discount - a.discount;
        } else if (sortBy === 'availability') {
            return order === 'asc'
                ? a.availability.localeCompare(b.availability)
                : b.availability.localeCompare(a.availability);
        }
        return 0;
    });
};


const map = new Map();
// Route to fetch top N products within a category and price range
router.get('/categories/:categoryname/products', async (req, res) => {
    const { categoryname } = req.params;
    const { top, page = null, sortBy = 'price', order = 'asc', minPrice = 1, maxPrice = 1000000 } = req.query;


    // Construct query parameters
    const queryParams = {
        top: parseInt(top),
        page: parseInt(page),
        minPrice: parseInt(minPrice),
        maxPrice: parseInt(maxPrice),
    };

    if (top > 10 && page === null) {
        res.json("Please send page parameter as well");
        return;
    }
    const companies = ["AMZ", "FLP", "SNP", "MYN", "AZO"];

    // Fetch products from the selected company's API


    let products = [];

    for (var i = 0; i < companies.length; i++) {
        var company = companies[i];

        const companyProducts = await ecommerceService.fetchProducts(company, categoryname, queryParams);
        console.log(companyProducts);

        products = products.concat(companyProducts);

    }


    products.forEach(product => {
        const id = generateUniqueId();
        product.productid = id;
        map.set(id, product);
    }
    )


    // Sort products if sortBy parameter is provided
    if (sortBy) {
        products = sortProducts(products, sortBy, order);
    }

    console.log("sorted ");
    console.table(products);

    let filterProduct = [];


    // if(top>10 && page!= null){
    for (var i = 0; i < top; i++) {
        var j = (page - 1) * 10 + i;
        filterProduct = filterProduct.concat(products[j]);

    }

    products = filterProduct;
    // }


    res.json(products);


});


// Route to fetch details of a specific product
// Uncomment and modify this if you need it
router.get('/categories/:categoryname/products/:productid', async (req, res) => {
    const { categoryname, productid } = req.params;

    if(map.has(productid)){
        const product = map.get(productid);
        res.json(product);
    }
    else{
        res.json("No Product Found");
    }
});




// Generate a unique identifier for a product
const generateUniqueId = () => {
    return uuidv4();
};


module.exports = router;