<?php

include '../includes/db_connection.php';

$conn = getDBConnection();

$sql = "
    SELECT 
        s.Date AS SessionDate,
        s.Time AS SessionTime,
        s.Address AS SessionAddress,
        s.Type AS SessionType,
        t.Name AS TeamName,
        p.FirstName AS CoachFirstName,
        p.LastName AS CoachLastName,
        s.scoreteamA,
        s.scoreteamB,
        cp.FirstName AS PlayerFirstName,
        cp.LastName AS PlayerLastName,
        pf.Role AS PlayerRole

    FROM Session s

    JOIN Teams t ON s.TeamA = t.TeamId

    LEFT JOIN Personnel pc ON t.CoachId = pc.PersonnelRecordId
    LEFT JOIN Person p ON pc.PersonId = p.PersonId

    JOIN PlayedIn pi ON s.SessionId = pi.SessionId AND pi.TeamId = t.TeamId

    LEFT JOIN PlaysFor pf ON t.TeamId = pf.TeamId
    LEFT JOIN ClubMembers cm ON pf.ClubMemberRecordId = cm.ClubMemberRecordId
    LEFT JOIN Person cp ON cm.PersonId = cp.PersonId

    WHERE EXISTS (
        SELECT 1
        FROM Employment e
        WHERE e.LocationId = 1
        AND e.PersonnelId = pc.PersonnelRecordId
    )
    AND s.Date BETWEEN '2024-04-10' AND DATE_ADD('2024-04-10', INTERVAL 6 DAY)

    ORDER BY s.Date ASC, s.Time ASC;

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