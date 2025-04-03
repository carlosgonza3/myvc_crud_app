<?php

include '../includes/db_connection.php';

$conn = getDBConnection();

$sql = "
    SELECT 
        cm.ClubMemberRecordId,
        p.FirstName,
        p.LastName,
        cm.Age,
        p.Telephone,
        p.EmailAddress,
        l.Name AS LocationName

    FROM ClubMembers cm

    JOIN Person p ON cm.PersonId = p.PersonId


    JOIN Club c ON cm.ClubMemberRecordId = c.ClubMemberRecordId AND (c.EndDate IS NULL OR c.EndDate > CURDATE())
    JOIN Location l ON c.LocationId = l.LocationId

    -- Must be active members
    WHERE cm.Status = 'Active'

    -- Ensure they have only ever played as 'Outside_hitter'
    AND cm.ClubMemberRecordId IN (
        SELECT pf.ClubMemberRecordId
        FROM PlaysFor pf
        GROUP BY pf.ClubMemberRecordId
        HAVING 
            COUNT(*) >= 1
            AND COUNT(DISTINCT pf.Role) = 1
            AND MAX(pf.Role) = 'Outside_hitter'
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