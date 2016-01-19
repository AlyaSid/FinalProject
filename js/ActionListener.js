var resizeCanvas = function() {
    var width = $(window).width();
    var height = $(window).height();

    var c = $("canvas"),
        ctx = c[0].getContext('2d');

    ctx.canvas.height = height;
    ctx.canvas.width = width;
};

$(window).resize(function () {
    resizeCanvas();
});

$(window).load(function () {
    resizeCanvas();

    $("<div></div>").attr('id', 'point').appendTo('body');

    var isDown;

    $('#drawPanel').mousedown(
        function(event) {
            isDown = true;
			var point = new Point();
			point.setX(event.clientX - $(window).width()/2);
			point.setY(- event.clientY + $(window).height()/2) ;
			picture.setPrevPoint(point);
        }
    );

    $('#drawPanel').mousemove(function (event) {
        var posCursorX = (event.clientX - $(window).width()/2);
        var posCursorY = (- event.clientY + $(window).height()/2);
        if (isDown) {
            picture.drawPoints(posCursorX, posCursorY);
        }
        picture.drawCursor(posCursorX, posCursorY);
    });

    $('#drawPanel').mouseup(
        function() {
            isDown = false;
			picture.resetPrevPoint();
        }
    );

    $('#fullScreen, #save, #undo, #new').mousemove( function (event){
        event.stopPropagation();
        $('.cursorPoints').css('display','none');
    });

    $('#fullScreen, #save, #undo, #new').hover(
        function() {
            $(this).find('i').animate({color: "#EEEEEE"},100);
            $(this).find('span').fadeToggle(100);
        },
        function() {
            $(this).find('i').animate({color: "#2F4F4F"},100);
            $(this).find('span').fadeToggle(100);
    });

    $('#control').mousemove( function (event){
        event.stopPropagation();
        $('.cursorPoints').css('display','none');
    });

    $('#control').hover(
        function(){
            $(this).find('i').animate({color: "#EEEEEE"},100);
            $(this).find('span').css('left','7px').fadeToggle(100);
        },
        function() {
            $(this).find('i').animate({color: "#00BFFF"},100);
            $(this).find('span').fadeToggle(100);
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

    $('#penColors div').click(
        function() {
            var color = $(this).css('backgroundColor');
            picture.setPenColor(color);
        }
    );

    $('#mirrorMode, #spiralMode').hover(
        function() {
            $(this).animate({color: "#EEEEEE"},100);
        },
        function() {
            $(this).animate({color: "#696969"},100);
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
            $('#modePanel').fadeToggle(100);
        }
    );

    $('#modePanel').mouseleave(
        function() {
            $('#modePanel').fadeOut(100);
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
                picture.setSymmetry(0);
            } else {
                $('#symmetryValue').text(ui.value + "-fold rotational symmetry");
                picture.setSymmetry(ui.value);
            }
        }
    });
    $('#symmetryValue').text("No fold rotational symmetry");
});