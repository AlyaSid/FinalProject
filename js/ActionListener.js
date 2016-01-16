$(window).load(function () {
    $('#fullScreen, #save, #undo, #new').hover(
        function() {
            $(this).find('i').animate({color: "#FFFFFF"},400);
            $(this).find('span').fadeToggle(400);
        },
        function() {
            $(this).find('i').animate({color: "#2F4F4F"},400);
            $(this).find('span').fadeToggle(400);
    });

    $('#control').hover(
        function(){
            $(this).find('i').animate({color: "#FFFFFF"},400);
            $(this).find('span').fadeToggle(400);
        },
        function() {
            $(this).find('i').animate({color: "#00BFFF"},400);
            $(this).find('span').fadeToggle(400);
    });

    $('#backgroundColors div, #penColors div').hover(
        function() {
            var newWidth = ($(this).width() * 1.1) + 'px';
            var newHeight = ($(this).height() * 1.1) + 'px';
            $(this).css({opacity: 1, width: newWidth, height: newHeight});
        },
        function() {
            var newWidth = ($(this).width() / 1.1) + 'px';
            var newHeight = ($(this).height() / 1.1) + 'px';
            $(this).css({opacity: 0.7, width: newWidth, height: newHeight});
        });

    $('#mirrorMode, #spiralMode').hover(
        function() {
            $(this).animate({color: "#FFFFFF"},400);
        },
        function() {
            $(this).animate({color: "#696969"},400);
        });

    $('#mirrorMode').click(
        function() {
            $(this).find('.state-on, .state-off').toggle();
            picture.changeMirrorMode();
        });

    $('#spiralMode').click(
        function() {
            $(this).find('.state-on, .state-off').toggle();
            picture.changeSpiralMode();
        });

    $('#control').click(
        function() {
            $('#modePanel').fadeToggle(1000);
        }
    );

    $('#modePanel').mouseleave(
        function() {
            $('#modePanel').fadeOut(1000);
        }
    );

    $('#fullScreen').click(function() {
        if ($('#fullScreen').hasClass('fullScreenOff')) {
            $('body').fullscreen();
            $('#fullScreen').removeClass('fullScreenOff');
            return false;
        } else {
            $.fullscreen.exit();
            $('#fullScreen').addClass('fullScreenOff');
            return false;
        }
    });

    $('#symmetry').slider( { min: 1, max: 6,
        slide: function(event, ui) {
            if (1 == ui.value) {
                    $('#symmetryValue').text("No fold rotational symmetry");
        } else {
            $('#symmetryValue').text(ui.value + "-fold rotational symmetry");
}
        } } );
    $('#symmetryValue').text("No fold rotational symmetry");

    //$("<div></div>").attr('id','point').appendTo('body');
    //
    //$(document).mousemove(function( event ) {
    //    var posX = (event.pageX - 5) + 'px';
    //    var posY = (event.pageY - 5) + 'px';
    //    $('#point').css({'display': 'block','left': posX, 'top': posY});
    //});

});