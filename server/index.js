// Set up Express
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;;

// Handle Requests to Server
app.get('/api', (req, res) => {
    res.json({ message: "Hello from server!" });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

