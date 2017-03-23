function dropdown() {
    $("#dropmenu").toggleClass("show");
    if ($(".menulogo").hasClass("fa-bars")) {
        $(".menulogo").attr('class', "fa fa-times fa-lg menulogo");
    } else {
        $(".menulogo").attr('class', "fa fa-bars fa-lg menulogo");
    }

}

function pulse() {
    $("#vine").
    animate({
        opacity: 0.2
    }, 1000, 'linear').
    animate({
        opacity: 1
    }, 1000, 'linear', pulsate);
}