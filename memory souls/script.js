$(document).ready(function () {
    var button = $("#startbutton");
    var timesClicked = 0;
    var pause = true;
    var correct = false;
    var sjekkliste = [];
    var score1 = 0;
    var score2 = 0;
    var totalSeconds = 0;
    var totalMinutes = 0;
    var totalHours = 0;
    var totalSeconds2 = 0;
    var totalMinutes2 = 0;
    var totalHours2 = 0;
    var playerTurn = 0;
    var singlePlayer = false;
    var totalFlips = 0;
    var totalFlips2 = 0;
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
    var player1time = "";
    var player2time = "";


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

    //Comment shuffle function out for easier testing
    shuffle(hreftable);

    button.click(function () {
        //Starts the elapsed time tracker
        setInterval(timeElapsed, 1000);

        sng.loop = true;
        sng.play();

        $(".prehide").css("display", "none");
        var plr1Name = $("#player1name").val();
        var plr2Name = $("#player2name").val();

        if (plr2Name === "") singlePlayer = true;

        $("#name1").append(plr1Name);
        $("#name2").append(plr2Name);


        if (!singlePlayer) $("p").css("visibility", "visible");

        if (singlePlayer) {
            $(".single").css("visibility", "visible");
            $("#turnid1").css("display", "none");
        }

        $("#turnid2").css("display", "none");

        //For iterating image array
        var arrayCnt = 0;

        //Creates tiles/cards
        for (var i = 0; i < 4; i++) {
            for (var k = 0; k < 6; k++) {
                //Cards can have 3 classes, "card": default, "valgt": clicked and waiting for check, "rett": correctly matched
                var card = $("<div></div>").addClass("card");
                card.prepend('<img class="cardimg" src="' + hreftable[arrayCnt] + '" />');
                $("#spillbrett").append(card);
                arrayCnt++;

                if (k == 0) {
                    card.css("clear", "left");
                    card.css("margin-left", "258px");
                }
                if (i == 0) card.css("margin-top", "23px");

                card.on("click", clickHandler);
            }
        }
    });

    function clickHandler() {
        //Checks if card is okay to be clicked
        if ($(this).attr("class") !== "rett" && $(this).attr("class") !== "valgt" && pause) {
            sjekkliste.push($("img", this).attr("src"));
            
            //Class set to "valgt" so it cant be clicked again
            $(this).attr("class", "valgt");
            
            $("img", this).animate({
                height: "97px"
            });

            timesClicked++;

            //Updates flipcounter for player 1 and 2
            if (playerTurn === 0) {
                totalFlips++;
                $("#flipcounter").html("Total flips: " + totalFlips);
            } else {
                totalFlips2++;
                $("#flipcounter2").html("Total flips: " + totalFlips2);
            }
        }


        if (timesClicked == 2) {
            //pause set to false to simulate a pause in the script: no cards can be clicked before sjekk() is complete
            pause = false;
            var timeoutID = setTimeout(sjekk, 1250);
            timesClicked = 0;
        }
    }



    function sjekk() {
        if (sjekkliste[0] !== sjekkliste[1]) {
            $("div.valgt > img").animate({
                height: "0px"
            });
            $(".valgt").attr("class", "card");
            if (!singlePlayer) switchTurn();
        } else {
            $(".valgt").attr("class", "rett");
            if (playerTurn === 0 || singlePlayer) {
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
        pause = true
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

    function timeElapsed() {
        if (playerTurn === 0) {
            totalSeconds++;
            if (totalSeconds === 59) {
                totalSeconds = 0;
                totalMinutes++;
            }

            if (totalMinutes === 59) {
                totalMinutes = 0;
                totalHours++;
            }
            $("#time").html(padTime(totalHours) + ":" + padTime(totalMinutes) + ":" + padTime(totalSeconds));
        }

        if (playerTurn === 1) {
            totalSeconds2++;
            if (totalSeconds2 === 59) {
                totalSeconds2 = 0;
                totalMinutes2++;
            }

            if (totalMinutes2 === 59) {
                totalMinutes2 = 0;
                totalHours2++;
            }
            $("#time2").html(padTime(totalHours2) + ":" + padTime(totalMinutes2) + ":" + padTime(totalSeconds2));
        }
    }

    function padTime(int) {
        var string = int + "";
        if (string.length < 2) {
            return "0" + int;
        }
        return string;
    }

    function endHandler() {
        var endTime = padTime(totalHours) + ":" + padTime(totalMinutes) + ":" + padTime(totalSeconds);
        var endTime2 = padTime(totalHours2) + ":" + padTime(totalMinutes2) + ":" + padTime(totalSeconds2);
        
        if ((score1 + score2) === 12) {
            sng.pause();
            sng2.play();
            $(".rett").fadeOut(3000);
            $(".nameholders").css("display", "none");
            $("#endscreen").fadeIn(4000);
            $("#vinner").css("display", "inline");

            if (singlePlayer) {
                $("#vinner").html("<br>Chosen undead, you won in " + endTime + " and " + totalFlips + " moves. You have succesfully kindled the bonfire");
            } else {
                if (score1 > score2) {
                    $("#vinner").html($("#name1").text() + " is the Chosen Undead. You have successfully kindled the bonfire in " + endTime + " and " + totalFlips2 + " moves!");
                }
                if (score1 < score2) {
                    $("#vinner").html($("#name2").text() + " is the Chosen Undead. You have successfully kindled the bonfire in " + endTime2 + " and " + totalFlips2 + " moves!");
                }
                if (score1 === score2) {
                    $("#vinner").html("You are both the chosen undead. The bonfire has been kindled.");
                }
            }
        }
    }

});