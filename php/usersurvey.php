<?php 

$database="winningt_bloodonr";
$username="winningt_bloodon";
$password="FuzzyHaiti$$";


$conn= mysqli_connect('localhost',$username,$password,$database) or die ("Cant connect to db");

 function sanitize($conn, $item){
 	return mysqli_real_escape_string($conn, $item);
 }

 $data =json_decode(file_get_contents("php://input"), true);
 
 
 $phone= sanitize($conn, $data['phone']);
 $email = sanitize($conn, $data['email']);
 $survey = $data['survey'];


function getData($question, $survey){
	$obj= $survey[$question-1];
	if ($obj['no'] == false && $obj['yes']== false)
		return "notused";
	else if ($obj['yes'])
		return "Yes";
	else 
		return "No";
}

$one= getData(1, $survey);
$two= getData(2, $survey);
$three= getData(3, $survey);
$four= getData(4, $survey);
$seven= getData(5, $survey);
$eight = getData(6, $survey);

if ($one == "Yes"){
	$oneyestext=$survey[0]['yestext'];
}
else
	$oneyestext=null;
 
$query="INSERT INTO UserSurvey (email ,phone, one, two, three, four, seven, eight, oneyestext) VALUES ('$email', '$phone', '$one', '$two', '$three', '$four', '$seven', '$eight', '$oneyestext')";

$finalprod= mysqli_query($conn, $query) or die ( mysqli_error());

mysqli_close($conn);


// return statement
echo json_encode([$one, $two, $three, $four, $seven, $eight, $email, $phone]);


/*
// send email
$title= "New Inquiry";
$message= "Email:" . $email . "\r\n  Name:" . $name . "\r\n Phone:" . $phone . "\r\n Services:" . $iserv . "\r\n Portfolio Like:" . $ipack . "\r\n Path:" . $ipath . "\r\n Memo:" . $memo;

mail('abhishek.chowdhury247@gmail.com', $title,$message);
*/
?>