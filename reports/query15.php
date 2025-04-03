<?php

include '../includes/db_connection.php';

$conn = getDBConnection();

$sql = "
    SELECT DISTINCT
        p.FirstName,
        p.LastName,
        p.Telephone

    FROM FamilyMembers fm

    JOIN Person p ON fm.PersonId = p.PersonId
    JOIN FamilyClubRelationship fcr ON fm.FamilyRecordId = fcr.FamilyRecordId
    JOIN ClubMembers cm ON fcr.ClubMemberRecordId = cm.ClubMemberRecordId

    WHERE cm.Status = 'Active'

    -- club member is a captain
    AND cm.ClubMemberRecordId IN (
        SELECT t.Captain
        FROM Teams t
        -- Only if the captain's team has a session
        JOIN Session s ON s.TeamA = t.TeamId OR s.TeamB = t.TeamId
        -- And the team is linked to a location via the coach's employment
        JOIN Personnel per ON t.CoachId = per.PersonnelRecordId
        JOIN Employment e ON per.PersonnelRecordId = e.PersonnelId
        WHERE e.LocationId = 1
    );";

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