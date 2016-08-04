<?php 

$database="winningt_bloodonr";
$username="winningt_bloodon";
$password="FuzzyHaiti$$";


$data =json_decode(file_get_contents("php://input"), true);

$conn= mysqli_connect('localhost',$username,$password,$database) or die ("Cant connect to db");

 function sanitize($conn, $item){
 	return mysqli_real_escape_string($conn, $item);
 }

 
 $fullname= sanitize($conn, $data['fullname2']);
 $email = sanitize($conn, $data['email2']);
 $location = sanitize($conn, $data['location2']);

 
$query="INSERT INTO Prereg (fullname ,email, location) VALUES ('$fullname', '$email', '$location')";

$finalprod= mysqli_query($conn, $query) or die ( mysqli_error());

mysqli_close($conn);

echo json_encode($data);


// send email to applicant
ini_set( 'SMTP', 'localhost' ); // must be set to your own local ISP
ini_set( 'smtp_port', '25' ); // assumes no authentication (passwords) required
ini_set('sendmail_from','socialmedia@bloodonr.com');


$title = "Welcome to BlooDonR";
$message= "Hello " . $fullname . ",<br/>" . "Welcome to BlooDonR! We will keep you up to date with the latest progress as we build towards our MVP launch. <br/>" . "If you would like to be included to our beta group, please join at http://www.bloodonr.com/usersurvery.html <br/>" . "Thanks, <br/> The BlooDonR Team"; 

// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n". "X-MSMail-Priority: High";

// More headers
$headers .= "\r\n". 'X-Mailer: PHP/' . phpversion();

mail($email, $title, $message, $headers, "-fsocialmedia@bloodonr.com");

/*
// send email to me
$title= "New Inquiry";
$message= "Email:" . $email . "\r\n  Name:" . $name . "\r\n Phone:" . $phone . "\r\n Services:" . $iserv . "\r\n Portfolio Like:" . $ipack . "\r\n Path:" . $ipath . "\r\n Memo:" . $memo;

mail('abhishek.chowdhury247@gmail.com', $title,$message);
*/
?>