var idnumber = 0;

var contactList = [new Entry("Test Navn", "12345678", "test@mail.com"), new Entry("Ola Nordmann", "87654321", "mail@test.com"), 
				   new Entry("Dan Harmon", "18273645", "dan@harmontown.com")];


function Entry(name, tel, email){
	this.id = idnumber++;
	this.name = name;
	this.tel = tel;
	this.email = email;
}

function addEntry(index){
	var enteredName = document.getElementById("name").value;
	var enteredTel = document.getElementById("tel").value;
	var enteredEmail = document.getElementById("email").value;
	var validated = true;
	document.getElementById("entry").reset();

	validated = validate(enteredName, enteredTel, enteredEmail);

	if (validated){
		var newentry = new Entry(enteredName, enteredTel, enteredEmail);
		contactList.push(newentry);	
		printEntry();
	    return false;
	}
	return false;
}

function validate(name, tel, email){
	var validated = true;
	if (!name){
		alert("Name must be filled out");
		validated = false;

	}

	if (!tel && !email){  //checks if neither tel or email is entered
		alert("Either Telephone or Email has to be filled out");
		validated = false;
	}

	if (!validateEmail(email) && email){  //checks email and checks if email is entered
		alert("Email is not valid.");
		validated = false;
	}

	if (!validateTel(tel) && tel){  //checks tel and if tel is entered
		alert("Telephone is not valid. Format has to be XXXXXXXX, XX XX XX XX, XXX XX XXX");
		validated = false;
	}
	return validated;
}

function validateEmail(email){
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateTel(telTest){
	//var telTest = parseInt(tel);
	var reg1 = /^\(?([0-9]{3})\)?[ ]([0-9]{2})[ ]([0-9]{3})$/; //xxx xx xxx
	var reg2 = /^\(?([0-9]{2})\)?[ ]([0-9]{2})[ ]([0-9]{2})[ ]([0-9]{2})$/; //xx xx xx xx
	var reg3 = /^\(?^([0-9]{8})$/; //xxxxxxxx
	
	if (!reg1.test(telTest) && !reg2.test(telTest) && !reg3.test(telTest)){
		return false;
	}
	return true;
}

function printEntry(){
	var content = document.getElementById("listwrapper");
	listwrapper.innerHTML="";
	contactList.forEach( function(arrayItem){
	    listwrapper.innerHTML+='<div class="listentry" id="id'+arrayItem.id+'"><h3 class="entryobject">' + arrayItem.name + '</h3>' 
	    + '<p class="entryobject">' + arrayItem.tel + '</p>' + '<a href="mailto: class="entryobject"'+arrayItem.email+'+ " class="entryobject">'
	    +arrayItem.email+'</a><span class="fa fa-remove fa-lg remove" onclick="removeEntry('+arrayItem.id+')"> \
	    </span><span class="fa fa-edit fa-lg edit" onclick="modifyEntry('+arrayItem.id+')"> </span></div>';
	});
	return true;
}

function printSearch(){
	var filter = document.getElementById("search").value;
	var content = document.getElementById("listwrapper");
	listwrapper.innerHTML="";
	contactList.forEach( function(arrayItem){
		if (arrayItem.name.toLowerCase().match(filter.toLowerCase()) || 
			arrayItem.tel.match(filter) ||
			arrayItem.email.toLowerCase().match(filter.toLowerCase())) {
	    listwrapper.innerHTML+='<div class="listentry" id="id'+arrayItem.id+'"><h3 class="entryobject">' + arrayItem.name + '</h3>' 
	    + '<p class="entryobject">' + arrayItem.tel + '</p>' + '<a href="mailto: class="entryobject"'+arrayItem.email+'+ " class="entryobject">'
	    +arrayItem.email+'</a><span class="fa fa-remove fa-lg remove" onclick="removeEntry('+arrayItem.id+')"> \
	    </span><span class="fa fa-edit fa-lg edit" onclick="modifyEntry('+arrayItem.id+')"> </span></div>';
	}
	});
}

window.onload = init;

function init(){
	printEntry();
}

function addField(){
	var inputramme = document.getElementById("input");
	inputramme.innerHTML = '<div id="verktoy">\
				<input type="text" name="search" id="search" placeholder="Search..." oninput="printSearch()" />\
				<span id="sortButton" class="fa fa-sort fa-lg"></span>\
				<select name="sort" id="sort">\
					<option value="1">Name</option>\
					<option value="2">Telephone</option>\
					<option value="3">Email</option>\
				</select>\
			<span id="plus" class="fa fa-minus-square-o fa-lg" onclick="removeField()"></span>\
			<span id="settings" class="fa fa-cog fa-lg"></span><hr>\
		</div>\
	<h2>Add entry</h2>\
		<form name="entry" id="entry">\
			<label for="name">Name:  </label> \
			<input type="text" name="name" id="name" class="entryinput" /><br/>\
			<label for="tel">Tel: </label>\
			<input type="text" name="tel" id="tel" class="entryinput"> <br/>\
			<label for="email">Email: </label>\
			<input type="text" name="email" id="email" class="entryinput"> <br/>\
			<button name="add" onclick="return addEntry();">Add</button>\
		</form>';
}

function removeField(){
	var inputramme = document.getElementById("input");
	inputramme.innerHTML = '<div id="verktoy">\
				<input type="text" name="search" id="search" placeholder="Search..." oninput="printSearch()" />\
				<span id="sortButton" class="fa fa-sort fa-lg"></span>\
				<select name="sort" id="sort">\
					<option value="1">Name</option>\
					<option value="2">Telephone</option>\
					<option value="3">Email</option>\
				</select>\
			<span id="plus" class="fa fa-plus-square-o fa-lg" onclick="addField()"></span>\
			<span id="settings" class="fa fa-cog fa-lg"></span><hr>\
		</div>';
}

function removeEntry(idnumberNow){
	if (confirm('Are you sure you want to delete this entry?')){
		var listItem = findItem(idnumberNow);
		contactList.splice(contactList.indexOf(listItem),1);
		printEntry();	
	} else {
		return false;
	}
}

function modifyEntry(idnumberNow){
	var listItem = findItem(idnumberNow);
	var inputramme = document.getElementById("input");
	inputramme.innerHTML = '<div id="verktoy">\
				<input type="text" name="search" id="search" placeholder="Search..." oninput="printSearch()" />\
				<span id="sortButton" class="fa fa-sort fa-lg"></span>\
				<select name="sort" id="sort">\
					<option value="1">Name</option>\
					<option value="2">Telephone</option>\
					<option value="3">Email</option>\
				</select>\
			<span id="plus" class="fa fa-minus-square-o fa-lg" onclick="removeField()"></span>\
			<span id="settings" class="fa fa-cog fa-lg"></span><hr>\
		</div>\
		<h2>Add entry</h2>\
		<form name="entry" id="entry">\
			<label for="name">Name:  </label> \
			<input type="text" name="name" id="name" class="entryinput" value="'+listItem.name+'" /><br/>\
			<label for="tel">Tel: </label>\
			<input type="text" name="tel" id="tel" class="entryinput" value="'+listItem.tel+'"> <br/>\
			<label for="email">Email: </label>\
			<input type="text" name="email" id="email" class="entryinput" value="'+listItem.email+'"> <br/>\
			<button name="modify" onclick="return pushModify('+listItem.id+');">Modify</button>\
		</form>';
}

function pushModify(idnumberNow){
	var validated = true;
	var listItem = findItem(idnumberNow);
	enteredName = document.getElementById("name").value;
	enteredTel = document.getElementById("tel").value;
	enteredEmail = document.getElementById("email").value;
	validated = validate(enteredName, enteredTel, enteredEmail);
	if (validated){
		listItem.name = enteredName;
		listItem.tel = enteredTel;
		listItem.email = enteredEmail;
		printEntry();
		confirmModify();
	}

	return false;
}

function confirmModify(){
	var inputramme = document.getElementById("input");
	inputramme.innerHTML = '<div id="verktoy">\
				<input type="text" name="search" id="search" placeholder="Search..." oninput="printSearch()" />\
				<span id="sortButton" class="fa fa-sort fa-lg"></span>\
				<select name="sort" id="sort">\
					<option value="1">Name</option>\
					<option value="2">Telephone</option>\
					<option value="3">Email</option>\
				</select>\
			<span id="plus" class="fa fa-plus-square-o fa-lg" onclick="addField()"></span>\
			<span id="settings" class="fa fa-cog fa-lg"></span><hr>\
		</div>\
			<h2>Modification successfull!</h2>';
}


function findItem(idnumberNow){
	var listItem;
	contactList.forEach(function(arrayItem){
		if (arrayItem.id === idnumberNow){
			listItem = arrayItem;
		}
	});
	return listItem;
}