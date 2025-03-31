<?php
include '../includes/db_connection.php';

$conn = getDBConnection();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = intval($_POST['id']);
    $name = $conn->real_escape_string($_POST['name']);
    $address = $conn->real_escape_string($_POST['address']);
    $city = $conn->real_escape_string($_POST['city']);
    $province = $conn->real_escape_string($_POST['province']);
    $postal_code = $conn->real_escape_string($_POST['postal_code']);
    $phone = $conn->real_escape_string($_POST['phone_number']);
    $web_address = $conn->real_escape_string($_POST['web_address']);
    $capacity = intval($_POST['capacity']);

    $sql = "UPDATE locations SET 
                name = '$name',
                address = '$address',
                city = '$city',
                province = '$province',
                postal_code = '$postal_code',
                phone = '$phone',
                web_address = '$web_address',
                max_capacity = $capacity
            WHERE id = $id";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(['status' => 'success', 'message' => 'Location updated successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error updating location: ' . $conn->error]);
    }

    $conn->close();
}
?>