$(window).load(function () {
    $("<div></div>").attr('id', 'point').appendTo('body');

    var isDown;

    $('#drawPanel').mousedown(
        function() {
            isDown = true;
        }
    );

    $('#drawPanel').mousemove(function (event) {
        var posCursorX = (event.clientX - 7) + 'px';
        var posCursorY = (event.clientY - 7) + 'px';
        if (isDown) {
            picture.drawPoints(posCursorX, posCursorY);
        } else {
            picture.drawCursor(posCursorX, posCursorY);
        }
    });

    $('#drawPanel').mouseup(
        function() {
            isDown = false;
        }
    );

    $('#fullScreen, #save, #undo, #new').mousemove( function (event){
        event.stopPropagation();
        $('.cursorPoints').css('display','none');
    });

    $('#fullScreen, #save, #undo, #new').hover(
        function() {
            $(this).find('i').animate({color: "#EEEEEE"},300);
            $(this).find('span').fadeToggle(300);
        },
        function() {
            $(this).find('i').animate({color: "#2F4F4F"},300);
            $(this).find('span').fadeToggle(300);
    });

    $('#control').mousemove( function (event){
        event.stopPropagation();
        $('.cursorPoints').css('display','none');
    });

    $('#control').hover(
        function(){
            $(this).find('i').animate({color: "#EEEEEE"},400);
            $(this).find('span').css('left','7px').fadeToggle(400);
        },
        function() {
            $(this).find('i').animate({color: "#00BFFF"},400);
            $(this).find('span').fadeToggle(400);
    });

    $('#modePanel').mousemove( function (event){
        event.stopPropagation();
        $('.cursorPoints').css('display','none');
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

    $('#backgroundColors div').click(
        function() {
            var color = $(this).css('backgroundColor');
            picture.setBackground(color);
        }
    );

    $('#mirrorMode, #spiralMode').hover(
        function() {
            $(this).animate({color: "#EEEEEE"},400);
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

    $('#symmetry').slider({
        min: 1, max: 6,
        slide: function (event, ui) {
            if (1 == ui.value) {
                $('#symmetryValue').text("No fold rotational symmetry");
            } else {
                $('#symmetryValue').text(ui.value + "-fold rotational symmetry");
            }
        }
    });
    $('#symmetryValue').text("No fold rotational symmetry");
});