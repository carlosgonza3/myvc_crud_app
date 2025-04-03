<?php

include '../includes/db_connection.php';

$conn = getDBConnection();

$sql = "
    SELECT 
    cm.ClubMemberRecordId,
    p.FirstName,
    p.LastName
    FROM 
        ClubMembers cm
    JOIN 
        Person p ON cm.PersonId = p.PersonId
    JOIN 
        Club c ON cm.ClubMemberRecordId = c.ClubMemberRecordId
    WHERE 
        cm.Status = 'Active'
        AND TIMESTAMPDIFF(YEAR, cm.Join_date, CURDATE()) <= 3
    GROUP BY 
        cm.ClubMemberRecordId, p.FirstName, p.LastName
    HAVING 
        COUNT(DISTINCT c.LocationId) >= 3
    ORDER BY 
        cm.ClubMemberRecordId ASC;
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