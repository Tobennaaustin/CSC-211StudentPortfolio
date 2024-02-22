<?php
        include_once 'chance.php';
        if(isset($_POST['submit']))
        {    
             $name = $_POST['name'];
             $email = $_POST['email'];
             $message = $_POST['message'];
             $sql = "INSERT INTO users (name,email,message)
             VALUES ('$name','$email','$message')";
             if (mysqli_query($conn, $sql)) {
                echo "New record has been added successfully !";
             } else {
                echo "Error: " . $sql . ":-" . mysqli_error($conn);
             }
             mysqli_close($conn);
        }      
?>

