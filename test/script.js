function addWheelForm(){
    form = document.getElementById("wheel-form");
    button = document.getElementById("add-button");
    $("#custom").spectrum({
        color: "#339966",
        
        move: function(color) {
            globalColor = color.toHexString();
            setColor(color.toHexString());
        }
    });
    form.style.display = "block";
    button.style.display = "none";
}

function addWheel(){
    title = document.getElementById('title').value;
    if (title == "") {
        alert("Tittel mangler");
        return false;
    }
    form = document.getElementById("wheel-form");
    button = document.getElementById("add-button");
    form.style.display = "none";
    button.style.display = "block";
    parent = document.getElementById("card-contain");
    firstElem = document.createElement("a");
    elem = document.createElement("div");
    color = $("#custom").val;
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            input = JSON.parse(this.responseText);
            s = "<h3 class='card-text card-title'>" + input["Title"] + "</h3>";
            elem.style.backgroundColor = globalColor;
            elem.innerHTML = s;
            elem.className = "card card-fix";
            firstElem.href = "/hjul";
            firstElem.appendChild(elem);
            parent.appendChild(firstElem);
            
            //Scroller mot høyre når det trengs
            var leftPos = $("#wheel-contain").scrollLeft();
            $("#wheel-contain").animate({scrollLeft: leftPos + 300}, 800);
        }
    };
    xhttp.open("GET", "/getCardInfo?title=" + title + "&backgroundColor=" + globalColor.slice(1), true);
    xhttp.send();
  }

function setColor(color){
    $(".colorChoice").css("border", "none");
    $(".colorChoice").css("box-shadow", "none");
    $("#wheel-form").css("background-size", "0% 100%");
    if($("#wheel-form").css("background-image") ===  "none"){
        $("#wheel-form").css("background-image", "linear-gradient(" + color + ", " + color + ") ");
        $("#wheel-form").css("background-size", "100% 100%");
    } else {
        setTimeout(function(){ 
            $("#wheel-form").css("background-image", "linear-gradient(" + color + ", " + color + ") ");
            $("#wheel-form").css("background-size", "100% 100%");
                }, 400);  
    }
}

function loadAnimation(){
    $("#logoBak").css({
        'transform': 'rotate(180deg)',
        "transition": "2s transform"
    });
    
    $("#logoFram").css({
        'transform': 'rotate(-180deg)',
        "transition": "2s transform"
    });
    $("#logoTekst").css({
        "opacity": "1",
        "transition": "2s opacity"
    });
        setTimeout(
            function(){
                $("#logoFram, #logoBak").css({
                    'opacity': '0',
                    "transition": "1s opacity"
                });
                $("#logoTekst").css({
                    "opacity": "0",
                    "transition": "1s opacity"
                });
                $("#dashboardBody").css({
                    "opacity": "1",
                    "transition": "1s opacity"
                });
            }, 2000);
}

 window.onload = function(){
    loadAnimation();


    var globalColor = "#339966";
    //Scroller igjennom alle kortene når vinduet loader
    var leftPos = $("#card-contain").children().length;
    console.log(leftPos);
    $("#wheel-contain").animate({scrollLeft: leftPos * 175}, 800);
 };

