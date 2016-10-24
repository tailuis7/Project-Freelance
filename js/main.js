$(document).ready(function() {

    var maxHeight = $('.navbar-default').height();
    $('#banner_backing').height(maxHeight);

    /*var maxProjectWidth = -1;
    $('.project img').each(function() {
        maxProjectWidth = maxProjectWidth > $(this).width() ? maxProjectWidth : $(this).width();
    });
    $('.project_image_overlay').width(maxProjectWidth);*/


    $(document).scroll(function() {
        if ($(this).scrollTop() > 0) {
            $('#banner_backing').css({ "opacity": "0" });
        }
        if ($(this).scrollTop() > 20) {
            $('#banner_backing').css({ "opacity": "0.2" });
        }
        if ($(this).scrollTop() > 30) {
            $('#banner_backing').css({ "opacity": "0.4" });
        }
        if ($(this).scrollTop() > 40) {
            $('#banner_backing').css({ "opacity": "0.5" });
        }
        if ($(this).scrollTop() > 80) {
            $('#banner_backing').css({ "opacity": "0.6" });
        }
        if ($(this).scrollTop() > 90) {
            $('#banner_backing').css({ "opacity": "0.7" });
        }
        if ($(this).scrollTop() > 100) {
            $('#banner_backing').css({ "opacity": "0.9" });
        }
    });
});
