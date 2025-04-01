<?php

include '../includes/db_connection.php';

$conn = getDBConnection();

$id = isset($_GET['id']) ? intval($_GET['id']) : null;

if ($id > 0) {
    $sql = "SELECT * FROM Location WHERE LocationId='$id'";
    $result = $conn->query($sql);

    if ($result->num_rows === 1) {
        $location = $result->fetch_assoc();
        echo json_encode(['status' => 'success', 'location' => $location]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Location not found.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid ID.']);
}

$conn->close();
?>