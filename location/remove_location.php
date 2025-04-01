<?php

include '../includes/db_connection.php';

// Create connection
$conn = getDBConnection();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $conn->real_escape_string($_POST['id']);

    // Insert query
    $sql = "DELETE FROM Location WHERE LocationId=$id";

    // Check if the query was successful
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['status' => 'success', 'message' => 'Location removed successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error: ' . $conn->error]);
    }

    // Close connection
    $conn->close();
}

?>