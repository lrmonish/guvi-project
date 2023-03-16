<?php

$conn = mysqli_connect('localhost', 'root', '', 'users');


if (mysqli_connect_error()) {

    $response = array(
        'error' => "Server error"
    );
    echo "{'success':'false'}";
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    $stmt = mysqli_prepare($conn, "INSERT INTO users (name, email, password) VALUES (?, ?, ?)");

    mysqli_stmt_bind_param($stmt, "sss", $name, $email, $password);

    if (mysqli_stmt_execute($stmt)) {

        $response = array(
            'success' => true ,
            'message' => "Registered successfully"
        );
        echo json_encode($response);

    } else {
        $response = array(
            'status' => "Error inserting data: " . mysqli_error($conn)
        );
        echo json_encode($response);
    }

    mysqli_stmt_close($stmt);
    mysqli_close($conn);

}
?>