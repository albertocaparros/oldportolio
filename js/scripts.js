/*jslint browser: true*/
/*global $, location*/
 
// Document ready shorthand statement
$(function () {


    // Select all links with hashes
    $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function (event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 700, function () {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        }
                    });
                }
            }

            return false;
        });

    var language;



    if(window.localStorage.getItem('language') == null){
        if(navigator.language.startsWith("es")){
             window.localStorage.setItem('language', "es");
        }
        else{
             window.localStorage.setItem('language', "en");
        }
    } 
    
    $.ajax({
        url: '/lang/' + window.localStorage.getItem('language') + '.json',
        dataType: 'json',
        async: false,
        dataType: 'json',
        success: function (lang) {
            language = lang
        }
    });

    $.each(language, function (key, value) {
        $('#' + key).text(value);
    })


    $(".idioma").click(function () {
        var actual = window.localStorage.getItem('language');

        console.log(actual);
        
        if (actual == "en") {
            window.localStorage.setItem('language', "es");
        } else {
            window.localStorage.setItem('language', "en");
            language = "en";
        }

        $.ajax({
            url: '/lang/' + window.localStorage.getItem('language') + '.json',
            dataType: 'json',
            async: false,
            dataType: 'json',
            success: function (lang) {
                language = lang
            }
        });

        $.each(language, function (key, value) {
            $('#' + key).text(value);
        })

    });



}); // FIN JS
