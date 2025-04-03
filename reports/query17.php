<?php

include '../includes/db_connection.php';

$conn = getDBConnection();

$sql = "
    SELECT 
        p.FirstName,
        p.LastName,
        e.StartDate AS TreasurerStartDate,
        e.EndDate AS TreasurerEndDate

    FROM Personnel per

    JOIN Person p ON per.PersonId = p.PersonId
    JOIN Employment e ON e.PersonnelId = per.PersonnelRecordId

    WHERE e.JobTitle = 'Treasurer'

    ORDER BY 
        p.FirstName ASC,
        p.LastName ASC,
        e.StartDate ASC;
    ";

$result = $conn->query($sql);

$results = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $results[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($results);

$conn->close();
?>