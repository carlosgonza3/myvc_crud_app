<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

$env = parse_ini_file(__DIR__ . '/../.env');


// Check if .env file is loaded properly
if (!$env) {
    die("Error: Unable to load .env file.");
}

// Database Credentials
$host = $env['DB_HOST'];
$user = $env['DB_USER'];
$password = $env['DB_PASSWORD'];
$dbname = $env['DB_NAME'];

function getDBConnection() {

    global $host, $user, $password, $dbname;

    $conn = new mysqli($host, $user, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    return $conn;
}
?>