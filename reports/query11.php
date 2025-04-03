<?php

include '../includes/db_connection.php';

$conn = getDBConnection();

$sql = "
SELECT 
        l.Name AS LocationName,

        -- training sessions
        SUM(CASE WHEN s.Type = 'Training' THEN 1 ELSE 0 END) AS TotalTrainingSessions,

        -- players in training sessions
        SUM(CASE WHEN s.Type = 'Training' THEN pf_count.PlayerCount ELSE 0 END) AS TrainingPlayerCount,

        -- game sessions
        SUM(CASE WHEN s.Type = 'Game' THEN 1 ELSE 0 END) AS TotalGameSessions,

        -- players in game sessions
        SUM(CASE WHEN s.Type = 'Game' THEN pf_count.PlayerCount ELSE 0 END) AS GamePlayerCount

    FROM Session s

    -- team and associated location
    JOIN Teams t ON s.TeamA = t.TeamId
    JOIN Employment e ON t.CoachId = e.PersonnelId
    JOIN Location l ON e.LocationId = l.LocationId

    -- players per session
    LEFT JOIN (
        SELECT 
            pf.TeamId, COUNT(pf.ClubMemberRecordId) AS PlayerCount
        FROM PlaysFor pf
        GROUP BY pf.TeamId
    ) pf_count ON t.TeamId = pf_count.TeamId


    WHERE s.Date BETWEEN '2025-01-01' AND '2025-03-31'

    GROUP BY l.LocationId, l.Name
    HAVING SUM(CASE WHEN s.Type = 'Game' THEN 1 ELSE 0 END) >= 2
    ORDER BY TotalGameSessions DESC;
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