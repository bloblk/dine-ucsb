// Import Libraries
const express = require('express');

// Setup Express Server and Routes
const app = express();
app.disable('x-powered-by');
const PORT = process.env.PORT || 3000;;
const meals = require('./routes/meals')
const menuItems = require('./routes/menuItems')

// Handle Requests to Server
app.use('/meals', meals);
app.use('/menuItems', menuItems);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Export 
module.exports = app;