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
    var score = 0;

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
        $(".prehide").css("display", "none");
        var plr1Name = $("#player1name").val();
        var plr2Name = $("#player2name").val();
        $("#name1").append(plr1Name);
        $("p").css("visibility", "visible");
        var arrayCnt = 0;

        for (var i = 0; i < 4; i++) {
            for (var k = 0; k < 6; k++) {
                var card = $("<div></div>").addClass("card");
                card.prepend('<img class="cardimg" src="' + hreftable[arrayCnt] + '" />');
                $("#spillbrett").append(card);
                arrayCnt++;
                if (k == 0) card.css("clear", "left");
                if (k == 0) card.css("margin-left", "258px");
                if (i == 0) card.css("margin-top", "22px");
                card.on("click", clickHandler);
            }
        }
    });

    function clickHandler() {
        if ($(this).attr("class") !== "rett" && $(this).attr("class") !== "valgt" && timer) {
            sjekkliste.push($("img", this).attr("src"));

            $(this).attr("class", "valgt");
            // $("img", this).css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0}, "slow");
            $("img", this).fadeIn(1000);
            timesClicked++;
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
        } else {
            $(".valgt").attr("class", "rett");
            score++;
            $("#score").html("Score: " + score);
        }
        sjekkliste = [];
        timer = true
    }



});