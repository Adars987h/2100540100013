const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

// Bearer token for authentication
const BEARER_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzI0MTY4ODU4LCJpYXQiOjE3MjQxNjg1NTgsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjNkODE1MzMwLTQ1ZGUtNDFjZS1hZjQ0LTM5Y2M5NDc5MGQ3YyIsInN1YiI6ImFkYXJzaHNyaTk4N0BnbWFpbC5jb20ifSwiY29tcGFueU5hbWUiOiJnb01hcnQiLCJjbGllbnRJRCI6IjNkODE1MzMwLTQ1ZGUtNDFjZS1hZjQ0LTM5Y2M5NDc5MGQ3YyIsImNsaWVudFNlY3JldCI6IkVSZ0pLd3F3WlptR1VyUUoiLCJvd25lck5hbWUiOiJBZGFyc2giLCJvd25lckVtYWlsIjoiYWRhcnNoc3JpOTg3QGdtYWlsLmNvbSIsInJvbGxObyI6IjIxMDA1NDAxMDAwMTMifQ.Rr3ttugFnsqlO_pOxTW9yl_3_OymhJwp5RCYPJHHYqE";

const BaseURL="http://20.244.56.144/test/";


const fetchProducts = async (company, category, params) => {

    const apiUrl= BaseURL+"companies/"+company+"/categories/"+category+"/products";
    
    try {
        const response = await axios.get(apiUrl, 
            {
                params,
                headers: {
                    'Authorization': `Bearer ${BEARER_TOKEN}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
    };
  
    

// Fetch products from all e-commerce APIs
const fetchProductsFromAllAPIs = async (category) => {
    const productPromises = ECOMMERCE_APIS.map(api =>
        axios.get(`${api}/categories/${category}/products`, {
            headers: {
                'Authorization': `Bearer ${BEARER_TOKEN}`
            }
        })
        .then(response => response.data)
        .catch(error => {
            console.error(`Error fetching from ${api}:`, error);
            return [];
        })
    );

    const products = await Promise.all(productPromises);
    return products.flat();
};

// Generate a unique identifier for a product
const generateUniqueId = (product) => {
    return uuidv4();
};

module.exports = {
    fetchProducts,
    fetchProductsFromAllAPIs,
    generateUniqueId
};
