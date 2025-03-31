<?php

include '../includes/db_connection.php';

// Create connection
$conn = getDBConnection();

// Check if form is submitted using POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $conn->real_escape_string($_POST['name']);
    $address = $conn->real_escape_string($_POST['address']);
    $city = $conn->real_escape_string($_POST['city']);
    $province = $conn->real_escape_string($_POST['province']);
    $postal_code = $conn->real_escape_string($_POST['postal_code']);
    $phone = $conn->real_escape_string($_POST['phone_number']);
    $web_address = $conn->real_escape_string($_POST['web_address']);
    $capacity = intval($_POST['capacity']);

    // Insert query
    $sql = "INSERT INTO locations (name, address, city, province, postal_code, phone, web_address, max_capacity)
            VALUES ('$name', '$address', '$city', '$province', '$postal_code', '$phone', '$web_address', $capacity)";

    // Check if the query was successful
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['status' => 'success', 'message' => 'Location added successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error: ' . $conn->error]);
    }

    // Close connection
    $conn->close();
}
?>