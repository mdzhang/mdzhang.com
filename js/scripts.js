$(document).ready(function() {

    // smooth scroll to part of page linked to by an anchor link
    $('.anchor-link').click(function(){
        $('html, body').animate({
            scrollTop: $( $(this).attr('href') ).offset().top - $('#section-topbar').height() / 2
        }, 'slow');
        return false;
    });

});