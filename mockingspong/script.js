function mockify(){
	input = document.getElementById("text").value;
	result = ""
	for(i = 0; i < input.length; i++){
		k = getRndInteger(1, 3);
		if(i !== 0){
			if(input[i] == input[i].toLowerCase()) result += input[i].toUpperCase();
			if(input[i] == input[i].toUpperCase()) result += input[i].toLowerCase();
		} else {
			result += input[i].toLowerCase();
		}
		
		for(n = 1; n <= k; n++){
			console.log(input[i+n]);
			if(i+n < input.length){
				result += input[i+n];
			}
		}

		i += k;
	}
	console.log(result);
	document.getElementById("output").innerHTML = result;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}