<?php
include '../includes/db_connection.php';

$conn = getDBConnection();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = intval($_POST['id']);
    $name = $conn->real_escape_string($_POST['name']);
    $type = $conn->real_escape_string($_POST['type']);
    $address = $conn->real_escape_string($_POST['address']);
    $city = $conn->real_escape_string($_POST['city']);
    $province = $conn->real_escape_string($_POST['province']);
    $postal_code = $conn->real_escape_string($_POST['postal-code']);
    $phone = $conn->real_escape_string($_POST['phone-number']);
    $web_address = $conn->real_escape_string($_POST['web-address']);
    $capacity = intval($_POST['capacity']);

    $sql = "UPDATE Location SET 
                Name = '$name',
                Type = '$type',
                Address = '$address',
                City = '$city',
                Province = '$province',
                PostalCode = '$postal_code',
                MaxCapacity = $capacity,
                PhoneNumbers = '$phone',
                WebAddress = '$web_address'
            WHERE LocationId = $id";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(['status' => 'success', 'message' => 'Location updated successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error updating location: ' . $conn->error]);
    }

    $conn->close();
}
?>