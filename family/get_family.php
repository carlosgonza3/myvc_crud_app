<?php

include '../includes/db_connection.php';

$conn = getDBConnection();

$id = isset($_GET['id']) ? intval($_GET['id']) : null;

if ($id > 0) {
    $sql = "
        SELECT 
            p.PersonId,
            p.FirstName,
            p.LastName,
            p.DateOfBirth,
            p.Gender,
            p.SSN,
            p.MedicareNum,
            p.Telephone,
            p.EmailAddress,
            p.Address,
            p.City,
            p.Province,
            p.PostalCode,
            fam.FamilyRecordId
        FROM 
            Person p
        INNER JOIN 
            FamilyMembers fam ON p.PersonId = fam.PersonId
        WHERE 
            p.PersonId='$id'
    ";
    $result = $conn->query($sql);

    if ($result->num_rows === 1) {
        $personnel = $result->fetch_assoc();
        echo json_encode(['status' => 'success', 'personnel' => $personnel]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Personnel not found.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid ID.']);
}

$conn->close();
?>