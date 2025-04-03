<?php

include '../includes/db_connection.php';

$conn = getDBConnection();

$sql = "
    SELECT
        l.Name AS LocationName,   
        -- Club Member info
        cm.ClubMemberRecordId,
        cp.FirstName AS ClubMemberFirstName,
        cp.LastName AS ClubMemberLastName,
        cp.DateOfBirth,
        cp.SSN,
        cp.MedicareNum,
        cp.Telephone,
        cp.Address,
        cp.City,
        cp.Province,
        cp.PostalCode,
        -- Secondary Family Member info
        sfm.FirstName AS SecondaryFirstName,
        sfm.LastName AS SecondaryLastName,
        sfm.Telephone AS SecondaryTelephone,

        -- Relationship
        fcr.RelationshipType

        FROM FamilyMembers fm

        -- Get FamilyMember Associations to locations
        LEFT JOIN FamilyMemberAssociation fma 
            ON fm.FamilyRecordId = fma.FamilyRecordId
        LEFT JOIN Location l 
            ON fma.LocationId = l.LocationId

        -- Get Secondary Family Members
        LEFT JOIN Designates d 
            ON fm.FamilyRecordId = d.FamilyRecordId
        LEFT JOIN SecondaryFamilyMember sfm 
            ON d.SecondaryFamilyRecordId = sfm.secFamilyRecordId

        -- Get Club Members linked to this family
        LEFT JOIN FamilyClubRelationship fcr 
            ON fm.FamilyRecordId = fcr.FamilyRecordId
        LEFT JOIN ClubMembers cm 
            ON fcr.ClubMemberRecordId = cm.ClubMemberRecordId
        LEFT JOIN Person cp 
            ON cm.PersonId = cp.PersonId

        WHERE 
            fm.FamilyRecordId = 2;
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