<?php
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message']; // Added a missing semicolon

if (!empty($name) || !empty($email) || !empty($message)) { // Fixed the condition by adding !empty for $message
    $host = "localhost";
    $dbUsername = "root";
    $dbPassword = "tobenna005";
    $dbname = "portfolio-site";

    // Create connection
    $conn = new mysqli($host, $dbUsername, $dbPassword, $dbname);
    if (mysqli_connect_error()) {
        die('Connect Error (' . mysqli_connect_errno() . ')' . mysqli_connect_error());
    } else {
        $SELECT = "SELECT email from register where email = ? limit 1";
        $INSERT = "INSERT Into register (name, email, message) values (?, ?, ?)";

        // Prepare statement
        $stmt = $conn->prepare($SELECT);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->bind_result($email);
        $stmt->store_result();
        $rnum = $stmt->num_rows;

        if ($rnum == 0) {
            $stmt->close();

            $stmt = $conn->prepare($INSERT);
            $stmt->bind_param("sss", $name, $email, $message); // Changed "ssssii" to "sss"
            $stmt->execute();
            echo "New record inserted successfully";
        } else {
            echo "Someone already registered using this email"; // Added a missing semicolon
        }
        $stmt->close();
        $conn->close();
    }
} else {
    echo "All fields are required";
    die(); // Added a missing semicolon and corrected the function name
}
?>
