const express = require('express');
const router = express.Router();
const connection = require('../config/db_connection');

// Location Actions

// Get All Locations from Database
router.get('/', (req, res) => {
    const  sql = 'SELECT * FROM locations';
    connection.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ status: 'error', message: err.message });
        }
        res.json(results);
    });
})

// Add a new location
router.post('/add', (req, res) => {
    const { name, address, city, province, postal_code, phone_number, web_address, capacity } = req.body;

    if (!name || !address || !city || !province || !postal_code || !phone_number || !web_address || !capacity) {
        return res.status(400).json({ status: 'error', message: 'All fields are required' });
    }

    const sql = `INSERT INTO locations (name, address, city, province, postal_code, phone, web_address, max_capacity)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    connection.query(sql, [name, address, city, province, postal_code, phone_number, web_address, capacity], (err) => {
        if (err) {
            return res.status(500).json({ status: 'error', message: err.message });
        }
        res.json({ status: 'success', message: 'Location added successfully' });
    });
});

// Delete a location
router.post('/delete', (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ status: 'error', message: 'ID is required' });
    }

    const sql = 'DELETE FROM locations WHERE id = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ status: 'error', message: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: 'error', message: 'Location not found' });
        }
        res.json({ status: 'success', message: 'Location removed successfully' });
    });
});

// Get a location by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ status: 'error', message: 'ID is required' });
    }

    const sql = 'SELECT * FROM locations WHERE id = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ status: 'error', message: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ status: 'error', message: 'Location not found' });
        }
        res.json(results[0]);
    });
});

// Update a location
router.post('/update', (req, res) => {
    const { id, name, address, city, province, postal_code, phone_number, web_address, capacity } = req.body;

    if (!id || !name || !address || !city || !province || !postal_code || !phone_number || !web_address || !capacity) {
        return res.status(400).json({ status: 'error', message: 'All fields are required' });
    }

    const sql = `UPDATE locations SET 
                    name = ?, address = ?, city = ?, province = ?, postal_code = ?, 
                    phone = ?, web_address = ?, max_capacity = ? WHERE id = ?`;

    connection.query(sql, [name, address, city, province, postal_code, phone_number, web_address, capacity, id], (err, result) => {
        if (err) {
            return res.status(500).json({ status: 'error', message: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: 'error', message: 'Location not found' });
        }
        res.json({ status: 'success', message: 'Location updated successfully' });
    });
});

module.exports = router;