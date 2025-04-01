<?php

include '../includes/db_connection.php';

// Create connection
$conn = getDBConnection();

// Check if form is submitted using POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $conn->real_escape_string($_POST['name']);
    $type = $conn->real_escape_string($_POST['type']);
    $address = $conn->real_escape_string($_POST['address']);
    $city = $conn->real_escape_string($_POST['city']);
    $province = $conn->real_escape_string($_POST['province']);
    $postal_code = $conn->real_escape_string($_POST['postal-code']);
    $capacity = intval(value: $_POST['capacity']);
    $phone = $conn->real_escape_string($_POST['phone-number']);
    $web_address = $conn->real_escape_string($_POST['web-address']);

    // Insert query
    $sql = "INSERT INTO Location(Name, Type, Address, City, Province, PostalCode, MaxCapacity, PhoneNumbers, WebAddress) VALUES
        ('$name', '$type', '$address', '$city', '$province', '$postal_code', '$capacity', '$phone', '$web_address')";

    // Check if the query was successful
    if ($conn->query($sql) === TRUE) {
        echo json_encode(value: ['status' => 'success', 'message' => 'Location added successfully']);
    } else {
        echo json_encode(value: ['status' => 'error', 'message' => 'Error: ' . $conn->error]);
    }

    // Close connection
    $conn->close();
}
?>