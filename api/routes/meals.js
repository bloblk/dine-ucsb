// Setup Express Router and Libraries
const express = require('express');
const router = express.Router();
require('dotenv').config()

// API Endpoints
router.get('/', async (req, res) => {
    console.log(`Getting meal codes for ${req.query.date}, ${req.query.commonCode}`);
    console.log(`API Key: ${process.env.UCSB_API_KEY}`)
    res.json({mealsServed: await getMealCodes(req.query.date, req.query.commonCode)});
});

// Data Handling Functions
const ucsb_api_key = process.env.UCSB_API_KEY
const commonsUrl = 'https://api.ucsb.edu/dining/commons/v1';
function getMealCodes(date, commonCode) {
    return fetch(`${commonsUrl}/hours/${date}/${commonCode}?ucsb-api-key=${ucsb_api_key}`)
    .then(response => {
        if (response.status!=200) {
            throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
        }
        return response.json();
    })
    .then(jsonData => {
        let meals = [];
        for (const meal of jsonData) {
            if (meal.open!==null) {
                meals.push(meal.mealCode);
            }
        };
        return meals;
    })
    .catch((error) => {
        console.error('Error:', error);
    })
}

// Export Router to be used in index.js
module.exports = router;