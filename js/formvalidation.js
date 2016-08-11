/* **README- mAdE bY deLLySOuL **
	FormValidation Framework  - Stage 1
	Stage 1) Vanilla JS/ JQuery for Form Validation
	Stage 2) ReactJS for Form Validation

	Directions: Add all inputs as locations. Write all validations for each input as validations following proper format. Add ajaxinfo for ajax. 

	External Variables:
	    numberofforms
		locations
		validations
		ajaxinfo
	
	HTML Dependencies- Input must consist of "id" + Span for iderror
	CSS Dependencies- CSS must have .input and .input-error class

	Constants:
		Regexpression
			email
			phone

	Function:
		findLocation
		matchValidations
		displayMessage

	Checks Library-
		check- Master check
		checkLength- Length Based checks
			- not null, less than, greater than, less than equal, greater than equal, equal
		checkReg - Reg Expression based Checks
			- email, phone	


	API:
		// Call these functions:
		validate('x') 
			- x is the input point of reference
			- based on type, it maps input to library of checks
			- if not valid (& success message), shows error and returns false
			- if valid (& success message), shows success and returns success

		// Submit form with: 
		sendAjax() 
			- gate all inputs
			- fire AJAX	

		// Custom Data
		locations- location object
		validations- validations of location
*/

// Reg Expressions
	const emailreg=/^[a-zA-Z0-9\._]*@[a-zA-Z0-9]{4,40}\.[a-zA-Z]{2,5}$/;
	const phonereg=/^[0-9]{10,10}$/;
	const charactersreg=/^[a-zA-Z]*$/;
	const nospecialcharreg=0;
	const fullnamereg=0;

// API Functions
function validate(x){
	// get the input 
	var location= findLocation(x);

	// find all matching validations
	var validations= matchValidations(location);
	console.log(validations);

	// check each validation
	var isgood= true;
	for (var i=0; i<validations.length; i++){
	  console.log('checking '+validations[i].validation +' '+ validations[i].operator + ' for '+ location.id);
	  // if check fails
	  if (!check(validations[i])){
	      isgood=false;
	      return isgood;
	    }
	}
}


// Black Box Functions

// Finds DOM id location of input
function findLocation(x){
	for (var i=0; i<locations.length; i++){
	  if (locations[i].id == x)
	    return locations[i];
	}
	return 0;
}

// Finds validations matching input
function matchValidations(location){
	console.log(location);
	var matches=[];
	for (var i=0; i<validations.length; i++){
	  if (validations[i].id == location.id)
	    matches.push(validations[i]);
	}
	return matches;
}

// display error message - dependencies is input and inputerror class
function displayMessage(id, message, color){
	var spanid=id+"error";
	console.log(spanid);
	var span= document.getElementById(spanid);
	span.innerHTML=message;	
	span.style.color=color;

	if (color == 'red'){
		document.getElementById(id).classList.add('inputerror');
		document.getElementById(id).classList.remove('input');
	}
	else{
		document.getElementById(id).classList.add('input');
		document.getElementById(id).classList.remove('inputerror');
	}
}

// Checks 
// reg expression based checks
function checkReg(id, reg){
	 // get value and sanitize it
	 var value= document.getElementById(id).value;
	 //value= getSanitizedNumber(value);
	 var flag=false;
	 switch(reg){
	 	case "email":
	 		console.log("checking email");
	 		console.log(value.match(emailreg));
	 		if (value.match(emailreg) != null) // check email
	 		{
	 			flag= true;
	 			displayMessage(id, '', 'black')
	 			console.log('matches email');
	 		}
	 		else{
	 			flag = false;
	 			displayMessage(id, 'Must Add a Valid Email!', 'red')
	 			console.log('no match email');
	 		}
	 		break;
	 	case "phone":
	 		if (value.match(phonereg) != null) // check phone
	 		{
	 			flag= true;
	 			displayMessage(id, '', 'black')

	 		}
	 		else{
	 			flag = false;
	 			console.log('no match phone');
	 			displayMessage(id, 'Must be Valid 10 Digit US Phone Number!', 'red')
	 		}
	 		break;
	 	default:
	 	break;
	 }
	 return flag;
}

// length base checks
function checkLength(id, op, num){
 // get value and sanitize it
 var value= document.getElementById(id).value;
 //value= getSanitizedNumber(value);

 var flag=false;
 switch(op){
  case "notnull":
    if (value.length > 0){
      flag=true;
      displayMessage(id,"",'black');
      console.log('not null success message');
    }
    else{
      // error message display
      displayMessage(id, "Can't leave this blank!", 'red');
      console.log('not null error message');
    }
    break;
  case "less":
    if (value.length < num){                  
      console.log('less success');
      flag= true;
    }
    else{
      console.log('less error');
    }
    break;
  case "great":
    if (value.length > num){
      console.log('great success');
      flag= true;
    }
    else{
      console.log('great error');
    }
    break;
  case "eq":
    if (value.length == num){
      console.log('eq success');
      flag= true;
    }
    else{
      console.log('eq error');
    }
    break;
  case "leq":
    if (value.length <= num){
      displayMessage(id,"",'black');
      flag= true;
    }
    else{
      displayMessage(id," Too long, Only "+num+ " characters allowed",'red');
      console.log('leq error');
    }

    break;
  case 'geq':
    if (value >= num)
      flag= true;
    break;
 default:
  break;
 }
 return flag;
}

function check(v){ 
	// checks for validations
	var answer;
	switch (v.validation){
	  case "length":  // check for length of value
	    answer= checkLength(v.id, v.operator, v.number);
	    break;
	  case "reg": // check for regular expression match
	    answer= checkReg(v.id, v.reg);
	    break;

	  default:
	    answer=false;
	    break;
	}
	return answer;
}

// VAlidate and AJAX

function getFormLocations(form){
 	var formlocations= [];
     for (var i=0; i<locations.length; i++){
     	if (locations[i].form == form){
     		formlocations.push(locations[i]);
     	}
     }
    return formlocations;
}


function validateForm(form, formlocations){
     // find matching validations
     var formvalidations= [];
     for (var i=0; i<formlocations.length; i++){
     	for (var j=0; j< validations.length; j++){
     		if (validations[j].id == formlocations[i].id){
     			formvalidations.push(validations[j]);
     		}
     	}
     }
     console.log('formvalidations are');
     console.log(formvalidations);
     // check validations
     for (var i=0; i< formvalidations.length; i++){
	    if (check(formvalidations[i]) == false){
	      return false;
	    }
     }
     return true;
}

 function sendAjax(form){
 	var formlocations = getFormLocations(form);
 	console.log(formlocations);
    var flag= validateForm(form, formlocations);      

           // if flag is good, get data and send request
      if (flag){
        data={};
        for (var i=0; i< formlocations.length; i++){
          var value= document.getElementById(formlocations[i].id).value
          // sanitize value
          data[formlocations[i].id]= value;
        }
        console.log(form);
        $.ajax({
        data: JSON.stringify(data),
        url: ajaxinfo[form-1].url,
        type: ajaxinfo[form-1].type,
        contentType: "application/json",
        dataType: "json",
        success: function ( data ) {
            window.location.href=ajaxinfo[form-1].redirect;
        },
        error: function(data){
           //displayMessage(data.id, data.message, 'red');
        }
    });

      }    
    }

