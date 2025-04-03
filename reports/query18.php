<?php

include '../includes/db_connection.php';

$conn = getDBConnection();

$sql = "
    SELECT 
        p.FirstName,
        p.LastName,
        p.Telephone,
        p.EmailAddress,

        -- approx deactivation date (18th birthday + 1 year)
        DATE_ADD(p.DateOfBirth, INTERVAL 19 YEAR) AS DeactivationDate,
        
        l.Name AS LastLocationName,
        pf.Role AS LastRole

    FROM ClubMembers cm

    JOIN Person p ON cm.PersonId = p.PersonId
    LEFT JOIN Club c ON cm.ClubMemberRecordId = c.ClubMemberRecordId
    LEFT JOIN Location l ON c.LocationId = l.LocationId
    LEFT JOIN (
        SELECT pf1.ClubMemberRecordId, pf1.Role
        FROM PlaysFor pf1
        JOIN (
            SELECT ClubMemberRecordId, MAX(TeamId) AS MaxTeam
            FROM PlaysFor
            GROUP BY ClubMemberRecordId
        ) latest ON pf1.ClubMemberRecordId = latest.ClubMemberRecordId AND pf1.TeamId = latest.MaxTeam
    ) pf ON cm.ClubMemberRecordId = pf.ClubMemberRecordId

    WHERE 
        cm.Status = 'Inactive'
        AND cm.Age > 18

    ORDER BY 
        l.Name ASC,
        pf.Role ASC,
        p.FirstName ASC,
        p.LastName ASC;
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