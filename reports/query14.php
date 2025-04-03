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

    -- Active members only
    WHERE cm.Status = 'Active'

    -- member has played all 7 roles in sessions
    AND cm.ClubMemberRecordId IN (
        SELECT pf.ClubMemberRecordId
        FROM PlaysFor pf
        JOIN Session s ON pf.TeamId IN (s.TeamA, s.TeamB)
        WHERE s.Type = 'Game'
        GROUP BY pf.ClubMemberRecordId
        HAVING 
            COUNT(DISTINCT pf.Role) = 7
            AND SUM(pf.Role = 'Outside_hitter') > 0
            AND SUM(pf.Role = 'Opposite') > 0
            AND SUM(pf.Role = 'Setter') > 0
            AND SUM(pf.Role = 'Middle_blocker') > 0
            AND SUM(pf.Role = 'Libero') > 0
            AND SUM(pf.Role = 'Defensive_specialist') > 0
            AND SUM(pf.Role = 'Serving_specialist') > 0
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