const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json())

// Serve static files from the frontend folder
app.use(express.static(path.join(__dirname, "../frontend")));

// Serve the index.html file for the root route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Route for Privacy Policy & Terms of Service
app.get("/privacy-policy", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/privacy-policy.html"));
});

//Contact Form Route
const contactRoutes = require('./apiRoutes/index');
app.use('/api', contactRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
