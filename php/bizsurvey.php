<?php 

$database="winningt_bloodonr";
$username="winningt_bloodon";
$password="FuzzyHaiti$$";


$conn= mysqli_connect('localhost',$username,$password,$database) or die ("Cant connect to db");

 function sanitize($conn, $item){
 	return mysqli_real_escape_string($conn, $item);
 }

 $data =json_decode(file_get_contents("php://input"), true);
 
 $fullname= sanitize($conn, $data['fullname2']);
 $email = sanitize($conn, $data['email2']);
 $location = sanitize($conn, $data['location2']);

 
$query="INSERT INTO Prereg (fullname ,email, location) VALUES ('$fullname', '$email', '$location')";

$finalprod= mysqli_query($conn, $query) or die ( mysqli_error());

mysqli_close($conn);

echo json_encode($data);


/*
// send email
$title= "New Inquiry";
$message= "Email:" . $email . "\r\n  Name:" . $name . "\r\n Phone:" . $phone . "\r\n Services:" . $iserv . "\r\n Portfolio Like:" . $ipack . "\r\n Path:" . $ipath . "\r\n Memo:" . $memo;

mail('abhishek.chowdhury247@gmail.com', $title,$message);
*/
?>