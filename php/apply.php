<?php 

$database="winningt_bloodonr";
$username="winningt_bloodon";
$password="FuzzyHaiti$$";


$conn= mysqli_connect('localhost',$username,$password,$database) or die ("Cant connect to db");

 function sanitize($conn, $item){
 	return mysqli_real_escape_string($conn, $item);
 }

 $data =json_decode(file_get_contents("php://input"), true);
 
 $name= sanitize($conn, $data['hospitalName']);
 $email = sanitize($conn, $data['hospitalEmail']);
 $phone = sanitize($conn, $data['hospitalNo']);

 
$query="INSERT INTO Apply (name ,email, phone) VALUES ('$name', '$email', '$phone')";

$finalprod= mysqli_query($conn, $query) or die ( "Error with query");

mysqli_close($conn);

echo json_encode($data);


/*
// send email
$title= "New Inquiry";
$message= "Email:" . $email . "\r\n  Name:" . $name . "\r\n Phone:" . $phone . "\r\n Services:" . $iserv . "\r\n Portfolio Like:" . $ipack . "\r\n Path:" . $ipath . "\r\n Memo:" . $memo;

mail('abhishek.chowdhury247@gmail.com', $title,$message);
*/
?>