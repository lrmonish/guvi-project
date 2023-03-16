<?php


$connect = mysqli_connect('localhost', 'root', '', 'users') or die ('connection Failed');

if ($_SERVER['REQUEST_METHOD'] === 'POST')
    {
    $email = $_POST['email'];
    $password = $_POST['password'];
    $query = "SELECT * FROM users WHERE email='$email' AND password='$password'";
    $result = mysqli_query($connect,$query);
    $count=mysqli_num_rows($result);

    if ($count>0) {
        $res = mysqli_fetch_row($result);
        $response = array(
            'success' => true ,
            'message' => "Login successfully",
            'data' => array(
                'email' => $res[2],
                'password' => $res[3]
            )
        );
        echo json_encode($response);    }
    else
    {

        $response = array(
            'success' => false ,
            'message' => "Login failed"
        );
        echo json_encode($response);    }
}
?>
