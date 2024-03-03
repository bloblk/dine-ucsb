// Import libraries
const express = require('express');
const http = require('http');
require('dotenv').config()

// Set up express
const app = express();
const PORT = process.env.PORT || 3000;;

// Handle Requests to Server
app.get('/mealCodes', async (req, res) => {
    console.log(`Getting meal codes for ${req.query.date}, ${req.query.commonCode}`);
    res.json({mealsServed: await getMealCodes(req.query.date, req.query.commonCode)});
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Make UCSB API Requests
const ucsb_api_key = process.env.UCSB_API_KEY
const commonsUrl = 'https://api.ucsb.edu/dining/commons/v1';
const menuUrl = 'https://api.ucsb.edu/dining/menu/v1';
const diningCommonCodes = ['carrillo', 'de-la-guerra', 'portola', 'ortega'];
// API Handling Functions
function getMealCodes(date, commonCode) {
    return fetch(`${commonsUrl}/hours/${date}/${commonCode}?ucsb-api-key=${ucsb_api_key}`)
    .then(response => {
        if (response.status!=200) {
            throw new Error(`Request failed with status ${response.status}: ${response.statusText}`)
        }
        return response.json();
    })
    .then(jsonData => {
        let meals = [];
        for (const meal of jsonData) {
            meals.push(meal.mealCode);
        };
        return meals;
    })
    .catch((error) => {
        console.error('Error:', error);
    }); 
}
