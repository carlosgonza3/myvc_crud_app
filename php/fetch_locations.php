<?php
// Include the database connection file
include '../includes/db_connection.php';

// Create connection
$conn = getDBConnection();

// Query to fetch locations
$sql = "SELECT id, name, address, city, province, postal_code, phone, web_address, max_capacity FROM locations";
$result = $conn->query($sql);

// Create an array to store data
$locations = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $locations[] = $row;
    }
}

// Return data as JSON
header('Content-Type: application/json');
echo json_encode($locations);

// Close the connection
$conn->close();
?>