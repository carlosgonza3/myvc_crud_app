<?php

include '../includes/db_connection.php';

$conn = getDBConnection();

$sql = "
    SELECT 
    l.LocationId,
    l.Name AS LocationName,
    l.Address,
    l.City,
    l.Province,
    l.PostalCode,
    l.PhoneNumbers,
    l.WebAddress,
    l.Type,
    l.MaxCapacity,
    
    CONCAT(p.FirstName, ' ', p.LastName) AS GeneralManagerName,
    
    COUNT(DISTINCT c.ClubMemberRecordId) AS NumClubMembers

    FROM Location l

    --  personnel
    LEFT JOIN Employment e ON l.LocationId = e.LocationId AND e.JobTitle = 'General Manager' AND e.EndDate IS NULL

    --  GM's name
    LEFT JOIN Personnel pr ON e.PersonnelId = pr.PersonnelRecordId
    LEFT JOIN Person p ON pr.PersonId = p.PersonId

    --  count members
    LEFT JOIN Club c ON l.LocationId = c.LocationId

    GROUP BY 
        l.LocationId, l.Name, l.Address, l.City, l.Province, l.PostalCode, 
        l.PhoneNumbers, l.WebAddress, l.Type, l.MaxCapacity, p.FirstName, p.LastName

    ORDER BY 
        l.Province ASC,
        l.City ASC
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