// Importing requiered Modules
const express = require('express');
const path = require('path');
require('dotenv').config();
const locationRoutes = require('./routes/location');

// Creating expresss app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Home Setup
// Serve index.html on root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views', 'index.html'));
});

// Location Setup
// Serve location.html
app.get('/location', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views', 'location.html'));
});
// API routes for locations
app.use('/api/location', locationRoutes);

// Personnel Setup
// Serve personnel.html
app.get('/personnel', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views', 'personnel.html'));
});

// Family Setup
// Serve family.html
app.get('/family', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views', 'family.html'));
});

// Club Member Setup
// Serve club-member.html
app.get('/club-member', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views', 'club-member.html'));
});

// Payment Setup
// Serve payment.html
app.get('/payment', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views', 'payment.html'));
});

// Reports Setup
// Serve reports.html
app.get('/reports', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views', 'reports.html'));
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});