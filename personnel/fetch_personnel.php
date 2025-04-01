<?php
// Include the database connection file
include '../includes/db_connection.php';

$conn = getDBConnection();

$sql = "
    SELECT 
        p.PersonId,
        p.FirstName,
        p.LastName,
        p.DateOfBirth,
        p.Gender,
        p.SSN,
        p.MedicareNum,
        p.Telephone,
        p.EmailAddress,
        p.Address,
        p.City,
        p.Province,
        p.PostalCode,
        per.PersonnelRecordId,
        per.Role,
        per.Mandate
    FROM 
        Person p
    INNER JOIN 
        Personnel per ON p.PersonId = per.PersonId
";
$result = $conn->query(query: $sql);

$personnel = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $personnel[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($personnel);

$conn->close();
?>