/*function tile(source, id){
    this.source = source;
    this.id = id;
    this.valgt = false;
    this.matched = false;
    this.element = '<div class="card" id='+id+'"><img class="cardimg" src='+this.source+'"/>';
}*/

$(document).ready(function () {
    var button = $("#startbutton");
    var timesClicked = 0;
    var timer = true;
    var correct = false;
    var sjekkliste = [];
    var score1 = 0;
    var score2 = 0;
    var totalSeconds = 0;
    var totalMinutes = 0;
    var totalHours = 0;
    var playerTurn = 0;
    var single = false;
    var totalFlips = 0;
    var sng = new Audio("audio/firelink.mp3");
    var sng2 = new Audio("audio/bonfire.mp3");
    var hreftable = [
        "images/asylum.png",
        "images/asylum.png",
        "images/basilisk.png",
        "images/basilisk.png",
        "images/blackknight.jpg",
        "images/blackknight.jpg",
        "images/chim.png",
        "images/chim.png",
        "images/havel.png",
        "images/havel.png",
        "images/hollow.jpg",
        "images/hollow.jpg",
        "images/mimic.png",
        "images/mimic.png",
        "images/mush.png",
        "images/mush.png",
        "images/ornstein.png",
        "images/ornstein.png",
        "images/piggy.png",
        "images/piggy.png",
        "images/nito.png",
        "images/nito.png",
        "images/giant.png",
        "images/giant.png"
    ];
    
    setInterval(timeElapsed, 1000);
    
    
    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    shuffle(hreftable);

    button.click(function () {
        sng.loop = true;
        sng.play();
        $(".prehide").css("display", "none");
        var plr1Name = $("#player1name").val();
        var plr2Name = $("#player2name").val();
        if (plr2Name === "") single = true;
        $("#name1").append(plr1Name);
        console.log($("#name1").text());
        $("#name2").append(plr2Name);
        if(!single) $("p").css("visibility", "visible");
        if(single) {
            $(".single").css("visibility", "visible");
            $("#turnid1").css("display", "none");
        }
        $("#turnid2").css("display", "none");
        var arrayCnt = 0;

        for (var i = 0; i < 4; i++) {
            for (var k = 0; k < 6; k++) {
                var card = $("<div></div>").addClass("card");
                card.prepend('<img class="cardimg" src="' + hreftable[arrayCnt] + '" />');
                $("#spillbrett").append(card);
                arrayCnt++;
                if (k == 0) card.css("clear", "left");
                if (k == 0) card.css("margin-left", "258px");
                if (i == 0) card.css("margin-top", "23px");
                card.on("click", clickHandler);
            }
        }
    });

    function clickHandler() {
        if ($(this).attr("class") !== "rett" && $(this).attr("class") !== "valgt" && timer) {
            sjekkliste.push($("img", this).attr("src"));

            $(this).attr("class", "valgt");
            $("img", this).fadeIn(1000);
            timesClicked++;
            totalFlips++;
            $("#flipcounter").html("Total flips: " + totalFlips);
        }

        if (timesClicked == 2) {
            timer = false;
            var timeoutID = setTimeout(sjekk, 2000);
            timesClicked = 0;
        }
    }



    function sjekk() {
        if (sjekkliste[0] !== sjekkliste[1]) {
            $("div.valgt > img").fadeOut(1000);
            $(".valgt").attr("class", "card");
            if(!single) switchTurn();
        } else {
            $(".valgt").attr("class", "rett");
            if (playerTurn === 0 || single) {
                score1++;
                $("#score1").html("Score: " + score1);
            }
            if (playerTurn === 1) {
                score2++;
                $("#score2").html("Score: " + score2);
            }
            endHandler();
        }
        sjekkliste = [];
        timer = true
    }

    function switchTurn() {
        playerTurn = 1 - playerTurn;
        if (playerTurn === 0) {
            $("#turnid1").css("display", "inline");
            $("#turnid2").css("display", "none");
        } else {
            $("#turnid2").css("display", "inline");
            $("#turnid1").css("display", "none");
        }
    }
    
    function timeElapsed(){

        totalSeconds++;
        if (totalSeconds === 59){
            totalSeconds = 0;
            totalMinutes++;
        }
        
        if (totalMinutes === 59){
            totalMinutes = 0;
            totalHours++;
        }
        
        $("#time").html(padTime(totalHours) + ":" + padTime(totalMinutes) + ":" + padTime(totalSeconds));
    }
    
    function padTime(int){
        var string = int + "";
        if(string.length < 2){
            return "0" + int;
        }
        return string;
    }

    function endHandler(){
        var endTime = padTime(totalHours) + ":" + padTime(totalMinutes) + ":" + padTime(totalSeconds);
        if((score1 + score2) === 12){
            sng.pause();
            sng2.play();
            $(".rett").fadeOut(3000);
            $(".nameholders").css("display","none");
            $("#trackerdiv").css("display","none");
            $(".black").fadeOut(4000);
            $("#endscreen").fadeIn(4000);
            $("#vinner").css("display","inline");
            $("#vinner").html("Chosen undead, you won in " + endTime + " and " + totalFlips + " moves. You have succesfully kindled the bonfire");
        
            if(single){
                $("#vinner").html("<br>Chosen undead, you won in " + endTime + " and " + totalFlips + " moves. You have succesfully kindled the bonfire");
            } else {
                if(score1 > score2){
                    $("#vinner").html($("#name1").text() + " is the Chosen Undead. You have successfully kindled the bonfire");
                }
                if(score1 < score2){
                    $("#vinner").html($("#name2").text() + " is the Chosen Undead. You have successfully kindled the bonfire");
                }
                if(score1 === score2){
                    $("#vinner").html("You are both the chosen undead. The bonfire has been kindled.");
                }
            }
        }
    }

});