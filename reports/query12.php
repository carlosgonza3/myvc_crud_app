<?php

include '../includes/db_connection.php';

$conn = getDBConnection();

$sql = "
    SELECT 
        cm.ClubMemberRecordId,
        p.FirstName,
        p.LastName,
        cm.Age,
        cm.Join_date,
        p.Telephone,
        p.EmailAddress,
        l.Name AS LocationName

    FROM ClubMembers cm

    JOIN Person p ON cm.PersonId = p.PersonId

    JOIN Club c ON cm.ClubMemberRecordId = c.ClubMemberRecordId AND (c.EndDate IS NULL OR c.EndDate > CURDATE())
    JOIN Location l ON c.LocationId = l.LocationId

    -- Exclude members who have any team assignments
    WHERE cm.Status = 'Active'
    AND NOT EXISTS (
        SELECT 1 
        FROM PlaysFor pf 
        WHERE pf.ClubMemberRecordId = cm.ClubMemberRecordId
    )

    ORDER BY 
        l.Name ASC,
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