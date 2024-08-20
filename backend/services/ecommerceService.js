const axios = require('axios');

// Bearer token for authentication
const BEARER_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzI0MTcxMjA0LCJpYXQiOjE3MjQxNzA5MDQsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjNkODE1MzMwLTQ1ZGUtNDFjZS1hZjQ0LTM5Y2M5NDc5MGQ3YyIsInN1YiI6ImFkYXJzaHNyaTk4N0BnbWFpbC5jb20ifSwiY29tcGFueU5hbWUiOiJnb01hcnQiLCJjbGllbnRJRCI6IjNkODE1MzMwLTQ1ZGUtNDFjZS1hZjQ0LTM5Y2M5NDc5MGQ3YyIsImNsaWVudFNlY3JldCI6IkVSZ0pLd3F3WlptR1VyUUoiLCJvd25lck5hbWUiOiJBZGFyc2giLCJvd25lckVtYWlsIjoiYWRhcnNoc3JpOTg3QGdtYWlsLmNvbSIsInJvbGxObyI6IjIxMDA1NDAxMDAwMTMifQ.8KhXFda7XJUmX4DXkyXXnMWS1JdalyxNP-q1AeWkq_4";

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


module.exports = {
    fetchProducts
};
