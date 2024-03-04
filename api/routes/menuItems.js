// Setup Express Router and Libraries
const express = require('express');
const router = express.Router();
require('dotenv').config({path : '../.env'})

// API Endpoints
router.get('/', async (req, res) =>{
    console.log(`Getting menu items for ${req.query.date}, ${req.query.commonCode}, ${req.query.mealCode}`);
    res.json({menuItems: await getMenuItems(req.query.date, req.query.commonCode, req.query.mealCode)});
});

// Data Handling Functions
const ucsb_api_key = process.env.UCSB_API_KEY
const menuUrl = 'https://api.ucsb.edu/dining/menu/v1';
function getMenuItems(date, commonCode, mealCode) {
    return fetch(`${menuUrl}/${date}/${commonCode}/${mealCode}?ucsb-api-key=${ucsb_api_key}`)
    .then(response => {
        if (response.status!=200) {
            throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
        }
        return response.json(); 
    })
    .then(jsonData => {
        let items = [];
        for (const entree of jsonData) {
            if (!items.includes(entree.name)) {
                items.push(entree.name);
            }
        };
        return items;
    })
    .catch((error) => {
        console.error('Error: ', error);
    })
}

// Export Router to be used in index.js
module.exports = router;