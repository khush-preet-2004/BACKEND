const express = require('express');
const fs = require('fs');
const path = require('path');

// Create an Express application
const app = express();

// Define the port
const PORT = 3000;

// Middleware to log request details
app.use((req, res, next) => {
    // Capture request details
    const logEntry = {
        timestamp: new Date().toISOString(),
        ip: req.ip,
        url: req.originalUrl,
        protocol: req.protocol,
        method: req.method,
        hostname: req.hostname,
    };

    // Convert log entry to a JSON string
    const logLine = JSON.stringify(logEntry) + '\n';

    // Define the log file path
    const logFilePath = path.join(__dirname, 'requests.log');

    // Append the log line to the file
    fs.appendFile(logFilePath, logLine, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });

    // Proceed to the next middleware or route
    next();
});

// Define some test routes
app.get('/', (req, res) => {
    res.send('Welcome to the Express Logging Server!');
});

app.get('/test', (req, res) => {
    res.send('This is a test route.');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
