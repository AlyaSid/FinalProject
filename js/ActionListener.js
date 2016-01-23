var resizeCanvas = function() {
    var width = $(window).width();
    var height = $(window).height();

    var c = $("canvas"),
        ctx = c[0].getContext('2d');

    ctx.canvas.height = height;
    ctx.canvas.width = width;

    picture.reDraw();
};

$(window).resize(function () {
    resizeCanvas();
});

$(window).load(function () {
    resizeCanvas();

    $("<div></div>").attr('id', 'point').appendTo('body');

    var isDown,
        $drawPanel = $('#drawPanel'),
        $controls = $('#fullScreen, #save, #undo, #new, #open'),
        $control = $('#control');

    $drawPanel.mousedown(
        function(event) {
            isDown = true;
			var point = new Point();
			point.setX(event.clientX - $(window).width()/2);
			point.setY(- event.clientY + $(window).height()/2) ;
			picture.setPrevPoint(point);
            $('#undo').find('span').text('Undo');
        }
    );

    $drawPanel.mousemove(function (event) {
        var posCursorX = (event.clientX - $(window).width()/2);
        var posCursorY = (- event.clientY + $(window).height()/2);
        if (isDown) {
            picture.drawPoints(posCursorX, posCursorY);
        }
        picture.drawCursor(posCursorX, posCursorY);
    });

    $drawPanel.mouseup(
        function() {
            isDown = false;
			picture.resetPrevPoint();
            picture.setLastLine();
        }
    );

    $controls.mousemove( function (event){
        event.stopPropagation();
        $('.cursorPoints').css('display','none');
    });

    $controls.hover(
        function() {
            $(this)
                .stop()
                .queue('fx',
                    function() {
                        $(this)
                            .find('i').animate({color: '#EEEEEE'},300)
                            .end()
                            .find('span').fadeIn(300)
                            .dequeue('fx');
                    });
        },
        function() {
            $(this)
                .stop()
                .queue('fx',
                    function() {
                        $(this)
                            .find('i').animate({color: '#2F4F4F'},300)
                            .end()
                            .find('span').fadeOut(300)
                            .dequeue('fx');
                    });
    });

    $control.mousemove( function (event){
        event.stopPropagation();
        $('.cursorPoints').css('display','none');
    });

    $control.hover(
        function() {
            $(this)
                .stop()
                .queue('fx',
                    function() {
                        $(this)
                            .find('i').animate({color: '#EEEEEE'},300)
                            .end()
                            .find('span').css('left','7px').fadeIn(300)
                            .dequeue('fx');
                    });
        },
        function() {
            $(this)
                .stop()
                .queue('fx',
                    function() {
                        $(this)
                            .find('i').animate({color: '#00BFFF'},300)
                            .end()
                            .find('span').fadeOut(300)
                            .dequeue('fx');
                    });
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
            $(this)
                .stop()
                .queue('fx',
                function() {
                    $(this).animate({color: '#EEEEEE'},200).dequeue('fx');;
                });
        },
        function() {
            $(this)
                .stop()
                .queue('fx',
                    function() {
                        $(this).animate({color: '#696969'},200).dequeue('fx');;
                    });
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

    $control.click(
        function() {
            $(this)
                .stop(true)
                .queue('fx',
                    function(){
                        $('#modePanel')
                            .fadeToggle(300)
                            .dequeue('fx');
                        });
        }
    );

    $('#modePanel').mouseleave(
        function() {
            $('#modePanel').fadeOut(300);
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
                $('#symmetryValue').text('No fold rotational symmetry');
                picture.setSymmetry(0);
            } else {
                $('#symmetryValue').text(ui.value + '-fold rotational symmetry');
                picture.setSymmetry(ui.value);
            }
        }
    });
    $('#symmetryValue').text('No fold rotational symmetry');

    $('#undo').click(
        function() {
            if ($(this).find('span').text() === 'Undo') {
                picture.undo();
                $(this).find('span').text('Redo');
            } else {
                picture.redo();
                $(this).find('span').text('Undo');
            }
        }
    );

    var userText = $('<div/>', {
        id: 'userText'
    });
    $('body').append(userText);

    var clear = function(){
        pictureView.clear();
        userText.text('You can use SPACE to start a new.');
        userText.css({'left': $(window).innerWidth()/2 - userText.width()/2, 'top': $(window).innerHeight()/2});
        userText
            .animate({
                'opacity': 1
            }, 1000)
            .animate({
                'opacity': 0,
            }, 1000)
    };

    $('#new').click(
        function() {
            clear();
            picture.memoryClear();
        }
    );

    $(window).keypress(
        function(e) {
            if (e.keyCode == 32) {
                clear();
                picture.memoryClear();
            }
    });

    function canvasToImage(backgroundColor)
    {
        var canvas = document.getElementById('drawPanel');
        var context = canvas.getContext("2d");
        
        var w = canvas.width;
        var h = canvas.height;
        var data;
        if(backgroundColor)
        {
            data = context.getImageData(0, 0, w, h);
            var compositeOperation = context.globalCompositeOperation;
            context.globalCompositeOperation = "destination-over";
            context.fillStyle = backgroundColor;
            context.fillRect(0,0,w,h);
        }
        var imageData = canvas.toDataURL("image/png");
        if(backgroundColor)
        {
            context.clearRect (0,0,w,h);
            context.putImageData(data, 0,0);
            context.globalCompositeOperation = compositeOperation;
        }
        return imageData;
    }

    $('#dialog-confirm').dialog({
        autoOpen:false,
        resizable: false,
        width:350,
        modal: true,
        buttons:
            [
                { text:'Locally',
                    click:function() {
                        $('#download').attr('href', canvasToImage(picture.getBackground()));
                        $('#download').attr('download', 'test.png');
                        document.getElementById("download").click();
                        $( this ).dialog( "close" );
                    }
                },
                 {text:'Remote',
                     click:function() {
                         $( this ).dialog( "close" );
                     }
                 },
                {text:'Cancel',
                    click:function() {
                        $( this ).dialog( "close" );
                    }
                }
            ]
    });

    $("#save").click(function(e) {
        e.preventDefault();
        $('#dialog-confirm').dialog('open');
    });

});