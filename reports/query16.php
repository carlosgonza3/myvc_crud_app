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

    WHERE cm.Status = 'Active'

    AND cm.ClubMemberRecordId IN (
        SELECT pf.ClubMemberRecordId
        FROM PlaysFor pf
        JOIN Session s ON pf.TeamId = s.TeamA OR pf.TeamId = s.TeamB
        WHERE s.Type = 'Game'
        GROUP BY pf.ClubMemberRecordId
        HAVING 
            COUNT(*) >= 1
            AND SUM(
                CASE 
                    WHEN (pf.TeamId = s.TeamA AND s.scoreteamA > s.scoreteamB) OR
                        (pf.TeamId = s.TeamB AND s.scoreteamB > s.scoreteamA)
                    THEN 1 ELSE 0
                END
            ) = COUNT(*)
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