function mockify() {
    var input = document.getElementById("text").value;
    var out = "";

    var k = Math.floor(Math.random() * 3) + 1;
    
    for (i = 0; i < input.length; i++) {
    	console.log(k);
        if (k == 0) {
            out += input[i].toUpperCase();
            k = Math.floor(Math.random() * 3) + 1;
            continue;
        } else if (k > 0) {
        	console.log("hei");
            out += input[i];
            k--;
        }
    }
    document.getElementById("output").innerHTML = out;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}