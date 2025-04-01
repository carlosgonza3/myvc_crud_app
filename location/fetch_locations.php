<?php
// Include the database connection file
include '../includes/db_connection.php';

// Create connection
$conn = getDBConnection();

// Query to fetch locations
$sql = "SELECT LocationId, Name, Type, Address, City, Province, PostalCode, MaxCapacity, PhoneNumbers, WebAddress FROM Location";
$result = $conn->query(query: $sql);

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