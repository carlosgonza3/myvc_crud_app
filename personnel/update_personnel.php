<?php
include '../includes/db_connection.php';

$conn = getDBConnection();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $personId = intval($_POST['PersonId']);
    $firstName = $conn->real_escape_string($_POST['FirstName']);
    $lastName = $conn->real_escape_string($_POST['LastName']);
    $dateOfBirth = $conn->real_escape_string($_POST['DateOfBirth']);
    $gender = $conn->real_escape_string($_POST['Gender']);
    $ssn = $conn->real_escape_string($_POST['SSN']);
    $medicareNum = $conn->real_escape_string($_POST['MedicareNum']);
    $telephone = $conn->real_escape_string($_POST['Telephone']);
    $emailAddress = $conn->real_escape_string($_POST['EmailAddress']);
    $address = $conn->real_escape_string($_POST['Address']);
    $city = $conn->real_escape_string($_POST['City']);
    $province = $conn->real_escape_string($_POST['Province']);
    $postalCode = $conn->real_escape_string($_POST['PostalCode']);
    $role = $conn->real_escape_string($_POST['Role']);
    $mandate = $conn->real_escape_string($_POST['Mandate']);

    $conn->begin_transaction();

    try {
        $sqlPerson = "
            UPDATE Person SET 
                FirstName = '$firstName',
                LastName = '$lastName',
                DateOfBirth = '$dateOfBirth',
                Gender = '$gender',
                SSN = '$ssn',
                MedicareNum = '$medicareNum',
                Telephone = '$telephone',
                EmailAddress = '$emailAddress',
                Address = '$address',
                City = '$city',
                Province = '$province',
                PostalCode = '$postalCode'
            WHERE PersonId = $personId
        ";

        if (!$conn->query($sqlPerson)) {
            throw new Exception('Error updating Person: ' . $conn->error);
        }

        $sqlPersonnel = "
            UPDATE Personnel SET 
                Role = '$role',
                Mandate = '$mandate'
            WHERE PersonId = $personId
        ";

        if (!$conn->query($sqlPersonnel)) {
            throw new Exception('Error updating Personnel: ' . $conn->error);
        }

        $conn->commit();
        echo json_encode(['status' => 'success', 'message' => 'Personnel updated successfully']);
    } catch (Exception $e) {
        $conn->rollback();
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }

    $conn->close();
}
?>