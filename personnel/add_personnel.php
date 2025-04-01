<?php

include '../includes/db_connection.php';

$conn = getDBConnection();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    $firstName = $_POST['FirstName'];
    $lastName = $_POST['LastName'];
    $dateOfBirth = $_POST['DateOfBirth'];
    $gender = $_POST['Gender'];
    $ssn = $_POST['SSN'];
    $medicareNum = $_POST['MedicareNum'];
    $telephone = $_POST['Telephone'];
    $emailAddress = $_POST['EmailAddress'];
    $address = $_POST['Address'];
    $city = $_POST['City'];
    $province = $_POST['Province'];
    $postalCode = $_POST['PostalCode'];

    $role = $_POST['Role'];
    $mandate = $_POST['Mandate'];

    $conn->begin_transaction();
    try {
        $stmtProcedure = $conn->prepare("CALL AddPersonnel(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmtProcedure->bind_param("ssssssssssssss", $firstName, $lastName, $dateOfBirth, $gender, $ssn, $medicareNum, $telephone, $emailAddress, $address, $city, $province, $postalCode, $role, $mandate);

        if (!$stmtProcedure->execute()) {
            throw new Exception('Error executing AddPersonnel procedure: ' . $stmtProcedure->error);
        }

        $conn->commit();
        echo json_encode(['status' => 'success', 'message' => 'Personnel added successfully']);
    } catch (Exception $e) {
        $conn->rollback();
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }

    $stmtProcedure->close();
    $conn->close();
}
?>