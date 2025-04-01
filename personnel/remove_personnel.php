<?php

include '../includes/db_connection.php';

$conn = getDBConnection();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $personId = intval($_POST['PersonId']);

    $sqlPerson = "DELETE FROM Person WHERE PersonId = $personId";

    if ($conn->query($sqlPerson) === TRUE) {
        echo json_encode(['status' => 'success', 'message' => 'Personnel removed successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error deleting personnel: ' . $conn->error]);
    }
    $conn->close();
}

?>