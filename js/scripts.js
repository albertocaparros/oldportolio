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
                    }, 1000, function () {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        };
                    });
                }
            }

            return false; 
        });

(function() {
  var delay = false;
 
  $(document).on('mousewheel DOMMouseScroll', function(event) {
    event.preventDefault();
    if(delay) return;

    delay = true;
    setTimeout(function(){delay = false},50)

    var wd = event.originalEvent.wheelDelta || -event.originalEvent.detail;

    var a= document.getElementsByClassName('scroll'); 
    if(wd < 0) {
      for(var i = 0 ; i < a.length ; i++) {
        var t = a[i].getClientRects()[0].top;
        if(t >= 40) break;
      }
    }
    else {
      for(var i = a.length-1 ; i >= 0 ; i--) {
        var t = a[i].getClientRects()[0].top;
        if(t < -20) break;
      }
    }
    
    if(i >= 0 && i < a.length) {
        console.log(a.length);
      $('html,body').animate({
        scrollTop: a[i].offsetTop
      }, 1000);
    }
  });
})();
    
});

/*
$(document).ready(function () {

    $('#boton-web').mouseenter(function () {
        div = $('div.inicial');
        divMostrar = $("div.web");

        div.hide();
        divMostrar.show(50);
    }).mouseleave(function () {
        div.show(50);
        divMostrar.hide();
    });

    $('#boton-frameworks').mouseenter(function () {
        div = $('div.inicial');
        divMostrar = $("div.frameworks");

        div.hide();
        divMostrar.show(50);
    }).mouseleave(function () {
        div.show(50);
        divMostrar.hide();
    });

});
*/
