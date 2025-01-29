const express = require('express');
const axios = require('axios');
const cors = require('cors');  // Import cors

const app = express();

// Enable CORS for all origins (or configure it for specific domains)
app.use(cors({
    origin: 'http://localhost:4200'  // Allow only requests from localhost:4200
  }));  // This allows cross-origin requests

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define the /api/user endpoint to fetch users from jsonplaceholder
app.get("/api/user", async (req, res) => {
    try {
        // Fetch users from jsonplaceholder API
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        
        // Send the data to the frontend
        res.status(200).json({
            message: "Users fetched successfully!",
            users: response.data
        });
    } catch (error) {
        console.error("Error fetching data from jsonplaceholder:", error);
        res.status(500).json({
            message: "Failed to fetch users",
            error: error.message
        });
    }
});

module.exports = app